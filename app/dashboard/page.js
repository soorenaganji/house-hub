"use client"
import { redirect } from "next/navigation";
import { useEffect } from "react";
const Page = () => {
    useEffect(() => {
        redirect("/dashboard/account")
    } , [])
    return (
        <div>
        </div>
    );
}

export default Page;