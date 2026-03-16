export const dynamic = "force-dynamic";

import sql from "mssql";
import { supabase } from "@lib/supabase";
import { getPool } from "@lib/db";

export const runtime = "nodejs";


/* ===================== GET : POSTS ===================== */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const category = Number(searchParams.get("category") || 1);

    const offset = (page - 1) * pageSize;

    const pool = await getPool();

    const totalResult = await pool
      .request()
      .input("category", sql.Int, category)
      .query(`
        SELECT COUNT(*) AS total
        FROM posts
        WHERE category = @category
      `);

    const result = await pool
      .request()
      .input("category", sql.Int, category)
      .input("offset", sql.Int, offset)
      .input("pageSize", sql.Int, pageSize)
      .query(`
        SELECT
  id,
  title,
  subtitle,
  header_date,
  content_date,
  pdf_file,
  image
FROM posts
        WHERE category = @category
        ORDER BY content_date DESC, id DESC
        OFFSET @offset ROWS
        FETCH NEXT @pageSize ROWS ONLY
      `);

    return Response.json({
      items: result.recordset,
      total: totalResult.recordset[0].total,
    });
  } catch (error) {
    console.error("GET POSTS ERROR 👉", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/* ===================== POST : CREATE POST ===================== */
export async function POST(request) {
  try {

    const formData = await request.formData();

    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const header_date = formData.get("header_date");
    const content_date = formData.get("content_date");
    const detail = formData.get("detail");
    const category = Number(formData.get("category"));

    const sqlDate = content_date
      ? content_date.replace("T", " ")
      : null;

    /* ---------- upload pdf ---------- */

    const pdf = formData.get("pdf");
    let pdfPath = null;

    if (pdf && pdf.name) {

      const safeName = pdf.name
        .replace(/\s+/g, "-")
        .replace(/[^\w.-]/g, "");

      const fileName = `${Date.now()}-${safeName}`;
      const buffer = Buffer.from(await pdf.arrayBuffer());

      const { error } = await supabase.storage
        .from("ppdhome-pic")
        .upload(`posts/pdf/${fileName}`, buffer, {
          contentType: pdf.type
        });

      if (error) throw error;

      pdfPath =
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/posts/pdf/${fileName}`;
    }

    /* ---------- upload images ---------- */

    const images = formData.getAll("images");
    let imagePaths = [];

    for (const file of images) {

      if (!file.name) continue;

      const fileName = `${Date.now()}-${file.name}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error } = await supabase.storage
        .from("ppdhome-pic")
        .upload(`posts/images/${fileName}`, buffer, {
          contentType: file.type
        });

      if (error) throw error;

      const url =
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/posts/images/${fileName}`;

      imagePaths.push(url);
    }

    const pool = await getPool();

    await pool.request()
      .input("title", sql.NVarChar, title)
      .input("subtitle", sql.NVarChar, subtitle)
      .input("header_date", sql.NVarChar, header_date)
      .input("content_date", sql.DateTime, sqlDate)
      .input("detail", sql.NVarChar, detail)
      .input("image", sql.NVarChar, imagePaths.join(","))
      .input("pdf_file", sql.NVarChar, pdfPath)
      .input("category", sql.Int, category)
      .query(`
        INSERT INTO posts (
          title,
          subtitle,
          header_date,
          content_date,
          detail,
          image,
          pdf_file,
          category
        )
        VALUES (
          @title,
          @subtitle,
          @header_date,
          @content_date,
          @detail,
          @image,
          @pdf_file,
          @category
        )
      `);

    return Response.json(
      { message: "เพิ่มข้อมูลสำเร็จ" },
      { status: 201 }
    );

  } catch (error) {

    console.error("POST POSTS ERROR 👉", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}