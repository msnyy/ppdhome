"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BannerAdmin() {
  const [banners, setBanners] = useState([]);
  const [hasNew, setHasNew] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const router = useRouter();

  /* ================= fetch ================= */
  const fetchBanner = async () => {
    const res = await fetch("/ppdhome/api/banner");
    const json = await res.json();

    const formatted = json.data.map((b) => ({
      ...b,
      file: null,
      isNew: false,
      originalLink: b.link,
      originalImage: b.image_url,
    }));
    setBanners(formatted); // ✅ ต้องมี
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  /* ================= add ================= */
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

    setHasNew(true);
    setIsDirty(true);
  };

  /* ================= update image ================= */
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


    if (newBanner[index].id) setHasEdit(true);
    else setHasNew(true);
    setIsDirty(true);
  };

  /* ================= update link ================= */
  const updateLink = (index, value) => {
    const newBanner = [...banners];
    newBanner[index].link = value;
    setBanners(newBanner);


    if (newBanner[index].id) setHasEdit(true);
    else setHasNew(true);
    setIsDirty(true);
  };

  /* ================= save NEW ================= */
  const saveNew = async () => {
    for (let banner of banners.filter((b) => b.isNew)) {
      if (!banner.file) {
        alert("กรุณาเลือกรูปก่อนบันทึก");
        return;
      }

      const formData = new FormData();
      formData.append("link", banner.link || "");
      formData.append("image", banner.file);

      const res = await fetch("/ppdhome/api/banner", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let message = "เพิ่มไม่สำเร็จ";
        try {
          const text = await res.text();
          if (text) {
            const json = JSON.parse(text);
            message = json.error || message;
          }
        } catch { }
        alert(message);
        return;
      }
    }

    alert("เพิ่มสำเร็จ");
    setHasNew(false);
    setIsDirty(false);
  };

  /* ================= save EDIT ================= */
  const saveEdit = async () => {
    for (let banner of banners.filter((b) => b.id)) {

      const isChanged =
        banner.file || banner.link !== banner.originalLink;

      if (!isChanged) continue;

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

      if (!res.ok) {
        let message = "แก้ไขไม่สำเร็จ";
        try {
          const text = await res.text();
          if (text) {
            const json = JSON.parse(text);
            message = json.error || message;
          }
        } catch { }
        alert(message);
        return;
      }
    }

    alert("แก้ไขสำเร็จ");
    setHasEdit(false);
    setIsDirty(false);
  };

  /* ================= delete ================= */
  const deleteBanner = async (id, index) => {
    if (id) {
      const res = await fetch("/ppdhome/api/banner", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        let message = "ลบไม่สำเร็จ";
        try {
          const text = await res.text();
          if (text) {
            const json = JSON.parse(text);
            message = json.error || message;
          }
        } catch { }
        alert(message);
        return;
      }

      alert("ลบสำเร็จ");
      setBanners(banners.filter((b) => b.id !== id));
    } else {
      setBanners(banners.filter((_, i) => i !== index));
    }
  };

  return (
    <section className="lg:mx-40 md:mx-20 mx-8 mb-8 text-black">
      <button
        type="button"
        className="bg-pink-400 text-white hover:bg-pink-500 rounded-xl py-2 px-6 mt-4"
      >
        <a href={`/ppdhome/admin/allCreate`}>
              Back
            </a>
      </button>

      <div className="p-6 border mt-4">
        {banners.map((banner, index) => (
          <div key={banner.id ?? index} className="mb-10">
            <h2>แบนเนอร์ที่ {index + 1}</h2>

            {/* image */}
            <label className="border h-[300px] lg:h-[600px] flex items-center justify-center cursor-pointer">
              {banner.image_url ? (
                <img src={banner.image_url} className="w-full h-full object-cover" />
              ) : (
                <span>+</span>
              )}

              <input
                type="file"
                hidden
                onChange={(e) => updateImage(index, e.target.files?.[0])}
              />
            </label>

            {/* link */}
            <input
              value={banner.link || ""}
              onChange={(e) => updateLink(index, e.target.value)}
              className="border w-full mt-2"
            />

            <button
              onClick={async () => {
                const ok = confirm("คุณต้องการลบแบนเนอร์นี้ใช่หรือไม่?");
                if (!ok) return;

                await deleteBanner(banner.id, index);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl my-4"
            >
              Delete
            </button>
          </div>
        ))}

        {/* add */}
        <div className="flex justify-center">
          <button onClick={addBanner} className="bg-pink-300 px-4 py-2">
            Add banner
          </button>
        </div>



        {/* save buttons */}
        <div className="flex justify-end gap-3 mt-4">
          {isDirty && (
            <div className="mb-4 text-red-500">
              Unsaved
            </div>
          )}
          {hasNew && (
            <button onClick={saveNew} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
              Save
            </button>
          )}

          {hasEdit && (
            <button onClick={saveEdit} className="bg-blue-500 px-4 py-2 rounded">
              Save changes
            </button>
          )}
        </div>
      </div>
    </section>

  );

}

