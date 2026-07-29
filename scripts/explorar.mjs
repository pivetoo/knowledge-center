// Ferramenta de apoio: abre rotas do Mainstay e salva as capturas em /tmp, para inspecionar as
// telas antes de virarem cena definitiva. Nao escreve nada em public/.
//
//   node scripts/explorar.mjs /campanhas /marcas /comercial/pipeline
import path from 'node:path';
import { abrirSessao, aguardarTelaPronta } from './lib/sessao.mjs';

const rotas = process.argv.slice(2);
if (rotas.length === 0) rotas.push('/');

const { navegador, pagina, baseURL } = await abrirSessao();

try {
  for (const rota of rotas) {
    const saida = path.join('/tmp', `kc-exp${rota.replace(/\W+/g, '-') || '-raiz'}.png`);
    await pagina.goto(`${baseURL}${rota}`, { waitUntil: 'domcontentloaded' });
    await aguardarTelaPronta(pagina, { espera: 2500 });
    await pagina.screenshot({ path: saida, scale: 'css' });
    console.log(`${rota} -> ${saida}`);
  }
} finally {
  await navegador.close();
}
