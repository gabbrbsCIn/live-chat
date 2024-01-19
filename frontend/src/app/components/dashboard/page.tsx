"use client"
import Logout from "../logout/logout";
import { io } from 'socket.io-client';
import React, { FormEvent, useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react";
import { IoMdSend } from "react-icons/io";
import { User } from "@prisma/client";
import { toast } from "react-toastify";
import { IoIosSearch } from "react-icons/io"


const socket = io("http://localhost:3001");

export default function Form() {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState<Array<any>>([]);
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [userStatus, setUserStatus] = useState(false)



    const messagesContainer = useRef<HTMLDivElement>(null) as any;


    useEffect(() => {
        // Acesse o elemento com segurança após o render

        messagesContainer.current?.lastElementChild?.scrollIntoView()

    }, [messageList]);

    const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/api/searchBar', {
            method: "POST",
            body: JSON.stringify({
                username: formData.get("username")
            }),
        });
        console.log({ response })
        const user = await response.json();

        if (!user) {
            setUser(user)
            toast.error("Usuário não encontrado!")
        } else {
            setUser(user)
            toast.success("Usuário encontrado!")
        }


    }



    const handleSendMessage = (e: React.FormEvent) => {
        const myusername = session?.username
        e.preventDefault();
        if (room.trim()) {
            socket.emit("message", ({ myusername, message, room }));
        }
        else {
            toast.warn("Você está offline!")
        }
    }

    const joinRoom = () => {
        const username = user?.username
        console.log(username)
        setRoom(username as string)
        toast.success("Conectado à " + username)
        socket.emit("join_room", room);
        setMessage('');


    };

    const turnOnline = () => {
        const myusername = session?.username;
        setRoom(myusername as string);
        toast.success("Pronto para receber mensagens de outros usuários!")
        // socket.emit("join_room", room)
        setUserStatus(true);
    };

    const turnOffline = () => {
        setRoom('');
        socket.emit("join_room", room)
        setUserStatus(false)
        setUser(null)
        toast.warn("Você está offline!")
        setMessageList([]);
    };

    if (userStatus) {
        socket.emit("join_room", room)
        console.log(room)
    } else if (!userStatus) {
        socket.emit("join_room", room)
        console.log(room)
    }



    socket.on("message", (message) => {
        setMessageList([...messageList, message])
    });



    return (
        <>
            <div className="flex flex-nowrap">
                <div className="h-screen w-1/3 bg-gradient-to-b from-emerald-700 to-emerald-500 ">
                    <div className="flex justify-between pt-4 pl-4 pr-4 text-white">Bem-vindo {session?.username}!<Logout /></div>
                    <div className="flex justify-center mt-3">
                        <h1 className="text-white text-lg "><img className='size-10' src="./chat.svg" alt="Logo" /></h1>
                    </div>
                    <form onSubmit={handleSearch} className="flex justify-center mt-10 h-8">
                        <input name="username" className="bg-gray-200 rounded-[5px] text-s indent-3 w-2/3" placeholder="Com quem você quer conversar?" />
                        <button type="submit" className="ml-3"><IoIosSearch color={"white"} size={25} /></button>
                    </form>

                    <div className="flex justify-around mt-5 text-xl ">
                        <button className=" text-green-400 hover:text-green-500" type="submit" onClick={turnOnline}>Receba mensagens</button>
                        <button className=" text-red-300 hover:text-red-400" type="submit" onClick={turnOffline}>Fique off-line</button>
                    </div>

                    {/* {!userStatus && (
                        <div className="flex justify-center mt-5 text-xl text-white hover:text-blue-400"><button type="submit" onClick={turnOnline}>Clique para poder receber mensagens</button></div>
                    )} */}


                    {user && (
                        <div className="flex flex-nowrap justify-center items-center bg-emerald-800 mt-10 h-12">
                            <button onClick={joinRoom} type="submit" className="text-xl text-white "> {user?.username}  </button>
                        </div>
                    )}

                </div>

                <div className="w-2/3 h-screen flex flex-col justify-end">
                    <div className="flex flex-col justify-end pl-10 pt-20 pb-5 space-y-3 h-full">
                        <ul className="overflow-auto " ref={messagesContainer}>
                            {messageList.map((message) => (
                                <li key={message.myusername}>{message.myusername}: {message.message} </li>
                            ))}
                        </ul>
                    </div>
                    <form onSubmit={handleSendMessage} className="flex flex-nowrap items-center w-full pb-5 pl-5 h-16">
                        <input className="bg-gray-300 w-full h-10 rounded-[5px] text-s indent-6" placeholder="Digite sua mensagem..." onChange={(e) => setMessage(e.target.value)} type="text" />
                        <button type="submit" className="mr-3 ml-3"><IoMdSend color={"#059669"} size={30} /></button>
                    </form>
                </div>

            </div>


        </>


    )
}