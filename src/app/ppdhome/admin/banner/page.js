"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BannerAdmin() {

  const [banners, setBanners] = useState([]);

  const fetchBanner = async () => {
    const res = await fetch("/ppdhome/api/banner");
    const data = await res.json();
    setBanners(data);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  /* เพิ่มช่อง banner */

  const addBanner = () => {
    setBanners([...banners, { image_url: "", file: null, link: "" }]);
  };

  /* preview รูป */

  const updateImage = (index, file) => {

  if (!file) return; // ⭐ ป้องกัน error

  const preview = URL.createObjectURL(file);

  const newBanner = [...banners];

  newBanner[index] = {
    ...newBanner[index],
    image_url: preview,
    file: file
  };

  setBanners(newBanner);
};

  /* อัปเดตลิงก์ */

  const updateLink = (index, value) => {

    const newBanner = [...banners];

    newBanner[index].link = value;

    setBanners(newBanner);
  };

  /* บันทึก banner */

  const saveBanner = async () => {

    for (let banner of banners) {

      if (!banner.file) continue;

      const formData = new FormData();
      formData.append("image", banner.file);
      formData.append("link", banner.link || "");

      await fetch("/ppdhome/api/banner", {
        method: "POST",
        body: formData
      });

    }

    alert("บันทึกสำเร็จ");
    fetchBanner();
  };

  /* ลบ banner */

  const deleteBanner = async (id) => {

    await fetch("/ppdhome/api/banner", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    });

    fetchBanner();
  };

  return (
    <section className="lg:mx-40 md:mx-20 mx-8 mb-8">

      <div>
        <Link href="/ppdhome/admin/allCreate">
          <button className="bg-pink-400 text-white text-xl hover:bg-pink-500 rounded-xl py-2 px-6 mt-4">
            back
          </button>
        </Link>
      </div>

      <div className="p-6 border mt-4 lg:py-10 md:py-6 py-4 lg:px-15 md:px-10 px-4 ">

        {banners.map((banner, index) => (
          <div key={banner.id || index} className="mb-10">

            <h2 className="text-xl font-semibold mb-3">
              แบนเนอร์ที่ {index + 1}
            </h2>

            <label className="border rounded-lg h-[220px] md:h-[350px] lg:h-[420px] flex items-center justify-center cursor-pointer overflow-hidden">

              {banner.image_url ? (
                <img
                  src={banner.image_url}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="lg:text-5xl text-3xl">+</span>
              )}

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
  const file = e.target.files?.[0];
  updateImage(index, file);
}}
              />

            </label>

            {/* ช่องใส่ลิงก์ */}
            <input
              type="text"
              placeholder="ใส่ลิงก์ เช่น https://example.com"
              value={banner.link || ""}
              onChange={(e) => updateLink(index, e.target.value)}
              className="border w-full mt-3 px-3 py-2 rounded"
            />

            {banner.id && (
              <button
                onClick={() => deleteBanner(banner.id)}
                className="text-red-500 mt-2"
              >
                ลบ
              </button>
            )}

          </div>
        ))}

        <div className="flex justify-center mb-5">

          <button
            onClick={addBanner}
            className="bg-pink-300 hover:bg-pink-400 px-6 py-2 rounded-lg"
          >
            เพิ่มแบนเนอร์
          </button>

        </div>

        <div className="flex justify-end">

          <button
            onClick={saveBanner}
            className="bg-pink-300 hover:bg-pink-400 px-6 py-2 rounded-lg"
          >
            บันทึก
          </button>

        </div>

      </div>

    </section>
  );
}