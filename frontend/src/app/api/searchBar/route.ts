import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username } = body;
        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });
        console.log(user)
        return NextResponse.json(user)

    } catch (e) {
        return NextResponse.json({ message: 'failed' })

    }




}