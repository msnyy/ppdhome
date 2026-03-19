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
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function isNew(content_date) {
  const now = new Date();
  const newsDate = new Date(content_date);

  const diff = (now - newsDate) / (1000 * 60 * 60 * 24);
  return diff <= 7;
}

/* ---------- component ---------- */
export default function NewsAndPublic() {
  const [category, setCategory] = useState(1);
  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <section className="lg:mx-20 md:mx-10 mx-4 md:mt-16 mt-4">
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
      <div className="border bg-white border-gray-300 md:mt-10 mt-4 p-5 rounded-xl">
        {loading ? (
          <p className="py-8 text-center text-gray-500">กำลังโหลดข้อมูล...</p>
        ) : error ? (
          <p className="py-8 text-center text-red-500">{error}</p>
        ) : items.length === 0 ? (
          <p className="py-8 text-center text-gray-500">ยังไม่มีข้อมูล</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {items.map((it) => {
              const {
                id,
                title,
                subtitle,
                header_date,
                content_date,
                pdf_file,
              } = it;

              const href = pdf_file
                ? pdf_file
                : `/ppdhome/user/newsAndPublic/${id}`;

              const newsNew = isNew(content_date);

              return (
                <Link
                  key={id}
                  href={href}
                  target={pdf_file ? "_blank" : undefined}
                  className="block py-4 px-2 rounded-lg hover:bg-pink-50 transition text-black"
                >
                  <div className="flex justify-between">

                    <div>
                      {subtitle && (
                        <div className="flex items-center gap-2 flex-wrap">

                          <p className="text-lg">
                            {title} {subtitle}
                          </p>

                          {newsNew && (
                            <span className="text-xs bg-orange-600 text-white px-2 py-1 rounded animate-pulse shadow-[0_0_10px_rgba(255,115,0,0.8)]">
                              NEW
                            </span>
                          )}

                        </div>
                      )}

                      <p className="text-lg">

                      </p>


                      {header_date && (
                        <p className="text-xs text-gray-500">
                          {header_date}
                        </p>
                      )}

                    </div>

                    <p className="text-sm text-gray-500">
                      {formatThaiDate(content_date)}
                    </p>

                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ---------- Pagination ---------- */}
        <div className="flex justify-between items-center border-t mt-5 pt-3">
          <p className="text-sm text-gray-700">
            แสดง {start} ถึง {end} จากทั้งหมด {total} รายการ
          </p>

          <nav className="inline-flex shadow-sm">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-2 py-2 border rounded-l disabled:text-gray-300"
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
              className="px-2 py-2 border rounded-r disabled:text-gray-300"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}