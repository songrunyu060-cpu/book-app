"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

// 借阅记录页
export default function Borrow() {
  const { data: session } = useSession()
  if (!session) {
    redirect("/user/login")
  }

  return <div>Borrow</div>
}
