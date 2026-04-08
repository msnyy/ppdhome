import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AllCreateClient from "./AllCreateClient";

export default async function Page() {
    const cookieStore = await cookies();
    const admin = cookieStore.get("admin_id");

    if (!admin) {
        redirect("/ppdhome/admin/login");
    }


    return <AllCreateClient />;
}