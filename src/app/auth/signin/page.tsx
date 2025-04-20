"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/api";
import { Role } from "@/lib/constants/roles";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

type Props = {
  searchParams: { role?: Role };
};

export default function SignIn({ searchParams }: Props) {
  const { resolvedTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const role = searchParams?.role as Role;
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);
      if (res.status === "success") {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userRole", res.data.role);
        setMessage("Login successful!");
        setError("");
        router.push("/dashboard");
      } else {
        setMessage("");
      }
    } catch (err: any) {
      setError("Invalid credentials or server error");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-1 flex-row">
        {/* Left Side - Illustration */}
        <div className="w-1/2 bg-[#FFD233] flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl font-bold mb-4">I'm here for Hiring</h2>
          <img
            src="/recruiter.png"
            alt="Recruiter"
            className="w-48 h-auto mb-6 transform -scale-x-100"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col flex-1 w-1/2 justify-center items-center bg-white dark:bg-gray-900">
          <form
            onSubmit={handleSubmit}
            className="w-[440px] flex flex-col gap-4 p-8 rounded-lg shadow-md bg-white dark:bg-gray-900"
          >
            <div className="text-center">
              <p className="text-2xl font-semibold">Sign In</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Access your personalized job recommendations and applications.
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Password</label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
            </div>

            <Button type="submit" className="mt-4 w-full" variant="secondary">
              Get Started
            </Button>

            <div className="text-center text-sm">
              Create new account?{" "}
              <Link href="/auth/signup" className="text-blue-600">
                Sign up
              </Link>
            </div>

            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* ⬇️ Footer placed inside the form container */}
            <div className="flex justify-between text-xs text-gray-500 px-1 pt-6">
              <p>@ Job portal 2025</p>
              <p>help@jobportal.com</p>
            </div>
          </form>
        </div>
      </div>

      {/* Footer outside the main flex row */}
      {/* <div className="flex justify-between text-xs text-gray-500 px-8 py-4">
        <p>@ Job portal 2025</p>
        <p>help@jobportal.com</p>
      </div> */}
    </div>
  );
}
