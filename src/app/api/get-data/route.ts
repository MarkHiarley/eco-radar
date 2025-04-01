import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import dayjs from "dayjs";

export async function GET() {
  try {
    const dataAtual = dayjs().format("YYYY-MM-DD");

    const response = await fetch(
      `https://firms.modaps.eosdis.nasa.gov/api/country/csv/${process.env.NASA_API_KEY}/VIIRS_SNPP_NRT/BRA/1/${dataAtual}`
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 }
      );
    }
    const responseData = await response.text();
    const records = parse(responseData, {
      columns: true,
      skip_empty_lines: true,
    });

    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}