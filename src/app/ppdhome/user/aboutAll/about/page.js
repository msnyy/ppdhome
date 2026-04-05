import Image from "next/image";
import { getSupabaseImage } from "@lib/image";
export const dynamic = "force-dynamic";
export default function AboutInto() {
  return (
    <div className="flex min-h-screen">
      <main className="relative flex min-h-screen w-full flex-col sm:items-start bg-cover">

        <section className="relative flex flex-col z-10 lg:pb-10 w-full rounded-xl text-black">
          <div>
            <Image
              src={getSupabaseImage("pic/ppdhome.png")}
              alt="ตราสถาบัน"
              width={700}
              height={200}
              className="h-auto w-full"
            />
          </div>

          <div className="xl:mx-20 md:mx-9 mx-4 mt-4">
          <div className="flex flex-col lg:my-7 md:my-6 my-4">
            <p className="xl:text-5xl md:text-3xl text-xl text-shadow-lg">ประวัติความเป็นมา</p>
          </div>

          <div className="border border-t"></div>

          <div className="flex justify-between pb-10 space-y-2 md:text-lg text-xs mt-8">
            <div>
              <p>จุดเริ่มต้นและการจัดตั้ง (พ.ศ. 2468-2482)</p>
              <p className="lg:mt-8 md:mt-6 mt-4">ปี 2474 เมืองพระประแดงถูกยุบรวมกับจังหวัดสมุทรปราการ</p>
              <p>
                → “เรือนจำพระประแดง” ถูกปรับเป็นสถานพยาบาลสำหรับผู้ป่วยยากจน
                ชื่อว่า “อนาถาพยาบาล”
              </p>
              <p className="lg:mt-8 md:mt-6 mt-4">
                ปี 2482 โอนจากกระทรวงสาธารณสุขให้กรมประชาสงเคราะห์
                ตั้งเป็น “สถานสงเคราะห์คนพิการและทุพพลภาพพระประแดง”
              </p>

              <p className="lg:mt-8 md:mt-6 mt-4">
                การเปลี่ยนแปลงสังกัดและชื่อ (พ.ศ. 2536-ปัจจุบัน)
              </p>
              <ul className="list-disc ms-4">
                <li>พ.ศ. 2536: ย้ายไปสังกัดกระทรวงแรงงานและสวัสดิการสังคม</li>
                <li>พ.ศ. 2546: ย้ายมาอยู่กระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์</li>
                <li>พ.ศ. 2548: สังกัดกรมส่งเสริมและพัฒนาคุณภาพชีวิตคนพิการ</li>
                <li>พ.ศ. 2549: เปลี่ยนชื่อเป็น “สถานคุ้มครองและพัฒนาคนพิการพระประแดง จังหวัดสมุทรปราการ”</li>
              </ul>
            </div>
          </div>
          </div>
        </section>

        <section className="relative flex flex-col w-full mb-18">
          <div className="lg:mx-20 md:mx-9 mx-4 bg-white md:py-10 py-6 rounded-xl shadow-lg">

          <div className="flex items-center flex-col lg:my-7">
            <p className="xl:text-5xl md:text-3xl text-xl text-shadow-lg text-blue-900">วิสัยทัศน์ พันธ์กิจ ค่านิยม</p>
          </div>

          <div className="lg:pb-10 md:pb-6 space-y-2 text-lg md:mx-12 mx-4 lg:mt-8">
            <div className="flex flex-row justify-between gap-8">
              <div className="text-center w-full">
              <p className="xl:text-4xl md:text-3xl text-xl md:mt-8 mt-4 text-shadow-lg text-blue-900">วิสัยทัศน์</p>
              <p className="lg:text-xl md:text-lg text-xs mt-2 text-black">“เป็นองค์กรคุณธรรม พลังสร้างสุข 3 ส สุขใจ สุขดี สุขจัง"</p>
              </div>

              <div className="border border-r hidden md:block"></div>

              <div className="w-full">
                <p className="xl:text-4xl md:text-3xl text-xl md:mt-8 mt-4 text-shadow-lg text-blue-900 text-center">พันธกิจขององค์กร</p>
                <ul className="list-disc ms-4">
                <li className="lg:text-xl md:text-lg text-xs mt-2 text-black">ส่งเสริมให้คนพิการเข้าถึงสิทธิประโยชน์สวัสดิการ</li>
                <li className="lg:text-xl md:text-lg text-xs mt-2 text-black">ส่งเสริมอํานวยความสะดวกได้อย่างเท่าเทียม</li>
                <li className="lg:text-xl md:text-lg text-xs mt-2 text-black">ส่งเสริม สนับสนุน องค์กรเครือข่าย ในการพัฒนาศักยภาพของคนพิการ</li>
                <li className="lg:text-xl md:text-lg text-xs mt-2 text-black">พัฒนาองค์กรให้เปนบ้านพํานักพักพิงแก่คนพิการ ให้อยู่ร่วมกันอย่างมีความสุข</li>
              </ul>
              </div>

              <div className="border border-r hidden md:block" ></div>

              <div className="text-center w-full">
                <p className="xl:text-4xl md:text-3xl text-xl md:mt-8 mt-4 text-shadow-lg text-blue-900">ค่านิยม</p>
                <p className="lg:text-xl md:text-lg text-xs mt-2 text-black">"เรามาอาศัยโลกนี้ เพื่อทำความดีทุกวันสำหรับความช่วยเหลือ ความเมตตา ความห่วงใย เพื่อมอบความรัก แด่คนพิการทุกท่าน"</p>
              </div>
            </div>

          </div>
          </div>
          
        </section>

      </main>
    </div>
  );
}