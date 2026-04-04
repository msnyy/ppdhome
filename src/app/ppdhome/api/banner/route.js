export const dynamic = "force-dynamic";

import { supabase } from "@lib/supabase";

/* ================= GET : ดึงทั้งหมด ================= */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return Response.json({ data });
  } catch (error) {
    console.error("GET banner error:", error);
    return Response.json(
      { error: error.message || "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}

/* ================= POST : เพิ่ม ================= */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");
    const link = (formData.get("link") || "").trim();

    if (!file || file.size === 0) {
      return Response.json({ error: "กรุณาใส่รูปภาพ" }, { status: 400 });
    }

   const fileExt = file.name.split(".").pop();
const fileName = `${Date.now()}.${fileExt}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    // 👉 upload
    const { error: uploadError } = await supabase.storage
      .from("ppdhome-pic")
      .upload(`banner/${fileName}`, buffer, {
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/banner/${fileName}`;

    // 👉 insert
    const { data, error: insertError } = await supabase
      .from("banners")
      .insert([{ image_url: imageUrl, link }])
      .select()
      .single();

    if (insertError) throw insertError;

    return Response.json({
      message: "เพิ่ม banner สำเร็จ",
      data,
    });
  } catch (error) {
    console.error("POST banner error:", error);
    return Response.json(
      { error: error.message || "เพิ่มไม่สำเร็จ" },
      { status: 500 }
    );
  }
}

/* ================= PUT : แก้ไข ================= */
export async function PUT(request) {
  try {
    const formData = await request.formData();

    const id = formData.get("id");
    const link = formData.get("link") || "";
    const file = formData.get("image");

    if (!id) {
      return Response.json({ error: "ไม่มี id" }, { status: 400 });
    }

    // 👉 ดึงข้อมูลเดิม
    const { data: oldData, error } = await supabase
      .from("banners")
      .select("image_url")
      .eq("id", id)
      .single();

    if (error) throw error;

    let imageUrl = oldData?.image_url;

    // 👉 ถ้ามีรูปใหม่
    if (file && file.size > 0) {
      // ลบรูปเก่า
      if (imageUrl) {
        const oldPath = imageUrl.split("/storage/v1/object/public/ppdhome-pic/")[1];

        if (oldPath) {
          await supabase.storage.from("ppdhome-pic").remove([oldPath]);
        }
      }

      // upload ใหม่
      const fileName = `${Date.now()}-${file.name}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("ppdhome-pic")
        .upload(`banner/${fileName}`, buffer, {
          contentType: file.type,
        });

      if (uploadError) throw uploadError;

      imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/banner/${fileName}`;
    }

    // 👉 update
    const { data, error: updateError } = await supabase
      .from("banners")
      .update({
        image_url: imageUrl,
        link,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) throw updateError;

    return Response.json({
      message: "อัปเดตสำเร็จ",
      data,
    });
  } catch (error) {
    console.error("PUT banner error:", error);
    return Response.json(
      { error: error.message || "อัปเดตไม่สำเร็จ" },
      { status: 500 }
    );
  }
}

/* ================= DELETE : ลบ ================= */
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json({ error: "ไม่มี id" }, { status: 400 });
    }

    // 👉 หา image
    const { data, error } = await supabase
      .from("banners")
      .select("image_url")
      .eq("id", id)
      .single();

    if (error) throw error;

    const imageUrl = data?.image_url;

    // 👉 ลบไฟล์
    if (imageUrl) {
      const filePath =
        imageUrl.split("/storage/v1/object/public/ppdhome-pic/")[1];

      if (filePath) {
        await supabase.storage.from("ppdhome-pic").remove([filePath]);
      }
    }

    // 👉 ลบ record
    const { error: deleteError } = await supabase
      .from("banners")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;

    return Response.json({ message: "ลบสำเร็จ" });
  } catch (error) {
    console.error("DELETE banner error:", error);
    return Response.json(
      { error: error.message || "ลบไม่สำเร็จ" },
      { status: 500 }
    );
  }
}