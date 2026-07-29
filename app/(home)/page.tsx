import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Compass, Handshake, LifeBuoy, Megaphone, ShieldQuestion, Wallet } from 'lucide-react';
import { SearchTrigger } from '@/components/search-trigger';
import { appDescription } from '@/lib/shared';

export const metadata: Metadata = {
  title: 'Como podemos ajudar?',
  description: appDescription,
  alternates: { canonical: '/' },
};

const modules = [
  {
    title: 'Comercial',
    description: 'Funil, oportunidades, propostas, envio e aceite do cliente.',
    href: '/docs/comercial',
    icon: Handshake,
  },
  {
    title: 'Produção',
    description: 'Campanhas, influenciadores, entregas, revisão e publicação.',
    href: '/docs/producao',
    icon: Megaphone,
  },
  {
    title: 'Financeiro',
    description: 'Contas, lançamentos, cobranças, repasses e fechamento.',
    href: '/docs/financeiro',
    icon: Wallet,
  },
];

const firstSteps = [
  { title: 'Visão geral do Mainstay', href: '/docs/primeiros-passos/visao-geral' },
  { title: 'Como acessar o sistema', href: '/docs/primeiros-passos/como-acessar' },
  { title: 'Como navegar pelo sistema', href: '/docs/primeiros-passos/como-navegar' },
  { title: 'Perfis e permissões', href: '/docs/primeiros-passos/perfis-e-permissoes' },
];

const recommended = [
  { title: 'Como criar uma proposta', href: '/docs/comercial/criar-proposta' },
  { title: 'Como enviar uma proposta ao cliente', href: '/docs/comercial/enviar-proposta' },
  { title: 'Como criar uma campanha', href: '/docs/producao/criar-campanha' },
  { title: 'Como publicar um entregável', href: '/docs/producao/publicar-entregavel' },
  { title: 'Como registrar um pagamento', href: '/docs/financeiro/registrar-pagamento' },
  { title: 'Como realizar um repasse a influenciador', href: '/docs/financeiro/repasse-influenciador' },
];

const commonProblems = [
  { title: 'Por que uma proposta pode ficar bloqueada', href: '/docs/solucao-de-problemas/proposta-bloqueada' },
  { title: 'Por que um pagamento pode ficar bloqueado', href: '/docs/solucao-de-problemas/pagamento-bloqueado' },
  { title: 'Link expirado ou inválido', href: '/docs/solucao-de-problemas/link-expirado' },
  { title: 'Permissões insuficientes', href: '/docs/solucao-de-problemas/permissoes-insuficientes' },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b border-fd-border bg-fd-card/40">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 text-center sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Como podemos ajudar?</h1>
          <p className="mt-3 max-w-2xl text-fd-muted-foreground">{appDescription}</p>

          <div className="mt-8 w-full max-w-xl">
            <SearchTrigger />
          </div>

          <p className="mt-3 text-xs text-fd-muted-foreground">
            Ou{' '}
            <Link href="/docs" className="font-medium text-fd-primary underline underline-offset-4">
              navegue por toda a documentação
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-16">
        <section aria-labelledby="modulos">
          <h2 id="modulos" className="text-lg font-semibold">
            Módulos do sistema
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {modules.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:border-fd-primary/50 hover:bg-fd-accent"
              >
                <item.icon className="size-6 text-fd-primary" aria-hidden />
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-fd-muted-foreground">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <LinkSection
            id="primeiros-passos"
            title="Primeiros passos"
            description="Comece por aqui se você é novo no Mainstay."
            icon={Compass}
            items={firstSteps}
            moreHref="/docs/primeiros-passos"
            moreLabel="Ver todos os primeiros passos"
          />
          <LinkSection
            id="recomendados"
            title="Artigos recomendados"
            description="Os fluxos mais usados no dia a dia da agência."
            icon={LifeBuoy}
            items={recommended}
            moreHref="/docs"
            moreLabel="Ver todos os artigos"
          />
        </div>

        <section className="mt-12" aria-labelledby="problemas">
          <div className="rounded-xl border border-fd-border bg-fd-card p-6">
            <div className="flex items-center gap-2">
              <ShieldQuestion className="size-5 text-fd-primary" aria-hidden />
              <h2 id="problemas" className="text-lg font-semibold">
                Algo travou?
              </h2>
            </div>
            <p className="mt-1 text-sm text-fd-muted-foreground">
              Situações em que o sistema bloqueia uma ação de propósito e o que fazer em cada caso.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {commonProblems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-fd-accent"
                  >
                    <span>{item.title}</span>
                    <ArrowRight className="size-4 shrink-0 text-fd-muted-foreground" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/docs/solucao-de-problemas"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fd-primary hover:underline"
            >
              Ver solução de problemas
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function LinkSection({
  id,
  title,
  description,
  icon: Icon,
  items,
  moreHref,
  moreLabel,
}: {
  id: string;
  title: string;
  description: string;
  icon: typeof Compass;
  items: { title: string; href: string }[];
  moreHref: string;
  moreLabel: string;
}) {
  return (
    <section aria-labelledby={id}>
      <div className="flex items-center gap-2">
        <Icon className="size-5 text-fd-primary" aria-hidden />
        <h2 id={id} className="text-lg font-semibold">
          {title}
        </h2>
      </div>
      <p className="mt-1 text-sm text-fd-muted-foreground">{description}</p>
      <ul className="mt-4 divide-y divide-fd-border rounded-xl border border-fd-border">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center justify-between gap-2 px-4 py-3 text-sm transition-colors hover:bg-fd-accent"
            >
              <span>{item.title}</span>
              <ArrowRight className="size-4 shrink-0 text-fd-muted-foreground" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={moreHref}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-fd-primary hover:underline"
      >
        {moreLabel}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </section>
  );
}
