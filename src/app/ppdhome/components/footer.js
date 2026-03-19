"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const [visitor, setVisitor] = useState({ total: 0, today: 0 });


    useEffect(() => {

        // 🔥 ยิง POST เพื่อเพิ่มยอด (ไม่รอผล)
        fetch("/ppdhome/api/visitor", {
            method: "POST",
            keepalive: true
        });

        // 🔥 ดึงข้อมูลมาแสดง
        fetch("/ppdhome/api/visitor")
            .then(res => res.json())
            .then(data => setVisitor(data));

    }, []);



    const pathname = usePathname();
    if (pathname === "/ppdhome/admin/login") return null;
    if (pathname === "/ppdhome/admin/allCreate") return null;
    if (pathname === "/ppdhome/admin/newCreate") return null;
    if (pathname === "/ppdhome/admin/publicCreate") return null;
    if (pathname === "/ppdhome/admin/product") return null;
    if (pathname === "/ppdhome/admin/newsAndPublicCreate") return null;
    if (pathname === "/ppdhome/admin/banner") return null;

    return (
        <footer>
            <section className="bg-pink-100 p-8 md:px-12 xl:m-10 md:m-8 m-4 xl:mx-20 rounded-3xl text-black">
                <div>
                    <Link href="./home" className="flex items-center gap-3">
                        <Image src="/pic/logo.png" alt="ตราสถาบัน" width={700} height={200} />
                    </Link>
                </div>

                <div className="flex justify-between">
                    <div className="flex justify-between mt-4 md:mt-12">
                        <div>
                            <div className="md:text-base text-xs">
                                <p>ที่ตั้ง : </p>
                                <p>เลขที่ 374 ถนนศรีเขื่อนขันธ์ ตำบลตลาด อำเภอพระประแดง จังหวัดสมุทรปราการ 10130</p>
                            </div>
                            <div className="mt-4 md:mt-8 md:text-base text-xs">
                                <p>โทรศัพท์: 0-2462-5232</p>
                            </div>
                            <div className="mt-4 md:mt-8 md:text-base text-xs">
                                <p>อีเมล:</p>
                                <p>bpd.dep374@gmail.com, </p>
                                <p>
                                    baanphrapradaeng@dep.go.th
                                </p>

                                <Link
                                    href="/ppdhome/admin/login"
                                    className="block mt-6 text-xs hover:text-gray-700"
                                >
                                    สำหรับเจ้าหน้าที่
                                </Link>

                            </div>
                            <div className="md:hidden text-xs mt-4">
                                <p>Today's visitors: {visitor.todayViews}</p>
                                <p>Total visitors: {visitor.totalViews}</p>

                                <div className="md:gap-2">
                                    <a href={"https://www.facebook.com/profile.php?id=61556123048228"} className="flex hover:text-rose-700 mt-4">
                                        <svg className="md:w-13 md:h-11 w-10 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                            <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
                                        </svg>
                                        <p className="lg:mt-3 ms-2">สถานคุ้มครองและพัฒนาคนพิการ พระประแดง</p>
                                    </a>

                                    <a href={"https://www.tiktok.com/@._dep3?_t=ZS-8upw3waHByR&_r=1"} className="flex hover:text-rose-700 mt-4 ms-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-tiktok md:w-8 md:h-8 w-7 h-6" viewBox="0 0 16 16">
                                            <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                        </svg>
                                        <p className="lg:mt-3 lg:ms-4 ms-2">สคพ.พระประแดงสมุทรปราการ_Dep</p>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col items-end justify-end lg:ms-80 hidden md:block md:mt-12">
                        <div className="md:text-base text-right">
                            <p>Today's visitors: {visitor.todayViews}</p>
                            <p>Total visitors: {visitor.totalViews}</p>
                        </div>
                        <div className="mt-10">
                            <a href={"https://www.facebook.com/profile.php?id=61556123048228"} className="flex hover:text-rose-700 mt-4">
                                <svg className="md:w-13 md:h-11 w-10 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                                    <path d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z" />
                                </svg>
                                <p className="lg:mt-3 ms-2">สถานคุ้มครองและพัฒนาคนพิการ พระประแดง</p>
                            </a>

                            <a href={"https://www.tiktok.com/@._dep3?_t=ZS-8upw3waHByR&_r=1"} className="flex hover:text-rose-700 mt-4 ms-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-tiktok md:w-8 md:h-8 w-7 h-6" viewBox="0 0 16 16">
                                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                                </svg>
                                <p className="lg:mt-3 lg:ms-4 ms-2">สคพ.พระประแดงสมุทรปราการ_Dep</p>
                            </a>

                        </div>
                    </div>
                </div>
            </section>
        </footer>

    );
}