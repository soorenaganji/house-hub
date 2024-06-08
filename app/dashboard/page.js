"use client"
import { Redirect } from "next";
import { redirect } from "next/navigation";
import { useEffect } from "react";
const Page = () => {
    useEffect(() => {
        redirect("/dashboard/add-post")
    } , [])
    return (
        <div>
        </div>
    );
}

export default Page;