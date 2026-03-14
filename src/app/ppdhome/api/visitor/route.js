import { NextResponse } from "next/server";
import { getPool } from "@lib/db";

// ✅ GET = แค่ดึงข้อมูล
export async function GET() {
  const pool = await getPool();

  const result = await pool.request().query(`
    SELECT totalViews, todayViews
    FROM dbo.SiteSettings
    WHERE id = 1
  `);

  return NextResponse.json(result.recordset[0]);
}

// ✅ POST = อัปเดตยอด
export async function POST() {
  const pool = await getPool();

  await pool.request().query(`
    UPDATE dbo.SiteSettings
    SET 
      todayViews = CASE 
          WHEN lastDate <> CAST(GETDATE() AS DATE) THEN 1
          ELSE todayViews + 1
      END,
      totalViews = totalViews + 1,
      lastDate = CAST(GETDATE() AS DATE)
    WHERE id = 1
  `);

  return NextResponse.json({ success: true });
}
