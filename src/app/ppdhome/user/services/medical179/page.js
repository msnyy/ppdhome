"use client";

import { useState } from "react";
import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
export const dynamic = "force-dynamic";
export default function Medical() {
    const [openImage, setOpenImage] = useState(null);
    return (
        <div>
            <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-15 md:mt-6 mt-4 text-black mb-6">
                <p className="xl:text-4xl md:text-3xl text-xl text-shadow-lg">
                    บ้านพระประแดงร่วมกับโรงพยาบาลบางจากและคลินิกมิตรไมตรี
                </p>

                <p className="xl:text-3xl md:text-3xl lg:mt-5 mt-2 text-xl text-shadow-lg">
                    ดำเนินการตรวจคัดกรองวัณโรคในกลุ่มเสี่ยงให้กับผู้ใช้บริการ
                </p>
                <p className="mt-6">
                        วันพฤหัสบดีที่ 4 กันยายน พ.ศ. 2568 
                    </p>

                    <div className="border-b mt-6"></div>

                <div className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                    
                    <p className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                        สถานคุ้มครองและพัฒนาคนพิการพระประแดงจังหวัดสมุทรปราการ นำโดยว่าที่ร้อยตรีณัทกร ธงสอาด ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ
                        
                    </p>
                    <p>
                        มอบหมายให้เจ้าหน้าที่กลุ่มงานพยาบาล พร้อมด้วยนักเรียนนายร้อยตำรวจ หลักสูตร นรต. สัมผัสปัญหาชุมชนรุ่นที่ 25 ร่วมกับโรงพยาบาลบางจาก และคลินิกมิตรไมตรี 
                        ตรวจคัดกรองกลุ่มเสี่ยงวัณโรคให้กับผู้ใช้บริการ เพื่อเฝ้าระวัง ป้องกับและควบคุมการแพร่ระบาดของวัณโรคในกลุ่มผู้ใช้บริการ ที่มีความเสี่ยงต่อการติดเชื้อ 
                        โดยมีการตรวจเอกซเรย์ปอดให้กับ ผู้ใช้บริการจำนวนทั้งสิ้น 98 ราย 
                        พร้อมให้คำแนะนำในการดูแลสุขภาพและการป้องกันโรคดังกล่าวให้กับผู้ใช้บริการณ สถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ
                    </p>
                </div>
                <div className="lg:mt-10 md:mt-6 mt-4 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 flex justify-between">
                    <Image src={getSupabaseImage("pic/medical179/medical179_1.jpg")} alt="รูปตรวจคัดกรองวัณโรคในกลุ่มเสี่ยง"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105 "
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical179/medical179_1.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/medical179/medical179_2.jpg")} alt="รูปฉีดวัคซีนป้องกันโรคไข้หวัดใหญ่"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical179/medical179_2.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/medical179/medical179_3.jpg")} alt="รูปฉีดวัคซีนป้องกันโรคไข้หวัดใหญ่"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical179/medical179_3.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/medical179/medical179_4.jpg")} alt="รูปฉีดวัคซีนป้องกันโรคไข้หวัดใหญ่"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical179/medical179_4.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/medical179/medical179_5.jpg")} alt="รูปฉีดวัคซีนป้องกันโรคไข้หวัดใหญ่"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical179/medical179_5.jpg"))}
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