"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
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

function isNew(date) {
  if (!date) return false;

  const now = new Date();
  const newsDate = new Date(date);

  const diff = (now - newsDate) / (1000 * 60 * 60 * 24);

  return diff <= 7; // ภายใน 7 วัน
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

  const pageSize = 10;

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
      "lg:px-10 md:px-6 px-4 py-3 border rounded-xl md:text-lg transition-all",
      active
        ? "bg-pink-400 text-white border-pink-400"
        : "bg-white text-pink-400 border-pink-300 hover:bg-pink-400 hover:text-white"
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

        if (!res.ok) throw new Error("fetch error");

        const data = await res.json();

        setItems(data.items || []);
        setTotal(data.total || 0);

      } catch (err) {

        if (err.name !== "AbortError") {
          console.error(err);
          setError("โหลดข้อมูลไม่สำเร็จ");
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

    if (last <= 7)
      return Array.from({ length: last }, (_, i) => i + 1);

    const set = new Set([
      1, 2, 3, last - 2, last - 1, last, page, page - 1, page + 1
    ]);

    const arr = [...set]
      .filter(n => n >= 1 && n <= last)
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

    <section className="lg:mx-20 md:mx-10 mx-4 mt-6">

      {/* ---------- category tabs ---------- */}

      <div className="flex flex-wrap justify-center gap-4">

        {categories.map(c => (

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

      {/* ---------- content ---------- */}

      <div className="border bg-white border-gray-300 mt-6 p-5 rounded-xl">

        {loading ? (

          <p className="text-center py-8 text-gray-500">
            กำลังโหลดข้อมูล...
          </p>

        ) : error ? (

          <p className="text-center py-8 text-red-500">
            {error}
          </p>

        ) : items.length === 0 ? (

          <p className="text-center py-8 text-gray-500">
            ยังไม่มีข้อมูล
          </p>

        ) : (

          <div className="">

            {items.map(it => {

              const {
                id, title, subtitle, header_date, content_date, pdf_file
              } = it;

              const newsNew = isNew(content_date);

              const href = pdf_file
                ? pdf_file
                : `/ppdhome/admin/posts/${id}`;

              return (

                <Link
                  key={id}
                  href={href}
                  target={pdf_file ? "_blank" : undefined}
                  className="block py-4 hover:bg-pink-50 px-2 border-b border-gray-300"
                >

                  <div className="flex justify-between items-start">

                    <div>
                      
                        <div className="flex items-center gap-2 flex-wrap">

                          <p className="text-lg">
                            {title} 
                          </p>
                          
                          {subtitle && (
                          <span className="text-lg">
                           {subtitle}
                          </span>
                        )}

                          {newsNew && (
                            <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded animate-pulse shadow-[0_0_10px_rgba(255,115,0,0.8)]">
                              NEW
                            </span>
                          )}

                        </div>
                      


                      {header_date && (
                        <p className="text-xs text-gray-500">
                          {header_date}
                        </p>
                      )}

                    </div>

                    <div className="flex gap-2">

                      <p className="text-sm text-gray-500">
                        {formatThaiDate(content_date)}
                      </p>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(id);
                        }}
                        className="bg-red-500 rounded-xl p-2 text-white hover:text-red-700 text-sm"
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

        {/* ---------- pagination ---------- */}

        <div className="flex justify-between pt-3">

          <p className="text-sm">
            แสดง {start} ถึง {end} จากทั้งหมด {total} รายการ
          </p>

          <nav className="flex">

            <button
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-3 border border-gray-400 rounded-l"
            >
              <ChevronLeftIcon className="w-5" />
            </button>

            {pages.map((p, i) =>

              p === "..." ?

                <span key={i} className="px-3 border">...</span>

                :

                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cx(
                    "px-3 border",
                    p === page && "bg-pink-400 text-white"
                  )}
                >
                  {p}
                </button>

            )}

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-3 border border-gray-400 rounded-r"
            >
              <ChevronRightIcon className="w-5" />
            </button>

          </nav>

        </div>

      </div>

      {/* ---------- floating add button ---------- */}

      <Link
        href="/ppdhome/admin/newsAndPublicCreate/postsCreate"
        className="fixed bottom-10 right-10 w-14 h-14 bg-pink-600 text-white text-3xl flex items-center justify-center rounded-full shadow hover:bg-pink-700"
      >

        +

      </Link>

      <div className="flex justify-end">
        <Link
          href="/ppdhome/admin/allCreate"
        >
          <button className="bg-pink-400 text-white text-xl hover:bg-pink-500 rounded-xl py-2 px-6 mt-4">
            back
          </button>
        </Link>
      </div>
    </section>

  );
}