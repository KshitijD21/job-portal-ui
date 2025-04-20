"use client";
import SplitFormLayout from "@/components/auth/SplitFormLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/lib/api";
import { Role } from "@/lib/constants/roles";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";

interface AuthFormProps {
  mode: "Signup" | "Login";
  onSubmit: (data: { email: string; password: string }) => void;
  resetForm?: boolean;
}

type SignUpProps = {
  searchParams: {
    role?: string;
  };
};
export default function SignUpPage({ searchParams }: SignUpProps) {
  const role = (searchParams.role as Role) || Role.JOBHUNTER;

  console.log("role ", role);

  return <SplitFormLayout role={role} />;
}
