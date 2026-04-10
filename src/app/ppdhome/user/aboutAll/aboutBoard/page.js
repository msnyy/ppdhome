import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
import MotionWrapper from "@components/MotionWrapper";

export const dynamic = "force-dynamic";

export default function AboutBoard() {
    return (
        <div className="flex bg-white justify-center lg:mx-20 md:mx-9 mx-4 lg:my-10 my-4 md:py-10 py-4 rounded-xl text-black shadow-lg">
            <div className="flex flex-col">
                <MotionWrapper>
                <p className="text-center xl:text-4xl md:text-3xl text-xl text-shadow-lg">โครงสร้างผู้บริหาร</p>
                </MotionWrapper>

                <div className="flex flex-col items-center text-center lg:mt-10 mt-4">
                    <MotionWrapper>
                    <Image src={getSupabaseImage("pic/parent.jpeg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl mx-auto lg:w-[250px] lg:h-[310px] md:w-[150px] md:h-[200px] w-[100px] h-[130px]"></Image>
                    <p className="md:text-2xl text-lg md:mt-4 mt-2 text-shadow-lg">ว่าที่ร้อยตรีณัทกร ธงสอาด</p>
                    <p className="lg:mt-2 mt-1 md:text-base text-xs">ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการ</p>
                    <p className="lg:mt-2 mt-1 md:text-base text-xs">พระประแดง จังหวัดสมุทรปราการ</p>
                    </MotionWrapper>
                </div>

                <div className="hidden md:block">
                    <div className="flex justify-between lg:gap-14 md:gap-6 lg:mt-10 md:mt-6 mt-4 lg:mx-0 mx-4">
                        <div className="flex flex-col items-center">
                            <MotionWrapper>
                            <Image src={getSupabaseImage("pic/supaporn.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl w-[250px] h-[300px]"></Image>
                            <p className="xl:text-xl md:text-lg text-xl mt-4 text-shadow-lg text-center">สุภาพร ประทุมสังข์</p>
                            <p className="mt-2 lg:text-base text-sm text-center">นักสังคมสงเคาระห์ชำนาญการ</p>
                            <p className="text-center lg:text-base text-sm">หัวหน้าฝ่ายบริหาร</p>
                            </MotionWrapper>
                        </div>
                        <div className="flex flex-col items-center">
                            <MotionWrapper>
                            <Image src={getSupabaseImage("pic/supaporn.jpg")} alt="รูปนักสังคมสงเคาระห์ชำนาญการ" width={250} height={100} className="rounded-xl w-[250px] h-[300px]"></Image>
                            <p className="xl:text-xl md:text-lg text-xl mt-4 text-shadow-lg text-center">สุภาพร ประทุมสังข์</p>
                            <p className="mt-2 lg:text-base text-sm text-center">นักสังคมสงเคาระห์ชำนาญการ</p>
                            <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มคุ้มครองคนพิการ</p>
                            </MotionWrapper>
                        </div>
                        <div className="flex flex-col items-center">
                            <MotionWrapper>
                            <Image src={getSupabaseImage("pic/tanakorn.jpg")} alt="รูปพยาบาลวิชาชีพชำนาญการ" width={250} height={100} className="rounded-xl w-[250px] h-[300px]"></Image>
                            <p className="xl:text-xl md:text-lg text-xl mt-4 text-shadow-lg text-center">ธนกร สุขรมย์</p>
                            <p className="mt-2 lg:text-base text-sm text-center">พยาบาลวิชาชีพชำนาญการ</p>
                            <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มพัฒนาคนพิการ</p>
                            </MotionWrapper>
                        </div>
                        <div className="flex flex-col items-center">
                            <MotionWrapper>
                            <Image src={getSupabaseImage("pic/angkana.jpg")} alt="รูปนักสังคมสงเคาระห์ชำนาญการ" width={250} height={100} className="rounded-xl w-[250px] h-[300px]"></Image>
                            <p className="xl:text-xl md:text-lg text-xl mt-4 text-shadow-lg text-center">อังคณา ศรีโต</p>
                            <p className="mt-2 lg:text-base text-sm text-center">นักสังคมสงเคาระห์ชำนาญการ</p>
                            <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มมาตรการและกลไก</p>
                            </MotionWrapper>
                        </div>
                    </div>
                </div>

                <div className="md:hidden">
                    <div className="flex flex-col mt-4 mx-4">
                        <div className="flex flex-col justify-center items-center text-center">
                            <MotionWrapper>
                            <Image src={getSupabaseImage("pic/supaporn.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl w-[100px] h-[110px] mx-auto"></Image>
                            <p className="xl:text-2xl md:text-lg text-xl mt-4 text-shadow-lg">สุภาพร ประทุมสังข์</p>
                            <p className="mt-2 lg:text-base text-sm text-center">นักสังคมสงเคาระห์ชำนาญการ</p>
                            <p className="text-center lg:text-base text-sm">หัวหน้าฝ่ายบริหาร</p>
                            </MotionWrapper>
                        </div>
                        <div className="flex flex-col items-center mt-4 text-center">
                            <MotionWrapper>
                            <Image src={getSupabaseImage("pic/supaporn.jpg")} alt="รูปนักสังคมสงเคาระห์ชำนาญการ" width={250} height={100} className="rounded-xl w-[100px] h-[110px] mx-auto"></Image>
                            <p className="xl:text-2xl md:text-lg text-xl mt-4 text-shadow-lg">สุภาพร ประทุมสังข์</p>
                            <p className="mt-2 lg:text-base text-sm text-center">นักพัฒนาสังคมปฎิบัติการ</p>
                            <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มคุ้มครองคนพิการ</p>
                            </MotionWrapper>
                        </div>
                        <div className="flex flex-col items-center mt-4 text-center">
                            <MotionWrapper>
                            <Image src={getSupabaseImage("pic/tanakorn.jpg")} alt="รูปผู้ปกครอง" width={250} height={100} className="rounded-xl w-[100px] h-[110px] mx-auto"></Image>
                            <p className="xl:text-2xl md:text-lg text-xl mt-4 text-shadow-lg">ธนกร สุขรมย์</p>
                            <p className="mt-2 lg:text-base text-sm text-center">พยาบาลวิชาชีพชำนาญการ</p>
                            <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มพัฒนาคนพิการ</p>
                            </MotionWrapper>
                        </div>
                        <div className="flex flex-col items-center mt-4 text-center">
                            <MotionWrapper>
                            <Image src={getSupabaseImage("pic/angkana.jpg")} alt="รูปนักสังคมสงเคาระห์ชำนาญการ" width={250} height={100} className="rounded-xl w-[100px] h-[110px] mx-auto object-cover"></Image>
                            <p className="xl:text-2xl md:text-lg text-xl mt-4 text-shadow-lg">อังคณา ศรีโต</p>
                            <p className="mt-2 lg:text-base text-sm text-center">นักพัฒนาสังคมปฎิบัติการ</p>
                            <p className="text-center lg:text-base text-sm">ผู้อำนวยการกลุ่มมาตรการและกลไก</p>
                            </MotionWrapper>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}