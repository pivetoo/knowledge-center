// Captura as telas do Mainstay definidas em cenas.mjs e gera o manifesto usado pelo <Captura>.
//
//   node scripts/capturar.mjs                    todas as cenas
//   node scripts/capturar.mjs financeiro-monitor  apenas as cenas informadas
import fs from 'node:fs';
import path from 'node:path';
import { abrirSessao, aguardarTelaPronta, raiz, VIEWPORT } from './lib/sessao.mjs';
import { cenas } from './cenas.mjs';

const destino = path.join(raiz, 'public', 'capturas');
const manifesto = path.join(raiz, 'lib', 'capturas.gen.ts');

const filtro = process.argv.slice(2);
const selecionadas = filtro.length ? cenas.filter((c) => filtro.includes(c.id)) : cenas;

if (selecionadas.length === 0) {
  console.error(`Nenhuma cena corresponde a: ${filtro.join(', ')}`);
  process.exit(1);
}

fs.mkdirSync(destino, { recursive: true });

const { navegador, pagina, baseURL } = await abrirSessao();
const capturadas = [];
const falhas = [];

try {
  for (const cena of selecionadas) {
    const arquivo = path.join(destino, `${cena.id}.png`);
    try {
      await pagina.goto(`${baseURL}${cena.rota}`, { waitUntil: 'domcontentloaded' });
      await aguardarTelaPronta(pagina, { seletor: cena.seletor, espera: 2200 });
      if (cena.preparar) await cena.preparar(pagina);
      await pagina.screenshot({ path: arquivo, scale: 'css' });

      capturadas.push({ id: cena.id, legenda: cena.legenda, rota: cena.rota });
      console.log(`ok   ${cena.id}`);
    } catch (erro) {
      falhas.push({ id: cena.id, motivo: erro.message.split('\n')[0] });
      console.log(`FALHA ${cena.id}: ${erro.message.split('\n')[0]}`);
    }
  }
} finally {
  await navegador.close();
}

// Mescla com o manifesto anterior: rodar so algumas cenas nao pode apagar as demais.
let anteriores = [];
if (fs.existsSync(manifesto)) {
  const bruto = fs.readFileSync(manifesto, 'utf8');
  const json = bruto.match(/export const capturas = (\[[\s\S]*?\]) as const;/);
  if (json) {
    try {
      anteriores = JSON.parse(json[1].replace(/,(\s*[\]}])/g, '$1'));
    } catch {
      anteriores = [];
    }
  }
}

const porId = new Map(anteriores.map((c) => [c.id, c]));
for (const c of capturadas) porId.set(c.id, c);
const finais = [...porId.values()]
  .filter((c) => fs.existsSync(path.join(destino, `${c.id}.png`)))
  .sort((a, b) => a.id.localeCompare(b.id));

fs.writeFileSync(
  manifesto,
  `// Gerado por scripts/capturar.mjs. Nao edite a mao.
// Para recapturar: npm run capturas
export const capturas = ${JSON.stringify(finais, null, 2)} as const;

export type CapturaId = (typeof capturas)[number]['id'];

export const larguraCaptura = ${VIEWPORT.width};
export const alturaCaptura = ${VIEWPORT.height};
`,
  'utf8',
);

console.log(`\n${capturadas.length} capturadas, ${falhas.length} falharam. Manifesto: ${path.relative(raiz, manifesto)} (${finais.length} cenas).`);
if (falhas.length) process.exitCode = 1;
