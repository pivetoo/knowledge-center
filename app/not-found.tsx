import Link from 'next/link';
import type { Metadata } from 'next';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { SearchTrigger } from '@/components/search-trigger';

export const metadata: Metadata = {
  title: 'Página não encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-semibold tracking-widest text-fd-primary uppercase">Erro 404</p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl">Não encontramos esta página</h1>
        <p className="mt-3 max-w-md text-fd-muted-foreground">
          O artigo pode ter sido movido, renomeado ou ainda não existe. Use a busca para encontrar o que
          você precisa.
        </p>

        <div className="mt-8 w-full max-w-md">
          <SearchTrigger />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            Voltar ao início
          </Link>
          <Link
            href="/docs"
            className="rounded-lg border border-fd-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fd-accent"
          >
            Ver toda a documentação
          </Link>
        </div>
      </main>
    </HomeLayout>
  );
}
