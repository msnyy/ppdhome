import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sql from "mssql";
import { getPool } from "@lib/db";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const pool = await getPool();

    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query(`
        SELECT id, username, password_hash
        FROM admin_users
        WHERE username = @username
      `);

    const admin = result.recordset[0];

    if (!admin) {
      return NextResponse.json(
        { message: "Username or password incorrect" },
        { status: 401 }
      );
    }

    console.log("HASH from DB:", admin.password_hash);

    const isValid = await bcrypt.compare(password, admin.password_hash);
    console.log("COMPARE RESULT:", isValid);

    if (!isValid) {
      return NextResponse.json(
        { message: "Username or password incorrect" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ success: true });

    res.cookies.set("admin_id", admin.id.toString(), {
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
