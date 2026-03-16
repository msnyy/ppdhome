import sql from "mssql";
import { getPool } from "@lib/db";
import { supabase } from "@lib/supabase";

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
    console.error("GET banner error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ================= POST ================= */

export async function POST(request) {
  try {

    const formData = await request.formData();
    const file = formData.get("image");
    const link = (formData.get("link") || "").trim();

    if (!file) {
      return Response.json({ error: "ไม่มีไฟล์รูป" }, { status: 400 });
    }

    const safeName = file.name.replace(/\s+/g, "-");
    const fileName = `${Date.now()}-${safeName}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage
      .from("ppdhome-pic")
      .upload(`banner/${fileName}`, buffer, {
        contentType: file.type,
      });

    if (error) throw error;

    const imagePath =
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/banner/${fileName}`;

    const pool = await getPool();

    await pool.request()
      .input("image_url", sql.NVarChar, imagePath)
      .input("link", sql.NVarChar(sql.MAX), link)
      .query(`
        INSERT INTO banners (image_url, link)
        VALUES (@image_url, @link)
      `);

    return Response.json({
      message: "เพิ่ม banner สำเร็จ"
    });

  } catch (error) {

    console.error("POST banner error:", error);

    console.log("link received:", link);

    return Response.json({
      error: error.message
    }, { status: 500 });

  }


}

/* ================= DELETE ================= */

export async function DELETE(req) {
  try {

    const { id } = await req.json();

    const pool = await getPool();

    /* หา image_url ก่อน */

    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT image_url
        FROM banners
        WHERE id = @id
      `);

    const imageUrl = result.recordset[0]?.image_url;

    /* ลบไฟล์ใน Supabase */

    if (imageUrl) {

      const filePath =
        imageUrl.split("/storage/v1/object/public/ppdhome-pic/")[1];

      if (filePath) {
        await supabase.storage
          .from("ppdhome-pic")
          .remove([filePath]);
      }

    }

    /* ลบ record */

    await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM banners
        WHERE id = @id
      `);

    return Response.json({ success: true });

  } catch (error) {

    console.error("DELETE banner error:", error);

    return Response.json({ error: error.message }, { status: 500 });

  }
}

/* ================= PUT ================= */

export async function PUT(request) {
  try {

    const formData = await request.formData();

    const id = formData.get("id");
    const link = formData.get("link") || "";
    const file = formData.get("image");

    const pool = await getPool();

    /* หา image เดิม */

    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        SELECT image_url
        FROM banners
        WHERE id = @id
      `);

    let imageUrl = result.recordset[0]?.image_url;

    /* ถ้ามีรูปใหม่ */

    if (file && file.size > 0) {

      /* ลบรูปเก่า */

      if (imageUrl) {

        const oldPath =
          imageUrl.split("/storage/v1/object/public/ppdhome-pic/")[1];

        if (oldPath) {
          await supabase.storage
            .from("ppdhome-pic")
            .remove([oldPath]);
        }
      }

      /* upload รูปใหม่ */

      const fileName = `${Date.now()}-${file.name}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error } = await supabase.storage
        .from("ppdhome-pic")
        .upload(`banner/${fileName}`, buffer, {
          contentType: file.type,
        });

      if (error) throw error;

      imageUrl =
        `${process.env.SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/banner/${fileName}`;
    }

    /* update database */

    await pool.request()
      .input("id", sql.Int, id)
      .input("image_url", sql.NVarChar, imageUrl)
      .input("link", sql.NVarChar, link)
      .query(`
        UPDATE banners
        SET image_url = @image_url,
            link = @link
        WHERE id = @id
      `);

    return Response.json({ success: true });

  } catch (error) {

    console.error("PUT banner error:", error);

    return Response.json({ error: error.message });

  }
}