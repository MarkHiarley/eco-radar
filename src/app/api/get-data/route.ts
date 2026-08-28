import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";

export const revalidate = 900; // cacheia a saída da rota por 15min

const BRASIL_BBOX = "-74,-34,-34,6";
const NRT_MAX_DIAS = 5;
// O browser não precisa de 12k pontos: capa o payload no servidor (~60KB).
const MAX_PONTOS = 5000;

// A API NRT da FIRMS só guarda os últimos ~7 dias; `?dias=` controla 1..5.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dias = Math.min(
    Math.max(parseInt(searchParams.get("dias") || "1") || 1, 1),
    NRT_MAX_DIAS
  );

  if (!process.env.NASA_API_KEY) {
    return NextResponse.json({ error: "API key not found" }, { status: 401 });
  }

  // FIRMS v4: endpoint `country` foi descontinuado (usar `area` com bbox).
  // VIIRS_SNPP_NRT encerra em 01/11/2026 — usar VIIRS_NOAA20_NRT.
  const dataInicio = new Date();
  dataInicio.setUTCDate(dataInicio.getUTCDate() - (dias - 1));
  const hoje = dataInicio.toISOString().slice(0, 10);
  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${process.env.NASA_API_KEY}/VIIRS_NOAA20_NRT/${BRASIL_BBOX}/${dias}/${hoje}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 900 },
      headers: { "User-Agent": "EcoRadar/1.0" },
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data", status: response.status },
        { status: 500 }
      );
    }
    const csv = await response.text();
    const records = parse(csv, {
      columns: true,
      skip_empty_lines: true,
    }) as Record<string, string>[];

    // amostragem por stride no servidor: caber no limite do browser
    const passo = Math.max(1, Math.ceil(records.length / MAX_PONTOS));
    const mapped = records
      .filter((_, i) => i % passo === 0)
      .map((r) => ({
        latitude: parseFloat(r.latitude),
        longitude: parseFloat(r.longitude),
        frp: parseFloat(r.frp) || 0,
      }));

    return NextResponse.json(mapped, {
      status: 200,
      headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}