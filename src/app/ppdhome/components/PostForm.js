"use client";

import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { useRouter } from "next/navigation";

export default function PostForm({ mode = "create", initialData = null, postId }) {
    const router = useRouter();

    const MAX_PDF_SIZE = 5 * 1024 * 1024;

    const getNowLocal = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        header_date: "",
        content_date: "",
        detail: "",
        category: 1,
    });

    const [maxDate, setMaxDate] = useState("");
    const [files, setFiles] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);

    const [oldImages, setOldImages] = useState([]);
    const [oldPdf, setOldPdf] = useState(null);

    const [deleteImages, setDeleteImages] = useState([]);
    const [deletePdf, setDeletePdf] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const isPdfMode = pdfFile || (oldPdf && !deletePdf);

    /* ===== init ===== */
    useEffect(() => {
        setMaxDate(getNowLocal());
    }, []);

    /* ===== load initialData ===== */
    useEffect(() => {
        if (!initialData) return;

        setForm({
            title: initialData.title || "",
            subtitle: initialData.subtitle || "",
            header_date: initialData.header_date || "",
            content_date: initialData.content_date?.slice(0, 16) || "",
            detail: initialData.detail || "",
            category: initialData.category || 1,
        });

        setOldImages(
            initialData.image
                ? initialData.image.split(",").map((url, i) => ({
                    id: i,
                    url,
                }))
                : []
        );

        setOldPdf(initialData.pdf_file || null);
    }, [initialData]);

    /* ===== handlers ===== */
    function handleChange(e) {
        const { name, value } = e.target;

        if (name === "content_date") {
            if (new Date(value) > new Date()) {
                setForm((prev) => ({
                    ...prev,
                    content_date: getNowLocal(),
                }));
                return;
            }
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleFileChange = async (e) => {
        const selected = Array.from(e.target.files);

        const compressed = await Promise.all(
            selected.map(async (file) => {
                if (file.size < 1 * 1024 * 1024) return file;

                return await imageCompression(file, {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                });
            })
        );

        setFiles((prev) => [...prev, ...compressed]);
    };

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("ต้องเป็นไฟล์ PDF เท่านั้น");
            return;
        }

        if (file.size > MAX_PDF_SIZE) {
            alert("ไฟล์ต้องมีขนาดไม่เกิน 5MB");
            return;
        }

        setPdfFile(file);
    };

    /* ===== submit ===== */
    async function handleSubmit(e) {
        e.preventDefault();

        // ✅ VALIDATION
        if (!form.title.trim()) {
            alert("กรุณากรอกชื่อหัวข้อ");
            return;
        }

        if (!form.content_date) {
            alert("กรุณาเลือกวันที่");
            return;
        }

        try {
            setLoading(true);
            setLoadingText("กำลังอัปโหลด...");

            const formData = new FormData();

            Object.entries(form).forEach(([k, v]) => {
                formData.append(k, v);
            });

            files.forEach((file) => formData.append("images", file));

            if (pdfFile) formData.append("pdf", pdfFile);

            if (mode === "edit") {
                formData.append("deleteImages", JSON.stringify(deleteImages));
                formData.append("deletePdf", deletePdf);
            }

            const url =
                mode === "create"
                    ? "/ppdhome/api/posts"
                    : `/ppdhome/api/posts/${postId}`;

            const method = mode === "create" ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                body: formData,
            });

            if (!res.ok) throw new Error();

            alert(mode === "create" ? "เพิ่มสำเร็จ" : "อัปเดตสำเร็จ");

            router.push(`/ppdhome/admin/posts/${postId}`);
        } catch (err) {
            alert("เกิดข้อผิดพลาด");
        } finally {
            setLoading(false);
        }
    }

    /* ===== UI (COPY จาก Create 100%) ===== */
    return (
        <div className="lg:mx-20 md:mx-10 mx-4 p-6 border lg:mt-14 md:mt-6 mt-4 lg:py-10 md:py-6 py-4 lg:px-15 md:px-10 px-4 text-black mb-8 bg-white">

            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl text-center">
                        <p>{loadingText}</p>
                    </div>
                </div>
            )}

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

                    <div>
                        <input
                        name="title"
                        value={form.title}
                        required
                        onChange={handleChange}
                        placeholder="ชื่อหัวข้อ*"
                        className="lg:w-120 w-70 border p-2 rounded"
                    />
                    {!form.title && (
                        <p className="text-red-500 text-sm mt-1">กรุณากรอกชื่อหัวข้อ*</p>
                    )}
                    </div>

                    

                    <input
                        name="subtitle"
                        value={form.subtitle}
                        onChange={handleChange}
                        placeholder="ชื่อหัวข้อ 2"
                        className="lg:w-120 w-70 border p-2 rounded"
                    />

                </div>

                {/* header + date */}
                <div className="flex lg:gap-40 md:gap-10 md:flex-row flex-col">

                    <input
                        name="header_date"
                        value={form.header_date}
                        onChange={handleChange}
                        placeholder="ครั้งที่"
                        disabled={isPdfMode}
                        className={`lg:w-120 w-70 border p-2 rounded ${isPdfMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                    />

                    <div>
                        <input
                        type="datetime-local"
                        name="content_date"
                        required
                        value={form.content_date}
                        max={maxDate}
                        onChange={handleChange}
                        className="lg:w-120 w-70 border p-2 rounded"
                    />
                    {!form.content_date && (
                        <p className="text-red-500 text-sm mt-1">กรุณาเลือกวันที่*</p>
                    )}
                    </div>
                    

                </div>

                {/* detail */}
                <textarea
                    name="detail"
                    value={form.detail}
                    onChange={handleChange}
                    placeholder="รายละเอียดข่าว"
                    rows={5}
                    disabled={isPdfMode}
                    className={`lg:w-120 w-70 border p-2 rounded ${isPdfMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                />

                {/* PDF */}
                <div className="block mt-6">

                    <span className="block mb-2 font-medium lg:text-2xl md:text-xl text-lg">
                        เพิ่มเอกสาร PDF (ถ้ามี)
                    </span>

                    <div className="flex gap-3 flex-wrap">

                        {/* ===== OLD PDF ===== */}
                        {oldPdf && !deletePdf && (
                            <div className="w-[220px] h-[140px] border rounded-md relative flex flex-col items-center justify-center bg-gray-50">
                                {/* name */}
                                <p className="text-xs mt-2 px-2 text-center break-all">
                                    {oldPdf}
                                </p>

                                {/* delete */}
                                <button
                                    type="button"
                                    onClick={() => setDeletePdf(true)}
                                    className="absolute top-1 right-1 bg-black/60 text-white text-sm px-2 rounded"
                                >
                                    ✕
                                </button>

                            </div>
                        )}

                        {/* ===== NEW PDF ===== */}
                        {pdfFile && (
                            <div className="w-[220px] h-[140px] border rounded-md relative flex flex-col items-center justify-center bg-white">

                                <p className="text-xs mt-2 px-2 text-center break-all">
                                    {pdfFile.name}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setPdfFile(null)}
                                    className="absolute top-1 right-1 bg-black/60 text-white text-sm px-2 rounded"
                                >
                                    ✕
                                </button>

                            </div>
                        )}

                        {/* ===== SELECT PDF ===== */}
                        {!pdfFile && (
                            <label className="w-[220px] h-[140px] border rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-pink-700 transition">

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={handlePdfChange}
                                />

                                <span className="text-4xl font-light">+</span>
                                <span className="text-sm mt-1">เพิ่ม PDF</span>

                            </label>
                        )}

                        {isPdfMode && (
                            <p className="text-red-500 text-sm mb-2">
                                เมื่อแนบ PDF จะไม่สามารถใส่รายละเอียด หรือครั้งที่ได้
                            </p>
                        )}

                    </div>
                </div>


                {/* images */}
                <div className="flex gap-3 flex-wrap">

                    {oldImages.map((img) => (
                        <div key={img.id} className="w-[220px] h-[140px] relative">
                            <img src={img.url} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => {
                                    setDeleteImages((prev) => [...prev, img.url]);
                                    setOldImages((prev) =>
                                        prev.filter((i) => i.id !== img.id)
                                    );
                                }}
                                className="absolute top-1 right-1 bg-black text-white px-2"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {files.map((file, i) => (
                        <div key={i} className="w-[220px] h-[140px] relative">
                            <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() =>
                                    setFiles((prev) => prev.filter((_, index) => index !== i))
                                }
                                className="absolute top-1 right-1 bg-black text-white px-2"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    <label className="w-[220px] h-[140px] border rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-pink-700 transition" >
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <span className="text-4xl font-light">+</span>
                    </label>

                </div>

                {/* buttons */}
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="bg-pink-400 text-white hover:bg-pink-500 rounded-xl py-2 px-6">
                        Back
                    </button>

                    <button
                        disabled={loading}
                        className="bg-green-600 text-white px-8 py-2 rounded-xl disabled:opacity-50"
                    >
                        Save
                    </button>
                </div>

            </form>
        </div>
    );
}