import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Conteudo em pt-BR:
// - `language: 'portuguese'` liga a normalizacao de acentos do Orama. Com 'english',
//   buscar "conciliacao" (sem acento) nao encontrava "Conciliação".
// - `tolerance: 1` cobre plural/flexao ("propostas" -> "proposta"), ja que o Orama
//   nao faz stemming sem um pacote de stemmers dedicado.
// - `buildIndex` acrescenta as `keywords` do frontmatter ao conteudo indexado; o schema
//   avancado usado por `createFromSource` nao tem campo proprio de keywords. Titulo,
//   descricao, headings, conteudo e breadcrumbs (categorias) ja entram por padrao.
export const { GET } = createFromSource(source, {
  language: 'portuguese',
  search: { tolerance: 1 },
  async buildIndex(page) {
    const structuredData = await page.data.structuredData;
    const keywords = page.data.keywords ?? [];

    return {
      id: page.url,
      url: page.url,
      title: page.data.title,
      description: page.data.description,
      structuredData: keywords.length
        ? { ...structuredData, contents: [...structuredData.contents, { heading: undefined, content: keywords.join(', ') }] }
        : structuredData,
    };
  },
});
