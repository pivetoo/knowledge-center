// Ajusta o nome de exibicao do usuario de captura. A saudacao do Painel usa esse nome, entao
// "DEV" apareceria nas capturas. Roda pela propria API do app, autenticado como o usuario.
//
//   node scripts/ajustar-perfil.mjs "Marina Alves"
import { abrirSessao } from './lib/sessao.mjs';

const nome = process.argv[2];
if (!nome) {
  console.error('Uso: node scripts/ajustar-perfil.mjs "<nome de exibicao>"');
  process.exit(1);
}

const { navegador, pagina } = await abrirSessao();

try {
  const resultado = await pagina.evaluate(async (novoNome) => {
    const chaves = Object.keys(localStorage).filter((k) => /token|auth/i.test(k));
    let token = null;
    for (const chave of chaves) {
      const bruto = localStorage.getItem(chave) ?? '';
      const achado = bruto.match(/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/);
      if (achado) {
        token = achado[0];
        break;
      }
    }
    if (!token) return { erro: 'token de acesso nao encontrado no storage', chaves };

    const resposta = await fetch('/api/Profile/UpdateProfile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: novoNome }),
    });
    return { status: resposta.status, corpo: (await resposta.text()).slice(0, 300) };
  }, nome);

  console.log(JSON.stringify(resultado, null, 2));
} finally {
  await navegador.close();
}
