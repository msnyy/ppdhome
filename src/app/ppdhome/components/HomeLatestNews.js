"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ---------- date ---------- */
function formatThaiDate(input) {
    if (!input) return "";

    const d = new Date(input);

    const months = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
    ];

    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

export default function HomeLatestNews() {

    const [items, setItems] = useState([]);

    useEffect(() => {

        async function load() {

            const res = await fetch(
                "/ppdhome/api/posts?page=1&pageSize=6"
            );

            const data = await res.json();

            setItems(data.items || []);

        }

        load();

    }, []);

    const isNew = (date) => {
        if (!date) return false;

        const now = new Date();
        const newsDate = new Date(date);

        const diffTime = now - newsDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        return diffDays <= 7; // ภายใน 7 วันถือว่า NEW
    };

    return (

        <section className="lg:mx-20 md:mx-10 mx-4 lg:mb-18 mb-8 text-black">

            <div className="flex justify-between">
                <h2 className="lg:text-3xl md:text-xl text-lg mb-8 text-shadow-lg">
                    Latest News
                </h2>

                <Link href={`/ppdhome/user/newsAndPublic`}>
                    <h1 className="mb-8 text-shadow-lg lg:text-base text-sm border-b transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                        View All News
                    </h1>
                </Link>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

                {items.map((it) => {

                    const firstImage = it.image
                        ? it.image.split(",")[0]
                        : null;

                    const newsNew = isNew(it.content_date);

                    return (
                            <Link
                                key={it.id}
                                href={`/ppdhome/user/newsAndPublic/${it.id}`}
                                className="group"
                            >
                                {/* image */}
                                <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-200">

                                    {firstImage && (

                                        <Image
                                            src={firstImage}
                                            alt={it.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition"
                                        />

                                    )}

                                </div>

                                {/* title */}
                                <p className="mt-4 lg:text-lg text-sm font-medium line-clamp-2 group-hover:text-pink-700 transition">

                                    {it.title} {it.subtitle}

                                </p>

                                {/* date */}
                                <p className="lg:text-sm text-xs text-gray-500 mt-1">

                                    {formatThaiDate(it.content_date)}

                                    {newsNew && (
                                        <span className="text-xs bg-orange-600 text-white px-2 py-1 ms-4 rounded animate-pulse shadow-[0_0_10px_rgba(255,115,0,0.8)]">
                                            NEW
                                        </span>
                                    )}

                                </p>

                                <p className="text-blue-600 text-light lg:text-base text-sm mt-2">Read More</p>
                            </Link>

                    );

                })}

            </div>
        </section>

    );
}