import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
export const dynamic = "force-dynamic";

export default function AboutOrganiz() {
    return(
        <section>
            <div className="flex flex-col items-center bg-white lg:mx-20 md:mx-9 mx-4 lg:mt-10 md:mt-6 mt-4 rounded-xl lg:py-10 md:py-6 py-4 shadow-lg mb-10 text-black">
                <p className="lg:text-5xl md:text-3xl text-xl text-shadow-lg text-center">โครงสร้างหน่วยงาน</p>
                <Image src={getSupabaseImage("pic/organiz.jpg")} alt="โครงสร้างองค์กร" width={1200} height={700} className="lg:mt-10 md:mt-6 mt-4"></Image>
            </div>
        </section>
    )
}