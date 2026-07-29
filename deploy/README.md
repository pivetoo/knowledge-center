# Deploy da Central de Ajuda

Destino: **https://ajuda.mainstay.com.br** (VPS debian, `72.61.24.223`).

## Como funciona

Deploy **pull-based**, igual ao restante do ecossistema. A borda de rede da Hostinger dropa
intermitentemente os IPs dos runners do GitHub, então o deploy não depende de conexão de entrada:

1. push na `main` dispara o workflow;
2. o workflow roda lint e `types:check`, constrói a imagem e publica em
   `ghcr.io/pivetoo/knowledge-center:latest`;
3. o VPS puxa a imagem sozinho a cada 30s (`knowledge-center-deploy-poll.timer`);
4. em paralelo, o workflow tenta avisar o webhook para o deploy sair na hora. Se o IP do runner
   estiver bloqueado, o passo falha silenciosamente e o poll resolve em até ~30s.

| Recurso | Valor |
| --- | --- |
| Imagem | `ghcr.io/pivetoo/knowledge-center:latest` |
| Container | `knowledge-center`, publicado em `127.0.0.1:8114` |
| Webhook | `127.0.0.1:9881`, exposto pelo nginx em `/deploy-hook` |
| Diretório do compose | `/var/www/knowledge-center` |
| Diretório do deploy | `/opt/knowledge-center-deploy` |

O domínio final entra em **tempo de build** (`NEXT_PUBLIC_SITE_URL`), porque o Next inlina as
variáveis `NEXT_PUBLIC_*` no bundle. Ele alimenta `metadataBase`, URL canônica, Open Graph,
`sitemap.xml` e `robots.txt`. Mudou de domínio? Ajuste `SITE_URL` no workflow e refaça o build.

## Preparação no VPS (uma vez só)

```bash
ssh -i ~/.ssh/vps_debian root@72.61.24.223

mkdir -p /var/www/knowledge-center /opt/knowledge-center-deploy

# 1. compose e scripts (copiar deste repositório)
#    deploy/docker-compose.prod.yml  -> /var/www/knowledge-center/docker-compose.prod.yml
#    deploy/webhook/deploy.sh        -> /opt/knowledge-center-deploy/deploy.sh
#    deploy/webhook/receiver.py      -> /opt/knowledge-center-deploy/receiver.py
chmod +x /opt/knowledge-center-deploy/deploy.sh

# 2. token do webhook (o mesmo valor vai no secret DEPLOY_HOOK_TOKEN do repositório)
openssl rand -hex 32 > /opt/knowledge-center-deploy/token
chmod 600 /opt/knowledge-center-deploy/token

# 3. systemd
#    deploy/webhook/knowledge-center-deploy-hook.service  -> /etc/systemd/system/
#    deploy/webhook/knowledge-center-deploy-poll.service  -> /etc/systemd/system/
#    deploy/webhook/knowledge-center-deploy-poll.timer    -> /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now knowledge-center-deploy-hook.service
systemctl enable --now knowledge-center-deploy-poll.timer

# 4. nginx + TLS
#    deploy/nginx/ajuda.mainstay.com.br.conf -> /etc/nginx/sites-available/ajuda.mainstay.com.br
ln -s /etc/nginx/sites-available/ajuda.mainstay.com.br /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
certbot --nginx -d ajuda.mainstay.com.br --non-interactive --agree-tos -m pivetorogerio@gmail.com
```

O `root` já precisa estar logado no GHCR (`/root/.docker/config.json`). **Sem isso o poll falha em
silêncio**: o `docker compose pull` não consegue baixar a imagem privada e o deploy nunca acontece,
sem erro visível no workflow.

## Segredo no repositório

| Secret | Valor |
| --- | --- |
| `DEPLOY_HOOK_TOKEN` | o mesmo conteúdo de `/opt/knowledge-center-deploy/token` |

Sem ele o webhook responde 401 e o deploy passa a depender só do poll (ainda funciona, só demora
até 30s a mais).

## Diagnóstico

```bash
# o poll está rodando?
systemctl status knowledge-center-deploy-poll.timer
journalctl -u knowledge-center-deploy-poll.service -n 30

# o receiver está de pé?
systemctl status knowledge-center-deploy-hook.service
cat /opt/knowledge-center-deploy/last-deploy.log

# o container está no ar?
docker ps --filter name=knowledge-center
docker logs --tail 50 knowledge-center
curl -I http://127.0.0.1:8114/
```
