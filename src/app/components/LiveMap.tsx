"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Leaflet precisa de window → só no browser
const MapField = dynamic(() => import("./MapField"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <span className="font-mono-lab text-[11px] text-[#57534e]">
        CARREGANDO MAPA…
      </span>
    </div>
  ),
});

interface Foco {
  latitude: number;
  longitude: number;
  frp: number;
  acq_date?: string;
}

export default function LiveMap({
  dias = 3,
  maxSpots = 320,
}: {
  dias?: number;
  maxSpots?: number;
}) {
  const [spots, setSpots] = useState<Foco[] | null>(null);
  const [error, setError] = useState("");
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(`/api/get-data?dias=${dias}`, {
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error("satélite fora do ar");
        const data: Foco[] = await res.json();
        setSpots(data);
      } catch (e) {
        if ((e as Error).name !== "AbortError") setError(String((e as Error).message));
      }
    })();
    return () => ctrl.abort();
  }, [dias]);

  const sampled = spots
    ? spots.length > maxSpots
      ? spots.filter((_, i) => i % Math.ceil(spots.length / maxSpots) === 0)
      : spots
    : [];

  return (
    <div className="map-frame relative h-[420px] w-full overflow-hidden bg-white sm:h-[540px]">
      <MapField spots={sampled} />

      <div className="font-mono-lab pointer-events-none absolute left-3 top-3 z-[1001] flex items-center gap-2 bg-white/85 px-2 py-1 text-[10px] text-[#1c1917] sm:text-[11px]">
        <span
          className={`h-2 w-2 rounded-full ${spots ? "bg-[#ea580c] blink" : "bg-[#a8a29e]"}`}
        />
        {error
          ? "SINAL INSTÁVEL"
          : spots
            ? `AO VIVO · ${spots.length.toLocaleString("pt-BR")} FOCOS`
            : "RASTREANDO SATÉLITES…"}
      </div>

      <div className="font-mono-lab pointer-events-none absolute bottom-3 left-3 z-[1001] bg-white/85 px-2 py-1 text-[9px] text-[#57534e] sm:text-[10px]">
        focos NRT · VIIRS NOAA-20 · NASA FIRMS
      </div>

      <span className="sr-only">
        {spots
          ? `${sampled.length} focos de incêndio ativos detectados por satélite nas últimas ${dias} dia${dias > 1 ? "s" : ""} no Brasil (dados NASA FIRMS).`
          : "Mapa de focos de incêndio em tempo real."}
      </span>
    </div>
  );
}