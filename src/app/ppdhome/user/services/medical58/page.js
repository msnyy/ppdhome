"use client";

import { useState } from "react";
import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
import MotionWrapper from "@components/MotionWrapper";
export const dynamic = "force-dynamic";
export default function Medical() {
    const [openImage, setOpenImage] = useState(null);
    return (
        <div>
            <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-15 md:mt-6 mt-4 text-black mb-18">
                <MotionWrapper>
                    <p className="xl:text-4xl md:text-3xl text-xl text-shadow-lg">
                        โครงการบ้านพระประแดงยุคใหม่ใส่ใจสุขภาพ กิจกรรมฟันสวยกับสภากาชาดไทย
                    </p>
                </MotionWrapper>

                <MotionWrapper>
                    <p className="mt-6">
                        วันพุธ ที่ 19 มีนาคม 2568
                    </p>

                    <div className="border-b mt-6"></div>
                </MotionWrapper>

                <div className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                    <MotionWrapper>
                        <p className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                            สถานคุ้มครองและพัฒนาคนพิการพระประแดงจังหวัดสมุทรปราการ นำโดยว่าที่ร้อยตรีณัทกร ธงสอาด ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ

                        </p>
                        <p>
                            พร้อมด้วยกลุ่มพัฒนาคนพิการโดยงานพยาบาล ร่วมกับสภากาชาดไทย จัดกิจกรรมฟันสวยกับสภากาชาดไทย ภายใต้โครงการ
                            " บ้านพระประแดงยุคใหม่ใส่ใจสุขภาพ " ระหว่างวันที่ 19-20 มีนาคม 2568 โดยมีการตรวจสุขภาพช่องปากการขูดหินปูน อุดฟัน ถอนฟัน ให้กับผู้ใช้บริการ รวมทั้งสิ้น 150 คน
                            ณ อาคารอเนกประสงค์ สถานคุ้มครองและพัฒนาคนพิการพระประแดง
                        </p>
                    </MotionWrapper>
                </div>
                <MotionWrapper>
                <div className="lg:mt-10 md:mt-6 mt-4 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 flex justify-between">
                    
                        <Image src={getSupabaseImage("pic/medical58/medical58_1.jpg")} alt="รูปกิจกรรมฟันสวยกับสภากาชาดไทย"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical58/medical58_1.jpg"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical58/medical58_2.jpg")} alt="รูปกิจกรรมฟันสวยกับสภากาชาดไทย"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical58/medical58_2.jpg"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical58/medical58_3.jpg")} alt="รูปกิจกรรมฟันสวยกับสภากาชาดไทย"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical58/medical58_3.jpg"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical58/medical58_4.jpg")} alt="รูปกิจกรรมฟันสวยกับสภากาชาดไทย"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical58/medical58_4.jpg"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical58/medical58_5.jpg")} alt="รูปกิจกรรมฟันสวยกับสภากาชาดไทย"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical58/medical58_5.jpg"))}
                        ></Image>
                        <Image src={getSupabaseImage("pic/medical58/medical58_6.jpg")} alt="รูปกิจกรรมฟันสวยกับสภากาชาดไทย"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical58/medical58_6.jpg"))}
                        ></Image>
                        <Image src={getSupabaseImage("pic/medical58/medical58_7.jpg")} alt="รูปกิจกรรมฟันสวยกับสภากาชาดไทย"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical58/medical58_7.jpg"))}
                        ></Image>
                        <Image src={getSupabaseImage("pic/medical58/medical58_8.jpg")} alt="รูปกิจกรรมฟันสวยกับสภากาชาดไทย"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical58/medical58_8.jpg"))}
                        ></Image>
                        <Image src={getSupabaseImage("pic/medical58/medical58_9.jpg")} alt="รูปกิจกรรมฟันสวยกับสภากาชาดไทย"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical58/medical58_9.jpg"))}
                        ></Image>
                    
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