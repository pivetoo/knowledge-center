import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Permissoes, PreRequisitos, ProblemaComum, Relacionados, Resultado } from './docs/blocks';
import { Captura } from './docs/captura';

// `defaultMdxComponents` ja traz Callout, Card/Cards, tabelas, imagens e blocos de codigo.
// Os demais sao registrados aqui para ficarem disponiveis em qualquer .mdx sem import.
export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Step,
    Steps,
    Tab,
    Tabs,
    Captura,
    Permissoes,
    PreRequisitos,
    ProblemaComum,
    Relacionados,
    Resultado,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
