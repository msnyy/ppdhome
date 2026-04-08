"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BannerAdmin() {
  const [banners, setBanners] = useState([]);
  const [hasNew, setHasNew] = useState(false);
  const [hasEdit, setHasEdit] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    await deleteBanner(deleteTarget.id, deleteTarget.index);
    setDeleteTarget(null);
  };

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

      await fetch("/ppdhome/api/banner", {
        method: "POST",
        body: formData,
      });
    }

    alert("เพิ่มสำเร็จ");


    setBanners(
      banners.map((b) => ({
        ...b,
        file: null,
        originalLink: b.link,
        originalImage: b.image_url,
      }))
    )
      ; setHasNew(false);
  };

  /* ================= save EDIT ================= */
  const saveEdit = async () => {
    for (let banner of banners.filter((b) => b.id)) {

      const isChanged =
        banner.file || banner.link !== banner.originalLink;

      if (!isChanged) continue; // 🔥 ไม่แก้ = ไม่ยิง PUT

      const formData = new FormData();
      formData.append("id", banner.id);
      formData.append("link", banner.link || "");

      if (banner.file) {
        formData.append("image", banner.file);
      }

      await fetch("/ppdhome/api/banner", {
        method: "PUT",
        body: formData,
      });
    }

    alert("แก้ไขสำเร็จ");
    setHasEdit(false);
  };

  /* ================= delete ================= */
  const deleteBanner = async (id, index) => {
    if (id) {
      await fetch("/ppdhome/api/banner", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setBanners(banners.filter((b) => b.id !== id));

    } else {
      setBanners(banners.filter((_, i) => i !== index));
    }
  };

  return (
    <section className="lg:mx-40 md:mx-20 mx-8 mb-8 text-black">
      <Link href="/ppdhome/admin/allCreate">
        <button className="bg-pink-400 text-white text-xl rounded-xl py-2 px-6 mt-4">
          back
        </button>
      </Link>

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
              onClick={() => setDeleteTarget({ id: banner.id, index })}
              className="text-red-500 mt-2 text-xl"
            >
              ลบ
            </button>
          </div>
        ))}

        {/* add */}
        <div className="flex justify-center">
          <button onClick={addBanner} className="bg-pink-300 px-4 py-2">
            เพิ่มแบนเนอร์
          </button>
        </div>



        {/* save buttons */}
        <div className="flex justify-end gap-3 mt-4">
          {isDirty && (
            <div className="mb-4 text-red-500 font-semibold">
              ยังไม่ได้บันทึก
            </div>
          )}
          {hasNew && (
            <button onClick={saveNew} className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
              บันทึก
            </button>
          )}

          {hasEdit && (
            <button onClick={saveEdit} className="bg-blue-500 px-4 py-2 rounded">
              บันทึกการแก้ไข
            </button>
          )}
        </div>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] text-center">

            <p className="text-lg mb-4">ยืนยันการลบ</p>
            <p className="text-sm text-gray-500 mb-6">
              คุณแน่ใจหรือไม่ว่าต้องการลบแบนเนอร์นี้?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                ยกเลิก
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                ลบ
              </button>
            </div>

          </div>
        </div>
      )}
    </section>

  );

}

