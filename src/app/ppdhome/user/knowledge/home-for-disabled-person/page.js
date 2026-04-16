import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
import MotionWrapper from "@components/MotionWrapper";

export const dynamic = "force-dynamic";
export default function GoldCard(){
    return(
        <section className="lg:mx-40 md:mx-10 mx-6 md:mt-10 mt-4 text-black mb-8 flex flex-col items-center justify-center">
            <MotionWrapper>
            <p className="lg:text-4xl md:text-4xl text-xl text-center md:mb-10 mb-4 font-medium text-shadow-lg">
                การรับคนพิการเข้าสถานคุ้มครอง
            </p>
            </MotionWrapper>

            <MotionWrapper>
            <Image src={getSupabaseImage("pic/knowledge/pic1.png")} alt="รูปการรับคนพิการเข้าสถานคุ้มครอง" width={1400} height={100}></Image>
            <Image src={getSupabaseImage("pic/knowledge/pic2.png")} alt="รูปการรับคนพิการเข้าสถานคุ้มครอง" className="lg:mt-4 mt-2" width={1400} height={100}></Image>
            <Image src={getSupabaseImage("pic/knowledge/pic3.png")} alt="รูปการรับคนพิการเข้าสถานคุ้มครอง" className="lg:mt-4 mt-2" width={1400} height={100}></Image>
        </MotionWrapper>
        </section>
    );
}