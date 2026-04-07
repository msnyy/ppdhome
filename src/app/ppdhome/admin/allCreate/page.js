import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AllCreateClient from "./AllCreateClient";

export default function Page() {
  const admin = cookies().get("admin_id");

  if (!admin) {
    redirect("/ppdhome/admin/login");
  }

  return <AllCreateClient />;
}