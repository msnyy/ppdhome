export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { supabase } from "@lib/supabase";

/* ===================== helper ===================== */
const BUCKET = "ppdhome-pic";

const getPathFromUrl = (url) => {
  try {
    return url.split(`/storage/v1/object/public/${BUCKET}/`)[1];
  } catch {
    return null;
  }
};

/* ===================== GET : DETAIL ===================== */
export async function GET(request) {
  try {
    const id = request.url.split("/").pop();

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return Response.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
    }

    return Response.json(data);

  } catch (error) {
    console.error("GET ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===================== PUT : UPDATE ===================== */
export async function PUT(request) {
  try {
    const id = request.url.split("/").pop();
    if (!id) {
      return Response.json({ error: "invalid id" }, { status: 400 });
    }

    const formData = await request.formData();

    const clean = (val) => (val === "" ? null : val);

    const title = formData.get("title");
    const subtitle = clean(formData.get("subtitle"));
    const header_date = clean(formData.get("header_date"));
    const content_date = clean(formData.get("content_date"));
    const detail = clean(formData.get("detail"));
    const category = formData.get("category");

    const deleteImages = JSON.parse(formData.get("deleteImages") || "[]");
    const deletePdf = formData.get("deletePdf") === "true";

    /* ===== fetch old data ===== */
    const { data: oldData, error: fetchError } = await supabase
      .from("posts")
      .select("image, pdf_file")
      .eq("id", id)
      .single();

    if (fetchError || !oldData) {
      return Response.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
    }

    let imageUrls = oldData.image ? oldData.image.split(",") : [];
    let pdfUrl = oldData.pdf_file || null;

    /* ================= DELETE IMAGES ================= */
    if (deleteImages.length > 0) {
      const toDelete = imageUrls.filter((url) =>
        deleteImages.includes(url) || deleteImages.includes(getPathFromUrl(url))
      );

      const paths = toDelete.map(getPathFromUrl).filter(Boolean);

      if (paths.length > 0) {
        await supabase.storage.from(BUCKET).remove(paths);
      }

      imageUrls = imageUrls.filter((url) => !toDelete.includes(url));
    }

    /* ================= DELETE PDF ================= */
    if (deletePdf && pdfUrl) {
      const path = getPathFromUrl(pdfUrl);
      if (path) {
        await supabase.storage.from(BUCKET).remove([path]);
      }
      pdfUrl = null;
    }

    /* ================= UPLOAD IMAGES (parallel) ================= */
    const newImages = formData.getAll("images");

    const uploadPromises = newImages.map(async (file) => {
      if (!file || file.size === 0) return null;

      const fileName = `posts/images/${Date.now()}-${crypto.randomUUID()}`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, file);

      if (error) {
        console.error("upload image error:", error);
        return null;
      }

      const { data } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(fileName);

      return data.publicUrl;
    });

    const uploadedImages = (await Promise.all(uploadPromises)).filter(Boolean);
    imageUrls = [...imageUrls, ...uploadedImages];

    /* ================= UPLOAD PDF ================= */
    const pdf = formData.get("pdf");

    if (pdf && pdf.size > 0) {
      if (pdfUrl) {
        const oldPath = getPathFromUrl(pdfUrl);
        if (oldPath) {
          await supabase.storage.from(BUCKET).remove([oldPath]);
        }
      }

      const fileName = `posts/pdf/${Date.now()}-${crypto.randomUUID()}`;

      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(fileName, pdf);

      if (!error) {
        const { data } = supabase.storage
          .from(BUCKET)
          .getPublicUrl(fileName);

        pdfUrl = data.publicUrl;
      }
    }

    /* ================= UPDATE DB ================= */
    const { error: updateError } = await supabase
      .from("posts")
      .update({
        title,
        subtitle,
        header_date,
        content_date,
        detail,
        category,
        image: imageUrls.join(","),
        pdf_file: pdfUrl,
      })
      .eq("id", id);

    if (updateError) throw updateError;

    return Response.json({ message: "อัปเดตสำเร็จ" });

  } catch (error) {
    console.error("PUT ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===================== DELETE ===================== */
export async function DELETE(request) {
  try {
    const id = request.url.split("/").pop();

    const { data: oldData, error } = await supabase
      .from("posts")
      .select("image, pdf_file")
      .eq("id", id)
      .single();

    if (error || !oldData) {
      return Response.json({ error: "ไม่พบข้อมูล" }, { status: 404 });
    }

    const imagePaths = oldData.image
      ? oldData.image
          .split(",")
          .map(getPathFromUrl)
          .filter(Boolean)
      : [];

    const pdfPath = getPathFromUrl(oldData.pdf_file);

    if (imagePaths.length > 0) {
      await supabase.storage.from(BUCKET).remove(imagePaths);
    }

    if (pdfPath) {
      await supabase.storage.from(BUCKET).remove([pdfPath]);
    }

    const { error: deleteError } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return Response.json({ message: "ลบสำเร็จ" });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}