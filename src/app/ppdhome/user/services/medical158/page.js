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
            <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-15 md:mt-6 mt-4 text-black">
                <MotionWrapper>
                    <p className="xl:text-4xl md:text-3xl text-xl text-shadow-lg">
                        บ้านพระประแดง ร่วมกับภาคเอกชน จัดกิจกรรมตรวจสุขภาพประจำปี 2568
                    </p>
                    <p className="md:text-3xl text-xl lg:mt-5 mt-2 text-shadow-lg">
                        ส่งเสริมสุขภาวะที่ดีแก่เจ้าหน้าที่และผู้ใช้บริการ
                    </p>
                </MotionWrapper>
                <MotionWrapper>
                    <p className="mt-6">
                        วันพฤหัสบดี ที่ 7 สิงหาคม พ.ศ. 2568
                    </p>

                    <div className="border-b mt-6"></div>
                </MotionWrapper>

                <div className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                    <MotionWrapper>
                        <p className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                            สถานคุ้มครองและพัฒนาคนพิการพระประแดงจังหวัดสมุทรปราการ นำโดยว่าที่ร้อยตรีณัทกร ธงสอาด ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ

                        </p>
                        <p>
                            พร้อมด้วยข้าราชการและเจ้าหน้าที่ ร่วมกับหน่วยตรวจสุขภาพจากบริษัท โปรเฟสชั่นแนลลาโบราทอรี่
                            แมนเนจเม้นท์ คอร์ป จำกัด (มหาชน) จัดกิจกรรมตรวจสุขภาพประจำปี 2568
                            เพื่อส่งเสริมให้เจ้าหน้าที่และผู้ใช้บริการได้รับการดูแลสุขภาพอย่างเหมาะสมและต่อเนื่อง โดยมีการตรวจสุขภาพเบื่องต้น
                            ได้แก่ ตรวจวังความดันโลหิต ตรวจร่างกายทั่วไป รวมถึงการตรวจเอกซเรย์ปอดและเจาะเลือดเพื่อตรวจค่าทางห้องปฏิบัติการ
                            ซึ่งเป็นขั้นตอนสำคัญในการเฝ้าระวังและป้องกันโรคเรื้อรังและโรคติดต่อ ซึ่งมีผู้เข้ารับการตรวจสุขภาพในครั้งนี้รวมทั้งสิ้น 526 คน
                            แบ่งเป็นเจ้าหน้าที่จำนวน 66 คน และผู้ใช้บริการจำนวน 460 คน ณ อาคารอเนกประสงค์สถาน คุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ
                        </p>
                    </MotionWrapper>
                </div>
                <MotionWrapper>
                <div className="lg:mt-10 md:mt-6 mt-4 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 flex justify-between object-cover">
                    
                        <Image src={getSupabaseImage("pic/medical158/medical158_1.jpg")} alt="รูปตรวจสุขภาพประจำปี 2568"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical158/medical158_1.jpg"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical158/medical158_2.jpg")} alt="รูปตรวจสุขภาพประจำปี 2568"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical158/medical158_2.jpg"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical158/medical158_3.jpg")} alt="รูปตรวจสุขภาพประจำปี 2568"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical158/medical158_3.jpg"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical158/medical158_4.jpg")} alt="รูปตรวจสุขภาพประจำปี 2568"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical158/medical158_4.jpg"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical158/medical158_5.jpg")} alt="รูปตรวจสุขภาพประจำปี 2568"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical158/medical158_5.jpg"))}
                        ></Image>
                        <Image src={getSupabaseImage("pic/medical158/medical158_6.jpg")} alt="รูปตรวจสุขภาพประจำปี 2568"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical158/medical158_6.jpg"))}
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