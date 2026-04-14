"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    // ===== filter input =====
    const [inputCategory, setInputCategory] = useState("all");

    // ===== filter ที่ใช้ค้นจริง =====
    const [filterCategory, setFilterCategory] = useState("all");
    const [allCategories, setAllCategories] = useState([]);
    const [priceSort, setPriceSort] = useState("");

    const [openImage, setOpenImage] = useState(null)
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const [openCategory, setOpenCategory] = useState(false);
    const [openPrice, setOpenPrice] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const params = new URLSearchParams();
                if (filterCategory !== "all") params.append("category", filterCategory);

                const res = await fetch(`/ppdhome/api/product?${params.toString()}`);
                const data = await res.json();

                setProducts(data.products || []);
                setCategories(data.categories || []);
                setAllCategories(data.allCategories || []);

            } catch (error) {
                console.error("โหลดข้อมูลสินค้าไม่สำเร็จ", error);
            } finally {
                setLoading(false);
            }
        };


        fetchData();
    }, [filterCategory]);


    const closeModal = () => {
        setOpen(false);
        setSelected(null);
    };

    const handleDelete = async () => {
        if (!selected) return;

        const confirmDelete = confirm(`ต้องการลบสินค้า "${selected.name}" ใช่หรือไม่`);
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/ppdhome/api/product?id=${selected.id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("ลบสินค้าไม่สำเร็จ");

            // ลบออกจาก state ทันที (ไม่ต้องรีโหลดหน้า)
            setProducts((prev) => prev.filter((p) => p.id !== selected.id));
            setCategories((prev) =>
                prev.map((cat) => ({
                    ...cat,
                    items: cat.items.filter((i) => i.id !== selected.id),
                }))
            );

            closeModal();
            alert("ลบสินค้าเรียบร้อยแล้ว");
        } catch (err) {
            console.error(err);
            alert("เกิดข้อผิดพลาดในการลบสินค้า");
        }
    };


    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") closeModal();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">กำลังโหลดข้อมูลสินค้า...</p>
            </div>
        );
    }

    return (
        <div className="text-black mt-14">
            <section className="w-full pb-10 relative z-[10001] text-black">
                <div className="xl:mx-20 md:mx-9 mx-4">
                    <div>
                        <a href={`/ppdhome/admin/allCreate`}>
                            <button
                                type="button"
                                className="bg-pink-400 text-white hover:bg-pink-500 rounded-xl py-2 px-6 my-4"
                            >
                                Back
                            </button>
                        </a>
                    </div>

                    <div className="md:mb-8 mb-4 p-4 bg-white rounded-xl shadow-md flex flex-wrap gap-4 items-end">
                        <div className="relative">
                            <label className="block md:text-lg text-base mb-1">
                                ประเภทสินค้า
                            </label>

                            <select
                                value={inputCategory}
                                onChange={(e) => setInputCategory(e.target.value)}
                                className="border border-gray-400 rounded-lg md:px-3 md:py-2 px-2 py-2 md:text-lg text-base bg-white w-[140px]"
                            >
                                <option value="all">ทั้งหมด</option>
                                {allCategories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* เรียงราคา */}
                        <div className="relative">
                            <label className="block md:text-lg text-base mb-1">
                                เรียงราคา
                            </label>

                            <select
                                value={priceSort}
                                onChange={(e) => setPriceSort(e.target.value)}
                                className="border border-gray-400 rounded-lg md:px-3 md:py-2 px-2 py-2 md:text-lg text-base bg-white w-[160px]"
                            >
                                <option value="">ไม่เรียง</option>
                                <option value="asc">ราคาต่ำ → สูง</option>
                                <option value="desc">ราคาสูง → ต่ำ</option>
                            </select>
                        </div>



                        {/* ปุ่มค้นหา */}
                        <button
                            onClick={() => {
                                setFilterCategory(inputCategory);
                            }}
                            className="md:h-10 h-8 md:px-6 px-3 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition md:text-lg text-base"
                        >
                            ค้นหา
                        </button>

                        {/* ล้างค่า */}
                        <button
                            onClick={() => {
                                setInputCategory("all");
                                setFilterCategory("all");
                                setPriceSort("");
                            }}
                            className="md:h-10 h-8 md:px-6 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 md:text-lg text-base"
                        >
                            ล้าง
                        </button>
                    </div>
                </div>
            </section >

            <section className="relative z-[10001]">
                <div className="flex min-h-screen">
                    <main className="relative flex min-h-screen w-full flex-col bg-cover">
                        <section className="relative flex flex-col xl:mx-20 md:mx-9 mx-4 lg:mt-10 md:mt-6 mt-4 mb-16">
                            <h2 className="xl:text-5xl md:text-3xl text-xl text-shadow-lg text-center mb-6">
                                ผลิตภัณฑ์โดยคนพิการ
                            </h2>

                            <div className="flex flex-col lg:gap-12 flex-wrap">
                                {categories.map((cat) => (
                                    < div key={cat.title} className="mt-6" >
                                        <p className="xl:text-5xl md:text-3xl text-xl text-shadow-lg mb-4">
                                            {cat.title}
                                        </p>

                                        <div className="flex grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-6 gap-4 mt-2 flex-wrap">
                                            {cat.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => {
                                                        setSelected(item);
                                                        setOpen(true);
                                                    }}
                                                    className="relative bg-white shadow-xl rounded-xl overflow-hidden cursor-pointer"
                                                >
                                                    {item.is_featured && (
                                                        <div className="absolute top-2 right-2 z-10 text-yellow-400 text-xl">
                                                            ⭐
                                                        </div>
                                                    )}
                                                    <div className="px-6 lg:py-4 md:py-8 py-4">
                                                        <div className="flex items-center justify-center w-full h-[150px]">
                                                            <Image
                                                                src={item.image?.split(",")[0] || "/no-image.png"}
                                                                alt={item.name}
                                                                width={200}
                                                                height={200}
                                                                className="lg:mx-0 mx-auto lg:w-[200px] lg:h-[200px] md:w-[150px] w-[200px] md:h-full h-[100px] object-contain"
                                                            />
                                                        </div>


                                                        <div className="mt-4">
                                                            <p className="md:text-2xl text-xl text-center">
                                                                {item.name}
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-between mt-2 md:text-sm text-xs">
                                                            <p>ขนาด</p>
                                                            {item.size && (
                                                                <div className="text-right">
                                                                    ขนาด {item.size}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex justify-between mt-2 md:text-sm text-xs">
                                                            <p>ราคา</p>
                                                            <p className="text-pink-700 font-bold">
                                                                {item.price} บาท
                                                            </p>
                                                        </div>

                                                        <div className="md:mt-4 mt-2 flex justify-center">
                                                            <button className="md:text-sm text-xs px-4 py-1 rounded-full text-pink-700 border border-pink-700 hover:text-white shadow-sm shadow-pink-700/25 hover:bg-pink-700">
                                                                ดูสินค้า
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>
                </div>

                {
                    open && selected && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            {/* overlay */}
                            <div
                                className="absolute inset-0 bg-black/40"
                                onClick={closeModal}
                            />

                            {/* modal box */}
                            <div className="relative z-10 w-[92%] max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="flex justify-end mt-4 me-4">
                                    <button
                                        onClick={closeModal}
                                        className="text-3xl text-pink-700 py-2 px-4 hover:opacity-90 transition"
                                    >
                                        X
                                    </button>
                                </div>

                                {/* ===== รูปหลายรูป ===== */}
                                <div className="relative w-full h-64 bg-white">
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        navigation
                                        pagination={{ clickable: true }}
                                        className="h-full"
                                    >
                                        {selected.image
                                            ?.split(",")
                                            .map((img, index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="relative w-full h-64 flex items-center justify-center">
                                                        <div className="relative w-64 h-full">
                                                            <Image
                                                                src={img}
                                                                alt={`${selected.name}-${index}`}
                                                                fill
                                                                className="object-contain"
                                                                priority={index === 0}
                                                                onClick={() => setOpenImage(img)}
                                                            />
                                                        </div>
                                                    </div>
                                                </SwiperSlide>

                                            ))}
                                    </Swiper>
                                </div>

                                {/* ===== รายละเอียด ===== */}
                                <div className="p-6">
                                    <h2 className="text-xl text-center">
                                        {selected.name}
                                    </h2>

                                    {selected.description && (
                                        <p className="mt-3 text-sm text-gray-600 text-center">
                                            {selected.description}
                                        </p>
                                    )}

                                    <div className="mt-4 space-y-2 text-sm text-gray-700">
                                        {selected.size && (
                                            <div className="flex justify-between">
                                                <span>ขนาด</span>
                                                <span>{selected.size}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between">
                                            <span>ราคา</span>
                                            <span className="font-semibold text-pink-700">
                                                {selected.price} ฿
                                            </span>
                                        </div>


                                    </div>

                                    <div className="flex items-center justify-between mt-4 border-t pt-3">
    <span className="text-sm">สินค้าแนะนำ</span>

    <input
        type="checkbox"
        checked={selected.is_featured || false}
        onChange={async (e) => {
            const checked = e.target.checked;

            try {
                const res = await fetch(`/ppdhome/api/product`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: selected.id,
                        is_featured: checked,
                    }),
                });

                if (!res.ok) throw new Error("update failed");

                // ⭐ update selected ทันที
                setSelected((prev) => ({
                    ...prev,
                    is_featured: checked,
                }));

                // ⭐ update list (categories)
                setCategories((prev) =>
                    prev.map((cat) => ({
                        ...cat,
                        items: cat.items.map((item) =>
                            item.id === selected.id
                                ? { ...item, is_featured: checked }
                                : item
                        ),
                    }))
                );

                // ⭐ update products list
                setProducts((prev) =>
                    prev.map((p) =>
                        p.id === selected.id
                            ? { ...p, is_featured: checked }
                            : p
                    )
                );

            } catch (err) {
                alert("อัปเดตสินค้าแนะนำไม่สำเร็จ");
            }
        }}
    />
</div>

                                    <div className="mt-6 flex justify-between gap-8">

                                        <Link href={`/ppdhome/admin/product/${selected.id}/edit`}>
                                            <button className="bg-gray-400 hover:bg-gray-500 text-white hover:text-white px-6 py-2 rounded-xl w-full">Edit</button>
                                        </Link>

                                        <button
                                            onClick={handleDelete}
                                            className="rounded-xl bg-red-600 text-white w-1/2 px-6 py-2 hover:bg-red-700 hover:text-white transition"
                                        >
                                            Delete product
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                }
                <Link
                    href="/ppdhome/admin/product/productCreate"
                    title="เพิ่มสินค้า"
                    className="fixed bottom-10 right-10
                   w-14 h-14 rounded-full
                   bg-pink-600 text-white
                   text-3xl flex items-center justify-center
                   shadow-lg hover:bg-pink-700
                   transition"
                >
                    +
                </Link>
            </section >

            {
                openImage && (
                    <div className="fixed inset-0 z-[999]">
                        {/* พื้นหลัง (กดปิดได้) */}
                        <div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={() => setOpenImage(null)}
                        />

                        <div className="relative flex items-center justify-center h-full pointer-events-none">
                            <div className="relative w-[90vw] h-[90vh] pointer-events-auto">
                                <button
                                    onClick={() => setOpenImage(null)}
                                    className="absolute -top-12 right-0 text-white text-4xl z-10"
                                >
                                    ✕
                                </button>

                                <Image
                                    src={openImage}
                                    alt="ภาพขยาย"
                                    fill
                                    sizes="90vw"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}