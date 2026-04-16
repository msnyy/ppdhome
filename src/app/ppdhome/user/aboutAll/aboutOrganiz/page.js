"use client";
import Image from "next/image";
import MotionWrapper from "@components/MotionWrapper";
import { useState } from "react";
import { getSupabaseImage } from "@lib/image";
export const dynamic = "force-dynamic";

export default function AboutOrganiz() {
    const [open, setOpen] = useState(false);

    return (
        <section>
            <div className="flex flex-col items-center bg-white lg:mx-20 md:mx-9 mx-4 lg:mt-10 md:mt-6 mt-4 rounded-xl lg:py-10 md:py-6 py-4 shadow-lg mb-10 text-black">
                <MotionWrapper>
                    <p className="lg:text-4xl md:text-3xl text-xl font-medium text-shadow-lg text-center">โครงสร้างหน่วยงาน</p>
                    <Image src={getSupabaseImage("pic/Organniz.jpg")} alt="โครงสร้างองค์กร" width={1200} height={700}
                    onClick={() => setOpen(true)} className="lg:mt-10 md:mt-6 mt-4"></Image>
                </MotionWrapper>
            </div>

            {open && (
                <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setOpen(false)}>
                    <img
                        src={getSupabaseImage("pic/Organniz.jpg")}
                        className="max-w-[90%] max-h-[90%] rounded-lg"
                    />
                </div>
            )}
        </section>
    )
}