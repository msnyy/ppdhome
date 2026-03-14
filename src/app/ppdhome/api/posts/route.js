import sql from "mssql";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import { getPool } from "@lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/posts"
    );

    await mkdir(uploadDir, { recursive: true });

    /* ---------- upload pdf ---------- */
    const pdf = formData.get("pdf");
    let pdfPath = null;

    if (pdf && pdf.name) {
      const buffer = Buffer.from(await pdf.arrayBuffer());
      const fileName = `${Date.now()}-${pdf.name}`;

      await writeFile(
        path.join(uploadDir, fileName),
        buffer
      );

      pdfPath = `/uploads/posts/${fileName}`;
    }

    /* ---------- upload images ---------- */
    const images = formData.getAll("images");
    let imagePaths = [];

    if (images.length > 0) {
      for (const file of images) {
        if (!file.name) continue;

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;

        await writeFile(
          path.join(uploadDir, fileName),
          buffer
        );

        imagePaths.push(`/uploads/posts/${fileName}`);
      }
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