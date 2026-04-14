"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();

  /* ===== state ===== */
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    size: "",
    is_featured: false,
  });

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ===== handlers ===== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("size", form.size);
    formData.append("is_featured", form.is_featured ? 1 : 0);


    files.forEach((file) => {
      formData.append("images", file);
    });

    const res = await fetch("/ppdhome/api/product", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("บันทึกสินค้าสำเร็จ");
      router.push("/ppdhome/admin/product");
      return;
    }

    alert("เกิดข้อผิดพลาด");
    setLoading(false);
  };

  /* ===== render ===== */
  return (
    <div className="lg:mx-20 md:mx-10 mx-4 p-6 border lg:mt-14 md:mt-6 mt-4 lg:py-10 md:py-6 py-4 lg:px-15 md:px-10 px-4 mb-8 bg-white text-black">

      <form onSubmit={handleSubmit}>
        {/* ===== แถวบน ===== */}
        <div className="flex grid md:grid-cols-2 grid-cols-1 lg:gap-20 md:gap-10">
          {/* ชื่อสินค้า */}
          <div>
            <h2 className="lg:text-2xl md:text-xl text-lg font-bold mb-3">ชื่อสินค้า</h2>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="ชื่อสินค้า*"
              className="w-full border rounded-lg px-4 py-2 md:text-lg text-sm"
              required
            />
            {!form.name && (
              <p className="text-red-500 text-sm mt-1">กรุณากรอกชื่อสินค้า*</p>
            )}
          </div>

          {/* ประเภทสินค้า */}
          <div>
            <h2 className="lg:text-2xl md:text-xl text-lg md:mt-0 mt-4 font-bold mb-3">ประเภทสินค้า</h2>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="เช่น กระเป๋า / ที่ใส่แก้วเยติ*"
              className="w-full border rounded-lg px-4 py-2 md:text-lg text-sm"
              required
            />
            {!form.category && (
              <p className="text-red-500 text-sm mt-1">กรุณากรอกประเภทสินค้า*</p>
            )}
          </div>
        </div>

        <div className="lg:mt-10 mt-4 flex grid md:grid-cols-2 grid-cols-1 lg:gap-20 md:gap-10">
          <div>
            <h2 className="lg:text-2xl md:text-xl text-lg font-bold mb-3">ราคา</h2>
            <input
              name="price"
              type="number"
              required
              placeholder="ราคา*"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 md:text-lg text-sm"
            />
            {!form.price && (
              <p className="text-red-500 text-sm mt-1">กรุณากรอกราคา*</p>
            )}
          </div>

          <div>
            <h2 className="lg:text-2xl md:text-xl text-lg md:mt-0 mt-4 font-bold mb-3">ขนาด</h2>
            <input
              name="size"
              value={form.size}
              onChange={handleChange}
              placeholder="เช่น 14 x 23 x 40 ซม."
              className="w-full border rounded-lg px-4 py-2 md:text-lg text-sm"
            />
          </div>
        </div>

        {/* รายละเอียด */}
        <div className="lg:mt-10 mt-4">
          <h2 className="lg:text-2xl md:text-xl text-lg font-bold mb-3">รายละเอียด</h2>
          <textarea
            name="description"
            placeholder="รายละเอียดสินค้า"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-lg px-4 py-2 text-lg"
          />
        </div>

        {/* เพิ่มรูป */}
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
            {files.length === 0 && (
              <p className="text-red-500 text-sm mt-1">กรุณาเพิ่มรูป*</p>
            )}
          </div>
        </div>

        <label className="flex items-center gap-2 mt-6 md:text-lg text-base">
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) =>
              setForm({ ...form, is_featured: e.target.checked })
            }
          />
          ตั้งเป็นสินค้าแนะนำ
        </label>


        {/* ปุ่มบันทึก */}
        <div className="flex justify-end md:mt-12 mt-4 gap-4">
          <div>
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-pink-400 text-white hover:bg-pink-500 rounded-xl py-2 px-6"
            >
              Back
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-pink-700 text-white px-8 py-2 rounded-xl hover:bg-pink-800 transition"
          >
            {loading ? "saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
