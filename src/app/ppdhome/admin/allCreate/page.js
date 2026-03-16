"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AllCreate() {
    const [bwMode, setBwMode] = useState(false);

    useEffect(() => {
        fetch("/ppdhome/api/theme")
            .then(res => res.json())
            .then(data => setBwMode(data.bwMode));
    }, []);

    const toggleTheme = async () => {
        await fetch("/ppdhome/api/theme", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bwMode: !bwMode }),
        });

        window.location.reload();
    };



    return (
        <section className="min-h-screen flex items-center justify-center lg:gap-20 md:gap-10 gap-4 lg:w-full md:w-[760px] w-[360]">
            <button
                onClick={toggleTheme}
                className="absolute top-6 right-6 px-4 py-2 bg-gray-200 rounded-lg shadow md:text-base text-sm"
            >
                {bwMode ? "ปิดโหมดไว้อาลัย" : "เปิดโหมดไว้อาลัย"}
            </button>

            <div className="flex text-center lg:gap-14">

                <Link href="/ppdhome/admin/banner" className="">
                    <div className="bg-white lg:p-16 md:p-10 p-4 rounded-xl border border-pink-200 text-shadow-lg shadow-lg hover:bg-pink-200 hover:shadow-sm hover:text-pink-700 hover:inset-shadow-sm hover:inset-shadow-pink-700/50 hover:text-shadow-2xs">
                        <p className="lg:text-5xl md:text-3xl text-lg">แก้ไขแบรนด์เนอร์</p>
                    </div>
                </Link>

                <Link href="/ppdhome/admin/newsAndPublicCreate" className="">
                    <div className="bg-white lg:p-16 md:p-10 p-4 rounded-xl border border-pink-200 text-shadow-lg shadow-lg hover:bg-pink-200 hover:shadow-sm hover:text-pink-700 hover:inset-shadow-sm hover:inset-shadow-pink-700/50 hover:text-shadow-2xs">
                        <p className="lg:text-5xl md:text-3xl text-lg">เพิ่มข้อมูลข่าว</p>
                    </div>
                </Link>

                <Link href="/ppdhome/admin/product" className="">
                    <div className="bg-white lg:p-16 md:p-10 p-4 rounded-xl border border-pink-200 text-shadow-lg shadow-lg hover:bg-pink-200 hover:shadow-sm hover:text-pink-700 hover:inset-shadow-sm hover:inset-shadow-pink-700/50 hover:text-shadow-2xs">
                        <p className="lg:text-5xl md:text-3xl text-lg">เพิ่มข้อมูลสินค้า</p>
                    </div>
                </Link>

            </div>
        </section>
    );
}