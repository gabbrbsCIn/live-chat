import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/app/lib/db";

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }) {
            session = token.user as any
            return session
        }
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
                username: {},
            },
            async authorize(credentials, req) {
                const response = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email
                    }
                });

                if (response) {
                    const passwordCorrect = await compare(credentials?.password || '', response.password);
                    console.log({ passwordCorrect })
                    if (passwordCorrect === true) {
                        console.log('senha correta')
                        return {
                            id: response.id.toString(),
                            username: response.username,
                            email: response.email,
                        }
                    };
                    console.log({ passwordCorrect });
                }


                console.log({ credentials });
                return null;
            },
        }),
    ],
});

export { handler as GET, handler as POST };