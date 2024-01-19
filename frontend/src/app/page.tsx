import Form from "./components/register/form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard")
  }
  return (
    <Form />
  )
}