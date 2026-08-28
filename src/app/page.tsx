import Link from "next/link";
import Image from "next/image";
import EcoradarIcon from "@/app/assets/ecoradar-icone.png";
import LiveMap from "./components/LiveMap";
import SentinelaSteps from "./components/SentinelaSteps";
import SignInButton from "./components/SignInButton";
import GoogleButton from "./components/GoogleButton";
import VLibrasWidget from "./components/VLibrasWidget";

const navLinks = [
  { href: "#mapa", label: "Mapa ao vivo" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#ods13", label: "ODS 13" },
];

export default function Home() {
  return (
    <main className="bg-white text-[#1c1917]">
      <VLibrasWidget />

      {/* ---------- NAV ---------- */}
      <header className="hairline-b sticky top-0 z-50 bg-white/95">
        <nav
          aria-label="Principal"
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        >
          <a href="#topo" className="flex items-center gap-2.5">
            <Image
              src={EcoradarIcon}
              alt="EcoRadar"
              width={556}
              height={656}
              className="h-9 w-auto"
              priority
            />
            <span className="font-display text-lg tracking-tight">EcoRadar</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#57534e] transition-colors hover:text-[#ea580c]"
              >
                {l.label}
              </a>
            ))}
          </div>
          <Link
            href="/api/auth/signin/google?callbackUrl=/users"
            className="rounded-md border border-[#1c1917] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#1c1917] hover:text-white"
          >
            Entrar
          </Link>
        </nav>
      </header>

      {/* ---------- HERO ---------- */}
      <section id="topo" className="relative overflow-hidden">
        <div className="map-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <h1 className="font-display text-[13vw] leading-[0.95] sm:text-6xl lg:text-7xl">
              Veja o fogo{" "}
              <span className="text-[#ea580c]">antes</span> dele te ver
            </h1>

            <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-[#57534e]">
              Monitoramento em tempo real de focos de incêndio no Brasil,
              direto dos satélites da NASA. Cadastre sua localidade e receba o
              alerta com tempo de proteger quem você ama. Enquanto isso, o
              Brasil queimou <b className="font-bold text-[#1c1917]">79% mais
              área em 2024</b> do que em 2023.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <SignInButton className="px-7 py-3.5 text-base">
                Começar a receber alertas
              </SignInButton>
              <a
                href="#mapa"
                className="rounded-md border border-[#1c1917] px-7 py-3.5 text-base font-semibold transition-colors hover:bg-[#1c1917] hover:text-white"
              >
                Ver o mapa ao vivo
              </a>
            </div>

            <p className="font-mono-lab mt-8 text-[11px] text-[#57534e]">
              GRÁTIS · DADOS DE SATÉLITE · BRASIL INTEIRO
            </p>
          </div>

          <div id="mapa" className="scroll-mt-24">
            <LiveMap dias={3} />
            <p className="font-mono-lab mt-3 text-center text-[10px] text-[#a8a29e]">
              focos reais detectados por satélite · última atualização automática
            </p>
          </div>
        </div>
      </section>

      {/* ---------- PROVA ---------- */}
      <section aria-label="Números do problema" className="hairline-t hairline-b">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <p className="font-display text-3xl leading-[1.05] sm:text-5xl">
            30M+ hectares devastados em 2024
            <span className="block text-[#57534e] opacity-80">uma área maior que a Itália, consumida pelo fogo.</span>
          </p>
          <p className="self-end text-base leading-relaxed text-[#57534e]">
            Em 2024, o Brasil registrou o pior salto de queimadas da década:{" "}
            <b className="font-bold text-[#1c1917]">+79% de áreas atingidas</b> na
            comparação com 2023. O fogo agora acelera mais rápido que a
            resposta — e é essa corrida que a EcoRadar existe pra vencer.
          </p>
        </div>
      </section>

      {/* ---------- PROBLEMA ---------- */}
      <section id="problema" className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-display text-4xl sm:text-6xl">
              O fogo não espera.{" "}
              <span className="text-[#ea580c]">Nós também não deveríamos.</span>
            </h2>
            <p className="mt-7 max-w-[60ch] text-lg leading-relaxed text-[#57534e]">
              Milhares de focos por ano ameaçam biomas inteiros. Mesmo com
              satélites no céu, monitorar em tempo real e avisar quem está no
              caminho do fogo ainda é lento — e cada minuto de atraso vira
              área queimada, ar poluído e vidas em risco.
            </p>
          </div>
          <ul className="flex flex-col justify-center gap-5">
            {[
              "Perda de biodiversidade em biomas inteiros",
              "Emissão de gases que aceleram o aquecimento global",
              "Saúde e bens da população atingidos",
              "Comunidades inteiras deslocadas pelo fogo",
            ].map((c) => (
              <li key={c} className="flex items-start gap-4">
                <span
                  className="mt-1.5 h-3.5 w-3.5 shrink-0 rotate-45 rounded-[2px] bg-[#ea580c]"
                  aria-hidden
                />
                <span className="text-base font-medium leading-snug">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- COMO FUNCIONA ---------- */}
      <SentinelaSteps />

      {/* ---------- ODS 13 ---------- */}
      <section id="ods13" className="scroll-mt-20 pb-20 sm:pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="hairline-t grid items-center gap-10 pt-14 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="font-display text-[7rem] leading-none text-[#ea580c] sm:text-[9rem]">
              13
            </div>
            <div>
              <p className="font-mono-lab mb-3 text-[11px] text-[#57534e]">
                ODS 13 · AÇÃO CONTRA A MUDANÇA GLOBAL DO CLIMA
              </p>
              <h2 className="font-display text-3xl sm:text-5xl">
                Cada foco detectado cedo é menos emissão, menos destruição
              </h2>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-[#57534e]">
                O EcoRadar nasce alinhado à ODS 13: antecipar a resposta ao
                fogo reduz a área queimada, corta gases de efeito estufa e
                protege quem mora perto — no Brasil inteiro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-28">
          <h2 className="font-display mx-auto max-w-3xl text-4xl sm:text-6xl">
            Sua sentinela começa agora.
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-[#57534e]">
            Entre com sua conta Google, cadastre sua localidade e comece a
            receber alertas de foco de incêndio na sua área.
          </p>
          <div className="mt-9 flex justify-center">
            <GoogleButton />
          </div>
          <p className="font-mono-lab mt-7 text-[11px] text-[#57534e]">
            GRÁTIS · DADOS DE SATÉLITE DA NASA (FIRMS) · PRIVACIDADE DA SUA LOCALIDADE
          </p>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="hairline-t bg-[#1c1917] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image
              src={EcoradarIcon}
              alt="EcoRadar"
              width={556}
              height={656}
              className="h-8 w-auto opacity-90"
            />
            <span className="font-display">EcoRadar</span>
          </div>
          <div className="font-mono-lab flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-white/60">
            <span>NASA FIRMS · VIIRS</span>
            <span>BRASIL · TEMPO REAL</span>
            <span>© 2026</span>
            <span className="text-white/40">feito no Brasil, de olho no céu</span>
          </div>
        </div>
      </footer>
    </main>
  );
}