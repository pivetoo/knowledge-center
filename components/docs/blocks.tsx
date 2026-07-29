import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, KeyRound, ListChecks } from 'lucide-react';
import { Callout } from 'fumadocs-ui/components/callout';

// Blocos usados nos artigos. Tudo que o Fumadocs ja resolve (Callout, Cards, Steps,
// Tabs, Accordion, blocos de codigo) e reaproveitado; aqui ficam apenas os blocos
// editoriais recorrentes da Central de Ajuda que nao existem no pacote.

export function Permissoes({ children }: { children: ReactNode }) {
  return (
    <Callout type="info" title="Permissões necessárias" icon={<KeyRound className="size-5" />}>
      {children}
    </Callout>
  );
}

export function PreRequisitos({ children }: { children: ReactNode }) {
  return (
    <Callout type="idea" title="Antes de começar" icon={<ListChecks className="size-5" />}>
      {children}
    </Callout>
  );
}

export function Resultado({ children }: { children: ReactNode }) {
  return (
    <Callout type="success" title="Resultado esperado" icon={<CheckCircle2 className="size-5" />}>
      {children}
    </Callout>
  );
}

export function ProblemaComum({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-fd-border bg-fd-card">
      <p className="border-b border-fd-border bg-fd-muted/50 px-4 py-2 text-sm font-semibold">{titulo}</p>
      <div className="px-4 py-3 text-sm [&>:first-child]:mt-0 [&>:last-child]:mb-0">{children}</div>
    </div>
  );
}

export function Relacionados({ links }: { links: { title: string; href: string }[] }) {
  return (
    <nav aria-label="Artigos relacionados" className="my-6 rounded-lg border border-fd-border bg-fd-card p-4">
      <p className="text-sm font-semibold">Artigos relacionados</p>
      <ul className="mt-2 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex items-center gap-1.5 text-sm text-fd-primary hover:underline"
            >
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
