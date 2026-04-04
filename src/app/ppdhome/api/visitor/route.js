import { NextResponse } from "next/server";
import { supabase } from "@lib/supabase";

export const dynamic = "force-dynamic";

/* ================= GET ================= */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("total_views, today_views")
      .eq("id", 1)
      .single();

    if (error) throw error;

    return NextResponse.json({
      totalViews: data.total_views,
      todayViews: data.today_views,
    });

  } catch (error) {
    console.error("GET VIEW ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/* ================= POST ================= */
export async function POST() {
  try {
    // 👉 ดึงค่าปัจจุบันก่อน
    const { data, error } = await supabase
      .from("site_settings")
      .select("total_views, today_views, last_date")
      .eq("id", 1)
      .single();

    if (error) throw error;

    const today = new Date().toISOString().split("T")[0];

    let newTodayViews = 1;

    if (data.last_date === today) {
      newTodayViews = (data.today_views || 0) + 1;
    }

    const { error: updateError } = await supabase
      .from("site_settings")
      .update({
        total_views: (data.total_views || 0) + 1,
        today_views: newTodayViews,
        last_date: today,
      })
      .eq("id", 1);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("POST VIEW ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}