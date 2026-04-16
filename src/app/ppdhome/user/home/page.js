"use client";
export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { getSupabaseImage } from "@lib/image";
import { useState, useEffect, useRef } from "react";
import HomeLatestNews from "@components/HomeLatestNews";
import CookieConsent from "@components/CookieConsent";
import MotionWrapper from "@components/MotionWrapper";
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
    <div className="flex min-h-screen text-black">
      <main className="relative flex min-h-screen w-full flex-col sm:items-start bg-cover ">

        <section className="relative w-full xl:mb-10 md:mb-4">
          <MotionWrapper>
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
                  <Link href={banner.link} target="_blank" rel="noopener noreferrer">
                    <img src={banner.image_url} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </MotionWrapper>
        </section>

        <section className="lg:mx-20 md:mx-10 mx-4">
          <MotionWrapper>
            <HomeLatestNews />
          </MotionWrapper>
        </section>

        <section className="relative w-full text-black">
          <div className="relative hidden lg:block w-full overflow-hidden">
            <MotionWrapper>

              {/* 🔵 รูปครึ่งบน */}
              <div className="absolute top-0 left-0 w-full h-2/3">
                <Image
                  src={getSupabaseImage("pic/222.png")}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              {/* 🩷 พื้นหลังครึ่งล่าง */}
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[radial-gradient(circle_at_center,_white_0%,_#FDF0F5_40%,_#fbcfe8_70%,_#fbcfe8_100%)]" />

              {/* ✨ เนื้อหา */}
              <div className=" relative flex z-10">
                <div>
                  <Image
                    src={getSupabaseImage("pic/ppdhome.jpeg")}
                    alt="ตราสถาบัน"
                    width={700}
                    height={200}
                    className="h-auto w-full bg-white p-3"
                  />
                </div>

                <div className="relative hidden lg:block z-10 flex flex-col justify-center mx-10 py-20">
                  <p className="lg:text-2xl font-medium text-shadow-lg">
                    สถานคุ้มครองและพัฒนาคนพิการ พระประแดง จ.สมุทรปราการ
                  </p>
                  <p className="lg:text-xl text-sm font-medium text-shadow-lg mt-4">
                    PHRAPRADAENG HOME FOR PERSONS WITH
                  </p>
                  <p className="lg:text-xl text-sm font-medium text-shadow-lg mt-4">
                    DISABILITIES PROTECTION AND DEVELOPMENT
                  </p>
                  <p className="mt-4 text-sm">
                    ก่อตั้งขึ้นเพื่อเป็นศูนย์กลางด้านการคุ้มครอง ฟื้นฟู และพัฒนาคนพิการ
                  </p>
                  <p className="mt-4 text-sm" >
                    โดยมุ่งเน้นการเสริมสร้างศักยภาพและคุณภาพชีวิตให้ดียิ่งขึ้น
                  </p>

                  <Link href={`/ppdhome/user/aboutAll/about`}>
                    <h1 className="mb-8 border-b mt-10 w-20 transition-all hover:text-pink-700 duration-200 hover:-translate-y-1 hover:scale-[1.02]">
                      Read More
                    </h1>
                  </Link>
                </div>
              </div>
            </MotionWrapper>

          </div>

          <div className="relative lg:hidden w-full overflow-hidden">
            <MotionWrapper>

              <Image
                src={getSupabaseImage("pic/ppdhome.jpeg")}
                alt=""
                width={700}
                height={500}
                className="object-cover w-full"
              />

              {/* 🎨 overlay ไล่สี */}
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-300/60 via-pink-200/40 to-transparent"></div>

              {/* 📝 ข้อความทับ */}
              <div className="absolute inset-0 flex items-end md:pb-8 pb-6">
                <div className="max-w-xl md:ml-10 ml-2 text-white z-10">

                  <p className="md:text-xl text-sm font-medium text-shadow-lg">
                    สถานคุ้มครองและพัฒนาคนพิการ พระประแดง จ.สมุทรปราการ
                  </p>
                  <p className="md:text-xl text-sm font-medium text-shadow-lg">
                    PHRAPRADAENG HOME FOR PERSONS WITH
                  </p>
                  <p className="md:text-xl text-sm font-medium text-shadow-lg">
                    DISABILITIES PROTECTION AND DEVELOPMENT
                  </p>

                  <p className="md:text-sm text-xs mt-2 text-shadow-lg">
                    ก่อตั้งขึ้นเพื่อเป็นศูนย์กลางด้านการคุ้มครอง ฟื้นฟู และพัฒนาคนพิการ
                  </p>
                  <p className="md:text-sm text-xs text-shadow-lg">
                    โดยมุ่งเน้นการเสริมสร้างศักยภาพและคุณภาพชีวิตให้ดียิ่งขึ้น
                  </p>

                  <Link href={`/ppdhome/user/aboutAll/about`}>
                    <h1 className="border-b mt-4 w-18 hover:text-pink-700 md:text-sm text-xs">
                      Read More
                    </h1>
                  </Link>

                </div>
              </div>

            </MotionWrapper>

          </div>

        </section>

        <section className="relative hidden md:block flex flex-col z-10 lg:pb-10 md:pb-8 md:mt-10 mt-4 w-full bg-transparent lg:mt-18 text-black lg:mb-14 mb-8">
          <MotionWrapper>
            <div className="flex justify-between lg:mx-20 md:mx-10 mx-4 lg:gap-18 gap-8">
              <div className="relative flex flex-col shadow-md rounded-xl md:pt-8 pt-4 pb-10 xl:px-6 px-4 z-10 w-1/2 justify-center bg-[radial-gradient(circle_at_center,_white_25%,_#FDF0F5_35%,_#ffdeee_70%,_#ffddf0_80%)] shadow-lg">
                <div className="flex justify-center text-center">
                  <p className="xl:text-2xl md:text-xl text-lg font-medium text-shadow-lg">
                    รายงานข้อมูลสถานการณ์ด้านคนพิการในประเทศไทย
                  </p>
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row md:items-start items-center justify-center">

                    {/* Text */}
                    <div className="flex flex-col md:items-end md:text-right lg:mt-6 md:mt-4">

                      <p className="xl:text-xl md:text-base text-sm font-light">
                        ข้อมูล ณ วันที่ 1 เดือนกุมภาพันธ์ พ.ศ. 2567
                      </p>

                      <div className="bg-white rounded-xl px-8 py-2 lg:mt-8 mt-4 shadow-lg">

                        <div className="flex flex-col items-center mt-4 gap-4">
                          <p className="xl:text-3xl md:text-xl text-lg text-black text-shadow-lg">
                            2,165,127
                          </p>
                          <p className="xl:text-xl md:text-base text-sm font-light">
                            คนพิการทั่วประเทศ
                          </p>
                        </div>

                        <div className="border-b lg:mt-6 mt-2"></div>

                        <div className="flex flex-row gap-8 ">
                          <div className="flex flex-col justify-center mt-4">
                            <div className="flex flex-row lg:gap-6 gap-2">
                              <p className="lg:px-3 w-4 h-4 bg-pink-200"></p>
                              <p className="lg:text-lg text-sm">เพศหญิง</p>
                            </div>

                            <div className="mt-4">
                              <p className="lg:text-2xl text-base text-shadow-lg">1,042,591</p>
                            </div>
                          </div>
                          <div className="border-e"></div>
                          <div className="flex flex-col justify-center mt-4">
                            <div className="flex flex-row lg:gap-6 gap-2">
                              <p className="lg:px-3 w-4 h-4 bg-blue-200"></p>
                              <p className="lg:text-lg text-sm">เพศชาย</p>
                            </div>

                            <div className="mt-4">
                              <p className="text-shadow-lg lg:text-2xl text-base">1,122,536</p>
                            </div>
                          </div>
                        </div>
                      </div>



                    </div>

                  </div>

                </div>
              </div>

              <div className="relative flex flex-col shadow-md rounded-xl md:pt-8 pt-4 pb-4 lg:px-6 px-4 z-10 w-1/2 justify-center bg-[radial-gradient(circle_at_center,_white_25%,_#FDF0F5_35%,_#ffdeee_70%,_#ffddf0_80%)] shadow-lg">
                <p className="xl:text-2xl md:text-xl text-lg font-medium text-shadow-lg text-center">
                  ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการ
                </p>
                <p className="xl:text-2xl md:text-xl text-lg font-medium text-shadow-lg text-center">
                  พระประแดง จ.สมุทรปราการ
                </p>

                <div className="relative w-full flex flex-col justify-center md:mt-6 mt-4">

                  <div className="relative flex flex-col items-center z-10 ">
                    <Image
                      src={getSupabaseImage("pic/parent.jpeg")}
                      alt="รูปผู้ปกครองสถานคุ้มครอง"
                      width={200}
                      height={260}
                      className="object-cover w-50 h-60 lg:w-50 lg:h-60 bg-white p-4 rounded-md shadow-md"
                    />

                  </div>
                  <p className="mt-6 lg:text-xl md:text-base font-light text-sm text-center">ว่าที่ร้อยตรีณัทกร ธงสอาด</p>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </section>

        <section className="relative md:hidden flex flex-col lg:pb-10 md:pb-8 md:mt-10 mt-4 w-full bg-transparent lg:mt-18 text-black lg:mb-14 mb-8">
          <MotionWrapper>
            <div className="flex flex-col lg:mx-20 md:mx-10 mx-4 lg:gap-18 gap-8">
              <div className="relative flex flex-col shadow-md rounded-xl md:pt-8 pt-4 pb-10 xl:px-6 px-4 z-10 w-full justify-center bg-[radial-gradient(circle_at_center,_white_25%,_#FDF0F5_35%,_#ffdeee_70%,_#ffddf0_80%)] shadow-lg">
                <div className="flex justify-center text-center">
                  <p className="xl:text-2xl md:text-xl text-lg text-shadow-lg">
                    รายงานข้อมูลสถานการณ์ด้านคนพิการในประเทศไทย
                  </p>
                </div>

                <div className="relative">
                  <div className="flex flex-col md:flex-row md:items-start items-center justify-center">

                    {/* Text */}
                    <div className="flex flex-col md:items-end md:text-right lg:mt-6 md:mt-4">

                      <p className="xl:text-xl md:text-base text-sm font-light text-center">
                        ข้อมูล ณ วันที่ 1 เดือนกุมภาพันธ์ พ.ศ. 2567
                      </p>

                      <div className="bg-white rounded-xl px-8 py-2 lg:mt-8 mt-4 shadow-lg">

                        <div className="flex flex-col items-center mt-4 gap-4">
                          <p className="xl:text-3xl md:text-xl text-lg text-shadow-lg text-black">
                            2,165,127
                          </p>
                          <p className="xl:text-xl md:text-base text-sm font-light">
                            คนพิการทั่วประเทศ
                          </p>
                        </div>

                        <div className="border-b lg:mt-6 mt-2"></div>

                        <div className="flex flex-row gap-8 ">
                          <div className="flex flex-col justify-center mt-4">
                            <div className="flex flex-row lg:gap-6 gap-2">
                              <p className="lg:px-3 w-4 h-4 bg-pink-200"></p>
                              <p className="lg:text-lg text-sm">เพศหญิง</p>
                            </div>

                            <div className="mt-4">
                              <p className="text-shadow-lg lg:text-2xl text-base">1,042,591</p>
                            </div>
                          </div>
                          <div className="border-e"></div>
                          <div className="flex flex-col justify-center mt-4">
                            <div className="flex flex-row lg:gap-6 gap-2">
                              <p className="lg:px-3 w-4 h-4 bg-blue-200"></p>
                              <p className="lg:text-lg text-sm">เพศชาย</p>
                            </div>

                            <div className="mt-4">
                              <p className="text-shadow-lg lg:text-2xl text-base">1,122,536</p>
                            </div>
                          </div>
                        </div>
                      </div>



                    </div>

                  </div>

                </div>
              </div>

              <div className="relative flex flex-col shadow-md rounded-xl md:pt-8 pt-4 pb-4 lg:px-6 px-4 z-10 w-full justify-center bg-[radial-gradient(circle_at_center,_white_25%,_#FDF0F5_35%,_#ffdeee_70%,_#ffddf0_80%)] shadow-lg">
                <p className="xl:text-2xl md:text-xl text-lg font-semibold text-shadow-lg text-center">
                  ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการ
                </p>
                <p className="xl:text-2xl md:text-xl text-lg font-semibold text-shadow-lg text-center">
                  พระประแดง จ.สมุทรปราการ
                </p>

                <div className="relative w-full flex flex-col justify-center md:mt-6 mt-4">

                  <div className="relative flex flex-col items-center z-10 ">
                    <Image
                      src={getSupabaseImage("pic/parent.jpeg")}
                      alt="รูปผู้ปกครองสถานคุ้มครอง"
                      width={200}
                      height={260}
                      className="object-cover w-50 h-60 lg:w-50 lg:h-60 bg-white p-4 rounded-md shadow-md"
                    />

                  </div>
                  <p className="mt-6 lg:text-xl md:text-base font-light text-sm text-center">ว่าที่ร้อยตรีณัทกร ธงสอาด</p>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </section>
        <CookieConsent />

      </main>
    </div>
  );
}
