'use client';

import { Search } from 'lucide-react';
import { useSearchContext } from 'fumadocs-ui/contexts/search';

// Abre o dialogo de busca do Fumadocs (o mesmo do atalho Ctrl/Cmd+K e do cabecalho),
// para a home nao ter uma implementacao de busca paralela.
export function SearchTrigger() {
  const { setOpenSearch, hotKey } = useSearchContext();

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      className="flex w-full items-center gap-3 rounded-xl border border-fd-border bg-fd-card px-4 py-3 text-left text-fd-muted-foreground shadow-sm transition-colors hover:border-fd-primary/50 hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
    >
      <Search className="size-5 shrink-0" aria-hidden />
      <span className="flex-1 truncate text-sm">Busque por um assunto, tela ou dúvida...</span>
      <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-fd-border bg-fd-muted px-1.5 py-0.5 font-mono text-[11px] sm:flex">
        {hotKey.map((k, i) => (
          <span key={i}>{k.display}</span>
        ))}
      </kbd>
    </button>
  );
}
