"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { signIn } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type * as z from "zod"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { loginSchema, registerSchema } from "@/lib/validations/auth"
import { ClientButton } from "@/components/client-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof loginSchema> | z.infer<typeof registerSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isRegister = pathname === "/register"
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  })

  async function onSubmit(data: FormData) {
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        name: isRegister ? (data as z.infer<typeof registerSchema>).name : undefined,
        callbackUrl,
      })

      if (!result?.ok) {
        setError(result?.error || "Something went wrong")
        toast.error(result?.error || "Authentication failed")
      } else {
        toast.success(isRegister ? "Account created successfully!" : "Logged in successfully!")
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      setError("Something went wrong")
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const result = await signIn("google", { callbackUrl, redirect: false })
      if (result?.error) {
        toast.error("Failed to sign in with Google")
      } else {
        toast.success("Signed in with Google successfully!")
      }
    } catch (error) {
      toast.error("Something went wrong with Google sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGithub = async () => {
    setIsLoading(true)
    try {
      const result = await signIn("github", { callbackUrl, redirect: false })
      if (result?.error) {
        toast.error("Failed to sign in with GitHub")
      } else {
        toast.success("Signed in with GitHub successfully!")
      }
    } catch (error) {
      toast.error("Something went wrong with GitHub sign in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {isRegister && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                {...register("name")}
              />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          {isRegister && (
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                placeholder="••••••••"
                type="password"
                autoComplete="new-password"
                disabled={isLoading}
                {...register("confirmPassword")}
              />
              {errors?.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
          <ClientButton disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isRegister ? "Create account" : "Sign in"}
          </ClientButton>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <ClientButton
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={loginWithGoogle}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Continue with Google
        </ClientButton>
        <ClientButton
          variant="outline"
          type="button"
          disabled={isLoading}
          onClick={loginWithGithub}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Continue with GitHub
        </ClientButton>
      </div>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <p className="text-sm text-muted-foreground text-center">
            By clicking continue, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
} 