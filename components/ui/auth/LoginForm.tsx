"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const registered = searchParams.get("registered");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push(callbackUrl);
    } catch (error: any) {
      setError(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-2">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription className="text-base">
            Enter your credentials to continue
          </CardDescription>
          {registered && (
            <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-md">
              Registration successful! Please log in.
            </div>
          )}
          {error && (
            <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="john@example.com"
                type="email"
                required
                className="p-3 text-base"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your password"
                type="password"
                required
                className="p-3 text-base"
              />
            </div>

            <Button
              type="submit"
              className="w-full p-3 text-base"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full p-3 text-base space-x-2"
                onClick={() => signIn("github", { callbackUrl })}
              >
                <FaGithub />
                <span>GitHub</span>
              </Button>
              <Button
                variant="outline"
                className="w-full p-3 text-base space-x-2"
                onClick={() => signIn("google", { callbackUrl })}
              >
                <FcGoogle />
                <span>Google</span>
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
