import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appShortName, productUrl } from './shared';
import logoMainstay from '@/public/logo-mainstay.png';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          {/* Logo oficial da empresa, o mesmo arquivo usado no Mainstay. Altura fixa e largura
              automatica para preservar a proporcao (a marca nao e quadrada).
              A placa branca so aparece no tema escuro: o mark e navy e praticamente desaparece
              contra o fundo #1f1f1f. */}
          <span className="flex h-6 shrink-0 items-center justify-center rounded-[5px] px-0.5 dark:bg-white">
            <Image src={logoMainstay} alt="Mainstay" className="h-5 w-auto" priority />
          </span>
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
