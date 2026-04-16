"use client";

import { useState } from "react";
import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
import MotionWrapper from "@components/MotionWrapper";
export const dynamic = "force-dynamic";
export default function ActivityPhysical() {
    const [openImage, setOpenImage] = useState(null);
    return (
        <div>
            <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-15 md:mt-6 mt-4 text-black mb-18">
                <MotionWrapper>
                    <p className="xl:text-4xl md:text-3xl text-xl text-shadow-lg">
                        กิจกรรมสนับสนุนและส่งเสริมการเรียนรู้ (สกร.)
                    </p>
                    <p className="mt-6">
                        วันอังคารที่ 17 มิถุนายน พ.ศ. 2568 เวลา 13.30 น.
                    </p>

                    <div className="border-b mt-6"></div>
                </MotionWrapper>

                <div className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                    <MotionWrapper>
                        <p className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs indent-8">
                            สถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ จัดกิจกรรมสนับสนุนและส่งเสริมการเรียนรู้ (สกร.) เพื่อส่งเสริมศักยภาพการเรียนรู้ ของผู้ใช้บริการ
                            ตลอดจนเปิดโอกาสให้เข้าถึงการ ศึกษาอย่างต่อเนื่องและทั่วถึง ซึ่งมุ่งเน้นการเสริมสร้างทักษะ ความรู้
                            และสามารถนำไปประยุกต์ใช้ในชีวิตประจำวันได้ โดยได้รับเกียรติจากอาจารย์ บุญธวัช พันธ์เสือ เป็นอาจารย์ผู้สอน
                            ณ อาคารอเนกประสงค์สถานคุ้มครองและพัฒนาคนพิการพระประแดงจังหวัดสมุทรปราการ
                        </p>
                    </MotionWrapper>
                </div>
                <MotionWrapper>
                    <div className="lg:mt-10 md:mt-6 mt-4 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 flex justify-between">

                        <Image src={getSupabaseImage("pic/study/study1.JPG")} alt="การศึกษา"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/study/study1.JPG"))}>
                        </Image>
                        <Image src={getSupabaseImage("pic/study/study2.jpg")} alt="การศึกษา"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/study/study2.jpg"))}>
                        </Image>
                        <Image src={getSupabaseImage("pic/study/study3.jpg")} alt="การศึกษา"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/study/study3.jpg"))}>
                        </Image>
                        <Image src={getSupabaseImage("pic/study/study4.jpg")} alt="การศึกษา"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/study/study4.jpg"))}>
                        </Image>
                        <Image src={getSupabaseImage("pic/study/study5.JPG")} alt="การศึกษา"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/study/study5.JPG"))}>
                        </Image>
                        <Image src={getSupabaseImage("pic/study/study6.JPG")} alt="การศึกษา"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/study/study6.JPG"))}>
                        </Image>
                        <Image src={getSupabaseImage("pic/study/study7.JPG")} alt="การศึกษา"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/study/study7.JPG"))}>
                        </Image>
                        <Image src={getSupabaseImage("pic/study/study8.JPG")} alt="การศึกษา"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/study/study8.JPG"))}>
                        </Image>
                        <Image src={getSupabaseImage("pic/study/study9.JPG")} alt="การศึกษา"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/study/study9.JPG"))}>
                        </Image>

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