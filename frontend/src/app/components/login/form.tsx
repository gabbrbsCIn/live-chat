"use client";
import { FormEvent, useReducer } from "react";
import LogoBox from "../logobox";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";


export default function Form() {
    const router = useRouter();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });
        console.log({ response });
        if (!response?.error) {
            router.push("/dashboard");
            router.refresh();
            toast.success("Logado com sucesso!");

        } else {
            toast.error("E-mail ou senha errados!");
            return
        }
    };
    return (
        <>
            <div className="flex">
                <LogoBox />
                <div className="flex flex-col justify-center items-center w-1/2 ">
                    <p className="text-center text-emerald-500 text-5xl font-extralight">Welcome Back!</p>
                    <form onSubmit={handleSubmit} className="flex flex-col w-60 space-y-6 mt-8">
                        <input name="email" className=" bg-zinc-300 rounded-[10px] text-xs indent-6 h-10" type="email" placeholder="E-mail" />
                        <input name="password" className=" bg-zinc-300 rounded-[10px] text-xs indent-6 h-10" type="text" placeholder="Senha" />
                        <button className="bg-gray-400  hover:bg-gray-500 rounded-[10px] text-sm h-10" type="submit">Entrar</button>
                    </form>
                    <svg className="mt-5 w-60" height="1">
                        <line x1="0" y1="0" x2="100%" y2="" stroke="black" strokeWidth="1" />
                    </svg>
                    <p className="text-[12px] mt-2">Don't have an account? <Link className="text-[12px] hover:text-gray-500" href="/">Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}