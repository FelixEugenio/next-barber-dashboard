import { cookies } from "next/headers";

export async function getCookiesServer() {
    
    const token = cookies().get("token")?.value;

    return token || null;
}