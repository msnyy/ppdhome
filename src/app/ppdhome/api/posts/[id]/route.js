export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { supabase } from "@lib/supabase";

/* ===================== helper ===================== */
const getPathFromUrl = (url) => {
  try {
    return url.split("/storage/v1/object/public/ppdhome-pic/")[1];
  } catch {
    return null;
  }
};

/* ===================== GET : POST BY ID ===================== */
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return Response.json({ error: "invalid id" }, { status: 400 });
    }

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
    console.error("GET POST DETAIL ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===================== DELETE ===================== */
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return Response.json({ error: "invalid id" }, { status: 400 });
    }

    /* 👉 หา post ก่อน */
    const { data, error } = await supabase
      .from("posts")
      .select("image, pdf_file")
      .eq("id", id)
      .single();

    if (error || !data) {
      return Response.json(
        { error: "ไม่พบข้อมูลที่จะลบ" },
        { status: 404 }
      );
    }

    /* ---------- ลบรูป ---------- */
    if (data.image) {
      const images = data.image.split(",");

      const paths = images
        .map((url) => getPathFromUrl(url))
        .filter(Boolean);

      if (paths.length > 0) {
        const { error: removeError } = await supabase.storage
          .from("ppdhome-pic")
          .remove(paths);

        if (removeError) {
          console.error("ลบรูป error:", removeError);
        }
      }
    }

    /* ---------- ลบ pdf ---------- */
    if (data.pdf_file) {
      const pdfPath = getPathFromUrl(data.pdf_file);

      if (pdfPath) {
        const { error: pdfError } = await supabase.storage
          .from("ppdhome-pic")
          .remove([pdfPath]);

        if (pdfError) {
          console.error("ลบ pdf error:", pdfError);
        }
      }
    }

    /* ---------- ลบ record ---------- */
    const { error: deleteError } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return Response.json(
      { message: "ลบข้อมูลสำเร็จ" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===================== PUT (UPDATE) ===================== */
export async function PUT(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return Response.json({ error: "invalid id" }, { status: 400 });
    }

    const formData = await request.formData();

    /* ===== helper กันค่าว่าง ===== */
    const clean = (val) => (val === "" ? null : val);

    const title = formData.get("title");
    const subtitle = clean(formData.get("subtitle"));
    const header_date = clean(formData.get("header_date"));
    const content_date = clean(formData.get("content_date"));
    const detail = clean(formData.get("detail"));
    const category = formData.get("category");

    /* ---------- ดึงข้อมูลเดิม ---------- */
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

    /* ---------- upload รูปใหม่ ---------- */
    const newImages = formData.getAll("images");

    for (const file of newImages) {
      if (file && file.size > 0) {
        const fileName = `${Date.now()}-${file.name}`;

        const { error } = await supabase.storage
          .from("ppdhome-pic")
          .upload(fileName, file);

        if (!error) {
          const { data } = supabase.storage
            .from("ppdhome-pic")
            .getPublicUrl(fileName);

          imageUrls.push(data.publicUrl);
        }
      }
    }

    /* ---------- upload pdf ---------- */
    const pdf = formData.get("pdf");

    if (pdf && pdf.size > 0) {
      const fileName = `${Date.now()}-${pdf.name}`;

      const { error } = await supabase.storage
        .from("ppdhome-pic")
        .upload(fileName, pdf);

      if (!error) {
        const { data } = supabase.storage
          .from("ppdhome-pic")
          .getPublicUrl(fileName);

        pdfUrl = data.publicUrl;
      }
    }

    /* ---------- update db ---------- */
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

    return Response.json(
      { message: "อัปเดตสำเร็จ" },
      { status: 200 }
    );

  } catch (error) {
    console.error("PUT ERROR:", error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}