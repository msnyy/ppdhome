"use client";
export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { getSupabaseImage } from "@lib/image";
import { useState, useEffect, useRef } from "react";
import HomeLatestNews from "@components/HomeLatestNews";
import CookieConsent from "@components/CookieConsent";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const COLORS = ["#F9BED8", "#88B7F1"];

export default function HomePage() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);


  const { scrollY } = useScroll();
  const [open, setOpen] = useState(null);

  const Menu = (name) => {
    setOpen((prev) => (prev === name ? null : name));
  };

  const opacityProfile = useTransform(scrollY, [0, 300], [1, 0]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch("/ppdhome/api/banner");
        const data = await res.json();

        const bannerList = Array.isArray(data)
          ? data
          : data.data || data.items || [];

        setBanners(bannerList);

      } catch (err) {
        console.error("โหลด banner ไม่สำเร็จ", err);
        setBanners([]);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="flex min-h-screen font-sansn text-black">
      <main className="relative flex min-h-screen w-full flex-col sm:items-start bg-cover ">

        <section className="relative w-full xl:mb-10 mb-4">
          <button
            ref={prevRef}
            className="absolute hidden lg:block left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 w-12 h-12 rounded-full bg-pink-100
        flex items-center justify-center shadow-md hover:bg-pink-200 transition"
          >
            <svg
              className="w-7 h-7 ms-2 text-pink-600 rotate-180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>

          <button
            ref={nextRef}
            className="absolute hidden lg:block right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 w-12 h-12 rounded-full bg-pink-100
        flex items-center justify-center shadow-md hover:bg-pink-200 transition"
          >
            <svg
              className="w-7 h-7 ms-2 text-pink-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            className="banner-swiper h-[220px] md:h-[350px] lg:h-[550px] xl:h-[670px] overflow-visible z-0"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>

                <Link href={banner.link}>
                  <img src={banner.image_url} />
                </Link>

              </SwiperSlide>
            ))}
          </Swiper>

        </section>

        <section className="lg:mx-20 md:mx-10 mx-4">
          <HomeLatestNews />
        </section>

        <section className="relative w-full text-black">
          <div className="flex justify-between">
            <div className="flex justify-center bg-[radial-gradient(circle_at_center,_white_0%,_#FDF0F5_40%,_#fbcfe8_70%,_#fbcfe8_100%)] shadow-lg shadow-pink-200/50 w-1/2">
              <div className="flex flex-col justify-center mx-10 mt-40">
                <p className="text-2xl font-semibold text-shadow-lg">สถานคุ้มครองและพัฒนาคนพิการ พระประแดง จ.สมุทรปราการ</p>
                <p className="text-xl font-semibold text-shadow-lg mt-4">PHRAPRADAENG HOME FOR PERSONS WITH</p>
                <p className="text-xl font-semibold text-shadow-lg mt-4">DISABILITIES PROTECTION AND DEVELOPMENT</p>
                <p className="text-light text-shadow-lg mt-4">ก่อตั้งขึ้นเพื่อเป็นศูนย์กลางด้านการคุ้มครอง ฟื้นฟู และพัฒนาคนพิการ</p>
                <p className="text-light text-shadow-lg mt-4">โดยมุ่งเน้นการเสริมสร้างศักยภาพและคุณภาพชีวิตให้ดียิ่งขึ้น</p>


                <Link href={`/ppdhome/user/aboutAll/about/page.js`}>
                  <h1 className="mb-8 text-shadow-lg border-b mt-18 w-26 hover:text-pink-700"> View All News </h1>
                </Link>
              </div>
            </div>

            <Image
              src={getSupabaseImage("pic/ppdhome.png")}
              alt="ตราสถาบัน"
              width={700}
              height={200}
              className="h-auto w-1/2"
            />
          </div>

        </section>

        <section className="relative flex flex-col z-10 lg:pb-10 md:pb-8 lg:mt-10 mt-2 w-full bg-transparent lg:mt-18 text-black mb-14">
          <div className="flex justify-between lg:mx-20 md:mx-10 mx-4 lg:gap-18">
            <div className="relative flex flex-col bg-pink-100 shadow-md rounded-xl md:pt-8 pt-4 xl:px-6 px-4 z-10 w-1/2">
              <div className="flex justify-center text-center">
                <p className="xl:text-2xl md:text-xl text-lg font-semibold text-shadow-lg">
                  รายงานข้อมูลสถานการณ์ด้านคนพิการในประเทศไทย
                </p>
              </div>

              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start items-center justify-center">

                  {/* Text */}
                  <div className="flex flex-col md:items-end md:text-right lg:mt-6 md:mt-4">

                    <p className="xl:text-xl md:text-xl text-sm font-light">
                      ข้อมูล ณ วันที่ 1 เดือนกุมภาพันธ์ พ.ศ. 2567
                    </p>

                    <div className="bg-white rounded-xl px-8 py-2 mt-8 shadow-lg">

                      <div className="flex flex-col items-center mt-4 gap-4">
                        <p className="xl:text-3xl md:text-3xl text-lg font-semibold text-black">
                          2,165,127
                        </p>
                        <p className="xl:text-xl md:text-xl text-sm font-light">
                          คนพิการทั่วประเทศ
                        </p>
                      </div>

                      <div className="border-b mt-6"></div>

                      <div className="flex flex-row gap-8 ">
                        <div className="flex flex-col justify-center mt-4">
                          <div className="flex flex-row gap-6">
                            <p className="px-3 bg-pink-200"></p>
                            <p className="text-lg">เพศหญิง</p>
                          </div>

                          <div className="mt-4">
                            <p className="font-semibold text-2xl">1,042,591</p>
                          </div>
                        </div>
                        <div className="border-e"></div>
                        <div className="flex flex-col justify-center mt-4">
                          <div className="flex flex-row gap-6">
                            <p className="px-3 bg-blue-200"></p>
                            <p className="text-lg">เพศชาย</p>
                          </div>

                          <div className="mt-4">
                            <p className="font-semibold text-2xl">1,122,536</p>
                          </div>
                        </div>
                      </div>
                    </div>



                  </div>

                </div>

              </div>
            </div>

            <div className="relative flex flex-col items-center bg-pink-100 shadow-md rounded-xl md:py-10 py-6 w-1/2">
              <p className="text-lg md:text-2xl xl:text-xl font-semibold text-shadow-lg text-center xl:px-6 px-4">
                ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการ
              </p>
              <p className="text-lg md:text-2xl xl:text-xl font-semibold text-shadow-lg text-center md:px-0 px-4">
                พระประแดง จ.สมุทรปราการ
              </p>

              <div className="relative w-full flex flex-col justify-center md:mt-6 mt-4">

                <div className="relative flex flex-col items-center z-10 ">
                  <Image
                    src={getSupabaseImage("pic/parent.jpeg")}
                    alt="รูปผู้ปกครองสถานคุ้มครอง"
                    width={200}
                    height={260}
                    className="object-cover bg-white p-4 rounded-md shadow-md"
                  />

                </div>
                <p className="mt-6 md:text-xl font-light text-sm text-center">ว่าที่ร้อยตรีณัทกร ธงสอาด</p>
              </div>
            </div>
          </div>
        </section>
        <CookieConsent />

      </main>
    </div>
  );
}
