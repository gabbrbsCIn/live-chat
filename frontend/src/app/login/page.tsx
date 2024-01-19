import LogoBox from "../components/logobox";
import { useState } from "react";
import Form from "../components/login/form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LogIn() {
    const session = await getServerSession();
    if (session) {
        redirect("/dashboard")
    }
    return (
        <Form />
    )
}
