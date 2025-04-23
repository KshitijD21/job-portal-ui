"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { registerUser } from "@/lib/api";
import { Role } from "@/lib/constants/roles";

export default function SignUpForm({ role }: { role: Role }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await registerUser(email, userName, password, role);

      // ✅ Check if the ID exists in response
      const user = res?.data || res;
      if (user?.id) {
        setMessage("Signup successful! Redirecting...");
        setError("");

        setTimeout(() => {
          window.location.href = "/auth/signin";
        }, 1500);
      } else {
        setError("Signup failed. Please try again.");
        setMessage("");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError("Something went wrong. Please check your input.");
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md"
    >
      <div className="flex flex-col gap-1">
        <p className="text-2xl font-semibold text-center">Sign up</p>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Some small description
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">Username</p>
        <Input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
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

      <Button type="submit" variant="outline" className="w-full">
        Get Started
      </Button>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/signin" className="text-blue-600">
          Sign in
        </Link>
      </div>
    </form>
  );
}
