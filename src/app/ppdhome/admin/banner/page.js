"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

/* ================= sortable item ================= */
function SortableItem({ banner, index, updateImage, updateLink, toggleSelect, selected }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: banner.id ?? `temp-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex flex-row items-center p-4 mb-4 gap-8">

      <div className="flex flex-row gap-8">
        {/* checkbox */}
        <input
          type="checkbox"
          checked={selected.includes(index)}
          onChange={() => toggleSelect(index)}
        />

        <h2>แบนเนอร์ {index + 1}</h2>
      </div>

      {/* image */}
      <label className="border h-[200px] w-2/5 flex items-center justify-center cursor-pointer">
        {banner.image_url ? (
          <img src={banner.image_url} className="h-full object-cover" />
        ) : (
          <span>+</span>
        )}

        <input
          type="file"
          hidden
          onChange={(e) =>
            updateImage(index, e.target.files?.[0])
          }
        />
      </label>

      {/* link */}
      <input
        value={banner.link || ""}
        onChange={(e) => updateLink(index, e.target.value)}
        className="border w-1/3 h-8"
      />

      {/* 🔥 drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-500 mb-2"
      >
        ☰
      </div>
    </div>
  );
}

/* ================= main ================= */
export default function BannerAdmin() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  /* ================= fetch ================= */
  const fetchBanner = async () => {
    const res = await fetch("/ppdhome/api/banner");
    const json = await res.json();

    const formatted = json.data.map((b) => ({
      ...b,
      file: null,
      isNew: false,
    }));

    setBanners(formatted);
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
        order: banners.length,
      },
    ]);
  };

  /* ================= update image ================= */
  const updateImage = async (index, file) => {
    if (!file) return;

    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });

    const preview = URL.createObjectURL(compressedFile);

    const newBanner = [...banners];
    newBanner[index] = {
      ...newBanner[index],
      image_url: preview,
      file: compressedFile,
    };

    setBanners(newBanner);
  };

  /* ================= update link ================= */
  const updateLink = (index, value) => {
    const newBanner = [...banners];
    newBanner[index].link = value;
    setBanners(newBanner);
  };

  /* ================= select ================= */
  const toggleSelect = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  /* ================= delete multi ================= */
  const deleteSelected = async () => {
    if (selected.length === 0) return;

    const ok = confirm("ลบรายการที่เลือก?");
    if (!ok) return;

    setLoading(true);

    try {
      const requests = selected.map((index) => {
        const b = banners[index];

        if (!b.id) return Promise.resolve();

        return fetch("/ppdhome/api/banner", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: b.id }),
        });
      });

      await Promise.all(requests);

      setBanners(banners.filter((_, i) => !selected.includes(i)));
      setSelected([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= save ================= */
  const saveAll = async () => {
    if (loading) return;

    const invalid = banners.some((b) => !b.image_url);
    if (invalid) {
      alert("กรุณาใส่รูปให้ครบ");
      return;
    }

    setLoading(true);

    try {
      const requests = banners.map((b, index) => {
        const formData = new FormData();
        formData.append("link", b.link || "");
        formData.append("order", b.order);

        if (b.id) {
          formData.append("id", b.id);
          if (b.file) formData.append("image", b.file);

          return fetch("/ppdhome/api/banner", {
            method: "PUT",
            body: formData,
          });
        } else {
          formData.append("image", b.file);

          return fetch("/ppdhome/api/banner", {
            method: "POST",
            body: formData,
          });
        }
      });

      const results = await Promise.all(requests);

      if (results.some((r) => !r.ok)) {
        alert("มีบางรายการผิดพลาด");
        return;
      }

      alert("บันทึกสำเร็จ");
      await fetchBanner();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="lg:mx-20 md:mx-10 mx-4 lg:mt-10 md:mt-6 mt-4 text-black">
      <div>
        <a href={`/ppdhome/admin/allCreate`}>
          <button
            type="button"
            className="bg-pink-400 text-white hover:bg-pink-500 rounded-xl py-2 px-6 my-4"
          >
            Back
          </button>
        </a>
      </div>

      <div className="p-6 border mb-14">
        <span className="text-base text-gray-600">
              *ขนาด banner ที่ใช้ Size 1920 x 700px*
            </span>
        {/* delete */}
        {selected.length > 0 && (
          <div className="mb-4 flex items-center gap-3 justify-end">
            <span className="text-sm text-gray-600">
              เลือกแล้ว {selected.length} รายการ
            </span>

            <button
              onClick={deleteSelected}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete Selected
            </button>
          </div>
        )}

        {/* 🔥 drag context */}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;

            const oldIndex = banners.findIndex(
              (b, i) => (b.id ?? `temp-${i}`) === active.id
            );

            const newIndex = banners.findIndex(
              (b, i) => (b.id ?? `temp-${i}`) === over.id
            );

            const newArr = arrayMove(banners, oldIndex, newIndex);

            const updated = newArr.map((b, i) => ({
              ...b,
              order: i,
            }));

            setBanners(updated);
          }}
        >
          <SortableContext
            items={banners.map((b, i) => b.id ?? `temp-${i}`)}
            strategy={verticalListSortingStrategy}
          >
            {banners.map((banner, index) => (
              <SortableItem
                key={banner.id ?? `temp-${index}`}
                banner={banner}
                index={index}
                updateImage={updateImage}
                updateLink={updateLink}
                toggleSelect={toggleSelect}
                selected={selected}
              />
            ))}
          </SortableContext>
        </DndContext>

        <div className="flex justify-end">
          {/* add */}
          <button
            onClick={addBanner}
            className="bg-pink-400 text-white px-4 py-2"
          >
            Add Banner
          </button>

          {/* save */}
          <button
            onClick={saveAll}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 ml-4"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </section>
  );
}