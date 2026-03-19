import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
export const dynamic = "force-dynamic";
export default function GoldCard(){
    return(
        <section className="lg:mx-40 md:mx-10 mx-6 md:mt-10 mt-4 text-black">
            <p className="lg:text-5xl md:text-4xl text-xl text-center font-semibold md:mb-10 mb-4 text-shadow-lg">
                สิทธิบัตรทอง
            </p>
            <Image src={getSupabaseImage("pic/knowledge/goldCard.jpg")} alt="รูปสิทธิบัตรทอง" width={1400} height={100}></Image>
        </section>
    );
}