"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BannerAdmin() {
  const [banners, setBanners] = useState([]);

  const fetchBanner = async () => {
    const res = await fetch("/ppdhome/api/banner");
    const data = await res.json();

    const formatted = data.map((b) => ({
      ...b,
      file: null,
    }));

    setBanners(formatted);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  /* เพิ่ม banner */
  const addBanner = () => {
    setBanners([
      ...banners,
      {
        id: null,
        image_url: "",
        file: null,
        link: "",
        isNew: true,
      },
    ]);
  };

  const editBanner = async (banner) => {
    const formData = new FormData();

    formData.append("id", banner.id);
    formData.append("link", banner.link || "");

    if (banner.file) {
      formData.append("image", banner.file);
    }

    const res = await fetch("/ppdhome/api/banner", {
      method: "PUT",
      body: formData,
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("แก้ไขสำเร็จ");
    fetchBanner();
  };

  /* preview */
  const updateImage = (index, file) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);

    const newBanner = [...banners];
    newBanner[index] = {
      ...newBanner[index],
      image_url: preview,
      file: file,
    };

    setBanners(newBanner);
  };

  /* update link */
  const updateLink = (index, value) => {
    const newBanner = [...banners];
    newBanner[index].link = value;
    setBanners(newBanner);
  };

  /* save */
  const saveBanner = async () => {
    for (let banner of banners) {
      const formData = new FormData();

      formData.append("link", banner.link || "");

      if (banner.file) {
        formData.append("image", banner.file);
      }

      if (banner.id) {
        formData.append("id", banner.id);

        await fetch("/ppdhome/api/banner", {
          method: "PUT",
          body: formData,
        });
      } else {
        if (!banner.file) {
          alert("กรุณาเลือกรูปก่อนบันทึก");
          return;
        }

        await fetch("/ppdhome/api/banner", {
          method: "POST",
          body: formData,
        });
      }
    }

    alert("บันทึกสำเร็จ");
    fetchBanner();
  };

  /* delete */
  const deleteBanner = async (id) => {
    await fetch("/ppdhome/api/banner", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchBanner();
  };

  return (
    <section className="lg:mx-40 md:mx-20 mx-8 mb-8 text-black">
      <Link href="/ppdhome/admin/allCreate">
        <button className="bg-pink-400 text-white text-xl hover:bg-pink-500 rounded-xl py-2 px-6 mt-4">
          back
        </button>
      </Link>

      <div className="p-6 border mt-4">
        {banners.map((banner, index) => (
          <div key={banner.id ?? `new-${index}`} className="mb-10">
            <h2 className="text-xl font-semibold mb-3">
              แบนเนอร์ที่ {index + 1}
            </h2>

            <label className="border rounded-lg h-[300px] flex items-center justify-center cursor-pointer overflow-hidden">
              {banner.image_url ? (
                <img
                  src={banner.image_url}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">+</span>
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

            <input
              type="text"
              placeholder="ใส่ลิงก์"
              value={banner.link || ""}
              onChange={(e) => updateLink(index, e.target.value)}
              className="border w-full mt-3 px-3 py-2 rounded"
            />

            {banner.id ? (
              <button
                onClick={() => deleteBanner(banner.id)}
                className="text-red-500 mt-2"
              >
                ลบ
              </button>
            ) : (
              <button
                onClick={() =>
                  setBanners(banners.filter((_, i) => i !== index))
                }
                className="text-red-500 mt-2"
              >
                ลบ
              </button>
            )}

            {banner.id && (
              <button
                onClick={() => editBanner(banner)}
                className="text-blue-500 mt-2 ml-4"
              >
                แก้ไข
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