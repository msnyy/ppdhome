"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!q) return;

    const fetchData = async () => {
      const res = await fetch(`/api/search?q=${q}`);
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, [q]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        ผลการค้นหา: “{q}”
      </h1>

      {data.length === 0 ? (
        <p>ไม่พบข้อมูล</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 hover:shadow-md"
            >
              <p className="font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
