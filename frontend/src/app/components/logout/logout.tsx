"use client"

import { signOut } from "next-auth/react";

import { CiLogout } from "react-icons/ci";


export default function Logout() {
    return (
        <span className="cursor-pointer" onClick={() => {
            signOut();
        }}>
            <CiLogout size={25} color={"white"} />
        </span>
    )
}