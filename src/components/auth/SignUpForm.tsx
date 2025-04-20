"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle logic here
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
