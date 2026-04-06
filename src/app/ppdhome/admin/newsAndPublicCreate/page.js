"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";


/* ---------- utils ---------- */
const cx = (...classes) => classes.filter(Boolean).join(" ");

function formatThaiDate(input) {
  if (!input) return "";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "";

  const months = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม",
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

/* ---------- component ---------- */
export default function PostsAdmin() {

  const [category, setCategory] = useState(1);
  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (id) => {

    if (!confirm("ต้องการลบข้อมูลนี้หรือไม่")) return;

    try {

      const res = await fetch(`/ppdhome/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("delete error");

      // reload list
      setItems(items.filter((it) => it.id !== id));

    } catch (err) {
      console.error(err);
      alert("ลบไม่สำเร็จ");
    }
  };

  const [now, setNow] = useState(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  function isNew(content_date, now) {
    if (!now || !content_date) return false;

    const newsDate = new Date(content_date);
    if (Number.isNaN(newsDate.getTime())) return false;

    const diff = (now - newsDate) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }

  const pageSize = 12;

  const categories = [
    { id: 1, name: "ทั่วไป" },
    { id: 2, name: "ประกาศจัดซื้อจัดจ้าง" },
    { id: 3, name: "ประกาศราคากลาง" },
    { id: 4, name: "สรุปผลการจัดซื้อจัดจ้าง" },
    { id: 5, name: "สมัครงาน" },
    { id: 6, name: "ข่าวบุคลากร" },
  ];

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total]
  );

  /* ---------- tab button ---------- */
  const tabBtn = (active) =>
    cx(
      "lg:px-10 md:px-6 px-4 py-3 border rounded-xl md:text-lg transition-all duration-200",
      active
        ? "bg-pink-400 text-white border-pink-400 shadow-md/30"
        : "bg-white text-pink-400 border-pink-300 hover:bg-pink-400 hover:text-white hover:shadow-md/30"
    );

  /* ---------- fetch data ---------- */
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `/ppdhome/api/posts?page=${page}&pageSize=${pageSize}&category=${category}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error(`Fetch failed (${res.status})`);

        const data = await res.json();

        setItems(Array.isArray(data.items) ? data.items : []);
        setTotal(Number.isFinite(data.total) ? data.total : 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("ไม่สามารถโหลดข้อมูลได้");
          setItems([]);
          setTotal(0);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [page, category]);

  /* ---------- pagination ---------- */
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = total === 0 ? 0 : Math.min(page * pageSize, total);

  const pages = useMemo(() => {
    const last = totalPages;
    if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);

    const set = new Set([
      1,
      2,
      3,
      last - 2,
      last - 1,
      last,
      page,
      page - 1,
      page + 1,
    ]);

    const arr = [...set]
      .filter((n) => n >= 1 && n <= last)
      .sort((a, b) => a - b);

    const out = [];
    for (let i = 0; i < arr.length; i++) {
      out.push(arr[i]);
      if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) {
        out.push("...");
      }
    }
    return out;
  }, [page, totalPages]);

  return (
    <section className="lg:mx-20 md:mx-10 mx-4 mb-18">
      <div>
        <Link
          href="/ppdhome/admin/allCreate"
        >
          <button className="bg-pink-400 text-white text-xl hover:bg-pink-500 rounded-xl py-2 px-6 mt-4 mb-4">
            back
          </button>
        </Link>
      </div>

      {/* ---------- Tabs ---------- */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((c) => (
          <button
            key={c.id}
            className={tabBtn(category === c.id)}
            onClick={() => {
              setCategory(c.id);
              setPage(1);
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* ---------- Content ---------- */}
      <div className="md:mt-10 mt-4 p-5 rounded-xl">
        {loading ? (
          <p className="py-8 text-center text-gray-500">กำลังโหลดข้อมูล...</p>
        ) : error ? (
          <p className="py-8 text-center text-red-500">{error}</p>
        ) : items.length === 0 ? (
          <p className="py-8 text-center text-gray-500">ยังไม่มีข้อมูล</p>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
            {items.map((it) => {
              const {
                id,
                title,
                subtitle,
                content_date,
                image,
                pdf_file,
                detail, // 👈 เผื่อมีรายละเอียด
              } = it;

              const newsNew = isNew(content_date, now);

              const href = pdf_file
                ? pdf_file
                : `/ppdhome/admin/posts/${id}`;

              return (
                <Link
                  key={id}
                  href={href}
                  target={pdf_file ? "_blank" : undefined}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg transition"
                >
                  {/* 🔥 รูป */}
                  <div className="relative w-full aspect-[14/9] bg-gray-200 overflow-hidden">
                    {image ? (
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        ไม่มีรูป
                      </div>
                    )}
                  </div>

                  {/* 🔥 content */}
                  <div className="p-4">
                    {/* title */}
                    <p className="text-base font-semibold line-clamp-2 group-hover:text-pink-600">
                      {title} {subtitle}
                    </p>

                    {/* detail */}
                    {detail && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {detail}
                      </p>
                    )}

                    {/* date + NEW */}
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-gray-500">
                        {formatThaiDate(content_date)}
                      </p>

                      {newsNew && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <p className="text-blue-600 text-sm text-light mt-2">Read More</p>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(id);
                        }}
                        className="bg-red-500 rounded-xl p-1 px-3 text-white hover:bg-red-700 text-sm"
                      >
                        ลบ
                      </button>
                    </div>

                  </div>
                  
                </Link>
              );
            })}
          </div>
        )}

      </div>
      <div>
        {/* pagination เหมือนเดิม */}
        <div className="flex justify-center gap-6 items-center mt-5 pt-3">
          <p className="text-sm text-gray-700">
            แสดง {start} ถึง {end} จากทั้งหมด {total} รายการ
          </p>

          <nav className="inline-flex shadow-sm">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2 py-2 border rounded-l disabled:text-gray-300 bg-white"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            {pages.map((p, i) =>
              p === "..." ? (
                <span key={i} className="px-4 py-2 border text-gray-400">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cx(
                    "px-4 py-2 border",
                    p === page && "bg-pink-400 text-white"
                  )}
                >
                  {p}
                </button>
              )
            )}

            <button
              disabled={page >= totalPages}
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              className="px-2 py-2 border rounded-l disabled:text-gray-300 bg-white"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>

      <Link
        href="/ppdhome/admin/newsAndPublicCreate/postsCreate"
        className="fixed bottom-10 right-10 w-14 h-14 bg-pink-600 text-white text-3xl flex items-center justify-center rounded-full shadow hover:bg-pink-700"
      >

        +

      </Link>
    </section>

  );
}