import { Icons } from "@/components/icons"

export default function AuthLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Icons.spinner className="h-8 w-8 animate-spin" />
    </div>
  )
} 