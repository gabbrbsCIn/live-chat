import type { Metadata } from 'next';
import './globals.css';
import { Roboto } from 'next/font/google';
import { getServerSession } from 'next-auth';
import Logout from './components/logout/logout';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NextAuthSessionProvider from '@/providers/sessionProvider';



const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chat do PG',
  description: 'Chat ao vivo',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = getServerSession();
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ToastContainer autoClose={3000} />
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>

    </html>
  )
};
