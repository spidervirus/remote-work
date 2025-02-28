import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Messages",
  description: "Team communication and messages",
}

export default async function MessagesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Messages</h1>
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
          New Message
        </button>
      </div>
      
      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg shadow">
          <p className="text-muted-foreground text-center">No messages yet. Start a conversation with your team!</p>
        </div>
      </div>
    </div>
  )
} 