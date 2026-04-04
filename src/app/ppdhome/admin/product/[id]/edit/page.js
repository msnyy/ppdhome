"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    size: "",
    is_featured: false,
  });

  const [files, setFiles] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  /* ================= โหลดข้อมูล ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("/ppdhome/api/product");
      const json = await res.json();

      const all = json.categories.flatMap((c) => c.items);
      const found = all.find((p) => String(p.id) === id);

      if (found) {
        setForm({
          name: found.name || "",
          category: found.category || "",
          description: found.description || "",
          price: found.price || "",
          size: found.size || "",
          is_featured: found.is_featured || false,
        });

        setOldImages(found.image ? found.image.split(",") : []);
      }
    };

    fetchProduct();
  }, [id]);

  /* ================= handlers ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    setFiles(selectedFiles);
    setIsDirty(true);
  };

  /* ================= submit ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", id);
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("size", form.size);

    files.forEach((file) => {
      formData.append("images", file);
    });

    const res = await fetch("/ppdhome/api/product", {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      // 🔥 toggle featured แยก
      await fetch("/ppdhome/api/product", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          is_featured: form.is_featured,
        }),
      });

      alert("แก้ไขสำเร็จ");
      router.push("/ppdhome/admin/product");
      return;
    }

    alert("เกิดข้อผิดพลาด");
  };

  return (
    <div className="lg:mx-20 md:mx-10 mx-4 p-6 border lg:mt-14 md:mt-6 mt-4 text-black">

      {/* 🔥 แจ้งเตือน */}
      {isDirty && (
        <div className="mb-4 bg-yellow-100 text-yellow-700 px-4 py-2 rounded">
          ⚠️ ยังไม่ได้บันทึก
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* ===== ชื่อ + category ===== */}
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold mb-2">ชื่อสินค้า</h2>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">ประเภทสินค้า</h2>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        </div>

        {/* ===== ราคา + size ===== */}
        <div className="grid md:grid-cols-2 gap-10 mt-6">
          <div>
            <h2 className="text-xl font-bold mb-2">ราคา</h2>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">ขนาด</h2>
            <input
              name="size"
              value={form.size}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        </div>

        {/* ===== description ===== */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">รายละเอียด</h2>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* ===== รูปเก่า ===== */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">รูปปัจจุบัน</h2>

          <div className="flex gap-3 flex-wrap">
            {oldImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-[150px] h-[120px] object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* ===== รูปใหม่ ===== */}
        <div className="lg:mt-10 mt-4">
          <h2 className="lg:text-2xl md:text-xl text-lg font-bold mb-4">เพิ่มรูป</h2>

          <div className="flex gap-4 flex-wrap">
            {files.map((file, index) => (
              <div
                key={index}
                className="w-[200px] h-[150px] relative border rounded-lg overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="absolute top-2 right-2 bg-black/60 text-white px-2 rounded"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* ปุ่ม + */}
            <label className="lg:w-[200px] lg:h-[150px] md:w-[220px] md:h-[140px] w-[100px] h-[100px] border rounded-lg flex items-center justify-center cursor-pointer hover:border-pink-600">
              <input
                type="file"
                accept="image/png, image/jpeg"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="text-5xl font-light">+</span>
            </label>
            {errors.images && (
              <p className="text-red-500 text-sm mb-2">{errors.images}</p>
            )}
          </div>
        </div>

        {/* ===== checkbox ===== */}
        <label className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) => {
              setForm({ ...form, is_featured: e.target.checked });
              setIsDirty(true);
            }}
          />
          ตั้งเป็นสินค้าแนะนำ
        </label>

        {/* ===== save ===== */}
        <div className="flex justify-end mt-8 gap-4">
            <Link
              href="/ppdhome/admin/product"
            >
              <button className="bg-pink-400 text-white text-xl hover:bg-pink-500 rounded-xl py-2 px-6">
                back
              </button>
            </Link>

          <button
            type="submit"
            disabled={!isDirty}
            className={`px-6 py-2 rounded ${
              isDirty ? "bg-green-600 text-white" : "bg-gray-300"
            }`}
          >
            บันทึกการแก้ไข
          </button>
        </div>

      </form>
    </div>
  );
}