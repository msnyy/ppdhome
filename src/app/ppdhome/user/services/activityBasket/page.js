"use client";

import { useState } from "react";
import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
export const dynamic = "force-dynamic";
export default function ActivityBasket() {
    const [openImage, setOpenImage] = useState(null);
    return (
        <div>
            <section className="lg:mx-20 md:mx-10 mx-5 lg:mt-15 md:mt-10">
                <p className="lg:text-5xl md:text-3xl text-xl font-semibold text-shadow-lg text-center">
                    กิจกรรมสานตะกร้า
                </p>

                <div className="md:mt-10 mt-4 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-4 gap-4 flex justify-between">
                    <Image src={getSupabaseImage("pic/Basket/basket1.jpg")} alt="รูปกิจกรรมสานตะกร้า"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket1.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/Basket/basket2.jpg")} alt="รูปกิจกรรมสานตะกร้า"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket2.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/Basket/basket3.jpeg")} alt="รูปกิจกรรมสานตะกร้า"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket3.jpeg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/Basket/basket4.jpeg")} alt="รูปกิจกรรมสานตะกร้า"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket4.jpeg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/Basket/basket5.jpeg")} alt="รูปกิจกรรมสานตะกร้า"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket5.jpeg"))}
                    ></Image>
                
                    <Image src={getSupabaseImage("pic/Basket/basket6.PNG")} alt="รูปกิจกรรมสานตะกร้า"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket6.PNG"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/Basket/basket7.PNG")} alt="รูปกิจกรรมสานตะกร้า"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket7.PNG"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/Basket/basket8.JPG")} alt="รูปกิจกรรมสานตะกร้า"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket8.JPG"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/Basket/basket9.JPG")} alt="รูปกิจกรรมสานตะกร้า"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/Basket/basket9.JPG"))}
                    ></Image>
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