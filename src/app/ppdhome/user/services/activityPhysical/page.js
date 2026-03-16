"use client";

import { useState } from "react";
import Image from "next/image";
import { getSupabaseImage } from "@lib/image";

export default function ActivityPhysical() {
    const [openImage, setOpenImage] = useState(null);
    return (
        <div>
            <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-15 md:mt-6 mt-4">
                <p className="xl:text-5xl md:text-3xl text-xl font-semibold text-shadow-lg text-center">
                    การกายภาพบำบัด
                </p>

                <div className="lg:mt-10 md:mt-6 mt-4 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 flex justify-between">
                    <Image src={getSupabaseImage("pic/physical/physical1.jpg")} alt="รูปกายภาพบำบัด"
                    className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/physical/physical1.jpg"))}>
                    </Image>
                    <Image src={getSupabaseImage("pic/physical/physical2.jpg")} alt="รูปกายภาพบำบัด"
                    className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/physical/physical2.jpg"))}>
                    </Image>
                    <Image src={getSupabaseImage("pic/physical/physical3.jpg")} alt="รูปกายภาพบำบัด"
                    className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/physical/physical3.jpg"))}>
                    </Image>
                    <Image src={getSupabaseImage("pic/physical/physical4.1.jpg")} alt="รูปกายภาพบำบัด"
                    className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/physical/physical4.1jpg"))}>
                    </Image>
                    <Image src={getSupabaseImage("pic/physical/physical5.1.jpg")} alt="รูปกายภาพบำบัด"
                    className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/physical/physical5.1.jpg"))}>
                        </Image>
                    <Image src={getSupabaseImage("pic/physical/physical6.jpg")} alt="รูปกายภาพบำบัด"
                    className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/physical/physical6.jpg"))}>
                    </Image>
                    <Image src={getSupabaseImage("pic/physical/physical7.1.jpg")} alt="รูปกายภาพบำบัด"
                    className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/physical/physical7.1.jpg"))}>
                    </Image>
                </div>

                {openImage && (
                    <div
                        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 "
                        onClick={() => setOpenImage(null)}
                    >
                        <div
                            className="relative max-w-4xl w-full mx-4 animate-fadein"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setOpenImage(null)} className="absolute -top-10 right-0 text-white text-3xl" >
                                ✕
                            </button>
                            <Image
                                src={openImage}
                                alt="ภาพขยาย"
                                width={1200}
                                height={800}
                                className="rounded-lg object-contain w-full h-auto"
                            />
                        </div>
                    </div>
                )}

            </section>
        </div>
    );
}