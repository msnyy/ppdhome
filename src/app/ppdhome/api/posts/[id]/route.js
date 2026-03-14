import sql from "mssql";
import { getPool } from "@lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ===================== GET : POST BY ID ===================== */
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const idStr = url.pathname.split("/").pop();
    const id = Number(idStr);

    if (Number.isNaN(id)) {
      return Response.json(
        { error: "invalid id" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT *
        FROM posts
        WHERE id = @id
      `);

    if (result.recordset.length === 0) {
      return Response.json(
        { error: "ไม่พบข้อมูล" },
        { status: 404 }
      );
    }

    return Response.json(result.recordset[0]);

  } catch (error) {
    console.error("GET POST DETAIL ERROR:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/* ===================== DELETE ===================== */
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const idStr = url.pathname.split("/").pop();
    const id = Number(idStr);

    if (Number.isNaN(id)) {
      return Response.json(
        { error: "invalid id" },
        { status: 400 }
      );
    }

    const pool = await getPool();

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM posts
        WHERE id = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return Response.json(
        { error: "ไม่พบข้อมูลที่จะลบ" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "ลบข้อมูลสำเร็จ" },
      { status: 200 }
    );

  } catch (error) {
    console.error("DELETE POST ERROR:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}