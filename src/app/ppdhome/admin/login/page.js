"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSupabaseImage } from "@lib/image";
import { Eye, EyeOff } from "lucide-react";


export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/ppdhome/api/admin/login", {
      method: "POST",
      credentials: "include", // ✅ สำคัญ
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/ppdhome/admin/allCreate");
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">

      {/* 🔵 ฝั่งซ้าย (รูป + ข้อความ) */}
      <div className="lg:w-2/3 w-full flex flex-col">

        {/* 🖼 รูป */}
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">

          <Image
            src={getSupabaseImage("pic/ppdhome.jpeg")}
            alt=""
            fill
            className="object-cover"
          />

          {/* โลโก้ */}
          <div className="absolute top-4 left-4 z-10">
            <Image
              src="/pic/logo.png"
              alt=""
              width={400}
              height={100}
              className="w-[200px] md:w-[300px] lg:w-[400px]"
            />
          </div>

        </div>

        {/* 📝 ข้อความด้านล่าง */}
        <div className="bg-pink-100 p-6 md:p-10 flex-1 flex flex-col justify-center">

          <p className="text-red-700 text-lg md:text-xl font-semibold">
            สถานคุ้มครองและพัฒนาคนพิการพระประแดง จ.สมุทรปราการ
          </p>

          <p className="text-red-700 text-lg md:text-xl font-semibold mt-2">
            ขอความร่วมมือในการใช้งานระบบและสื่อดิจิทัลอย่างถูกต้อง ภายใต้กฎหมายและจริยธรรม
          </p>

          <p className="text-red-700 mt-3 text-sm md:text-base">
            เพื่อความปลอดภัยและสิทธิประโยชน์ของทุกท่าน ห้ามใช้งานซอฟต์แวร์หรือสื่อที่ละเมิดลิขสิทธิ์ในทุกกรณี
          </p>

          <p className="text-red-700 text-sm md:text-base">
            รวมถึงห้ามนำทรัพยากรของหน่วยงานไปใช้ในทางที่ไม่เหมาะสมหรือไม่ได้รับอนุญาต
          </p>

          <p className="text-black text-sm md:text-base mt-2">
            การละเมิดลิขสิทธิ์หรือการใช้งานที่ไม่ถูกต้อง ถือเป็นความรับผิดชอบส่วนบุคคล และอาจมีผลทางกฎหมายตามที่กำหนด
          </p>

        </div>

      </div>

      {/* 🟣 ฝั่งขวา (Login) */}
      <div className="lg:w-1/3 w-full flex items-center justify-center bg-gray-100 p-6">

        <div className="w-full max-w-sm">

          <p className="text-shadow-lg text-lg">
            สถานคุ้มครองและพัฒนาคนพิการพระประแดง จ.สมุทรปราการ
          </p>

          <p className="mt-2 text-sm text-shadow-lg">
            PHRAPRADAENG HOME FOR PERSONS WITH
          </p>

          <p className="text-sm mb-6 text-shadow-lg">
            DISABILITIES PROTECTION AND DEVELOPMENT
          </p>

          <p className="mb-2 text-sm">ลงชื่อเข้าใช้</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-md p-2 mb-3"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md p-2 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-pink-700 text-white py-2 rounded-md hover:bg-pink-800 transition mt-6"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}
