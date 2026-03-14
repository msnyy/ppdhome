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

    return (

        <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-16 mt-8 lg:mb-18 mb-8">

            <h2 className="text-3xl font-semibold mb-8">
                ข่าวล่าสุด
            </h2>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

                {items.map((it) => {

                    const firstImage = it.image
                        ? it.image.split(",")[0]
                        : null;

                    return (

                        <Link
                            key={it.id}
                            href={`/ppdhome/user/newsAndPublic/${it.id}`}
                            className="group"
                        >

                            {/* image */}

                            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-gray-200">

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

                            <p className="mt-4 text-lg font-medium line-clamp-2 group-hover:text-pink-700 transition">

                                {it.title} {it.subtitle}

                            </p>

                            {/* date */}

                            <p className="text-sm text-gray-500 mt-1">

                                {formatThaiDate(it.content_date)}

                            </p>

                        </Link>

                    );

                })}

            </div>

            <div className="flex justify-end lg:mt-8 mt-4">
                <Link href={`/ppdhome/user/newsAndPublic`}>
                    <button className="p-3 border border-pink-700 hover:bg-pink-700 hover:text-white rounded-3xl shadow-md shadow-pink-700/25 text-pink-700 md:text-lg text-xs">ดูข่าวทั้งหมด</button>
                </Link>
            </div>
        </section>

    );
}