export const dynamic = "force-dynamic";
import { getPool } from "@lib/db";

export async function GET() {
  const pool = await getPool();

  const result = await pool
    .request()
    .query("SELECT bwMode FROM SiteSettings WHERE id = 1");

  return Response.json({
    bwMode: result.recordset[0].bwMode
  });
}

export async function POST(req) {
  const { bwMode } = await req.json();

  const pool = await getPool();

  await pool
    .request()
    .input("bwMode", bwMode ? 1 : 0)
    .query("UPDATE SiteSettings SET bwMode = @bwMode WHERE id = 1");

  return Response.json({ success: true });
}
