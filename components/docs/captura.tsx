'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, ImageIcon, X, ZoomIn, ZoomOut } from 'lucide-react';
import { alturaCaptura, capturas, larguraCaptura, type CapturaId } from '@/lib/capturas.gen';

const porId = new Map(capturas.map((c) => [c.id, c]));

// Botao que abre a captura real da tela do Mainstay. O texto do artigo continua sendo a
// instrucao; a imagem entra sob demanda, para nao empurrar o passo a passo para baixo.
//
// O dialogo e contido de proposito (nao ocupa a tela inteira): precisa ler como sobreposicao,
// com o artigo visivel atras. Como a captura e 1920 de largura, ela entra ajustada a largura do
// dialogo e o detalhe fica no zoom, em vez de esticar o modal ate a borda da tela.
export function Captura({ id, legenda }: { id: CapturaId; legenda?: string }) {
  const [aberto, setAberto] = useState(false);
  const [ampliado, setAmpliado] = useState(false);
  const dialogo = useRef<HTMLDialogElement>(null);
  const cena = porId.get(id);

  useEffect(() => {
    const elemento = dialogo.current;
    if (!elemento) return;

    if (aberto && !elemento.open) elemento.showModal();
    if (!aberto && elemento.open) elemento.close();
  }, [aberto]);

  if (!cena) {
    return (
      <span className="text-fd-muted-foreground text-sm italic">
        (captura &quot;{id}&quot; ainda não gerada — rode <code>npm run capturas</code>)
      </span>
    );
  }

  const texto = legenda ?? cena.legenda;
  const arquivo = `/capturas/${cena.id}.png`;

  function fechar() {
    setAberto(false);
    setAmpliado(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        className="my-4 flex w-full items-center gap-3 rounded-lg border border-fd-border bg-fd-card px-4 py-3 text-left transition-colors hover:border-fd-primary/50 hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-fd-primary/10 text-fd-primary">
          <ImageIcon className="size-5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-medium">Ver esta tela</span>
          <span className="block truncate text-xs text-fd-muted-foreground">{texto}</span>
        </span>
      </button>

      <dialog
        ref={dialogo}
        onClose={fechar}
        onClick={(evento) => {
          if (evento.target === dialogo.current) fechar();
        }}
        // O dialogo e renderizado dentro do DocsBody, entao herda a tipografia do artigo: sem os
        // resets abaixo, a prosa injeta margem no figure/img/p e sobra espaco morto no modal.
        className="fd-captura m-auto w-[min(92vw,64rem)] max-w-none rounded-xl border border-fd-border bg-fd-card p-0 text-fd-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-[2px] [&_figure]:m-0 [&_img]:m-0 [&_p]:m-0"
      >
        {aberto && (
          <figure className="m-0 flex max-h-[85vh] flex-col">
            <figcaption className="flex shrink-0 items-center gap-2 border-b border-fd-border px-4 py-2.5">
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{texto}</span>

              <button
                type="button"
                onClick={() => setAmpliado((v) => !v)}
                aria-pressed={ampliado}
                title={ampliado ? 'Ajustar à janela' : 'Ampliar para o tamanho real'}
                className="flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
              >
                {ampliado ? <ZoomOut className="size-4" aria-hidden /> : <ZoomIn className="size-4" aria-hidden />}
                <span className="hidden sm:inline">{ampliado ? 'Ajustar' : 'Ampliar'}</span>
              </button>

              <a
                href={arquivo}
                target="_blank"
                rel="noreferrer"
                title="Abrir a imagem em uma nova aba"
                className="flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
              >
                <ExternalLink className="size-4" aria-hidden />
                <span className="hidden sm:inline">Nova aba</span>
              </a>

              <button
                type="button"
                onClick={fechar}
                aria-label="Fechar"
                className="flex size-8 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
              >
                <X className="size-4" aria-hidden />
              </button>
            </figcaption>

            <div className={`min-h-0 flex-1 bg-fd-background p-2 ${ampliado ? 'overflow-auto' : 'overflow-hidden'}`}>
              <Image
                src={arquivo}
                alt={texto}
                width={larguraCaptura}
                height={alturaCaptura}
                sizes="(max-width: 64rem) 92vw, 64rem"
                onClick={() => setAmpliado((v) => !v)}
                className={
                  ampliado
                    ? 'max-w-none cursor-zoom-out rounded-md border border-fd-border'
                    : 'h-auto w-full cursor-zoom-in rounded-md border border-fd-border'
                }
                style={ampliado ? { width: larguraCaptura } : undefined}
                unoptimized
              />
            </div>

            <p className="shrink-0 border-t border-fd-border px-4 py-2 text-[11px] text-fd-muted-foreground">
              {ampliado ? 'Arraste para percorrer a imagem. Clique para ajustar à janela.' : 'Clique na imagem para ampliar.'}{' '}
              <kbd>Esc</kbd> fecha.
            </p>
          </figure>
        )}
      </dialog>
    </>
  );
}
