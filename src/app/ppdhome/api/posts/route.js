export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { supabase } from "@lib/supabase";

/* ===================== GET : POSTS ===================== */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 10);
    const categoryParam = searchParams.get("category");
    const category = categoryParam ? Number(categoryParam) : null;

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("posts")
      .select("*", { count: "exact" })
      .order("content_date", { ascending: false })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (category !== null) {
      query = query.eq("category", category);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return Response.json({
      items: data,
      total: count,
    });
  } catch (error) {
    console.error("GET POSTS ERROR 👉", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===================== POST : CREATE ===================== */
export async function POST(request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const header_date = formData.get("header_date");
    const content_date = formData.get("content_date");
    const detail = formData.get("detail");
    const category = Number(formData.get("category"));

    /* ---------- upload pdf ---------- */
    const pdf = formData.get("pdf");
    let pdfPath = null;

    if (pdf && pdf.name) {
      const fileName = `${Date.now()}-${pdf.name}`;
      const buffer = Buffer.from(await pdf.arrayBuffer());

      const { error } = await supabase.storage
        .from("ppdhome-pic")
        .upload(`posts/pdf/${fileName}`, buffer, {
          contentType: pdf.type,
        });

      if (error) throw error;

      pdfPath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/posts/pdf/${fileName}`;
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
          contentType: file.type,
        });

      if (error) throw error;

      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/posts/images/${fileName}`;
      imagePaths.push(url);
    }

    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          subtitle,
          header_date,
          content_date: content_date || null,
          detail,
          image: imagePaths.join(","),
          pdf_file: pdfPath,
          category,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return Response.json({ message: "เพิ่มข้อมูลสำเร็จ", data });
  } catch (error) {
    console.error("POST POSTS ERROR 👉", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===================== PUT : UPDATE ===================== */
export async function PUT(request) {
  try {
    const formData = await request.formData();

    const id = formData.get("id");
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const header_date = formData.get("header_date");
    const content_date = formData.get("content_date");
    const detail = formData.get("detail");
    const category = Number(formData.get("category"));

    if (!id) {
      return Response.json({ error: "ไม่มี id" }, { status: 400 });
    }

    // 👉 ดึงข้อมูลเดิม
    const { data: oldData, error } = await supabase
      .from("posts")
      .select("image, pdf_file")
      .eq("id", id)
      .single();

    if (error) throw error;

    let imagePaths = oldData?.image ? oldData.image.split(",") : [];
    let pdfPath = oldData?.pdf_file;

    /* ---------- update pdf ---------- */
    const pdf = formData.get("pdf");

    if (pdf && pdf.name) {
      if (pdfPath) {
        const oldPath = pdfPath.split("/storage/v1/object/public/ppdhome-pic/")[1];
        if (oldPath) {
          await supabase.storage.from("ppdhome-pic").remove([oldPath]);
        }
      }

      const fileName = `${Date.now()}-${pdf.name}`;
      const buffer = Buffer.from(await pdf.arrayBuffer());

      const { error } = await supabase.storage
        .from("ppdhome-pic")
        .upload(`posts/pdf/${fileName}`, buffer, {
          contentType: pdf.type,
        });

      if (error) throw error;

      pdfPath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/posts/pdf/${fileName}`;
    }

    /* ---------- update images ---------- */
    const newImages = formData.getAll("images");

    if (newImages.length > 0 && newImages[0].name) {
      // ลบรูปเก่า
      for (const url of imagePaths) {
        const path = url.split("/storage/v1/object/public/ppdhome-pic/")[1];
        if (path) {
          await supabase.storage.from("ppdhome-pic").remove([path]);
        }
      }

      imagePaths = [];

      for (const file of newImages) {
        const fileName = `${Date.now()}-${file.name}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        const { error } = await supabase.storage
          .from("ppdhome-pic")
          .upload(`posts/images/${fileName}`, buffer, {
            contentType: file.type,
          });

        if (error) throw error;

        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/posts/images/${fileName}`;
        imagePaths.push(url);
      }
    }

    const { data, error: updateError } = await supabase
      .from("posts")
      .update({
        title,
        subtitle,
        header_date,
        content_date: content_date || null,
        detail,
        image: imagePaths.join(","),
        pdf_file: pdfPath,
        category,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;

    return Response.json({ message: "อัปเดตสำเร็จ", data });
  } catch (error) {
    console.error("PUT POSTS ERROR 👉", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}