"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/ppdhome/api/admin/login", {
      method: "POST",
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-100">
        <h1 className="text-5xl font-bold mb-8 text-center text-shadow-lg">
          Admin Login
        </h1>

        <input
          className="border p-2 w-full mb-4 rounded hover:border-pink-700"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password + Toggle */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            className="border p-2 w-full rounded hover:border-pink-700 pr-10"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-700"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-pink-700 text-white py-2 rounded hover:bg-pink-600"
        >
          Login
        </button>
      </div>
    </div>
  );
}
