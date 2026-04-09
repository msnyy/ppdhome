"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const [visitor, setVisitor] = useState({ totalViews: 0, todayViews: 0 });

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("visited");

        // ✅ นับเฉพาะครั้งแรกของ session
        if (!hasVisited) {
            fetch("/ppdhome/api/visitor", {
                method: "POST",
                keepalive: true
            });

            sessionStorage.setItem("visited", "true");
        }

        // 👉 ดึงข้อมูลมาแสดง
        fetch("/ppdhome/api/visitor")
            .then(res => res.json())
            .then(data => setVisitor(data));

    }, []);

    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);



    const hiddenPaths = [
        "/ppdhome/admin/login",
        "/ppdhome/admin/allCreate",
        "/ppdhome/admin/newCreate",
        "/ppdhome/admin/publicCreate",
        "/ppdhome/admin/product",
        "/ppdhome/admin/newsAndPublicCreate",
        "/ppdhome/admin/banner",
    ];

    if (!mounted) return null;
    if (hiddenPaths.includes(pathname)) return null;

    return (
        <footer className="bg-white p-8 lg:px-20 text-black">

            <div className="flex flex-row justify-between gap-10">
                <div className="flex justify-between w-3/5">
                    <div>
                        <div>
                            <Link href="./home" className="flex items-center gap-3">
                                <Image src="/pic/logo.png" alt="ตราสถาบัน" width={600} height={200} />
                            </Link>
                        </div>

                        <div className="lg:text-base md:text-sm text-xs flex flex-row lg:gap-4 gap-2 mt-8">
                            <svg className="lg:w-[30px] lg:h-[30px] md:w-[26px] md:h-[26px] w-[20px] h-[20px] -mt-1 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                            </svg>
                            <div className="flex flex-col">
                                <p>เลขที่ 374 ถนนศรีเขื่อนขันธ์ ตำบลตลาด</p>
                                <p>อำเภอพระประแดง จังหวัดสมุทรปราการ 10130</p>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-8 lg:text-base md:text-sm text-xs flex flex-row lg:gap-4 gap-2">
                            <svg className="lg:w-[30px] lg:h-[30px] md:w-[26px] md:h-[26px] w-[20px] h-[20px] md:-mt-2 -mt-1 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.427 14.768 17.2 13.542a1.733 1.733 0 0 0-2.45 0l-.613.613a1.732 1.732 0 0 1-2.45 0l-1.838-1.84a1.735 1.735 0 0 1 0-2.452l.612-.613a1.735 1.735 0 0 0 0-2.452L9.237 5.572a1.6 1.6 0 0 0-2.45 0c-3.223 3.2-1.702 6.896 1.519 10.117 3.22 3.221 6.914 4.745 10.12 1.535a1.601 1.601 0 0 0 0-2.456Z" />
                            </svg>
                            <p>0-2462-5232</p>
                        </div>
                        <div className="mt-4 md:mt-8 lg:text-base md:text-sm text-xs flex flex-row lg:gap-4 gap-2">
                            <svg className="lg:w-[30px] lg:h-[30px] md:w-[26px] md:h-[26px] w-[20px] h-[20px] -mt-1 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                            </svg>

                            <div className="flex flex-col">
                                <p>bpd.dep374@gmail.com, </p>
                                <p>
                                    baanphrapradaeng@dep.go.th
                                </p>
                            </div>

                        </div>


                        {/* moblie */}
                        <div className="md:hidden text-xs mt-8 mb-4">
                            <div className="lg:me-16 w-full">
                                <p className="lg:text-2xl text-xl">Website Menu</p>
                                <div className="mt-3 lg:text-base md:text-sm text-xs">
                                    <a href="/ppdhome/user/home">หน้าหลัก</a>
                                    <a href="/ppdhome/user/aboutAll/about" className="mt-1">เกี่ยวกับเรา</a>
                                    <a href="/ppdhome/user/newsAndPublic" className="mt-1">ข่าวประชาสัมพันธ์</a>
                                    <a href="/ppdhome/user/services/activityPrint" className="mt-1">บริการ</a>
                                    <a href="/ppdhome/user/product" className="mt-1">ผลิตภัณฑ์</a>
                                    <a href="/ppdhome/user/knowledge/manual" className="mt-1">คลังความรู้</a>
                                    <a href="/ppdhome/user/contact" className="mt-1">ติดต่อเรา</a>
                                </div>
                            </div>

                            <p className="text-xs mt-8">Today's visitors: {visitor.todayViews}</p>
                            <p className="text-xs">Total visitors: {visitor.totalViews}</p>

                            <div className="md:gap-2 mt-4 flex">
                                <a href={"https://www.facebook.com/profile.php?id=61556123048228"} className="flex mt-2">
                                    <svg className="md:w-13 md:h-11 w-10 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                        <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
                                    </svg>
                                </a>

                                <a href={"https://www.tiktok.com/@._dep3?_t=ZS-8upw3waHByR&_r=1"} className="flex mt-3 ms-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-tiktok md:w-8 md:h-8 w-7 h-6" viewBox="0 0 16 16">
                                        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border-e h-75 hidden md:block"></div>

                <div className="w-1/5 hidden md:block ms-10">
                    <p className="lg:text-2xl text-xl">Website Menu</p>
                    <div className="mt-3 lg:text-base md:text-sm text-xs flex flex-col">
                        <a href="/ppdhome/user/home" className="text-black transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]" >
                                หน้าหลัก
                            </a>
                        <a href="/ppdhome/user/aboutAll/about" className="mt-1 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">เกี่ยวกับเรา</a>
                        <a href="/ppdhome/user/newsAndPublic" className="mt-1 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">ข่าวประชาสัมพันธ์</a>
                        <a href="/ppdhome/user/services/activityPrint" className="mt-1 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">บริการ</a>
                        <a href="/ppdhome/user/product" className="mt-1 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">ผลิตภัณฑ์</a>
                        <a href="/ppdhome/user/knowledge/manual" className="mt-1 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">คลังความรู้</a>
                        <a href="/ppdhome/user/contact" className="mt-1 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">ติดต่อเรา</a>
                    </div>
                </div>

                <div className="border-e lg:ms-10 hidden md:block"></div>

                <div className="flex flex-col hidden md:block w-1/5">
                    <div className="lg:text-base md:text-sm text-xs">
                        <p>Today's visitors: {visitor.todayViews}</p>
                        <p className="mt-4">Total visitors: {visitor.totalViews}</p>
                    </div>
                    <div className="flex flex-row mt-30">
                        <a href={"https://www.facebook.com/profile.php?id=61556123048228"} className="flex mt-4">
                            <svg className="md:w-13 md:h-11 w-10 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
                            </svg>
                        </a>

                        <a href={"https://www.tiktok.com/@._dep3?_t=ZS-8upw3waHByR&_r=1"} className="flex mt-6 ms-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-tiktok md:w-8 md:h-8 w-7 h-6" viewBox="0 0 16 16">
                                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                            </svg>
                        </a>

                    </div>
                </div>
            </div>

            <div className="border-b"></div>

            <div className="flex justify-center mt-8 lg:text-base md:text-sm text-xs">
                <p>@ 2026  สถานคุ้มครองและพัฒนาคนพิการ พระประแดง All Rights Reserves</p>
            </div>
        </footer>

    );
}