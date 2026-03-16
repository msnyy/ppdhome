import sql from "mssql";
import { supabase } from "@lib/supabase";
import { getPool } from "@lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ===================== GET : ดึงสินค้า + กรอง ===================== */
export async function GET(request) {
    try {
        const pool = await getPool();
        const { searchParams } = new URL(request.url);

        const category = searchParams.get("category");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");

        let where = "WHERE 1=1";
        const reqSql = pool.request();

        // ===== filter =====
        if (category && category !== "all") {
            where += " AND category = @category";
            reqSql.input("category", sql.NVarChar, category);
        }

        if (minPrice) {
            where += " AND price >= @minPrice";
            reqSql.input("minPrice", sql.Decimal(10, 2), minPrice);
        }

        if (maxPrice) {
            where += " AND price <= @maxPrice";
            reqSql.input("maxPrice", sql.Decimal(10, 2), maxPrice);
        }

        // ⭐ สินค้าแนะนำ (ไม่กรอง)
        const featuredResult = await pool.request().query(`
      SELECT TOP 6
        id, name, description, size, price, image, category
      FROM dbo.products
      WHERE is_featured = 1
      ORDER BY updated_at DESC
    `);

        // 📦 สินค้าตามตัวกรอง
        const allResult = await reqSql.query(`
      SELECT
        id, name, description, size, price, image, category, is_featured
      FROM dbo.products
      ${where}
      ORDER BY category, id DESC
    `);

        // 🔹 แยกสินค้า (ไว้แสดงผล)
        const map = {};
        allResult.recordset.forEach((item) => {
            if (!map[item.category]) map[item.category] = [];
            map[item.category].push(item);
        });

        const categories = Object.keys(map).map((key) => ({
            title: key,
            items: map[key],
        }));

        // 🔥 ดึงประเภทสินค้าทั้งหมด (ไว้ทำ dropdown)
        const categoryResult = await pool.request().query(`
      SELECT DISTINCT category FROM dbo.products
      ORDER BY category
    `);

        const allCategories = categoryResult.recordset.map(
            (row) => row.category
        );

        return Response.json({
            featured: featuredResult.recordset,
            categories,      // ❗ ใช้แสดงสินค้า (ถูกกรอง)
            allCategories,   // ✅ ใช้ทำ dropdown (ไม่กรอง)
        });
    } catch (error) {
        console.error("GET PRODUCT ERROR 👉", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}



/* ===================== POST : เพิ่มสินค้า ===================== */
export async function POST(request) {
    try {
        const formData = await request.formData();

        const name = formData.get("name");
        const category = formData.get("category");
        const description = formData.get("description");
        const price = formData.get("price");
        const size = formData.get("size");
        const is_featured = formData.get("is_featured") === "1"; // ⭐ สำคัญ

        const files = formData.getAll("images");
        let imagePaths = [];

        // upload รูปไป Supabase
for (const file of files) {

    if (!file.name) continue;

    const fileName = `${Date.now()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage
        .from("ppdhome-pic")
        .upload(`products/${fileName}`, buffer, {
            contentType: file.type
        });

    if (error) throw error;

    const url =
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ppdhome-pic/products/${fileName}`;

    imagePaths.push(url);
}

        const pool = await getPool();
        const reqSql = pool.request();

        reqSql
            .input("name", sql.NVarChar, name)
            .input("category", sql.NVarChar, category)
            .input("description", sql.NVarChar, description)
            .input("price", sql.Decimal(10, 2), price)
            .input("size", sql.NVarChar, size)
            .input("image", sql.NVarChar, imagePaths.join(","))
            .input("is_featured", sql.Bit, is_featured); // ✅ bind ค่า

        await reqSql.query(`
      INSERT INTO dbo.products (
        name,
        category,
        description,
        price,
        size,
        image,
        is_featured,
        created_at,
        updated_at
      )
      VALUES (
        @name,
        @category,
        @description,
        @price,
        @size,
        @image,
        @is_featured,
        GETDATE(),
        GETDATE()
      )
    `);

        return Response.json({ message: "เพิ่มสินค้าสำเร็จ" }, { status: 201 });
    } catch (error) {
        console.error("POST PRODUCT ERROR 👉", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}

/* ===================== PATCH : ตั้ง / ยกเลิกสินค้าแนะนำ ===================== */
export async function PATCH(request) {
    try {
        const { id, is_featured } = await request.json();

        const pool = await getPool();
        await pool
            .request()
            .input("id", sql.Int, id)
            .input("is_featured", sql.Bit, is_featured)
            .query(`
        UPDATE dbo.products
        SET is_featured = @is_featured,
            updated_at = GETDATE()
        WHERE id = @id
      `);

        return Response.json({ message: "อัปเดตสินค้าแนะนำแล้ว" });
    } catch (error) {
        console.error("PATCH PRODUCT ERROR 👉", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}

/* ===================== DELETE : ลบสินค้า ===================== */
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return Response.json({ error: "ไม่พบ id" }, { status: 400 });
        }

        const pool = await getPool();

        /* 1️⃣ หา image ก่อน */

        const result = await pool
            .request()
            .input("id", sql.Int, id)
            .query(`
        SELECT image
        FROM dbo.products
        WHERE id = @id
      `);

        const imageStr = result.recordset[0]?.image;

        /* 2️⃣ ลบรูปใน Supabase */

        if (imageStr) {

            const images = imageStr.split(",");

            const paths = images.map((url) =>
                url.split("/storage/v1/object/public/ppdhome-pic/")[1]
            ).filter(Boolean);

            if (paths.length > 0) {

                await supabase.storage
                    .from("ppdhome-pic")
                    .remove(paths);

            }
        }

        /* 3️⃣ ลบสินค้า */

        await pool
            .request()
            .input("id", sql.Int, id)
            .query(`
        DELETE FROM dbo.products
        WHERE id = @id
      `);

        return Response.json({ message: "ลบสินค้าสำเร็จ" });

    } catch (error) {
        console.error("DELETE PRODUCT ERROR 👉", error);

        return Response.json({ error: error.message }, { status: 500 });
    }
}
