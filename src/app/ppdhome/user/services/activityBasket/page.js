"use client";

import { useState } from "react";
import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
import MotionWrapper from "@components/MotionWrapper";
export const dynamic = "force-dynamic";
export default function ActivityBasket() {
    const [openImage, setOpenImage] = useState(null);
    return (
        <div>
            <section className="lg:mx-20 md:mx-10 mx-5 lg:mt-15 md:mt-10 text-black mb-18">
                <MotionWrapper>
                    <p className="lg:text-4xl md:text-3xl text-xl text-shadow-lg">
                        กิจกรรมสานตะกร้า
                    </p>


                    <div className="border-b mt-6"></div>
                </MotionWrapper>

                <MotionWrapper>
                    <div className="md:mt-10 mt-4 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 flex justify-between">
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={getSupabaseImage("pic/Basket/basket1.jpg")}
                                alt="รูปกิจกรรมสานตะกร้า"
                                fill
                                className="object-cover transition duration-300 hover:scale-105"
                                onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket1.jpg"))}
                            />
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={getSupabaseImage("pic/Basket/basket2.jpg")}
                                alt="รูปกิจกรรมสานตะกร้า"
                                fill
                                className="object-cover transition duration-300 hover:scale-105"
                                onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket2.jpg"))}
                            />
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={getSupabaseImage("pic/Basket/basket3.jpeg")}
                                alt="รูปกิจกรรมสานตะกร้า"
                                fill
                                className="object-cover transition duration-300 hover:scale-105"
                                onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket3.jpeg"))}
                            />
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={getSupabaseImage("pic/Basket/basket4.jpeg")}
                                alt="รูปกิจกรรมสานตะกร้า"
                                fill
                                className="object-cover transition duration-300 hover:scale-105"
                                onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket4.jpeg"))}
                            />
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={getSupabaseImage("pic/Basket/basket5.jpeg")}
                                alt="รูปกิจกรรมสานตะกร้า"
                                fill
                                className="object-cover transition duration-300 hover:scale-105"
                                onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket5.jpeg"))}
                            />
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={getSupabaseImage("pic/Basket/basket6.PNG")}
                                alt="รูปกิจกรรมสานตะกร้า"
                                fill
                                className="object-cover transition duration-300 hover:scale-105"
                                onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket6.PNG"))}
                            />
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={getSupabaseImage("pic/Basket/basket7.PNG")}
                                alt="รูปกิจกรรมสานตะกร้า"
                                fill
                                className="object-cover transition duration-300 hover:scale-105"
                                onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket7.PNG"))}
                            />
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={getSupabaseImage("pic/Basket/basket8.JPG")}
                                alt="รูปกิจกรรมสานตะกร้า"
                                fill
                                className="object-cover transition duration-300 hover:scale-105"
                                onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket8.JPG"))}
                            />
                        </div>

                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                            <Image
                                src={getSupabaseImage("pic/Basket/basket9.JPG")}
                                alt="รูปกิจกรรมสานตะกร้า"
                                fill
                                className="object-cover transition duration-300 hover:scale-105"
                                onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket9.JPG"))}
                            />
                        </div>
                    </div>
                </MotionWrapper>

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