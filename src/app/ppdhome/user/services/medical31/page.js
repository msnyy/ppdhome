"use client";

import { useState } from "react";
import Image from "next/image";
import { getSupabaseImage } from "@lib/image";

export default function Medical() {
    const [openImage, setOpenImage] = useState(null);
    return (
        <div>
            <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-15 md:mt-6 mt-4">
                <p className="xl:text-5xl md:text-3xl text-xl font-semibold text-shadow-lg text-shadow-lg text-center">
                    โครงการบ้านพระประแดงยุคใหม่ใส่ใจสุขภาพ
                </p>
                <p className="xl:text-5xl md:text-3xl text-xl lg:mt-5 mt-2 font-semibold text-shadow-lg text-shadow-lg text-center">
                    กิจกรรมพบแพทย์ในบ้าน
                </p>

                <div className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                    <p>
                        วันพฤหัสบดี ที่ 13 กุมภาพันธ์ 2568 เวลา 08.30น.
                    </p>
                    <p className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                        ว่าที่ร้อยตรีณัทกร ธงสอาด ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ
                        มอบหมายให้กลุ่มพัฒนาคนพิการโดยงานพยาบาล ร่วมกับมิตรไมตรีคลินิกสาขาพระประแดง จัดโครงการ บ้านพระประแดงยุคใหม่ใส่ใจสุขภาพ 
                        โดยมีกิจกรรมพบแพทย์ในบ้าน และ มีการคัดกรอก โรคติดเชื้อไวรัสตับอักเสบบีหรือไววัสตับอักเสบซี และตรวจเลือด HIV ให้กับผู้ใช้บริการรวมทั้งสิ้น 400 คน 
                        ณ อาคารอเนกประสงค์ สถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ
                    </p>
                    <p>

                    </p>
                </div>
                <div className="lg:mt-10 md:mt-6 mt-4 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 flex justify-between">
                    <Image src={getSupabaseImage("pic/medical31/medical31_1.JPG")} alt="รูปกิจกรรมพบแพทย์ในบ้าน"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical31/medical31_1.JPG"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/medical31/medical31_2.JPG")} alt="รูปกิจกรรมพบแพทย์ในบ้าน"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical31/medical31_2.JPG"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/medical31/medical31_3.JPG")} alt="รูปกิจกรรมพบแพทย์ในบ้าน"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical31/medical31_3.JPG"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/medical31/medical31_4.JPG")} alt="รูปกิจกรรมพบแพทย์ในบ้าน"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical31/medical31_4.JPG"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/medical31/medical31_5.JPG")} alt="รูปกิจกรรมพบแพทย์ในบ้าน"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical31/medical31_5.JPG"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/medical31/medical31_6.JPG")} alt="รูปกิจกรรมพบแพทย์ในบ้าน"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical31/medical31_6.JPG"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/medical31/medical31_7.JPG")} alt="รูปกิจกรรมพบแพทย์ในบ้าน"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical31/medical31_7.JPG"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/medical31/medical31_8.JPG")} alt="รูปกิจกรรมพบแพทย์ในบ้าน"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical31/medical31_8.JPG"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/medical31/medical31_9.JPG")} alt="รูปกิจกรรมพบแพทย์ในบ้าน"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical31/medical31_9.JPG"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/medical31/medical31_10.JPG")} alt="รูปกิจกรรมพบแพทย์ในบ้าน"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/medical31/medical31_10.JPG"))}
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