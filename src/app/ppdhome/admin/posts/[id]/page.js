"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

/* ---------- utils ---------- */
function formatThaiDate(input) {
  if (!input) return "";
  const d = new Date(input);

  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
    "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
    "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

export default function AdminPostDetail() {

  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openImage, setOpenImage] = useState(null);

  /* ---------- fetch detail ---------- */

  useEffect(() => {

    if (!id) return;

    async function load() {

      try {

        const res = await fetch(
          `/ppdhome/api/posts/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          setData(null);
          return;
        }

        const json = await res.json();
        setData(json);

      } catch (err) {
        console.error(err);
        setData(null);
      } finally {
        setLoading(false);
      }

    }

    load();

  }, [id]);

  /* ---------- delete ---------- */

  const handleDelete = async () => {

    const ok = confirm("คุณต้องการลบข้อมูลนี้ใช่หรือไม่?");
    if (!ok) return;

    const res = await fetch(
      `/ppdhome/api/posts/${id}`,
      { method: "DELETE" }
    );

    if (res.ok) {
      alert("ลบข้อมูลเรียบร้อยแล้ว");
      router.push("/ppdhome/admin/newsAndPublicCreate");
      return;
    }

    let message = "เกิดข้อผิดพลาด";

    try {
      const text = await res.text();
      if (text) {
        const json = JSON.parse(text);
        message = json.error || message;
      }
    } catch (e) { }

    alert(message);

  };

  if (loading) {
    return <p className="text-center mt-20">กำลังโหลดข้อมูล...</p>;
  }

  if (!data) {
    return (
      <p className="text-center mt-20 text-red-500">
        ไม่พบข้อมูล
      </p>
    );
  }

  const images = data.image
    ? data.image.split(",").filter(Boolean)
    : [];


  return (

    <div className="lg:mx-20 md:mx-9 mx-5 lg:mt-16 mt-4 mb-18 text-black">

      <section className="rounded-xl text-black">

        <p className="lg:mt-5 mt-2 lg:text-4xl md:text-3xl text-xl text-shadow-lg">
          {data.title}
        </p>

        {data.subtitle && (
          <p className="lg:mt-5 mt-2 lg:text-4xl md:text-3xl text-xl text-shadow-lg indent-8">
            {data.subtitle}
          </p>
        )}

        {data.header_date && (
          <p className="lg:mt-5 mt-2 lg:text-4xl md:text-3xl text-xl text-shadow-lg">
            {data.header_date}
          </p>
        )}

        <p className="mt-5">
          {formatThaiDate(data.content_date)}
        </p>

        <div className="border border-t mt-6"></div>

        <p className="mt-5 whitespace-pre-line">
          {data.detail}
        </p>

        {images.length > 0 && (

          <div className="grid md:grid-cols-5 grid-cols-2 gap-4 mt-6">

            {images.map((img, i) => (

              <div key={i} className="relative w-full aspect-[5/4] overflow-hidden">

                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover cursor-pointer hover:scale-105 transition"
                  onClick={() => setOpenImage(img)}
                />



              </div>

            ))}

          </div>

        )}

        <div className="flex justify-end mt-8 gap-4">
          <button
            type="button"
            className="bg-pink-400 text-white hover:bg-pink-500 rounded-xl py-2 px-6"
          >
            <a href={`/ppdhome/admin/newsAndPublicCreate`}>
              Back
            </a>
          </button>

          <Link href={`/ppdhome/admin/posts/${data.id}/edit`}>
            <button className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-xl">Edit</button>
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl">

            Delete

          </button>

        </div>

        <div className="flex justify-between mt-10 gap-4">

          {data.prevId ? (
            <Link
              href={`/ppdhome/admin/posts/${data.prevId}`}
              className="flex p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              <p className="">← </p>
              <p className="line-clamp-2 ms-2">{data.prevTitle}</p>
            </Link>
          ) : <div />}

          {data.nextId && (
            <Link
              href={`/ppdhome/admin/posts/${data.nextId}`}
              className="flex p-4 bg-pink-200 rounded-lg hover:bg-pink-300 transition text-right"
            >
              <p className="line-clamp-2 me-2">{data.nextTitle}</p>
              <p className="">→ </p>

            </Link>
          )}

        </div>

      </section>

      {/* ---------- image modal ---------- */}

      {openImage && (

        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpenImage(null)}
        >

          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setOpenImage(null)}
              className="absolute -top-10 right-0 text-white text-3xl"
            >

              ✕

            </button>

            <Image
              src={openImage}
              alt="ภาพขยาย"
              width={1200}
              height={800}
              className="rounded-lg object-contain w-full h-auto"
            />

          </div>

        </div>

      )}

    </div>

  );
}