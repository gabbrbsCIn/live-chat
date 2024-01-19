"use client"
import LogoBox from "../logobox"
import { FormEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";


export default function Form() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/api/auth/register', {
            method: "POST",
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("password"),
                username: formData.get("username")
            }),
        });
        const verify = await response.json();
        console.log(verify.message)
        if (verify.message == "sucess") {
            toast.success("Usuário cadastrado!");
            router.push("/login")

        } else {
            toast.error("Preencha os campos corretamente")
        }

    }
    return (
        <>
            <div className="flex">
                <LogoBox />
                <div className="flex flex-col justify-center items-center w-1/2 ">
                    <p className="text-center text-emerald-500 text-5xl font-extralight">Sign Up</p>
                    <form onSubmit={handleSubmit} className="flex flex-col w-60 space-y-6 mt-8" >
                        <input name='email' className=" bg-zinc-300 rounded-[10px] text-xs indent-6 h-10" type="email" placeholder="E-mail" />
                        <input name='password' className=" bg-zinc-300 rounded-[10px] text-xs indent-6 h-10" type="password" placeholder="Senha" />
                        <input name='username' className=" bg-zinc-300 rounded-[10px] text-xs indent-6 h-10" type="text" placeholder="Nome de Usuário" />
                        <button className="bg-gray-400 hover:bg-gray-500 rounded-[10px] text-sm h-10" type="submit">Cadastrar-se</button>
                    </form>
                    <svg className="mt-5 w-60" height="1">
                        <line x1="0" y1="0" x2="100%" y2="" stroke="black" strokeWidth="1" />
                    </svg>
                    <p className="text-[12px] mt-2">Already have an account? <Link className="text-[12px] hover:text-gray-500" href="/login">Sign In</Link></p>
                </div>

            </div>
        </>
    )
}