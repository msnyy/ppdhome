import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
export const dynamic = "force-dynamic";

export default function AboutBoard() {
    return (
        <div className="flex bg-white justify-center lg:mx-20 md:mx-9 mx-4 lg:my-10 my-4 md:py-10 py-4 rounded-xl">
            <div className="flex flex-col">
                <p className="font-semibold text-center xl:text-5xl md:text-3xl text-xl font-semibold text-shadow-lg">โครงสร้างผู้บริหาร</p>
            <div className="flex flex-col items-center lg:mt-10 mt-4">
                <Image src={getSupabaseImage("pic/parent.jpeg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl lg:w-[250px] lg:h-[310px] md:w-[150px] md:h-[200px] w-[100px] h-[130px]"></Image>
                <p className="xl:text-3xl md:text-2xl text-lg md:mt-4 mt-2 font-semibold text-shadow-lg">ว่าที่ร้อยตรีณัทกร ธงสอาด</p>
                <p className="lg:mt-2 mt-1 md:text-base text-xs font-semibold">ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการ</p>
                <p className="lg:mt-2 mt-1 md:text-base text-xs font-semibold">พระประแดง จังหวัดสมุทรปราการ</p>
            </div>

            <div className="hidden md:block">
            <div className="flex justify-between lg:gap-14 md:gap-6 lg:mt-10 md:mt-6 mt-4 lg:mx-0 mx-4">
                <div className="flex flex-col items-center">
                <Image src={getSupabaseImage("pic/supaporn.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl"></Image>
                <p className="xl:text-3xl md:text-lg text-xl mt-4 font-semibold text-shadow-lg">สุภาพร ประทุมสังข์</p>
                <p className="mt-2 lg:text-base text-sm font-semibold text-center">นักสังคมสงเคาระห์ชำนาญการ</p>
                <p className="text-center lg:text-base text-sm">หัวหน้าฝ่ายบริหาร</p>
            </div>
            <div className="flex flex-col items-center">
                <Image src={getSupabaseImage("pic/watcharapan.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl"></Image>
                <p className="xl:text-3xl md:text-lg text-xl mt-4 font-semibold text-shadow-lg">วัชรพัฒน์ หน่อเพ็ชร</p>
                <p className="mt-2 lg:text-base text-sm font-semibold text-center">นักพัฒนาสังคมปฎิบัติการ</p>
                <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มคุ้มครองคนพิการ</p>
            </div>
            <div className="flex flex-col items-center">
                <Image src={getSupabaseImage("pic/tanakorn.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl"></Image>
                <p className="xl:text-3xl md:text-lg text-xl mt-4 font-semibold text-shadow-lg">ธนกร สุขรมย์</p>
                <p className="mt-2 lg:text-base text-sm font-semibold text-center">พยาบาลวิชาชีพชำนาญการ</p>
                <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มพัฒนาคนพิการ</p>
            </div>
            <div className="flex flex-col items-center">
                <Image src={getSupabaseImage("pic/watcharapan.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl"></Image>
                <p className="xl:text-3xl md:text-lg text-xl mt-4 font-semibold text-shadow-lg">วัชรพัฒน์ หน่อเพ็ชร์</p>
                <p className="mt-2 lg:text-base text-sm font-semibold text-center">นักพัฒนาสังคมปฎิบัติการ</p>
                <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มมาตรการและกลไก</p>
            </div>
            </div>
            </div>

            <div className="md:hidden">
            <div className="flex flex-col mt-4 mx-4">
                <div className="flex flex-col items-center">
                <Image src={getSupabaseImage("pic/supaporn.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl w-[100px] h-[110px]"></Image>
                <p className="xl:text-3xl md:text-lg text-xl mt-4 font-semibold text-shadow-lg">สุภาพร ประทุมสังข์</p>
                <p className="mt-2 lg:text-base text-sm font-semibold text-center">นักสังคมสงเคาระห์ชำนาญการ</p>
                <p className="text-center lg:text-base text-sm">หัวหน้าฝ่ายบริหาร</p>
            </div>
            <div className="flex flex-col items-center mt-4">
                <Image src={getSupabaseImage("pic/watcharapan.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl w-[100px] h-[110px]"></Image>
                <p className="xl:text-3xl md:text-lg text-xl mt-4 font-semibold text-shadow-lg">วัชรพัฒน์ หน่อเพ็ชร</p>
                <p className="mt-2 lg:text-base text-sm font-semibold text-center">นักพัฒนาสังคมปฎิบัติการ</p>
                <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มคุ้มครองคนพิการ</p>
            </div>
            <div className="flex flex-col items-center mt-4">
                <Image src={getSupabaseImage("pic/tanakorn.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl w-[100px] h-[110px]"></Image>
                <p className="xl:text-3xl md:text-lg text-xl mt-4 font-semibold text-shadow-lg">ธนกร สุขรมย์</p>
                <p className="mt-2 lg:text-base text-sm font-semibold text-center">พยาบาลวิชาชีพชำนาญการ</p>
                <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มพัฒนาคนพิการ</p>
            </div>
            <div className="flex flex-col items-center mt-4">
                <Image src={getSupabaseImage("pic/watcharapan.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl w-[100px] h-[110px]"></Image>
                <p className="xl:text-3xl md:text-lg text-xl mt-4 font-semibold text-shadow-lg">วัชรพัฒน์ หน่อเพ็ชร์</p>
                <p className="mt-2 lg:text-base text-sm font-semibold text-center">นักพัฒนาสังคมปฎิบัติการ</p>
                <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มมาตรการและกลไก</p>
            </div>
            </div>
            </div>

            </div>
        </div>
    );
}