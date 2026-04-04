"use client";

import { useEffect, useState } from "react";

export default function BWWrapper() {
  const [bwMode, setBwMode] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/ppdhome/api/theme");
        const data = await res.json();
        setBwMode(data.bwMode);
      } catch (err) {
        console.error("โหลด bwMode ไม่สำเร็จ", err);
      }
    }

    load();
  }, []);

  if (!bwMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none bg-black/70 mix-blend-saturation z-[9998]" />
  );
}