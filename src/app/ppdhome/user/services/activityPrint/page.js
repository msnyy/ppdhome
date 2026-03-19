"use client";

import { useState } from "react";
import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
export const dynamic = "force-dynamic";
export default function ActivityPrint() {
    const [openImage, setOpenImage] = useState(null);
    return (
        <div>
            <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-15 md:mt-6 mt-4 text-black">
                <p className="xl:text-5xl md:text-3xl text-xl font-semibold text-shadow-lg text-center">
                    โครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ
                </p>

                <div className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                    <p>
                        วันจันทร์ ที่ 3 มีนาคม 2568
                    </p>
                    <p className="lg:mt-10 md:mt-6 mt-4 md:text-base text-xs">
                        ว่าที่ร้อยตรีณัทกร ธงสอาด ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ
                        พร้อมด้วยข้าราชการและเจ้าหน้าที่ ร่วมกับคณะครุศาสตร์อุตสาหกรรมและเทคโนโลยี สาขาวิชาเทคโนโลยีการพิมพ์และบรรจุภัณฑ์มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี
                        นำโดย ดร.ธนธร ทองสัมฤทธิ์ รศ.ดร.สุชปา เนตรประดิษฐ์ ผศ.ดร.นิทัศน์ ทิพยโสตนัยนา ดร.ญาฐณา ภควัตธนโกศล คุณรัศมี นาคทับทิม คุณเกศินี เขมางกูร คุณธนพนธ์ ตั้งปัญญาวารีกุล
                        คณะอาจารย์และนักศึกษา ร่วมกันจัดกิจกรรม ภายใต้โครงการ “ พิมพ์ฝัน ปั้นอาชีพให้คนพิการ สถานคุ้มครองและพัฒนาคนพิการพระประแดง ”
                        เพื่อส่งเสริมศักยภาพและเปิดโอกาสในการทำงานสร้างรายได้แก่คนพิการ โดยเน้นการฝึกวาดลายเส้น ด้านการพิมพ์ งานออกแบบและเทคโนโลยีการผลิตสื่อสิ่งพิมพ์
                        ณ อาคารอเนกประสงค์ สถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ
                    </p>
                    <p>

                    </p>
                </div>
                <div className="lg:mt-10 md:mt-6 mt-4 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 flex justify-between">
                    <Image src={getSupabaseImage("pic/ActPrint/print1.jpg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print1.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/ActPrint/print2.jpeg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print2.jpeg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/ActPrint/print3.jpg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print3.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/ActPrint/print4.jpg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print4.jpg"))}
                    ></Image>

                    <Image src={getSupabaseImage("pic/ActPrint/print5.jpg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print5.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/ActPrint/print6.jpg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print6.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/ActPrint/print7.jpg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print7.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/ActPrint/print8.jpg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print8.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/ActPrint/print9.jpg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print9.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/ActPrint/print10.jpg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print10.jpg"))}
                    ></Image>
                    <Image src={getSupabaseImage("pic/ActPrint/print11.jpg")} alt="รูปโครงการพิมพ์ฝัน ปั้นอาชีพให้คนพิการ"
                        className="transition delay-50 duration-300 ease-in-out hover:scale-105"
                        width={250} height={100}
                        onClick={() => setOpenImage(getSupabaseImage("pic/ActPrint/print11.jpg"))}
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