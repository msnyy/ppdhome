export const dynamic = "force-dynamic";

import { supabase } from "@lib/supabase";

/* ================= GET ================= */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("bw_mode")
      .eq("id", 1)
      .single();

    if (error) throw error;

    return Response.json({
      bwMode: data.bw_mode
    });

  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ================= POST ================= */
export async function POST(req) {
  try {
    const { bwMode } = await req.json();

    const { error } = await supabase
      .from("site_settings")
      .update({
        bw_mode: bwMode
      })
      .eq("id", 1);

    if (error) throw error;

    return Response.json({ success: true });

  } catch (error) {
    console.error("POST SETTINGS ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}