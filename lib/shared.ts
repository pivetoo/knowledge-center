export const appName = 'Central de Ajuda Mainstay';
export const appShortName = 'Central de Ajuda';
export const appDescription = 'Encontre orientações sobre os módulos Comercial, Produção e Financeiro do Mainstay.';

export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

// URL do produto exibida no cabeçalho.
export const productUrl = 'https://agencias.mainstay.com.br';

// URL pública da Central de Ajuda. Usada em metadados absolutos, sitemap e OG.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
