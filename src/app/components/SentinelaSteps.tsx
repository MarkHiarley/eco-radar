"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const StepMap = dynamic(() => import("./StepMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <span className="font-mono-lab text-[10px] text-[#57534e]">…</span>
    </div>
  ),
});

// Placa quadrada → círculos SVG não distorcem em elipse
function MiniMap({ children }: { children?: React.ReactNode }) {
  return (
    <div className="map-frame relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden bg-white sm:max-w-[340px]">
      <StepMap />
      {children}
    </div>
  );
}

// Brasil em zoom 4 num container quadrado ocupa ~x[24,78] y[34,74]
const PONTOS_AMOSTRA: Array<[number, number]> = [
  [58, 44], // MT
  [50, 52], // GO/MS
  [66, 40], // PA
  [42, 58], // MG
  [60, 56], // SP/PR
  [38, 48], // RO/AM
];

export default function SentinelaSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="como-funciona" ref={sectionRef} className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display max-w-xl text-4xl sm:text-6xl">
            A sentinela que não dorme
          </h2>
          <p className="font-mono-lab text-xs text-[#57534e]">
            PASSO A PASSO · CICLO DE PROTEÇÃO
          </p>
        </div>

        <div className="hairline-t">
          {/* passo 1 — detecção */}
          <article className="grid gap-8 py-12 md:grid-cols-2 md:items-center md:gap-16">
            <div className="order-2 md:order-1">
              <p className="font-mono-lab mb-3 text-[11px] text-[#ea580c]">
                PASSO 01 — DETECÇÃO
              </p>
              <h3 className="font-display mb-4 text-2xl sm:text-4xl">
                Satélites da NASA varrem o país
              </h3>
              <p className="max-w-[62ch] text-base leading-relaxed text-[#57534e]">
                Cada foco ativo é detectado pelo sensor VIIRS (satélites
                NOAA-20/21) e chega ao mapa em tempo real, com intensidade,
                hora e posição. Sem estimativa: dado de satélite.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <MiniMap>
                {PONTOS_AMOSTRA.map(([x, y], i) => (
                  <span
                    key={i}
                    className="flame-dot spot absolute z-[1001] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ left: `${x}%`, top: `${y}%` }}
                    aria-hidden
                  />
                ))}
              </MiniMap>
            </div>
          </article>

          {/* passo 2 — localidade */}
          <article className="grid gap-8 border-t border-[rgba(28,25,23,0.14)] py-12 md:grid-cols-2 md:items-center md:gap-16">
            <div className="md:order-1">
              <p className="font-mono-lab mb-3 text-[11px] text-[#ea580c]">
                PASSO 02 — LOCALIDADE
              </p>
              <h3 className="font-display mb-4 text-2xl sm:text-4xl">
                Sua casa entra no mapa
              </h3>
              <p className="max-w-[62ch] text-base leading-relaxed text-[#57534e]">
                Você cadastra onde mora e define o raio de segurança. O
                monitoramento passa a ser pessoal: não o país inteiro — a sua
                área.
              </p>
            </div>
            <div>
              <MiniMap>
                {/* anel de raio — círculo verdadeiro (placas quadradas) */}
                <span
                  className="absolute z-[1001] h-3.5 w-3.5 rounded-full bg-[#1c1917]"
                  style={{ left: "50%", top: "47%", transform: "translate(-50%,-50%)" }}
                  aria-hidden
                />
                <svg
                  className="pointer-events-none absolute inset-0 z-[1000] h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <circle
                    cx="50"
                    cy="47"
                    r="24"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="1.6"
                    className={seen ? "ring-draw" : ""}
                  />
                </svg>
                <span className="font-mono-lab absolute left-1/2 top-1/2 z-[1001] mt-10 -translate-x-1/2 rounded-sm bg-white/85 px-2 py-0.5 text-[9px] text-[#1c1917]">
                  SEU RAIO
                </span>
              </MiniMap>
            </div>
          </article>

          {/* passo 3 — alerta */}
          <article className="grid gap-8 border-t border-[rgba(28,25,23,0.14)] py-12 md:grid-cols-2 md:items-center md:gap-16">
            <div className="order-2 md:order-1">
              <p className="font-mono-lab mb-3 text-[11px] text-[#ea580c]">
                PASSO 03 — ALERTA
              </p>
              <h3 className="font-display mb-4 text-2xl sm:text-4xl">
                O fogo chegou perto? Você sabe antes
              </h3>
              <p className="max-w-[62ch] text-base leading-relaxed text-[#57534e]">
                Quando um foco cruza o seu raio, o alerta acende na hora —
                com tempo de proteger a família, os bens e evacuar a área.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <MiniMap>
                {/* foco dentro do raio */}
                <span
                  className="flame-dot absolute z-[1001] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ left: "62%", top: "32%" }}
                  aria-hidden
                />
                <svg
                  className="pointer-events-none absolute inset-0 z-[1000] h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <circle
                    cx="50"
                    cy="47"
                    r="24"
                    fill="none"
                    stroke="#ea580c"
                    strokeWidth="1.6"
                    opacity="0.85"
                  />
                  <circle
                    cx="50"
                    cy="47"
                    r="29"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="1.2"
                    className="blink"
                    opacity="0.7"
                  />
                </svg>
                <span className="font-mono-lab absolute right-2 top-2 z-[1001] rounded-sm bg-[#1c1917] px-2 py-1 text-[9px] text-white">
                  ALERTA
                </span>
              </MiniMap>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}