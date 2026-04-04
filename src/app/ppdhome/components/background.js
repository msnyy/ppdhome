"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-white">
      
      <div
        className="absolute -inset-[20%] lg:hidden"
        style={{
          background: `
            radial-gradient(circle at 50% 15%, #f9bed5ab 0%, rgba(255,255,255,0) 20%),
            radial-gradient(circle at 20% 40%, rgba(226, 70, 153, 0.38) 0%, rgba(255,160,210,0) 15%),
            radial-gradient(circle at 50% 80%, #f393b8bd 0%, rgba(255,205,230,0) 20%)
          `,
        }}
      />

      <div
        className="absolute -inset-[15%] hidden lg:block"
        style={{
          background: `
            radial-gradient(circle at 24% 20%, #f9bed5ab 0%, rgba(255,255,255,0) 20%),
            radial-gradient(circle at 55% 60%, #f9bed5ab 0%, rgba(255,255,255,0) 20%),
            radial-gradient(circle at 90% 16%, #f9bed5ab 0%, rgba(255,193,221,0) 23%),
            radial-gradient(circle at 16% 90%, #f9bed5ab 0%, rgba(255,160,210,0) 20%),
            radial-gradient(circle at 96% 82%, #f393b8bd 0%, rgba(255,205,230,0) 16%)
          `,
        }}
      />
    </div>
  );
}
