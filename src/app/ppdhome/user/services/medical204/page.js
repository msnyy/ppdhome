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
                        บ้านพระประแดงร่วมกับกองระบาดวิทยาและหน่วยงานสาธารณสุข
                    </p>
                    <p className="xl:text-3xl md:text-3xl lg:mt-5 mt-2 text-xl text-shadow-lg">
                        ที่เกี่ยวข้องลงพื้นที่วางแผนบริหารจัดการและควบคุมโรคติดต่อ
                    </p>
                </MotionWrapper>

                <MotionWrapper>
                    <p className="mt-6">
                        วันพุธที่ 8 ตุลาคม พ.ศ. 2568
                    </p>

                    <div className="border-b mt-6"></div>
                </MotionWrapper>

                <div className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                    <MotionWrapper>
                        <p className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                            สถานคุ้มครองและพัฒนาคนพิการพระประแดงจังหวัดสมุทรปราการ นำโดยว่าที่ร้อยตรีณัทกร ธงสอาด ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ

                        </p>
                        <p>
                            มอบหมายให้ข้าราชการและเจ้าหน้าที่โดยกลุ่มงานพยาบาล ร่วมกับกองระบาดวิทยา กรมควบคุมโรค สำนักงาน ป้องกันควบคุมโรคที่ 6 จังหวัดชลบุรี และโรงพยาบาลที่เกี่ยวข้อง
                            ลงพื้นที่ดำเนินการสอบสวนโรค เพื่อวางแผนบริหารจัดการมาตรการป้องกันและควบคุมโรคติดต่อภายในสถานคุ้มครองฯ โดยคณะเจ้าหน้าที่ได้ร่วมกันประเมินสถานการณ์
                            ตรวจเยี่ยมพื้นที่จริง และดำเนินการคัดกรองผู้สัมผัสผู้ใช้บริการทุกเรือนนอน รวมถึงเจ้าหน้าที่ของสถานคุ้มครองฯ ทั้งหมด เพื่อให้การเฝ้าระวัง ป้องกัน
                            และควบคุมโรคเป็นไปอย่างมีประสิทธิภาพ สอดคล้องตามแนวทางของกระทรวงสาธารณสุข ณ สถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ
                        </p>
                    </MotionWrapper>
                </div>
                <MotionWrapper>
                <div className="lg:mt-10 md:mt-6 mt-4 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 flex justify-between object-cover">
                    
                        <Image src={getSupabaseImage("pic/medical204/medical204_1.JPG")} alt="รูปวางแผนจัดการและควบคุมโรคติดต่อ"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105 "
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical204/medical204_1.JPG"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical204/medical204_2.JPG")} alt="รูปวางแผนจัดการและควบคุมโรคติดต่อ"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical204/medical204_2.JPG"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical204/medical204_3.JPG")} alt="รูปวางแผนจัดการและควบคุมโรคติดต่อ"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical204/medical204_3.JPG"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical204/medical204_4.JPG")} alt="รูปวางแผนจัดการและควบคุมโรคติดต่อ"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical204/medical204_4.JPG"))}
                        ></Image>

                        <Image src={getSupabaseImage("pic/medical204/medical204_5.JPG")} alt="รูปวางแผนจัดการและควบคุมโรคติดต่อ"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical204/medical204_5.JPG"))}
                        ></Image>
                        <Image src={getSupabaseImage("pic/medical204/medical204_6.JPG")} alt="รูปวางแผนจัดการและควบคุมโรคติดต่อ"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical204/medical204_6.JPG"))}
                        ></Image>
                        <Image src={getSupabaseImage("pic/medical204/medical204_7.JPG")} alt="รูปวางแผนจัดการและควบคุมโรคติดต่อ"
                            className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                            width={250} height={100}
                            onClick={() => setOpenImage(getSupabaseImage("pic/medical204/medical204_7.JPG"))}
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