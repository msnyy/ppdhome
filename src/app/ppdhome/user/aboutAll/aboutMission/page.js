import MotionWrapper from "@components/MotionWrapper";

export const dynamic = "force-dynamic";
export default function AboutMission() {
    return (
        <div className="text-black bg-pink-100">
            <div className="lg:mx-20 md:mx-10 mx-4 lg:pt-10 md:pt-6 pt-4 px-8 pb-18">
            <div>
                <p className="text-center lg:text-4xl md:text-3xl text-xl font-medium text-shadow-lg">ภารกิจและหน้าที่รับผิดชอบ</p>
            </div>

            <div className="border border-t lg:mt-8 mt-4"></div>

            <div className="flex flex-col lg:flex-row lg:gap-12 ">
                <div className="w-full">
                    <MotionWrapper>
                    <div className="lg:mt-10 mt-4 md:text-base text-xs">
                        <p className="font-semibold">1. การฟื้นฟูสมรรถภาพทางการแพทย์</p>
                        <ul className="list-disc ms-8">
                            <li className="mt-2">ให้บริการดูแลสุขภาพและฟื้นฟูโดยพยาบาลและเจ้าหน้าที่สาธารณสุข</li>
                            <li className="mt-2">มีพยาบาลประจำตลอด 24 ชั่วโมง</li>
                            <li className="mt-2">มีความร่วมมือกับ รพ.บางจาก, สภากาชาดไทย, เทศบาลพระประแดง</li>
                            <li className="mt-2">จัดกิจกรรมด้านสุขภาพ เช่น</li>
                            <li className="ms-6 mt-2">โครงการ "บ้านพระประแดงยุคใหม่ใส่ใจสุขภาพ"</li>
                            <li className="ms-6 mt-2">ตรวจสุขภาพประจำปี / ฉีดวัคซีนไข้หวัดใหญ่</li>
                            <li className="ms-6 mt-2">ให้ความรู้ด้านสุขอนามัย / การช่วยฟื้นคืนชีพ</li>
                            <li className="mt-2">กำลังดำเนินการยกระดับสถานคุ้มครองเป็น “สถานชีวาภิบาล” ตาม พ.ร.บ.สาธารณสุข</li>
                        </ul>
                    </div>
                    </MotionWrapper>

                    <MotionWrapper>
                    <div className="lg:mt-10 mt-4 md:text-base text-xs">
                        <p className="font-semibold">2. การเข้าถึงการศึกษา</p>
                        <ul className="list-disc ms-8">
                            <li className="mt-2">ส่งเสริมการเรียนรู้ร่วมกับ “ศูนย์การศึกษานอกระบบอำเภอพระประแดง”</li>
                            <li className="mt-2">มีการจัดสอนในระดับประถม - มัธยมปลาย</li>
                            <li className="mt-2">มีผู้พิการเข้าร่วมกิจกรรมการศึกษา 20 คน</li>
                            <li className="mt-2">ช่วยให้ผู้พิการพัฒนาทักษะทางสติปัญญาและอารมณ์</li>
                            <li className="mt-2">บางรายสามารถนำความรู้ไปต่อยอดอาชีพและพึ่งพาตนเองได้</li>
                        </ul>
                    </div>
                    </MotionWrapper>

                    <MotionWrapper>
                    <div className="lg:mt-10 mt-4 md:text-base text-xs">
                        <p className="font-semibold">3. การฟื้นฟูสมรรถภาพด้านอาชีพ</p>
                        <ul className="list-disc ms-8">
                            <li className="mt-2">ให้บริการดูแลสุขภาพและฟื้นฟูโดยพยาบาลและเจ้าหน้าที่สาธารณสุข</li>
                            <li className="mt-2">ฝึกอาชีพให้คนพิการ เช่น</li>
                            <li className="ms-6 mt-2">งานสานตะกร้าพลาสติกย่านลิเภา</li>
                            <li className="ms-6 mt-2">เพ้นท์กระเป๋าผ้า</li>
                            <li className="mt-2">มีการจัดหาอุปกรณ์ฝึก / เบี้ยเลี้ยงระหว่างฝึก</li>
                            <li className="mt-2">ส่งเสริมการขายผลิตภัณฑ์ผ่าน</li>
                            <li className="ms-6 mt-2">ตลาดนัด</li>
                            <li className="ms-6 mt-2">งานมหกรรม</li>
                            <li className="ms-6 mt-2">ช่องทางออนไลน์</li>
                            <li className="mt-2">ร่วมมือกับ มูลนิธิและมหาวิทยาลัย (เช่น ม.พระจอมเกล้าธนบุรี) เพื่อพัฒนาทักษะอาชีพอิสระ</li>
                        </ul>
                    </div>
                    </MotionWrapper>
                </div>

                <MotionWrapper>
                <div className="border border-l hidden lg:block h-240"></div>
                </MotionWrapper>

                <div className="w-full">
                    <MotionWrapper>
                    <div className="lg:mt-10 mt-4 md:text-base text-xs">
                        <p className="font-semibold">4. การมีส่วนร่วมในสังคม</p>
                        <ul className="list-disc ms-8">
                            <li className="mt-2">ส่งเสริมให้คนพิการเข้าร่วมกิจกรรมทางสังคม วัฒนธรรม และศาสนา เช่น</li>
                            <li className="ms-6 mt-2">วันสงกรานต์, ลอยกระทง, ส่งท้ายปีเก่า</li>
                            <li className="mt-2">จัด “โครงการพัฒนาทักษะชีวิต” ให้คนพิการฝึกใช้ชีวิตนอกสถาน เช่น</li>
                            <li className="ms-6 mt-2">ฝึกซื้อของ, เดินทาง, เข้าร้านสะดวกซื้อ, ข้ามถนน</li>
                            <li className="mt-2">มีนักสังคมสงเคราะห์ 4 คน ให้บริการผู้พิการ 460 คน (เฉลี่ย 1:115)</li>
                        </ul>
                    </div>
                    </MotionWrapper>

                    <MotionWrapper>
                    <div className="lg:mt-10 mt-4 md:text-base text-xs">
                        <p className="font-semibold">5. การเข้าถึงนโยบายและสิทธิภาครัฐ</p>
                        <ul className="list-disc ms-8">
                            <li className="mt-2">ประสานงานกับสถาบันสิรินธร เพื่อจัดหากายอุปกรณ์ช่วยเหลือ</li>
                            <li className="mt-2">ดำเนินโครงการแก้ไข “ปัญหาสถานะบุคคล”</li>
                            <li className="ms-6 mt-2">พิสูจน์ตัวตน / ทำบัตรประชาชน / สืบหาญาติ</li>
                            <li className="mt-2">คนพิการกว่า 80% ได้รับสิทธิและสวัสดิการตามกฎหมาย</li>
                        </ul>
                    </div>
                    </MotionWrapper>

                    <MotionWrapper>
                    <div className="lg:mt-10 mt-4 md:text-base text-xs">
                        <p className="font-semibold">6. การสื่อสารและเทคโนโลยีสารสนเทศ</p>
                        <ul className="list-disc ms-8">
                            <li className="mt-2">มีระบบโทรศัพท์และแอปฯ Line สำหรับติดต่อญาติ</li>
                            <li className="mt-2">ติดตั้งทีวีในเรือนนอนทุกหลังเพื่อรับข่าวสาร</li>
                            <li className="mt-2">เปิดให้นักศึกษา หน่วยงานภายนอก เข้ามาศึกษาดูงาน</li>
                            <li className="mt-2">สนับสนุนการให้คำปรึกษาและสร้างเครือข่ายช่วยเหลือ</li>
                        </ul>
                    </div>
                    </MotionWrapper>

                    <MotionWrapper>
                    <div className="lg:mt-10 mt-4 md:text-base text-xs">
                        <p className="font-semibold">การสนับสนุนอาชีพและการจ้างงาน</p>
                        <ul className="list-disc ms-8">
                            <li className="mt-2">ฝึกอาชีพให้คนพิการในความดูแลอย่างต่อเนื่อง</li>
                            <li className="mt-2">คนพิการบางส่วนเข้าฝึกตามมาตรา 33 และ 35 (กฎหมายจ้างงานคนพิการ)</li>
                            <li className="mt-2">มีโครงการพระราชดำริ “จักสานย่านลิเภา” ภายใต้มูลนิธิศิลปาชีพ</li>
                            <li className="mt-2">คนพิการในโครงการราว 9.11% ของผู้ช่วยเหลือตนเองได้</li>
                        </ul>
                    </div>
                    </MotionWrapper>
                </div>
                </div>
            </div>
        </div>
    );
}