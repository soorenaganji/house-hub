"use client"
import { Redirect } from "next";
import { redirect } from "next/navigation";
import { useEffect } from "react";
const page = () => {
    useEffect(() => {
        redirect("/dashboard/add-post")
    } , )
    return (
        <div>
        </div>
    );
}

export default page;