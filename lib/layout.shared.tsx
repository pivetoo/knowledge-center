import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appShortName, productUrl } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <svg viewBox="0 0 32 32" className="size-6 shrink-0" aria-hidden>
            <rect width="32" height="32" rx="8" fill="#1F3B61" />
            <path d="M9 22V10l7 7 7-7v12" stroke="#00B3C7" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-semibold">
            Mainstay <span className="font-normal text-fd-muted-foreground">{appShortName}</span>
          </span>
        </span>
      ),
      url: '/',
    },
    links: [
      { text: 'Documentação', url: '/docs', active: 'nested-url' },
      { text: 'Abrir o Mainstay', url: productUrl, external: true },
    ],
  };
}
