
import { getServerSession } from "next-auth"
import Logout from "../components/logout/logout"
import { redirect } from "next/navigation";
import { io } from 'socket.io-client';
import { useState } from "react";
import NextAuth from "next-auth/next";
import Form from "../components/dashboard/page";

export default function Dashboard() {

    return (
        <>
            
            <Form />
        </>


    )
}