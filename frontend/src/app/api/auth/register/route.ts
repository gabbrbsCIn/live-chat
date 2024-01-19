import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import prisma from "@/app/lib/db";
import * as z from 'zod';



const userSchema = z.object({
    email: z.string().min(1, 'É necessário um E-mail').email('E-mail inválido'),
    password: z.string().min(1, 'É necessário uma senha').min(8, 'A senha deve ter no mínimo 8 caracteres'),
    username: z.string().min(1, 'É necessário um username').max(50),
})

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, username } = userSchema.parse(body);
        console.log({ email, password })
        const hashedPassword = await hash(password, 10)
        const response = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword
            }
        }); console.log(response)

    } catch (e) {
        return NextResponse.json({ message: 'failed' })

    }


    return NextResponse.json({ message: 'sucess' })

}



