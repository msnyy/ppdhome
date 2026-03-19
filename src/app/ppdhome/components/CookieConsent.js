"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const cookie = localStorage.getItem("cookie_consent");
        if (!cookie) {
            setShow(true);
        }
    }, []);

    const acceptCookie = () => {
        localStorage.setItem("cookie_consent", "true");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-400 z-[9999]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4">

                <p className="text-sm text-gray-700 text-black">
                    เว็บไซต์ของเราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ คุณสามารถศึกษารายละเอียดได้ที่
                    <a href="/ppdhome/user/aboutAll/privatePolicy" >
                    <span className="text-sm text-pink-700"> นโยบายความเป็นส่วนตัว</span>
                </a>
                </p>
                

                <button
                    onClick={acceptCookie}
                    className="px-5 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                >
                    ยอมรับ
                </button>
            </div>
        </div>
    );
}