import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Empacota o servidor minimo em .next/standalone. A imagem de producao roda `node server.js`
  // em vez de carregar o node_modules inteiro. Precisa de servidor Node (e nao export estatico)
  // por causa da rota de busca, das imagens Open Graph e do proxy de negociacao de Markdown.
  output: 'standalone',
};

export default withMDX(config);
