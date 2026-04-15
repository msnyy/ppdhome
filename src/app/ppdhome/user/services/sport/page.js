"use client";

import { useState } from "react";
import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
import MotionWrapper from "@components/MotionWrapper";
export const dynamic = "force-dynamic";
export default function ActivityPrint() {
    const [openImage, setOpenImage] = useState(null);
    return (
        <div>
            <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-15 md:mt-6 mt-4 text-black mb-18">
                <MotionWrapper>
                <p className="xl:text-4xl md:text-3xl text-xl text-shadow-lg">
                    การฟื้นฟูสมรรถภาพ ด้านกีฬา
                </p>
                <p className="mt-6">
                        บ้านพระประแดง จัดกิจกรรมทดสอบสมรรถภาพร่างกาย ส่งเสริมสุขภาพร่างกายของผู้ใช้บริการ และพัฒนาทักษะด้านกีฬา
                    </p>
                   

                <div className="border-b mt-6"></div>
                 </MotionWrapper>

                <div className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                    <MotionWrapper>
                    <p className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                        สถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ 
                    </p>
                    <p>
                        จัดกิจกรรมทดสอบสมรรถภาพทางด้านร่างกายให้แก่ผู้ใช้บริการ
                        ณ อาคารอเนกประสงค์ สคพ.พระประแดง เพื่อส่งเสริมสุขภาพร่างกายของผู้ใช้บริการ และพัฒนาทักษะด้านกีฬา การทดสอบสมรรถภาพประกอบด้วย
                        การฝึกซ้อมกีฬาบอชชี่ เน้นการฝึกทักษะพื้นฐาน การวางแผนเกม การสร้างทีม และการปรับสภาพร่างกาย และการฝึกกีฬาซ้อมแบดมินตัน
                        การจับแบบโฟร์แฮนด์ การจับแบ็คแฮนด์ รวมถึงการเสริมสร้างพละกำลัง ความคล่องตัว การทรงตัว และการประสานงานของร่างกาย
                    </p>
                    </MotionWrapper>
                </div>
                <MotionWrapper>
                <div className="lg:mt-10 md:mt-6 mt-4 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 flex justify-between">
                    
                    <Image src={getSupabaseImage("pic/sport/sport1.jpg")} alt="การฟื้นฟูสมรรถภาพ ด้านกีฬา"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/sport/sport1.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/sport/sport2.jpg")} alt="การฟื้นฟูสมรรถภาพ ด้านกีฬา"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/sport/sport2.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/sport/sport3.jpg")} alt="การฟื้นฟูสมรรถภาพ ด้านกีฬา"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/sport/sport3.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/sport/sport4.jpg")} alt="การฟื้นฟูสมรรถภาพ ด้านกีฬา"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/sport/sport4.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/sport/sport5.jpg")} alt="การฟื้นฟูสมรรถภาพ ด้านกีฬา"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/sport/sport5.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/sport/sport6.jpg")} alt="การฟื้นฟูสมรรถภาพ ด้านกีฬา"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/sport/sport6.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/sport/sport7.jpg")} alt="การฟื้นฟูสมรรถภาพ ด้านกีฬา"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/sport/sport7.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/sport/sport8.jpg")} alt="การฟื้นฟูสมรรถภาพ ด้านกีฬา"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/sport/sport8.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/sport/sport9.jpg")} alt="การฟื้นฟูสมรรถภาพ ด้านกีฬา"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/sport/sport9.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/sport/sport10.jpg")} alt="การฟื้นฟูสมรรถภาพ ด้านกีฬา"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/sport/sport10.jpg"))}
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