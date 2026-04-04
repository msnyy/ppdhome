export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@lib/supabase";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const { data: admin, error } = await supabase
      .from("admin_users")
      .select("id, username, password_hash")
      .eq("username", username)
      .maybeSingle();

    if (error || !admin) {
      return NextResponse.json(
        { message: "Username or password incorrect" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, admin.password_hash);

    if (!isValid) {
      return NextResponse.json(
        { message: "Username or password incorrect" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_id", admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}