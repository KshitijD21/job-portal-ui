"use client";
import {
  BarChart2,
  Briefcase,
  GitGraph,
  HelpCircle,
  LayoutDashboard,
  LogIn,
  LucideIcon,
  Settings,
  UploadCloud,
  UserPlus,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export default function Sidebar() {
  const { resolvedTheme } = useTheme();
  const [mount, setMount] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMount(true));
  if (!mount) return null;

  const sidebarItems: SidebarItem[] = [
    {
      label: "Applications",
      path: "/dashboard",
      icon: Briefcase, // 🔄 Represents job applications
    },
    {
      label: "Upload Resume",
      path: "/onboarding",
      icon: UploadCloud, // 📤 Indicates uploading documents
    },
  ];

  return (
    <div className="w-56 transition-all bg-gradient-to-r from-gray-100 to-gray-100 dark:from-gray-800 dark:to-gray-900 h-full">
      <div className="flex items-center justify-center h-12 px-1 mt-2 ">
        <img
          src="/logo-new.png"
          alt="Qruil Logo"
          className="w-26 object-contain"
        />
      </div>

      <div className="flex flex-col p-3 gap-5">
        <div className="flex flex-col p-3 gap-5">
          {sidebarItems.map(({ label, path, icon: Icon }: SidebarItem) => {
            const isActive = pathname === path;
            return (
              <Link key={path} href={path}>
                <div
                  className={`flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-[0_2px_10px_rgba(250,204,21,0.4)]"
                      : " dark:hover:bg-yellow-900 text-gray-800 dark:text-gray-100"
                  }`}
                  style={{
                    background: isActive
                      ? "var(--color-yellow-500)"
                      : undefined,
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <p className="text-sm font-medium">{label}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
