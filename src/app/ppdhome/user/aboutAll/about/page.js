import Image from "next/image";

export default function AboutInto() {
  return (
    <div className="flex min-h-screen font-sans lg:mt-0 md:mt-4">
      <main className="relative flex min-h-screen w-full flex-col sm:items-start bg-cover xl:mx-20 md:mx-9 mx-4">

        <section className="relative flex flex-col z-10 bg-pink-100 lg:py-10 rounded-xl">
          <div className="flex items-center flex-col mx-5 lg:my-7 md:my-6 my-4">
            <p className="xl:text-5xl md:text-3xl text-xl font-semibold text-shadow-lg">ประวัติความเป็นมา</p>
          </div>

          <div className="lg:hidden flex justify-center">
              <Image className="rounded-xl md:w-[500px] md:h-[300px] w-[250px] h-[150px]" src="/pic/ppdhome.JPG" alt="d" width={500} height={200}></Image>
            </div>

          <div className="flex justify-between px-6 pb-10 space-y-2 md:text-lg text-xs md:mx-12 mx-4 mt-8">
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
            <div className="hidden lg:block xl:ms-80">
              <Image src="/pic/ppdhome.JPG" alt="d" width={400} height={200}></Image>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col z-10 bg-pink-100 md:py-10 py-6 rounded-xl md:mt-10 mt-4">
          <div className="flex items-center flex-col mx-5 lg:my-7">
            <p className="xl:text-5xl md:text-3xl text-xl font-semibold text-shadow-lg text-blue-900">วิสัยทัศน์ พันธ์กิจ ค่านิยม</p>
          </div>

          <div className="flex justify-between px-6 lg:pb-10 md:pb-6 space-y-2 text-lg md:mx-12 mx-4 lg:mt-8">
            <div className="">
              <p className="xl:text-4xl md:text-3xl text-xl md:mt-8 mt-4 font-semibold text-shadow-lg text-blue-900">วิสัยทัศน์</p>
              <p className="lg:text-xl md:text-lg text-xs mt-2">“เป็นองค์กรคุณธรรม พลังสร้างสุข 3 ส สุขใจ สุขดี สุขจัง"</p>
              <p className="xl:text-4xl md:text-3xl text-xl md:mt-8 mt-4 font-semibold font-semibold text-shadow-lg text-blue-900">พันธกิจขององค์กร</p>
              <p className="lg:text-xl md:text-lg text-xs mt-2">ส่งเสริมให้คนพิการเข้าถึงสิทธิประโยชน์สวัสดิการ</p>
              <p className="lg:text-xl md:text-lg text-xs mt-2">ส่งเสริมอํานวยความสะดวกได้อย่างเท่าเทียม</p>
              <p className="lg:text-xl md:text-lg text-xs mt-2">ส่งเสริม สนับสนุน องค์กรเครือข่าย ในการพัฒนาศักยภาพของคนพิการ</p>
              <p className="lg:text-xl md:text-lg text-xs mt-2">พัฒนาองค์กรให้เปนบ้านพํานักพักพิงแก่คนพิการ ให้อยู่ร่วมกันอย่างมีความสุข</p>

              <div className="md:hidden">
              <p className="xl:text-4xl md:text-3xl text-xl md:mt-8 mt-4 font-semibold text-shadow-lg text-blue-900">ค่านิยม</p>
                <p className="lg:text-xl md:text-lg text-xs mt-2">"เรามาอาศัยโลกนี้ เพื่อทำความดีทุกวันสำหรับความช่วยเหลือ ความเมตตา ความห่วงใย เพื่อมอบความรัก แด่คนพิการทุกท่าน"</p>
            </div>
            </div>

            <div className="hidden md:block ms-5">
              <p className="xl:text-4xl md:text-3xl text-xl mt-8 font-semibold text-shadow-lg text-blue-900">ค่านิยม</p>
                <p className="lg:text-xl text-lg mt-2">"เรามาอาศัยโลกนี้ เพื่อทำความดีทุกวันสำหรับความช่วยเหลือ ความเมตตา ความห่วงใย เพื่อมอบความรัก แด่คนพิการทุกท่าน"</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}