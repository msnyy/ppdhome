import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase();


  const result = products.filter((p) =>
    p.name.toLowerCase().includes(q)
  );

  return NextResponse.json(result);
}
