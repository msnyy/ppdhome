import sql from "mssql";
import { getPool } from "@lib/db";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

/* ================= GET ================= */

export async function GET() {
  try {

    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT * FROM banners
      ORDER BY id DESC
    `);

    return Response.json(result.recordset);

  } catch (error) {

    return Response.json({ error: error.message });

  }
}


/* ================= POST ================= */

export async function POST(request) {
  try {

    const formData = await request.formData();
    const file = formData.get("image");
    const link = formData.get("link"); // ⭐ เพิ่ม

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/banner"
    );

    await mkdir(uploadDir, { recursive: true });

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = `${Date.now()}-${file.name}`;

    await writeFile(
      path.join(uploadDir, fileName),
      buffer
    );

    const imagePath = `/uploads/banner/${fileName}`;

    const pool = await getPool();

    await pool.request()
      .input("image_url", sql.NVarChar, imagePath)
      .input("link", sql.NVarChar, link) // ⭐ เพิ่ม
      .query(`
        INSERT INTO banners (image_url, link)
        VALUES (@image_url, @link)
      `);

    return Response.json({
      message: "เพิ่ม banner สำเร็จ"
    });

  } catch (error) {

    return Response.json({
      error: error.message
    });

  }
}


/* ================= DELETE ================= */

export async function DELETE(req) {
  try {

    const { id } = await req.json();

    const pool = await getPool();

    await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM banners
        WHERE id = @id
      `);

    return Response.json({ success: true });

  } catch (error) {

    return Response.json({ error: error.message });

  }
}