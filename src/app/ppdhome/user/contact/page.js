import Image from "next/image";
import { getSupabaseImage } from "@lib/image";

export const dynamic = "force-dynamic";
export default function Contact() {
    return (
        <section className="bg-pink-100 text-black">
            <div className="lg:p-10 md:p-6 p-4 flex md:justify-between md:flex-row flex-col">
                {/* <p className="xl:text-4xl md:text-2xl text-xl text-center font-semibold text-shadow-lg lg:mt-8 md:mt-4 mt-2">
                    สถาบันคุ้มครองและพัฒนาผู้พิการ พระประแดง
                </p> */}


                <div className="w-full">
                    <Image
                        src={getSupabaseImage("pic/ppdhome.jpeg")}
                        alt="ตราสถาบัน"
                        width={1500}
                        height={200}
                        className="h-auto w-full rounded-xl"
                    />
                </div>
                <div className="flex flex-col lg:mx-15 md:mx-10 md:mx-6 mx-2">
                    <div>
                        <p className="xl:text-4xl md:text-2xl text-shadow-lg">
                            Contact Us
                        </p>
                        <div className="flex flex-row gap-4 mt-4">
                            <p className="flex gap-2 lg:text-2xl md:text-xl text-lg font-semibold mt-4">
                                <svg className="w-[35px] h-[35px] md:-mt-4 -mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                                </svg>
                            </p>
                            <div className="flex flex-col">
                                <p className="lg:text-xl md:text-base text-sm font-light mt-3">
                                    เลขที่ 374 ถนนศรีเขื่อนขันธ์ ตำบลตลาด
                                </p>
                                <p className="lg:text-xl md:text-base text-sm font-light">
                                    อำเภอพระประแดง จังหวัดสมุทรปราการ 10130
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row gap-4 lg:mt-10 mt-4">
                            <p className="flex gap-2 lg:text-2xl md:text-xl text-lg font-semibold ">
                                <svg className="w-[35px] h-[35px] md:-mt-2 -mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z" />
                                </svg>
                            </p>
                            <p className="lg:text-xl md:text-base text-sm font-light">
                                0-2462-5232
                            </p>
                        </div>

                        <div className="flex flex-row gap-4 lg:mt-10 mt-4">
                            <p className="flex gap-2 lg:text-2xl md:text-xl text-lg font-semibold mt-1">
                                <svg className="w-[35px] h-[35px] md:-mt-2 -mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                                </svg>
                            </p>

                            <div>
                                <p className="lg:text-xl md:text-base text-sm font-light">
                                    bpd.dep374@gmail.com,
                                </p>
                                <p className="lg:text-xl md:text-base text-sm font-light">
                                    baanphrapradaeng@dep.go.th
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:block mt-8">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.9239755571425!2d100.53514097549534!3d13.662386599356589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a189249a8719%3A0xdd7766e0f030a9d!2z4Liq4LiW4Liy4LiZ4LiE4Li44LmJ4Lih4LiE4Lij4Lit4LiH4LmB4Lil4Liw4Lie4Lix4LiS4LiZ4Liy4LiE4LiZ4Lie4Li04LiB4Liy4Lij4Lie4Lij4Liw4Lib4Lij4Liw4LmB4LiU4LiH!5e0!3m2!1sth!2sth!4v1766567829947!5m2!1sth!2sth"
                                width="500" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-xl w-[400px] h-[200px] md:ms-10 md:mt-8 lg:ms-0 lg:mt-0"></iframe>
                        </div>

                        <div className="lg:mt-4 md:mt-4 mt-3 flex flex row gap-4">
                            <a href={"https://www.facebook.com/profile.php?id=61556123048228"} className="flex hover:text-rose-700 mt-4">
                                <svg className="md:w-13 md:h-11 w-10 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
                                </svg>
                            </a>

                            <a href={"https://www.tiktok.com/@._dep3?_t=ZS-8upw3waHByR&_r=1"} className="flex hover:text-rose-700 mt-6 ms-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-tiktok md:w-8 md:h-8 w-7 h-6" viewBox="0 0 16 16">
                                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                </svg>
                            </a>

                        </div>
                    </div>

                    <div className="md:hidden">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.9239755571425!2d100.53514097549534!3d13.662386599356589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a189249a8719%3A0xdd7766e0f030a9d!2z4Liq4LiW4Liy4LiZ4LiE4Li44LmJ4Lih4LiE4Lij4Lit4LiH4LmB4Lil4Liw4Lie4Lix4LiS4LiZ4Liy4LiE4LiZ4Lie4Li04LiB4Liy4Lij4Lie4Lij4Liw4Lib4Lij4Liw4LmB4LiU4LiH!5e0!3m2!1sth!2sth!4v1766567829947!5m2!1sth!2sth"
                            width="500" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-xl w-[280px] h-[200px] mt-4"></iframe>
                    </div>
                </div>

            </div>
        </section>
    );
}