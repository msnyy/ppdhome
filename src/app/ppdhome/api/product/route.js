export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { supabase } from "@lib/supabase";

/* ===================== GET ===================== */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    let query = supabase.from("products").select("*");

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    if (minPrice) {
      query = query.gte("price", minPrice);
    }

    if (maxPrice) {
      query = query.lte("price", maxPrice);
    }

    const { data: allProducts, error } = await query.order("created_at", { ascending: false });

    if (error) throw error;

    // ⭐ featured
    const { data: featured } = await supabase
      .from("products")
      .select("*")
      .eq("is_featured", true)
      .order("updated_at", { ascending: false })
      .limit(6);

    // 📦 group by category
    const map = {};
    allProducts.forEach((item) => {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    });

    const categories = Object.keys(map).map((key) => ({
      title: key,
      items: map[key],
    }));

    // 🔹 category dropdown
    const { data: categoryData } = await supabase
      .from("products")
      .select("category");

    const allCategories = [...new Set(categoryData.map(c => c.category))];

    return Response.json({
      featured,
      categories,
      allCategories,
    });

  } catch (error) {
    console.error("GET PRODUCT ERROR 👉", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===================== POST ===================== */
export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const size = formData.get("size");
    const is_featured = formData.get("is_featured") === "1";

    const files = formData.getAll("images");
    let imagePaths = [];

    for (const file of files) {
      if (!file.name) continue;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const { error } = await supabase.storage
        .from("ppdhome-pic")
        .upload(`products/${fileName}`, buffer, {
          contentType: file.type,
        });

      if (error) throw error;

      const url =
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/products/${fileName}`;

      imagePaths.push(url);
    }

    const { error } = await supabase.from("products").insert([
      {
        name,
        category,
        description,
        price,
        size,
        image: imagePaths.join(","),
        is_featured,
      },
    ]);

    if (error) throw error;

    return Response.json({ message: "เพิ่มสินค้าสำเร็จ" }, { status: 201 });

  } catch (error) {
    console.error("POST PRODUCT ERROR 👉", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===================== PATCH (toggle featured) ===================== */
export async function PATCH(request) {
  try {
    const { id, is_featured } = await request.json();

    const { error } = await supabase
      .from("products")
      .update({
        is_featured,
        updated_at: new Date(),
      })
      .eq("id", id);

    if (error) throw error;

    return Response.json({ message: "อัปเดตสินค้าแนะนำแล้ว" });

  } catch (error) {
    console.error("PATCH PRODUCT ERROR 👉", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===================== PUT (edit product) ===================== */
export async function PUT(request) {
  try {
    const formData = await request.formData();

    const id = formData.get("id");
    const name = formData.get("name");
    const category = formData.get("category");
    const description = formData.get("description");
    const price = formData.get("price");
    const size = formData.get("size");

    const files = formData.getAll("images");

    // 👉 หา image เดิม
    const { data } = await supabase
      .from("products")
      .select("image")
      .eq("id", id)
      .single();

    let imagePaths = data?.image ? data.image.split(",") : [];

    // 👉 ถ้ามีรูปใหม่
    if (files.length > 0 && files[0].name) {

      // ลบของเก่า
      const oldPaths = imagePaths
        .map((url) =>
          url.split("/storage/v1/object/public/ppdhome-pic/")[1]
        )
        .filter(Boolean);

      if (oldPaths.length > 0) {
        await supabase.storage.from("ppdhome-pic").remove(oldPaths);
      }

      imagePaths = [];

      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        const { error } = await supabase.storage
          .from("ppdhome-pic")
          .upload(`products/${fileName}`, buffer, {
            contentType: file.type,
          });

        if (error) throw error;

        const url =
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/products/${fileName}`;

        imagePaths.push(url);
      }
    }

    const { error } = await supabase
      .from("products")
      .update({
        name,
        category,
        description,
        price,
        size,
        image: imagePaths.join(","),
        updated_at: new Date(),
      })
      .eq("id", id);

    if (error) throw error;

    return Response.json({ message: "แก้ไขสินค้าสำเร็จ" });

  } catch (error) {
    console.error("PUT PRODUCT ERROR 👉", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===================== DELETE ===================== */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "ไม่พบ id" }, { status: 400 });
    }

    // 👉 หา image
    const { data } = await supabase
      .from("products")
      .select("image")
      .eq("id", id)
      .single();

    if (data?.image) {
      const paths = data.image
        .split(",")
        .map((url) =>
          url.split("/storage/v1/object/public/ppdhome-pic/")[1]
        )
        .filter(Boolean);

      if (paths.length > 0) {
        await supabase.storage
          .from("ppdhome-pic")
          .remove(paths);
      }
    }

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return Response.json({ message: "ลบสินค้าสำเร็จ" });

  } catch (error) {
    console.error("DELETE PRODUCT ERROR 👉", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}