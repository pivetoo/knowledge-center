// Falha se algum artigo referenciar uma captura que nao existe, ou se houver captura gerada que
// nenhum artigo usa. O tsc nao enxerga o conteudo dos .mdx, entao sem esta checagem um <Captura>
// com id errado so apareceria quebrado no navegador.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifesto = path.join(raiz, 'lib', 'capturas.gen.ts');
const conteudo = path.join(raiz, 'content');
const imagens = path.join(raiz, 'public', 'capturas');

const bruto = fs.readFileSync(manifesto, 'utf8');
const disponiveis = new Set([...bruto.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]));

function mdxRecursivo(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const completo = path.join(dir, e.name);
    if (e.isDirectory()) return mdxRecursivo(completo);
    return e.name.endsWith('.mdx') ? [completo] : [];
  });
}

const usados = new Set();
const quebrados = [];

for (const arquivo of mdxRecursivo(conteudo)) {
  const texto = fs.readFileSync(arquivo, 'utf8');
  for (const achado of texto.matchAll(/<Captura\s+id="([^"]+)"/g)) {
    const id = achado[1];
    usados.add(id);
    if (!disponiveis.has(id)) {
      quebrados.push({ arquivo: path.relative(raiz, arquivo), id });
    }
  }
}

const semArquivo = [...disponiveis].filter((id) => !fs.existsSync(path.join(imagens, `${id}.png`)));
const semUso = [...disponiveis].filter((id) => !usados.has(id));

if (quebrados.length) {
  console.error('Capturas referenciadas que nao existem no manifesto:');
  for (const q of quebrados) console.error(`  ${q.arquivo}: id="${q.id}"`);
}
if (semArquivo.length) {
  console.error(`Cenas no manifesto sem imagem em public/capturas: ${semArquivo.join(', ')}`);
}

if (quebrados.length || semArquivo.length) {
  console.error('\nRode `npm run capturas` para gerar as capturas que faltam.');
  process.exit(1);
}

console.log(`Capturas ok: ${disponiveis.size} cenas, ${usados.size} usadas nos artigos.`);
if (semUso.length) console.log(`Ainda sem uso em artigo: ${semUso.join(', ')}`);
