"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
    const [mobileServiceJobOpen, setMobileServiceJobOpen] = useState(false);
    const [mobileServiceRehabOpen, setMobileServiceRehabOpen] = useState(false);
    const [mobileServiceMedicalOpen, setMobileServiceMedicalOpen] = useState(false);
    const [mobileKnowledgeOpen, setMobileKnowledgeOpen] = useState(false);

    const handleCloseMenu = () => {
        setMobileOpen(false);
        setMobileAboutOpen(false);
        setMobileServiceOpen(false);
        setMobileServiceJobOpen(false);
        setMobileServiceRehabOpen(false);
        setMobileServiceMedicalOpen(false);
        setMobileKnowledgeOpen(false);
    };

    const [desktopAboutOpen, setDesktopAboutOpen] = useState(false);
    const [desktopServiceOpen, setDesktopServiceOpen] = useState(false);
    const [desktopKnowledgeOpen, setDesktopKnowledgeOpen] = useState(false);
    const [serviceJobOpen, setServiceJobOpen] = useState(false);
    const [serviceRehabOpen, setServiceRehabOpen] = useState(false);
    const [serviceMedicalOpen, setServiceMedicalOpen] = useState(false);


    useEffect(() => {
        const closeAll = () => {
            setDesktopAboutOpen(false);
            setDesktopServiceOpen(false);
            setDesktopKnowledgeOpen(false);
        };

        window.addEventListener("click", closeAll);
        return () => window.removeEventListener("click", closeAll);
    }, []);



    const pathname = usePathname();
    if (pathname === "/ppdhome/admin/login") return null;
    if (pathname === "/ppdhome/admin/allCreate") return null;


    return (
        <header className="inset-x-0 top-0 xl:w-full z-50 text-black z-1000 bg-white">
            <div className="flex justify-between items-center px-4 pt-4">
                <div className="flex items-center px-2 md:px-5 ms-2 md:ms-2">
                    <Link href="/ppdhome/user/home" className="flex items-center gap-3" onClick={handleCloseMenu}>
                        <Image
                            src="/pic/logo.png"
                            alt="ตราสถาบัน"
                            width={700}
                            height={200}
                            className="xl:w-[600px] lg:w-[500px] md:w-[300px] h-auto"
                        />

                    </Link>
                </div>

                <div className="flex items-center gap-3 me-4">
                    {/* ปุ่มเมนูมือถือ */}
                    <button
                        className="lg:hidden py-2 ps-2"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav"
                    >
                        <svg
                            className="w-7 h-7 text-pink-700"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="2"
                                d="M5 7h14M5 12h14M5 17h14"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="hidden lg:flex items-center px-6 lg:px-20">
                <nav className="flex-1 flex">
                    <div className="flex justify-center items-center gap-8 lg:gap-12 w-full rounded-xl py-4">
                        <div className="relative" onMouseEnter={() => setDesktopAboutOpen(true)} onMouseLeave={() => setDesktopAboutOpen(false)}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDesktopAboutOpen((v) => !v);
                                }}
                                className="inline-flex items-center gap-2 font-light text-black transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                            >
                                เกี่ยวกับเรา
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="-6 -8 28 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                                    />
                                </svg>
                            </button>

                            {desktopAboutOpen && (
                                <div
                                    className="absolute flex justify-between left-0 w-60 font-light bg-white shadow-lg z-100"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div>
                                        <Link
                                            href="/ppdhome/user/aboutAll/about"
                                            className="block px-4 py-2 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                        >
                                            ประวัติสถานคุ้มครอง
                                        </Link>
                                        <Link
                                            href="/ppdhome/user/aboutAll/aboutBoard"
                                            className="block px-4 py-2 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                        >
                                            โครงสร้างผู้บริหาร
                                        </Link>


                                        <Link
                                            href="/ppdhome/user/aboutAll/aboutOrganiz"
                                            className="block px-4 py-2 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                        >
                                            โครงสร้างหน่วยงาน
                                        </Link>
                                        <Link
                                            href="/ppdhome/user/aboutAll/aboutMission"
                                            className="block px-4 py-2 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                        >
                                            ภารกิจหลักองค์กร
                                        </Link>

                                        <Link
                                            href="/ppdhome/user/aboutAll/privatePolicy"
                                            className="block px-4 py-2 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                        >
                                            พรบ. คุ้มครองข้อมูลส่วนบุคคล
                                        </Link>
                                    </div>

                                </div>
                            )}
                        </div>


                        <div className="relative">
                            <Link href="/ppdhome/user/newsAndPublic" className="flex items-center gap-2 px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]" >
                                <button className="inline-flex items-center gap-2 text-lg font-light text-black hover:text-pink-700">
                                    ข่าวประชาสัมพันธ์
                                </button>
                            </Link>
                        </div>

                        <div className="relative" onMouseEnter={() => setDesktopServiceOpen(true)} onMouseLeave={() => setDesktopServiceOpen(false)}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDesktopServiceOpen((v) => !v);
                                }} className="inline-flex items-center gap-2 text-lg font-light text-black transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                บริการ
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="-6 -8 28 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                                    />
                                </svg>
                            </button>

                            {desktopServiceOpen && (
                                <div className="absolute left-0 w-60 font-light bg-white shadow-lg z-100"
                                    onClick={(e) => e.stopPropagation()}>
                                    <div
                                        className="relative"
                                        onMouseEnter={() => setServiceJobOpen(true)}
                                        onMouseLeave={() => setServiceJobOpen(false)}
                                    >
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setServiceJobOpen((v) => !v);
                                            }}
                                            className="flex items-center w-full gap-2 px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                        >
                                            กิจกรรมฝึกอาชีพ
                                            <span className="text-xl leading-none">›</span>
                                        </button>

                                        {serviceJobOpen && (
                                            <div
                                                className="absolute left-full top-0 w-60 font-light bg-white shadow-lg z-100"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Link
                                                    href="/ppdhome/user/services/activityPrint"
                                                    className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                                >
                                                    โครงการพิมพ์ฝัน ปั้นอาชีพ
                                                </Link>
                                                <Link
                                                    href="/ppdhome/user/services/activityBasket"
                                                    className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                                >
                                                    กิจกรรมสานตะกร้า
                                                </Link>
                                            </div>
                                        )}
                                    </div>


                                    <div
                                        className="relative"
                                        onMouseEnter={() => setServiceRehabOpen(true)}
                                        onMouseLeave={() => setServiceRehabOpen(false)}
                                    >
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setServiceRehabOpen((v) => !v);
                                            }}
                                            className="flex items-center w-full gap-2 px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                        >
                                            การฟื้นฟูสมรรถภาพ
                                            <span className="text-xl leading-none">›</span>
                                        </button>

                                        {serviceRehabOpen && (
                                            <div className="absolute left-full top-0 w-60 font-light bg-white shadow-lg z-100"
                                                onClick={(e) => e.stopPropagation()}>
                                                <Link href="/ppdhome/user/services/sport" className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                                    การฟื้นฟูสมรรถภาพทางกีฬา
                                                </Link>
                                                <Link href="/ppdhome/user/services/activityPhysical" className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                                    กายภาพบำบัด
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    <Link
                                        href="/ppdhome/user/services/study"
                                        className="flex items-center gap-2 px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                    >
                                        การศึกษา
                                    </Link>

                                    <div
                                        className="relative"
                                        onMouseEnter={() => setServiceMedicalOpen(true)}
                                        onMouseLeave={() => setServiceMedicalOpen(false)}
                                    >
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setServiceMedicalOpen((v) => !v);
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                        >
                                            ทางการแพทย์
                                            <span className="text-xl leading-none">›</span>
                                        </button>

                                        {serviceMedicalOpen && (
                                            <div className="absolute left-full top-0 w-60 font-light bg-white shadow-lg z-100"
                                                onClick={(e) => e.stopPropagation()}>
                                                <Link href="/ppdhome/user/services/medical31" className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                                    กิจกรรมพบแพทย์ในบ้าน
                                                </Link>
                                                <Link href="/ppdhome/user/services/medical58" className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                                    ฟันสวยกับสภากาชาดไทย
                                                </Link>
                                                <Link href="/ppdhome/user/services/medical146" className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                                    ฉีดวัคซีนป้องกันไข้หวัดใหญ่
                                                </Link>
                                                <Link href="/ppdhome/user/services/medical158" className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                                    ตรวจสุขภาพประจำปี 2568
                                                </Link>
                                                <Link href="/ppdhome/user/services/medical179" className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                                    คัดกรองวัณโรคในกลุ่มเสี่ยง
                                                </Link>
                                                <Link href="/ppdhome/user/services/medical204" className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                                    วางแผนจัดการและควบคุมโรคติดต่อ
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>


                        <div className="relative">
                            <button className="inline-flex items-center gap-2 text-lg font-light text-black transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                <Link
                                    href="/ppdhome/user/product"
                                    className="block"
                                >
                                    ผลิตภัณฑ์
                                </Link>
                            </button>
                        </div>

                        <div className="relative" onMouseEnter={() => setDesktopKnowledgeOpen(true)} onMouseLeave={() => setDesktopKnowledgeOpen(false)}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDesktopKnowledgeOpen((v) => !v);
                                }} className="inline-flex items-center gap-2 text-lg font-light text-black transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02] z-90">
                                คลังความรู้
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="-6 -8 28 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                                    />
                                </svg>
                            </button>

                            {desktopKnowledgeOpen && (
                                <div className="absolute left-0 w-60 font-light bg-white shadow-lg z-100"
                                    onClick={(e) => e.stopPropagation()}>
                                    <Link
                                        href="/ppdhome/user/knowledge/manual"
                                        className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                    >
                                        คู่มือคนพิการ
                                    </Link>
                                    <Link
                                        href="/ppdhome/user/knowledge/goldCard"
                                        className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                    >
                                        สิทธิบัตรทอง
                                    </Link>
                                    <Link
                                        href="/ppdhome/user/knowledge/home-for-disabled-person"
                                        className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                    >
                                        การรับคนพิการเข้าสถานคุ้มครอง
                                    </Link>
                                    <Link
                                        href="/ppdhome/user/knowledge/disabled-person-id-card"
                                        className="block px-4 py-2 text-lg transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                                    >
                                        บัตรประจำตัวคนพิการ
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button className="inline-flex items-center gap-2 text-lg font-light text-black transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                                <Link
                                    href="/ppdhome/user/contact"
                                    className="block"
                                >
                                    ติดต่อเรา
                                </Link>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* เมนูมือถือแบบง่าย ๆ */}
            {mobileOpen && (
                <nav
                    id="mobile-nav"
                    className="lg:hidden md: px-6 pb-4 space-y-2 text-gray-800 bg-white mt-4 pt-2"
                >
                    {/* ===== เกี่ยวกับเรา (mobile dropdown) ===== */}
                    <div>
                        <button
                            onClick={() => setMobileAboutOpen((v) => !v)}
                            className="flex w-full items-center justify-between py-2 text-left"
                        >
                            <span>เกี่ยวกับเรา</span>
                        </button>

                        {mobileAboutOpen && (
                            <div className="ml-4 mt-2 space-y-2 text-sm">
                                <Link
                                    href="/ppdhome/user/aboutAll/about"
                                    className="block hover:text-pink-700"
                                    onClick={handleCloseMenu}
                                >
                                    ประวัติสถานคุ้มครอง
                                </Link>

                                <Link
                                    href="/ppdhome/user/aboutAll/aboutBoard"
                                    className="block hover:text-pink-700"
                                    onClick={handleCloseMenu}
                                >
                                    โครงสร้างผู้บริหาร
                                </Link>

                                <Link
                                    href="/ppdhome/user/aboutAll/aboutOrganiz"
                                    className="block hover:text-pink-700"
                                    onClick={handleCloseMenu}
                                >
                                    โครงสร้างหน่วยงาน
                                </Link>

                                <Link
                                    href="/ppdhome/user/aboutAll/aboutMission"
                                    className="block hover:text-pink-700"
                                    onClick={handleCloseMenu}
                                >
                                    ภารกิจหลักองค์กร
                                </Link>
                            </div>
                        )}
                    </div>

                    <button className="block w-full text-left py-2">
                        <Link href="/ppdhome/user/newsAndPublic" className="block" onClick={handleCloseMenu}>
                            ข่าวประชาสัมพันธ์
                        </Link>
                    </button>

                    {/* ===== บริการ (mobile dropdown 2 ชั้น) ===== */}
                    <div>
                        {/* ชั้นที่ 1 */}
                        <button
                            onClick={() => setMobileServiceOpen((v) => !v)}
                            className="flex w-full items-center justify-between py-2 text-left"
                        >
                            <span>บริการ</span>
                        </button>

                        {mobileServiceOpen && (
                            <div className="ml-4 mt-2 space-y-2 text-sm">

                                {/* กิจกรรมฝึกอาชีพ */}
                                <div>
                                    <button
                                        onClick={() => setMobileServiceJobOpen((v) => !v)}
                                        className="flex w-full items-center justify-between py-1"
                                    >
                                        <span>กิจกรรมฝึกอาชีพ</span>
                                    </button>

                                    {mobileServiceJobOpen && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            <Link href="/ppdhome/user/services/activityPrint" className="block hover:text-pink-700" onClick={handleCloseMenu}>
                                                โครงการพิมพ์ฝัน ปั้นอาชีพ
                                            </Link>
                                            <Link href="/ppdhome/user/services/activityBasket" className="block hover:text-pink-700" onClick={handleCloseMenu}>
                                                กิจกรรมสานตะกร้า
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* การฟื้นฟูสมรรถภาพ */}
                                <div>
                                    <button
                                        onClick={() => setMobileServiceRehabOpen((v) => !v)}
                                        className="flex w-full items-center justify-between py-1"
                                    >
                                        <span>การฟื้นฟูสมรรถภาพ</span>
                                    </button>

                                    {mobileServiceRehabOpen && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            <Link href="/ppdhome/user/services/sport" className="block hover:text-pink-700" onClick={handleCloseMenu}>
                                                การฟื้นฟูสมรรถภาพทางกีฬา
                                            </Link>
                                            <Link href="/ppdhome/user/services/activityPhysical" className="block hover:text-pink-700" onClick={handleCloseMenu}>
                                                กายภาพบำบัด
                                            </Link>
                                        </div>
                                    )}
                                </div>

                                {/* การศึกษา */}
                                <Link
                                    href="/ppdhome/user/services/study"
                                    className="block hover:text-pink-700" onClick={handleCloseMenu}
                                >
                                    การศึกษา
                                </Link>

                                {/* ทางการแพทย์ */}
                                <div>
                                    <button
                                        onClick={() => setMobileServiceMedicalOpen((v) => !v)}
                                        className="flex w-full items-center justify-between py-1"
                                    >
                                        <span>ทางการแพทย์</span>
                                    </button>

                                    {mobileServiceMedicalOpen && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            <Link href="/ppdhome/user/services/medical31" className="block hover:text-pink-700" onClick={handleCloseMenu}>
                                                กิจกรรมพบแพทย์ในบ้าน
                                            </Link>
                                            <Link href="/ppdhome/user/services/medical58" className="block hover:text-pink-700" onClick={handleCloseMenu}>
                                                ฟันสวยกับสภากาชาดไทย
                                            </Link>
                                            <Link href="/ppdhome/user/services/medical146" className="block hover:text-pink-700" onClick={handleCloseMenu}>
                                                ฉีดวัคซีนป้องกันไข้หวัดใหญ่
                                            </Link>
                                            <Link href="/ppdhome/user/services/medical158" className="block hover:text-pink-700" onClick={handleCloseMenu}>
                                                ตรวจสุขภาพประจำปี 2568
                                            </Link>
                                            <Link href="/ppdhome/user/services/medical179" className="block hover:text-pink-700" onClick={handleCloseMenu}>
                                                คัดกรองวัณโรคในกลุ่มเสี่ยง
                                            </Link>
                                            <Link href="/ppdhome/user/services/medical204" className="block hover:text-pink-700" onClick={handleCloseMenu}>
                                                วางแผนจัดการและควบคุมโรคติดต่อ
                                            </Link>
                                        </div>
                                    )}
                                </div>

                            </div>
                        )}
                    </div>


                    <button className="block w-full text-left py-2">
                        <Link
                            href="/ppdhome/user/product"
                            className="block" onClick={handleCloseMenu}
                        >
                            ผลิตภัณฑ์
                        </Link></button>

                    {/* ===== คลังความรู้ (mobile dropdown) ===== */}
                    <div>
                        <button
                            onClick={() => setMobileKnowledgeOpen((v) => !v)}
                            className="flex w-full items-center justify-between py-2 text-left"
                        >
                            <span>คลังความรู้</span>
                        </button>

                        {mobileKnowledgeOpen && (
                            <div className="ml-4 mt-2 space-y-2 text-sm">
                                <Link
                                    href="/ppdhome/user/knowledge/manual"
                                    className="block hover:text-pink-700"
                                    onClick={handleCloseMenu}
                                >
                                    คู่มือคนพิการ
                                </Link>

                                <Link
                                    href="/ppdhome/user/knowledge/goldCard"
                                    className="block hover:text-pink-700"
                                    onClick={handleCloseMenu}
                                >
                                    สิทธิบัตรทอง
                                </Link>
                                <Link
                                    href="/ppdhome/user/knowledge/home-for-disabled-person"
                                    className="block hover:text-pink-700" onClick={handleCloseMenu}
                                >
                                    การรับคนพิการเข้าสถานคุ้มครอง
                                </Link>
                                <Link
                                    href="/ppdhome/user/knowledge/disabled-person-id-card"
                                    className="block hover:text-pink-700" onClick={handleCloseMenu}
                                >
                                    บัตรประจำตัวคนพิการ
                                </Link>
                            </div>
                        )}
                    </div>


                    <button className="block w-full text-left py-2">
                        <Link
                            href="/ppdhome/user/contact"
                            className="block" onClick={handleCloseMenu}
                        >
                            ติดต่อเรา
                        </Link>
                    </button>
                </nav>
            )}
        </header>
    );
}
