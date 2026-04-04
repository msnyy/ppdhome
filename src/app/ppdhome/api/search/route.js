import { NextResponse } from "next/server";
import { supabase } from "@lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json([]);
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike("name", `%${q}%`);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("SEARCH ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}