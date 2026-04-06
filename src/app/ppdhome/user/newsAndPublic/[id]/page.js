"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

function formatThaiDate(input) {
    if (!input) return "";
    const d = new Date(input);

    const months = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
    ];

    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

export default function PostDetail() {
    const { id } = useParams();

    const [data, setData] = useState(null);
    const [openImage, setOpenImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            try {

                const res = await fetch(`/ppdhome/api/posts/${id}`);

                if (!res.ok) {
                    setData(null);
                    return;
                }

                const json = await res.json();
                setData(json);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }

        }

        if (id) load();

    }, [id]);

    if (loading) {
        return <p className="text-center mt-20">กำลังโหลดข้อมูล...</p>;
    }

    if (!data) {
        return <p className="text-center mt-20 text-red-500">ไม่พบข้อมูล</p>;
    }

    const images = data.image ? data.image.split(",") : [];

    return (

        <section className="lg:mx-20 md:mx-9 mx-5 rounded-xl lg:p-10 md:p-6 p-4 text-black">

            <p className="lg:mt-5 mt-2 lg:text-4xl md:text-3xl text-xl text-shadow-lg">
                {data.title}
            </p>

            {data.subtitle && (
                <p className="lg:mt-5 mt-2 lg:text-4xl md:text-3xl text-xl text-shadow-lg">
                    {data.subtitle}
                </p>
            )}

            {data.header_date && (
                <p className="lg:mt-5 mt-2 lg:text-4xl md:text-3xl text-xl text-shadow-lg">
                    {data.header_date}
                </p>
            )}

            <p className="mt-5">
                {formatThaiDate(data.content_date)}
            </p>

            <div className="border border-t mt-6"></div>

            <p className="mt-5 whitespace-pre-line">
                {data.detail}
            </p>

            {images.length > 0 && (

                <div className="grid md:grid-cols-5 grid-cols-2 gap-4 mt-6">

                    {images.map((img, i) => (

                        <div key={i} className="relative w-full aspect-[5/4] overflow-hidden">

                            <Image
                                src={img}
                                alt=""
                                fill
                                className="object-cover cursor-pointer hover:scale-105 transition"
                                onClick={() => setOpenImage(img)}
                            />



                        </div>

                    ))}

                </div>

            )}

            <div className="flex justify-between mt-10 gap-4">

                {data.prevId ? (
                    <Link
                        href={`/ppdhome/user/newsAndPublic/${data.prevId}`}
                        className="flex p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                        <p className="">← </p>
                        <p className="line-clamp-2 ms-2">{data.prevTitle}</p>
                    </Link>
                ) : <div />}

                {data.nextId && (
                    <Link
                        href={`/ppdhome/user/newsAndPublic/${data.nextId}`}
                        className="flex p-4 bg-pink-200 rounded-lg hover:bg-pink-300 transition text-right"
                    >
                        <p className="line-clamp-2 me-2">{data.nextTitle}</p>
                        <p className="">→ </p>
                        
                    </Link>
                )}

            </div>

            {openImage && (

                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                    onClick={() => setOpenImage(null)}
                >

                    <Image
                        src={openImage}
                        alt=""
                        width={1200}
                        height={800}
                        className="object-contain"
                    />

                </div>

            )}

        </section>

    );
}