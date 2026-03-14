"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import HomeLatestNews from "@components/HomeLatestNews";
import CookieConsent from "@components/CookieConsent";
import { motion, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { name: "เพศหญิง", value: 1042591 },
  { name: "เพศชาย", value: 1122536 },
];

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
        setBanners(data);
      } catch (err) {
        console.error("โหลด banner ไม่สำเร็จ", err);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="flex min-h-screen font-sansn lg:mx-20 md:mx-10 mx-4">
      <main className="relative flex min-h-screen w-full flex-col sm:items-start bg-cover ">

        <section className="relative w-full xl:mb-10 mb-4 mt-2 lg:px-30">
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
            className="banner-swiper h-[120px] md:h-[350px] lg:h-[420px] overflow-visible"
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

        <section>
          <HomeLatestNews />
        </section>

        <section className="relative flex flex-col z-10 bg-pink-50 px-6 rounded-t-xl lg:mt-0 md:mt-4 w-full xl:px-30">
          <motion.div initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.4 }}>

            <div className="flex justify-between flex-col md:flex-row rounded-xl lg:h-120">
              <div className="relative overflow-hidden xl:mt-5 md:mt-8 mt-4 xl:h-[550px] xl:w-[550px] md:h-[260px] md:w-[260px] h-[200px] w-[280px]">
                <Image
                  src="/pic/pp.jpg"
                  alt="รูปสถาบัน"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  priority
                  quality={75}
                  className="object-cover xl:rounded-b-full xl:rounded-none md:rounded-full rounded-xl"
                />

              </div>

              <div className="flex flex-col md:text-right x:mt-12 xl:ms-10 md:mt-8 mt-4">
                <p className="xl:text-4xl md:text-3xl text-xl font-semibold text-shadow-lg">สถานคุ้มครองและพัฒนาคนพิการ</p>
                <p className="xl:text-4xl md:text-3xl text-xl font-semibold text-shadow-lg">พระประแดง จ.สมุทรปราการ</p>
                <p className="xl:mt-18 lg:text-xl text-sm md:mt-8 mt-4" >สถานคุ้มครองและพัฒนาคนพิการ พระประแดง</p>
                <p className="lg:text-xl text-sm">ก่อตั้งขึ้นเพื่อเป็นศูนย์กลางด้านการคุ้มครอง ฟื้นฟู และพัฒนาคนพิการ</p>
                <p className="xl:mt-10 md:mt-6 mt-4 lg:text-xl text-sm" >โดยมุ่งเน้นการเสริมสร้างศักยภาพและคุณภาพชีวิตให้ดียิ่งขึ้น</p>
                <div className="xl:flex xl:justify-end">

                  <Link
                    href="/ppdhome/user/aboutAll/about"
                  >
                    <button className="p-3 border border-pink-700 hover:bg-pink-700 md:text-lg text-xs text-pink-700 hover:text-white shadow-md shadow-pink-700/25 rounded-3xl transition xl:mt-10 md:mt-6 mt-4 xl:mb-0 mb-4">
                      คลิ๊กเพื่ออ่านเพิ่มเติม
                    </button>
                  </Link>

                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative flex flex-col bg-pink-50 lg:px-15 px-6 rounded-b-xl mt-2 w-full xl:px-30">
          <motion.div
            className="relative z-30" initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.7 }}>
            <div className="flex justify-between flex-col md:flex-row rounded-xl lg:h-110 xl:gap-10">
              <div className="relative overflow-hidden md:hidden xl:h-[500px] xl:w-[430px] md:h-[250px] md:w-[300px] h-[200px] w-[280px] mt-5 xl:ms-0">
                <Image src="/pic/product.JPG"
                  fill
                  alt="รูปผลิตภัณฑ์ฝีมือคนพิการ"
                  sizes="(max-width: 768px) 100vw, 550px"
                  quality={75}
                  className="object-cover xl:rounded-b-full xl:rounded-none md:rounded-full rounded-xl" />
              </div>
              <div className="flex flex-col xl:mt-15 xl:pt-15 md:mt-10 mt-4">
                <p className="md:text-2xl text-xl font-semibold text-shadow-lg">ผลิตภัณฑ์ฝีมือคนพิการ “จักสานย่านลิเภา”</p>
                <p className="md:mt-8 mt-4 md:text-lg text-sm" >ผลงานของผู้พิการที่ฝึกอาชีพในสถานฯ ถ่ายทอด ความประณีต ความตั้งใจ และคุณค่าแห่งการพึ่งพา ตนเอง</p>
                <p className="mt-1 md:text-lg text-sm mt-4" >ผลิตภัณฑ์แต่ละชิ้นคือสัญลักษณ์ของโอกาสและศักดิ์ศรีในชีวิต</p>
                <div className="xl:flex xl:justify-end">
                  <Link
                    href="/ppdhome/user/product"
                  >
                    <button className="p-3 xl:mt-8 mt-6 xl:mb-0 mb-6 border border-pink-700 hover:bg-pink-700 md:text-lg text-xs text-pink-700 hover:text-white shadow-md shadow-pink-700/25 rounded-3xl transition">
                      คลิ๊กเพื่อดูสินค้าเพิ่มเติม
                    </button>
                  </Link>
                </div>

              </div>
              <div className="relative overflow-hidden hidden md:block xl:h-[500px] xl:w-[430px] h-[250px] w-[300px] mt-5 md:mb-4 lg:mb-0">
                <Image src="/pic/product.JPG" fill alt="รูปผลิตภัณฑ์ฝีมือคนพิการ" className="object-cover xl:rounded-b-full xl:rounded-none rounded-full" />
              </div>
            </div>
          </motion.div>
        </section>


        <section className="relative flex flex-col bg-pink-50 lg:px-15 px-6 rounded-b-xl mt-2 w-full xl:px-30">
          <motion.div
            className="relative z-30" initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.7 }}>
            <div className="flex justify-between flex-col md:flex-row rounded-xl lg:h-110">
              <div className="relative overflow-visible z-20 xl:-mt-20 md:mt-10 mt-4 xl:h-[500px] xl:w-[430px] md:h-[260px] md:w-[300px] h-[200px] w-[280px]">
                <Image src="/pic/medical158/medical158_5.jpg"
                  fill
                  alt="รูปออกกำลังกาย"
                  sizes="(max-width: 768px) 100vw, 550px"
                  priority
                  quality={75}
                  className="object-cover xl:rounded-t-full xl:rounded-none md:rounded-full rounded-xl" />
              </div>
              <div className="flex flex-col text-right xl:mt-15 xl:pt-15 md:mt-10 mt-4">
                <p className="md:text-2xl text-xl font-semibold text-shadow-lg">การฟื้นฟูสมรรถภาพทางการแพทย์</p>
                <p className="md:mt-8 mt-4 md:text-lg text-sm" >งานจักสานย่านลิเภาเป็นหัตถศิลป์ไทยจากพระราชดำริของ พระพันปี เพื่อส่งเสริมอาชีพและพัฒนาคุณภาพชีวิตของคนพิการ</p>
                <p className="mt-1 md:text-lg text-sm mt-4" >สะท้อนภูมิปัญญาไทย สร้างรายได้และความภาคภูมิใจให้ผู้พิการอย่างยั่งยืน</p>
                <div className="xl:flex xl:justify-end">
                  <Link
                    href="/ppdhome/user/services/medical158"
                  >
                    <button className="p-3 xl:mt-8 mt-6 xl:mb-0 mb-6 border border-pink-700 hover:bg-pink-700 md:text-lg text-xs text-pink-700 hover:text-white shadow-md shadow-pink-700/25 rounded-3xl transition">
                      คลิ๊กเพื่ออ่านเพิ่มเติม
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="w-full max-w-4xl mx-auto xl:mt-16 md:mt-8 mt-4">
          <p className="xl:text-5xl md:text-3xl text-lg font-semibold text-center">
            กิจกรรมอาชีวบำบัด ตะกร้าสานพลาสติก
          </p>

          <video
            ref={videoRef}
            muted              // ต้องมีเพื่อ auto play
            controls           // ให้กดหยุด / เล่น / เปิดเสียงได้
            playsInline
            preload="metadata"
            className="w-full aspect-video rounded-2xl shadow-xl object-cover xl:mt-6 md:mt-4 mt-2"
          >
            <source src="/video/คลิปสานตะกร้า.mov" type="video/mp4" />
          </video>
        </div>

        <section className="relative flex flex-col z-10 xl:pb-20 md:pb-8 lg:mt-10 mt-2 w-full bg-transparent">
          <div className="relative flex flex-col bg-pink-100 md:mt-10 mt-4 shadow-md rounded-xl md:pt-8 pt-4 xl:px-10 px-4 z-10 pb-8">
            <div className="flex justify-center text-center">
              <p className="xl:text-5xl md:text-3xl text-lg font-semibold text-shadow-lg">
                รายงานข้อมูลสถานการณ์ด้านคนพิการในประเทศไทย
              </p>
            </div>

            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-start items-center justify-center lg:gap-20">
                {/* Pie Chart */}
                <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] ">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        startAngle={90}
                        endAngle={450}
                      >
                        {data.map((entry, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Text */}
                <div className="flex flex-col md:items-end md:text-right lg:mt-10 md:mt-6">

                  <p className="xl:text-2xl md:text-xl text-sm font-light">
                    ข้อมูล ณ วันที่ 1 เดือนกุมภาพันธ์ พ.ศ. 2567
                  </p>

                  <div className="flex items-end mt-4 gap-4">
                    <p className="xl:text-2xl md:text-xl text-sm font-light">
                      คนพิการทั่วประเทศ
                    </p>
                    <p className="xl:text-4xl md:text-3xl text-lg font-semibold text-pink-700">
                      2,165,127
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 mt-8">
                    {data.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 md:text-2xl text-sm">
                        <span
                          className="w-5 h-5 rounded-sm"
                          style={{ backgroundColor: COLORS[idx] }}
                        />
                        <span className="font-light">{item.name}</span>
                        <span className="font-semibold text-pink-700">
                          {item.value.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>


        <section className="relative flex flex-col w-full bg-transparent py-5 xl:mb-10">
          <div className="relative flex flex-col items-center bg-pink-100 shadow-md rounded-xl md:py-10 py-6">
            <p className="text-xl md:text-3xl xl:text-5xl font-semibold text-shadow-lg text-center md:px-0 px-4">
              ผู้ปกครองสถานคุ้มครองและพัฒนาคนพิการ
            </p>
            <p className="text-xl md:text-3xl xl:text-5xl font-semibold text-shadow-lg text-center md:px-0 px-4">
              พระประแดง จ.สมุทรปราการ
            </p>

            <div className="relative w-full flex justify-center md:mt-10 mt-4">

              <div className="absolute top-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-pink-200 rounded-[40px]"></div>

              <div className="relative bg-white md:w-[50%] w-[60%] md:rounded-[40px] rounded-xl md:px-10 px-4 md:pt-10 pt-4 pb-8 flex flex-col items-center z-10 shadow-md">
                <Image
                  src="/pic/parent.jpeg"
                  alt="รูปผู้ปกครองสถานคุ้มครอง"
                  width={260}
                  height={300}
                  className="object-cover rounded-md"
                />
                <p className="mt-6 md:text-xl font-light text-sm">ว่าที่ร้อยตรีณัทกร ธงสอาด</p>
              </div>
            </div>
          </div>
        </section>
<CookieConsent />

      </main>
    </div>
  );
}
