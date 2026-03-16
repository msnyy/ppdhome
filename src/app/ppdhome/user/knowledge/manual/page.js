import Image from "next/image";
import { getSupabaseImage } from "@lib/image";

export default function Manual(){
    return(
        <section className="lg:mx-40 md:mx-10 mx-6 md:mt-10 mt-4">
            <p className="lg:text-5xl md:text-4xl text-xl text-center font-semibold md:mb-10 mb-4 text-shadow-lg">
                คู่มือคนพิการ
            </p>
            <Image src={getSupabaseImage("pic/knowledge/manual.png")} alt="รูปคู่มือคนพิการ" width={1400} height={100}></Image>
        </section>
    );
}