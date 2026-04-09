"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPostPage() {

  const { id } = useParams();
  const router = useRouter();

  /* ===== utils ===== */

  const getNowLocal = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  /* ===== state ===== */

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    header_date: "",
    content_date: "",
    detail: "",
    category: 1
  });

  const [maxDate, setMaxDate] = useState("");
  const [files, setFiles] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ===== set datetime max ===== */

  useEffect(() => {
    setMaxDate(getNowLocal());
  }, []);

  /* ===== โหลดข้อมูลเดิม ===== */

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`/ppdhome/api/posts/${id}`);

        if (!res.ok) {
          alert("โหลดข้อมูลไม่สำเร็จ");
          return;
        }

        const data = await res.json();

        setForm({
          title: data.title || "",
          subtitle: data.subtitle || "",
          header_date: data.header_date || "",
          content_date: data.content_date?.slice(0, 16) || "",
          detail: data.detail || "",
          category: data.category || 1
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  /* ===== handlers ===== */

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "content_date") {
      const now = getNowLocal();
      if (value > now) {
        setForm((prev) => ({ ...prev, content_date: now }));
        return;
      }
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("กรุณาเลือกไฟล์ PDF เท่านั้น");
      return;
    }

    setPdfFile(file);
  };

  /* ===== submit ===== */

  async function handleSubmit(e) {

    e.preventDefault();
    setSaving(true);

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("header_date", form.header_date);
    formData.append("content_date", form.content_date);
    formData.append("detail", form.detail);
    formData.append("category", form.category);

    files.forEach((file) => {
      formData.append("images", file);
    });

    if (pdfFile) {
      formData.append("pdf", pdfFile);
    }

    const res = await fetch(`/ppdhome/api/posts/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      alert("แก้ไขสำเร็จ");
      router.push(`/ppdhome/admin/posts/${id}`);
      return;
    }

    const text = await res.text();
    console.error(text);
    alert("เกิดข้อผิดพลาด");

    setSaving(false);
  }

  /* ===== render ===== */

  if (loading) {
    return <p className="text-center mt-20">กำลังโหลด...</p>;
  }

  return (
    <div className="lg:mx-20 md:mx-10 mx-4 p-6 border lg:mt-14 md:mt-6 mt-4 lg:py-10 md:py-6 py-4 lg:px-15 md:px-10 px-4 text-black mb-8">

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* category */}
        <label className="block">
          <span className="block mb-1 font-medium lg:text-2xl md:text-xl text-lg">
            หมวดข่าว
          </span>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="lg:w-120 w-70 border p-2 rounded"
          >
            <option value={1}>ทั่วไป</option>
            <option value={2}>ประกาศจัดซื้อจัดจ้าง</option>
            <option value={3}>ประกาศราคากลาง</option>
            <option value={4}>สรุปผลการจัดซื้อจัดจ้าง</option>
            <option value={5}>สมัครงาน</option>
            <option value={6}>ข่าวบุคลากร</option>
          </select>
        </label>

        {/* title + subtitle */}
        <div className="flex lg:gap-40 md:gap-10 md:flex-row flex-col">

          <label className="block">
            <span className="block mb-1 font-medium lg:text-2xl md:text-xl text-lg">
              ชื่อหัวข้อ
            </span>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="lg:w-120 w-70 border p-2 rounded"
            />
          </label>

          <label className="block">
            <span className="block mb-1 font-medium lg:text-2xl md:text-xl text-lg md:mt-0 mt-4">
              ชื่อหัวข้อ 2 (ถ้ามี)
            </span>

            <input
              name="subtitle"
              value={form.subtitle}
              onChange={handleChange}
              className="lg:w-120 w-70 border p-2 rounded"
            />
          </label>

        </div>

        {/* header + date */}
        <div className="flex lg:gap-40 md:gap-10 md:flex-row flex-col">

          <label className="block">
            <span className="block mb-1 font-medium lg:text-2xl md:text-xl text-lg">
              ครั้งที่ (ถ้ามี)
            </span>

            <input
              name="header_date"
              value={form.header_date}
              onChange={handleChange}
              className="lg:w-120 w-70 border p-2 rounded"
            />
          </label>

          <label className="block">
            <span className="block mb-1 font-medium lg:text-2xl md:text-xl text-lg md:mt-0 mt-4">
              วันที่และเวลา
            </span>

            <input
              type="datetime-local"
              name="content_date"
              value={form.content_date}
              max={maxDate}
              onChange={handleChange}
              className="lg:w-120 w-70 border p-2 rounded"
            />
          </label>

        </div>

        {/* detail */}
        <label className="block">
          <span className="block mb-1 font-medium lg:text-2xl md:text-xl text-lg">
            เพิ่มรายละเอียด
          </span>

          <textarea
            name="detail"
            value={form.detail}
            onChange={handleChange}
            rows={5}
            className="lg:w-120 w-70 border p-2 rounded"
          />
        </label>

        {/* PDF */}
        <div className="block mt-6">
          <span className="block mb-2 font-medium lg:text-2xl md:text-xl text-lg">
            เพิ่มเอกสาร PDF (ถ้ามี)
          </span>

          {pdfFile ? (
            <div className="flex items-center gap-4 border p-3 rounded-md w-fit">
              <span className="text-sm">{pdfFile.name}</span>
              <button
                type="button"
                onClick={() => setPdfFile(null)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                ลบ
              </button>
            </div>
          ) : (
            <label className="w-[220px] h-[60px] border rounded-md flex items-center justify-center cursor-pointer hover:border-pink-700 transition">
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handlePdfChange}
              />
              <span className="text-sm">เลือกไฟล์ PDF</span>
            </label>
          )}
        </div>

        {/* images */}
        <div className="block">
          <span className="block mb-2 font-medium lg:text-2xl md:text-xl text-lg">
            เพิ่มรูป
          </span>

          <div className="flex gap-3 flex-wrap">

            {files.map((file, index) => (
              <div key={index} className="w-[100px] h-[100px] rounded-md overflow-hidden relative">
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}
                  className="absolute top-1 right-1 bg-black/60 text-white px-2 rounded"
                >
                  ✕
                </button>
              </div>
            ))}

            <label className="w-[100px] h-[100px] border rounded-md flex items-center justify-center cursor-pointer hover:border-pink-700">
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleFileChange}
              />
              +
            </label>

          </div>
        </div>

        {/* submit */}
        <div className="flex justify-end gap-4">

          <button
            type="button"
            onClick={() => router.back()}
            className="bg-pink-400 text-white hover:bg-pink-500 rounded-xl py-2 px-6"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-xl"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

      </form>
    </div>
  );
}