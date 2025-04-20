"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/lib/api";
import { Role } from "@/lib/constants/roles";
import { useTheme } from "next-themes";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

type Props = {
  searchParams: { role?: Role };
};

export default function signIn({ searchParams }: Props) {
  const { resolvedTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  console.log("resolvedTheme ", resolvedTheme);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  const role = searchParams?.role as Role;

  console.log("my role issss ", role);

  if (!mounted) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser(email, password);
      console.log("Login Success:", res);
      if (res.status === "success") {
        console.log("code is here ");

        localStorage.setItem("authToken", res.data);
        setMessage("Login successful!");
        setError("");
        router.push("/dashboard");
      } else {
        console.log("code is here in error mode ");
        // setError("Invalid credentials or server error");
        setMessage("");
      }
    } catch (err: any) {
      console.error("Login Failed:", err);
      setError("Invalid credentials or server error");
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex min-h-screen w-full">
      {" "}
      <div className="flex-1 flex flex-col">
        {/* <div className="flex p-3">
          <img
            src={
              resolvedTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"
            }
            alt="Logo"
            className="h-15 w-auto"
          />
        </div> */}
        <div className="w-1/2 bg-[#FFD233] flex flex-col justify-center items-center text-white">
          <h2 className="text-4xl font-bold mb-4">I'm here for Hiring</h2>
          <img
            src="/recruiter.png"
            alt="Recruiter"
            className="w-48 h-auto mb-6 transform -scale-x-100"
          />
          {/* <Link
            href={{
              pathname: "/auth/signup",
              query: { role: Role.RECRUITER },
            }}
            className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition"
          >
            SIGNUP AS RECRUITER
          </Link>

          <p className="mt-4 text-sm text-black">
            Already have an account?{" "}
            <a href="/auth/signin" className="underline">
              Login here
            </a>
          </p> */}
        </div>
        <div className="flex-1 h-screen flex justify-center items-center ">
          <div className="w-1/2 flex flex-col gap-4 p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className=" flex flex-col gap-1">
              <p className="text-2xl font-semibold text-center">Sign In</p>
              <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                some small description
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Email</p>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Password</p>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
            </div>
            <div className="flex flex-row justify-center mt-2">
              <Button variant="outline" type="submit" className="w-full">
                Get Started
              </Button>
            </div>
            <div className="flex flex-row justify-center mt-2">
              <p>
                Create new account?{" "}
                <Link href="/auth/signup" className="text-blue-600">
                  Sign up
                </Link>
              </p>
            </div>
            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-300 mt-auto px-4 pb-2">
          <p className="text-gray-700 dark:text-gray-200">@ Job portal 2025</p>
          <p className="text-gray-500 dark:text-gray-400">help@jobportal.com</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2">
        <img
          src="/auth-image4.png"
          alt="Dashboard Illustration"
          className="w-full h-full object-contain rounded-2xl"
        />
      </div>
    </form>
  );
}
