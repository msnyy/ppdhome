"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // ===== filter input =====
    const [inputCategory, setInputCategory] = useState("all");

    // ===== filter ที่ใช้ค้นจริง =====
    const [filterCategory, setFilterCategory] = useState("all");
    const [allCategories, setAllCategories] = useState([]);
    const [priceSort, setPriceSort] = useState("");

    const [openImage, setOpenImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const [openCategory, setOpenCategory] = useState(false);
    const [openPrice, setOpenPrice] = useState(false);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const params = new URLSearchParams();
                if (filterCategory !== "all") params.append("category", filterCategory);

                const res = await fetch(`/ppdhome/api/product?${params.toString()}`);
                const data = await res.json();

                setProducts(data.featured || []);
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

    useEffect(() => {
        if (!priceSort) return;

        const sorted = categories.map((cat) => ({
            ...cat,
            items: [...cat.items].sort((a, b) => {
                if (priceSort === "asc") {
                    return Number(a.price) - Number(b.price);
                }
                if (priceSort === "desc") {
                    return Number(b.price) - Number(a.price);
                }
                return 0;
            }),
        }));

        setCategories(sorted);
    }, [priceSort]);


    const closeModal = () => {
        setOpen(false);
        setSelected(null);
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
        <div className="text-black">
            <section className="relative w-full h-[800px] overflow-hidden">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={getSupabaseImage("pic/product.mov")} type="video/mp4" />
                </video>

                {/* 🖤 overlay มืด (ช่วยให้อ่านตัวหนังสือชัด) */}
                <div className="absolute inset-0 bg-black/40"></div>

                {/* 🌑 เงาดำไล่จากล่างขึ้นบน */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                {/* 📝 เนื้อหา */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <p className="text-2xl md:text-4xl font-bold">
                        ส่งเสริมศักยภาพ สร้างโอกาสอย่างยั่งยืน
                    </p>
                    <p className="mt-4 text-lg md:text-xl">
                        “ผลิตภัณฑ์จากคนพิการ ที่สะท้อนถึงทักษะและความมุ่งมั่นในการพัฒนาตนเอง”
                    </p>
                </div>

            </section>
            <section className="w-full py-10 relative z-[10000] text-black">
                <div className="relative xl:mx-20 md:mx-9 mx-4">
                    <h2 className="xl:text-4xl md:text-3xl text-xl mb-6 text-shadow-lg">สินค้าแนะนำ</h2>
                    <button
                        ref={prevRef}
                        className="absolute left-0 top-1/2 xl:-left-16 xl:top-46 xl:-translate-y-1/2 z-10 
                        w-12 h-12 rounded-full bg-pink-100
                        flex items-center justify-center 
                        shadow-md hover:bg-pink-200 transition"
                    >
                        <svg
                            className="w-6 h-6 text-pink-600 rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9 5 7 7-7 7"
                            />
                        </svg>
                    </button>

                    {/* ปุ่มขวา */}
                    <button
                        ref={nextRef}
                        className="absolute right-0 top-1/2 xl:-right-16 xl:top-46 xl:-translate-y-1/2 z-10 
                        w-12 h-12 rounded-full bg-pink-100 
                        flex items-center justify-center 
                        shadow-md hover:bg-pink-200 transition"
                    >
                        <svg
                            className="w-6 h-6 text-pink-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m9 5 7 7-7 7"
                            />
                        </svg>
                    </button>

                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        breakpoints={{
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {products.map((p) => (
                            <SwiperSlide key={p.id}>
                                <div
                                    onClick={() => {
                                        setSelected(p);
                                        setOpen(true);
                                    }}
                                    className="flex md:flex-row flex-col bg-white rounded-2xl shadow-md overflow-hidden py-4 lg:w-full lg:h-[210px] md:w-full md:h-[150px] md:my-5 md:mb-0 mb-4 cursor-pointer"
                                >
                                    <div className="relative md:mx-0 my-auto mx-auto lg:w-[210px] md:w-[150px] w-[200px] md:h-full h-[200px]">
                                        <Image
                                            src={p.image?.split(",")[0]}
                                            alt={p.name}
                                            fill
                                            sizes="(max-width: 768px) 200px,
                                            (max-width: 1024px) 150px,
                                            210px"
                                            className="object-cover"
                                            quality={75}
                                        />
                                    </div>


                                    <div className="flex-1 px-4 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {p.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {p.description}
                                            </p>
                                        </div>

                                        {p.size && (
                                            <div className="text-sm">
                                                ขนาด {p.size}
                                            </div>
                                        )}


                                        <div className="flex justify-between items-center">
                                            <span className="text-pink-700 font-bold">
                                                {Number(p.price).toLocaleString()} บาท
                                            </span>

                                            <button className="text-sm px-3 py-1 rounded-full text-pink-700 border border-pink-700 hover:text-white shadow-sm shadow-pink-700/25 hover:bg-pink-700">
                                                ดูสินค้า
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className="relative z-[10001]">
                <div className="flex min-h-screen">
                    <main className="relative flex min-h-screen w-full flex-col bg-cover">
                        <section className="relative flex flex-col z-10 xl:mx-20 md:mx-9 mx-4 lg:mt-10 md:mt-6 mt-4 mb-16">
                            <h2 className="xl:text-4xl md:text-3xl text-xl text-shadow-lg text-center mb-6">
                                ผลิตภัณฑ์โดยคนพิการ
                            </h2>
                            {/*  FILTER BAR  */}
                            <div className="md:mb-8 mb-4 p-4 bg-white rounded-xl shadow-md flex flex-wrap gap-4 items-end">
                                <div className="relative">
                                    <label className="block md:text-sm text-xs mb-1">
                                        ประเภทสินค้า
                                    </label>

                                    <button
                                        onClick={() => setOpenCategory(!openCategory)}
                                        className="flex justify-between border border-gray-400 rounded-lg md:px-3 md:py-2 ps-3 py-2 px-2 md:text-sm text-xs bg-white w-[100px] text-left"
                                    >
                                        {inputCategory === "all" ? "ทั้งหมด" : inputCategory}
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {openCategory && (
                                        <div className="absolute mt-1 w-[100px] bg-white border border-gray-100 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
                                            <div
                                                onClick={() => {
                                                    setInputCategory("all");
                                                    setOpenCategory(false);
                                                }}
                                                className="px-3 py-2 md:text-sm text-xs hover:bg-pink-700 cursor-pointer"
                                            >
                                                ทั้งหมด
                                            </div>

                                            {allCategories.map((c) => (
                                                <div
                                                    key={c}
                                                    onClick={() => {
                                                        setInputCategory(c);
                                                        setOpenCategory(false);
                                                    }}
                                                    className="px-3 py-2 md:text-sm text-xs hover:bg-pink-700 cursor-pointer"
                                                >
                                                    {c}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* เรียงราคา */}
                                <div className="relative">
                                    <label className="block md:text-sm text-xs mb-1">
                                        เรียงราคา
                                    </label>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenPrice(!openPrice);
                                        }}
                                        className="flex justify-between border border-gray-400 rounded-lg md:px-3 md:py-2 ps-3 py-2 px-2 md:text-sm text-xs bg-white w-[120px] text-left"
                                    >
                                        {priceSort === ""
                                            ? "ไม่เรียง"
                                            : priceSort === "asc"
                                                ? "ราคาต่ำ → สูง"
                                                : "ราคาสูง → ต่ำ"}
                                        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                                        </svg>

                                    </button>

                                    {openPrice && (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            className="absolute mt-1 w-[100px] bg-white border border-gray-100 rounded-lg shadow-lg z-50 md:text-sm text-xs"
                                        >
                                            <div
                                                onClick={() => {
                                                    setPriceSort("");
                                                    setOpenPrice(false);
                                                }}
                                                className="px-3 py-2 hover:bg-pink-700 cursor-pointer md:text-sm text-xs"
                                            >
                                                ไม่เรียง
                                            </div>

                                            <div
                                                onClick={() => {
                                                    setPriceSort("asc");
                                                    setOpenPrice(false);
                                                }}
                                                className="px-3 py-1 hover:bg-pink-700 cursor-pointer md:text-sm text-xs"
                                            >
                                                ราคาต่ำ → สูง
                                            </div>

                                            <div
                                                onClick={() => {
                                                    setPriceSort("desc");
                                                    setOpenPrice(false);
                                                }}
                                                className="px-3 py-1 hover:bg-pink-700 cursor-pointer md:text-sm text-xs"
                                            >
                                                ราคาสูง → ต่ำ
                                            </div>
                                        </div>
                                    )}
                                </div>


                                {/* ปุ่มค้นหา */}
                                <button
                                    onClick={() => {
                                        setFilterCategory(inputCategory);
                                    }}
                                    className="md:h-10 h-8 md:px-6 px-3 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition md:text-base text-xs"
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
                                    className="md:h-10 h-8 md:px-6 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 md:text-base text-xs"
                                >
                                    ล้าง
                                </button>
                            </div>



                            <div className="flex flex-col lg:gap-12 flex-wrap ">
                                {categories.map((cat) => (
                                    <div key={cat.title} className="mt-6">
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
                                                    className="bg-white shadow-xl rounded-xl overflow-hidden cursor-pointer"
                                                >
                                                    <div className="px-6 lg:py-4 md:py-8 py-4 ">
                                                        <div>
                                                            <Image
                                                                src={item.image?.split(",")[0]}
                                                                alt={item.name}
                                                                width={250}
                                                                height={250}
                                                                className="mx-auto lg:w-[200px] lg:h-[220px] md:w-[150px] w-[200px] md:h-full h-[100px] object-cover"
                                                            />
                                                        </div>



                                                        <div className="mt-4">
                                                            <p className="md:text-2xl text-xl text-center font-semibold">
                                                                {item.name}
                                                            </p>
                                                        </div>

                                                        <div className="flex justify-between mt-2 md:text-sm text-xs">
                                                            <p>ราคา</p>
                                                            <p className="text-pink-700">
                                                                {item.price} ฿
                                                            </p>
                                                        </div>

                                                        {item.size && (
                                                            <div className="mt-2 md:text-sm text-xs text-right">
                                                                ขนาด {item.size}
                                                            </div>
                                                        )}

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

                {open && selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center z-[10002]">
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
                                <h2 className="text-xl font-semibold text-center">
                                    {selected.name}
                                </h2>

                                {selected.description && (
                                    <p className="mt-3 text-sm text-gray-600 text-center">
                                        {selected.description}
                                    </p>
                                )}

                                <div className="mt-4 space-y-2 text-sm text-gray-700">
                                    <div className="flex justify-between">
                                        <span>ราคา</span>
                                        <span className="font-semibold text-pink-700">
                                            {selected.price} ฿
                                        </span>
                                    </div>

                                    {selected.size && (
                                        <div className="flex justify-between">
                                            <span>ขนาด</span>
                                            <span>{selected.size}</span>
                                        </div>
                                    )}

                                    <div className="mt-4 space-y-2 text-sm text-gray-700 flex flex-col">
                                        <span>ช่องทางสั่งซื้อ</span>
                                        <a href={"https://www.facebook.com/profile.php?id=61556123048228"} className="flex hover:text-rose-700">facebook : สถาบันคุ้มครองและพัฒนาคนพิการ พระประแดง</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section >
            {openImage && (
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
            )}



        </div >
    );
}
