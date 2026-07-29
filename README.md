# Central de Ajuda Mainstay (knowledge-center)

Central de Ajuda para os operadores do Mainstay, construída com
[Fumadocs](https://fumadocs.dev) sobre Next.js. Projeto independente do app e da landing page,
pensado para reduzir o volume de suporte com guias self-service.

O público é o operador da agência, não o desenvolvedor: o conteúdo descreve telas, botões e
mensagens do sistema, e evita detalhe técnico de implementação.

## Stack

| Item | Versão |
| --- | --- |
| Next.js | 16.2.6 (App Router, Turbopack) |
| fumadocs-ui | 16.9.3 |
| fumadocs-core | 16.9.3 |
| fumadocs-mdx | 15.0.10 |
| React | 19 |
| Tailwind CSS | 4 |
| TypeScript | 6 |

- Conteúdo: pt-BR
- Busca: Orama local (`fumadocs-core/search/server`), sem serviço externo
- Marca: Mainstay (navy `#1F3B61`, cyan `#00B3C7`)

## Instalação e execução

```bash
npm install          # o postinstall roda o fumadocs-mdx e gera .source/
npm run dev          # http://localhost:3000
```

## Comandos

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Sobe o build de produção |
| `npm run types:check` | Gera tipos do MDX e das rotas e roda o `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run capturas` | Refaz as capturas de tela do Mainstay (ver [Capturas de tela](#capturas-de-tela)) |
| `npm run capturas:explorar` | Abre rotas do Mainstay e salva prints em `/tmp` para inspecionar |

Não há suíte de testes automatizados neste projeto. A validação é feita por `lint`, `types:check`,
`build` e verificação manual no navegador (ver [Validação](#validação)).

## Estrutura de pastas

| Caminho | Descrição |
| --- | --- |
| `content/docs/` | Artigos em MDX, organizados por área |
| `content/docs/meta.json` | Ordem das áreas na navegação |
| `content/_template.mdx` | Template de artigo (fora da coleção; não vira página) |
| `app/(home)/` | Página inicial da Central de Ajuda |
| `app/docs/` | Layout e páginas da documentação |
| `app/api/search/` | Route handler da busca |
| `app/sitemap.ts`, `app/robots.ts` | SEO |
| `app/not-found.tsx` | Página 404 |
| `app/icon.svg` | Favicon (marca Mainstay) |
| `app/llms.txt/`, `app/llms-full.txt/`, `app/llms.mdx/` | Versões em texto para assistentes |
| `app/og/` | Geração das imagens Open Graph |
| `components/mdx.tsx` | Registro dos componentes disponíveis nos artigos |
| `components/docs/blocks.tsx` | Blocos editoriais próprios da Central |
| `components/docs/captura.tsx` | Botão "Ver esta tela" e o diálogo da imagem |
| `scripts/` | Captura das telas do Mainstay (ver [Capturas de tela](#capturas-de-tela)) |
| `public/capturas/` | As imagens geradas |
| `lib/capturas.gen.ts` | Manifesto gerado; não editar à mão |
| `components/search-trigger.tsx` | Botão que abre a busca do Fumadocs |
| `lib/source.ts` | Adaptador de conteúdo (`loader`) |
| `lib/layout.shared.tsx` | Opções compartilhadas de layout |
| `lib/shared.ts` | Nome do app, rotas e URLs |
| `lib/i18n.ts` | Rótulos da interface em pt-BR |
| `app/global.css` | Tema e cores da marca |
| `source.config.ts` | Coleções e schema do frontmatter |
| `PENDENCIAS-DOCUMENTAIS.md` | Divergências entre documentação e código do Mainstay |

## Áreas de conteúdo

| Pasta | Assunto |
| --- | --- |
| `primeiros-passos/` | Visão geral, acesso, navegação, módulos, permissões e conceitos |
| `comercial/` | Funil, oportunidades, propostas, envio, aceite e conversão |
| `producao/` | Campanhas, influenciadores, entregas, revisão, publicação e documentos |
| `financeiro/` | Contas, lançamentos, cobranças, repasses, estorno e fechamento |
| `portais-publicos/` | O que marcas e influenciadores veem fora do sistema |
| `integracoes/` | Contas conectadas, ações, automações e logs |
| `solucao-de-problemas/` | Bloqueios do sistema e como destravar |
| `faq.mdx` | Perguntas frequentes |

## Como criar um artigo

1. Copie `content/_template.mdx` para `content/docs/<area>/<slug>.mdx`.
2. Preencha o frontmatter:

   ```yaml
   ---
   title: Como criar uma proposta
   description: Aprenda a cadastrar, configurar e enviar uma proposta comercial.
   keywords:
     - proposta
     - comercial
     - cliente
     - envio
   ---
   ```

3. Inclua o slug no `meta.json` da pasta, na posição desejada.

Os nomes de pastas e arquivos (slugs) ficam sem acento, pois viram URL; apenas os textos exibidos
(títulos, descrições e corpo) usam acentuação normal do pt-BR.

### Campos do frontmatter

| Campo | Obrigatório | Uso |
| --- | --- | --- |
| `title` | Sim | Título da página, do menu e da aba do navegador |
| `description` | Recomendado | Subtítulo, resultado de busca e metadados |
| `keywords` | Recomendado | Entram no índice de busca (ver [Busca](#busca)) |
| `icon` | Não | Nome de um ícone Lucide, ex.: `Wallet` |
| `full` | Não | `true` remove o sumário lateral e usa a largura total |

Só use campos que a aplicação realmente lê — a lista acima é o schema completo
(`source.config.ts`).

## Como criar uma categoria

1. Crie a pasta em `content/docs/<area>/`.
2. Crie `content/docs/<area>/meta.json`:

   ```json
   {
     "title": "Financeiro",
     "icon": "Wallet",
     "pages": ["index", "contas-financeiras", "conta-padrao"]
   }
   ```

3. Crie `index.mdx` na pasta — ele vira a página de abertura da área.
4. Inclua o nome da pasta em `content/docs/meta.json`.

### Campos do `meta.json`

| Campo | Uso |
| --- | --- |
| `title` | Nome da categoria no menu |
| `pages` | Ordem das páginas; itens fora da lista não aparecem no menu |
| `icon` | Ícone Lucide da categoria |
| `root` | `true` marca a raiz da árvore de navegação |
| `defaultOpen` | Abre a categoria expandida |
| `collapsible` | Permite recolher a categoria |
| `description` | Descrição da categoria |
| `pagesIndex` | Define qual página é o índice da pasta |

Os ícones são resolvidos pelo `lucideIconsPlugin` (`lib/source.ts`). Use o nome exato do ícone no
[Lucide](https://lucide.dev), em PascalCase.

## Como ordenar páginas

A ordem vem do array `pages` do `meta.json`. Uma página que existe no disco mas não está em `pages`
continua acessível pela URL e pela busca, mas **não aparece no menu** — é assim que se esconde um
artigo sem apagá-lo.

## Componentes MDX disponíveis

Registrados em `components/mdx.tsx`; não precisam de import nos artigos.

### Do Fumadocs

| Componente | Uso |
| --- | --- |
| `<Callout type="info\|warn\|error\|success\|idea" title="...">` | Destaque, aviso, alerta |
| `<Cards>` / `<Card title href description>` | Grade de links |
| `<Steps>` / `<Step>` | Passo a passo numerado |
| `<Tabs items={[...]}>` / `<Tab value="...">` | Caminhos alternativos |
| `<Accordions type="single">` / `<Accordion title="...">` | Perguntas e respostas |

### Próprios da Central (`components/docs/blocks.tsx`)

| Componente | Uso |
| --- | --- |
| `<Permissoes>` | Permissões necessárias para executar o fluxo |
| `<PreRequisitos>` | O que precisa estar pronto antes |
| `<Resultado>` | O que o leitor vê quando deu certo |
| `<ProblemaComum titulo="...">` | Sintoma e solução |
| `<Captura id="..." />` | Botão que abre a captura real da tela do Mainstay |
| `<Relacionados links={[{title, href}]} />` | Artigos relacionados no fim do texto |

Tabelas, imagens e blocos de código usam markdown normal — o Fumadocs já cuida de estilo, rolagem
horizontal e botão de copiar.

> Em MDX, deixe **uma linha em branco** antes de cada tag de fechamento (`</Step>`, `</Callout>`)
> quando o conteúdo interno for markdown. Sem isso o parser pode não interpretar listas e tabelas.

## Capturas de tela

Os artigos trazem um botão **Ver esta tela** que abre a captura real da tela do Mainstay em um
diálogo. As imagens não são feitas à mão: um script loga no sistema e fotografa cada tela.

As capturas são feitas em **1920x1080** (definido em `scripts/lib/sessao.mjs`), renderizadas com
`deviceScaleFactor: 2` para o texto sair nítido. Nessa largura as telas densas cabem inteiras — em
1440 o funil cortava a última coluna e a tabela de Contas a receber perdia a coluna Cobrança.

### Como usar em um artigo

```mdx
<Captura id="financeiro-monitor" />
<Captura id="financeiro-monitor" legenda="Texto próprio no lugar da legenda padrão" />
```

O `id` é validado por `npm run types:check`, que ao final roda `scripts/verificar-capturas.mjs`:
ele varre os `.mdx`, confere cada `<Captura id="...">` contra `lib/capturas.gen.ts` e falha se o id
não existir ou se a imagem estiver faltando em `public/capturas/`. Sem isso o erro passaria batido —
o `tsc` não enxerga o conteúdo dos arquivos MDX.

Em tempo de execução, um id desconhecido rende um aviso visível no lugar do botão, em vez de uma
imagem quebrada.

### Como refazer as capturas

```bash
cp .env.capture.example .env.capture   # e preencha (o arquivo é ignorado pelo git)
npm run capturas                       # todas as cenas
npm run capturas financeiro-monitor    # apenas as cenas informadas
```

O script gera `public/capturas/<id>.png` e regrava `lib/capturas.gen.ts`. Rodar um subconjunto
**não** apaga as demais cenas do manifesto.

Se `.env.capture` não existir, o script reaproveita o `e2e/.env` do `AgencyCampaign.Web`. As
credenciais nunca são impressas no console nem gravadas no repositório.

### Como adicionar uma cena

Edite `scripts/cenas.mjs`:

```js
{
  id: 'financeiro-periodos',
  rota: '/financeiro/periodos',
  legenda: 'Os períodos financeiros e seu status de fechamento',
  seletor: 'h1',                       // opcional: espera este elemento
  async preparar(pagina) {             // opcional: abrir aba, abrir modal
    await pagina.getByRole('button', { name: /Novo lançamento/i }).first().click();
    await pagina.waitForTimeout(1200);
  },
}
```

Depois rode `npm run capturas <id>` e use `<Captura id="<id>" />` no artigo.

### Cuidados com os dados

As capturas saem do tenant de demonstração (**Agencia de Testes**), que tem base própria de marcas,
influenciadores e campanhas com nomes realistas. Antes de recapturar, confira se a execução da suíte
de E2E não deixou registros com prefixo `E2E-` visíveis nas listas — eles aparecem nas telas de
Funil, Propostas e Contas a receber e estragam a captura.

## Busca

A busca usa o Orama local, servido por `app/api/search/route.ts`, e é indexada em build.

Configuração relevante:

- `language: 'portuguese'` — normaliza acentuação. Buscar `conciliacao` encontra "Conciliação".
- `search: { tolerance: 1 }` — cobre plural e flexão (`propostas` encontra "proposta").
- `buildIndex` — acrescenta as `keywords` do frontmatter ao conteúdo indexado, porque o schema
  avançado do Fumadocs não tem campo próprio para elas.

São indexados: título, descrição, headings, corpo, breadcrumbs (categorias) e keywords.

O diálogo é o padrão do Fumadocs (atalho `Ctrl`/`Cmd` + `K`), com rótulos traduzidos em
`lib/i18n.ts`. Não crie um mecanismo de busca paralelo: para abrir o diálogo de outro lugar, use
`useSearchContext()` como em `components/search-trigger.tsx`.

## Como validar links

Não há dependência externa para isso. O script abaixo confere todos os links internos `/docs/...`
dos artigos:

```bash
python3 - <<'PY'
import pathlib, re
root = pathlib.Path('content/docs')
valid = set()
for p in root.rglob('*.mdx'):
    parts = list(p.relative_to(root).with_suffix('').parts)
    if parts[-1] == 'index': parts = parts[:-1]
    valid.add('/docs' + ('/' + '/'.join(parts) if parts else ''))
broken = []
for p in root.rglob('*.mdx'):
    for m in re.finditer(r'[\'"(](/docs[^\)\'"#\s]*)', p.read_text(encoding='utf-8')):
        url = m.group(1).rstrip('/') or '/docs'
        if url not in valid: broken.append((str(p), url))
print('quebrados:', broken or 'nenhum')
PY
```

O `build` também falha em link relativo inválido dentro de MDX, porque `createRelativeLink` resolve
os caminhos em tempo de build.

## Validação

Antes de publicar:

```bash
npm run lint
npm run types:check
npm run build
```

E no navegador (`npm run dev`), confira: página inicial, layout da documentação, menu lateral,
navegação entre categorias, abertura de artigos, trilha de navegação, sumário, links anterior e
próximo, busca (incluindo estado sem resultados), modo escuro, layout mobile e a página 404.

## Publicação

Destino previsto: subdomínio próprio (por exemplo `ajuda.mainstay.com.br`), seguindo o padrão
pull-based do ecossistema.

Antes do deploy, defina `NEXT_PUBLIC_SITE_URL` com o domínio final — ela alimenta os metadados
absolutos, as imagens Open Graph, a URL canônica, o `sitemap.xml` e o `robots.txt`. Veja
`.env.example`.

A configuração de deploy será adicionada quando o subdomínio e a infraestrutura forem definidos.
