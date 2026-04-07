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
            <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-15 md:mt-6 mt-4 text-black mb-6">
                <MotionWrapper>
                    <p className="xl:text-4xl md:text-3xl text-xl text-shadow-lg">
                        บ้านพระประแดงร่วมกับโรงพยาบาลบางจากและคลินิกมิตรไมตรี
                    </p>

                    <p className="xl:text-3xl md:text-3xl lg:mt-5 mt-2 text-xl text-shadow-lg">
                        ดำเนินการตรวจคัดกรองวัณโรคในกลุ่มเสี่ยงให้กับผู้ใช้บริการ
                    </p>
                </MotionWrapper>
                <MotionWrapper>
                    <p className="mt-6">
                        วันพฤหัสบดีที่ 4 กันยายน พ.ศ. 2568
                    </p>

                    <div className="border-b mt-6"></div>
                </MotionWrapper>

                <div className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                    <MotionWrapper>
                        <p className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                            สถานคุ้มครองและพัฒนาคนพิการพระประแดงจังหวัดสมุทรปราการ นำโดยว่าที่ร้อยตรีณัทกร ธงสอาด ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ

                        </p>
                        <p>
                            มอบหมายให้เจ้าหน้าที่กลุ่มงานพยาบาล พร้อมด้วยนักเรียนนายร้อยตำรวจ หลักสูตร นรต. สัมผัสปัญหาชุมชนรุ่นที่ 25 ร่วมกับโรงพยาบาลบางจาก และคลินิกมิตรไมตรี
                            ตรวจคัดกรองกลุ่มเสี่ยงวัณโรคให้กับผู้ใช้บริการ เพื่อเฝ้าระวัง ป้องกับและควบคุมการแพร่ระบาดของวัณโรคในกลุ่มผู้ใช้บริการ ที่มีความเสี่ยงต่อการติดเชื้อ
                            โดยมีการตรวจเอกซเรย์ปอดให้กับ ผู้ใช้บริการจำนวนทั้งสิ้น 98 ราย
                            พร้อมให้คำแนะนำในการดูแลสุขภาพและการป้องกันโรคดังกล่าวให้กับผู้ใช้บริการณ สถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ
                        </p>
                    </MotionWrapper>
                </div>

                <MotionWrapper>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:mt-10 md:mt-6 mt-4">

                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num} className="relative w-full aspect-[4/3] overflow-hidden">

                                <Image
                                    src={getSupabaseImage(`pic/medical179/medical179_${num}.jpg`)}
                                    alt=""
                                    fill
                                    className="object-cover transition duration-300 hover:scale-105 cursor-pointer"
                                    onClick={() => setOpenImage(getSupabaseImage(`pic/medical179/medical179_${num}.jpg`))}
                                />

                            </div>
                        ))}


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