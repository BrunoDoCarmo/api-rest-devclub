"use client"

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { userLogoutAction } from "../actions/login";

const LogoutButton = () => {
    const router = useRouter()

    async function handleLogout() {
        const result = await userLogoutAction()

        if(result.success) {
            localStorage.removeItem("token")
            localStorage.removeItem("userId")

            router.push("/login")
        } else {
            alert(result.message)
        }
    }

    return (
        <button onClick={handleLogout}>
            <LogOut/>
        </button>
    );
}
 
export default LogoutButton;