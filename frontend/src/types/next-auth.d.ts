import NextAuth from "next-auth";


declare module 'next-auth' {
    interface Session {
        id: string
        email: string
        username: string
    }
}