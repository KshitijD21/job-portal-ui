"use client";
import {
  Briefcase,
  UploadCloud,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SidebarItem {
  label: string;
  path: string;
  icon: any;
}

export default function Sidebar() {
  const { resolvedTheme } = useTheme();
  const [mount, setMount] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMount(true), []);
  if (!mount) return null;

  const sidebarItems: SidebarItem[] = [
    {
      label: "Applications",
      path: "/dashboard",
      icon: Briefcase,
    },
    {
      label: "Upload Resume",
      path: "/onboarding",
      icon: UploadCloud,
    },
  ];

  const activeItem = sidebarItems.find((item) => item.path === pathname);

  return (
    <>
      {/* Breadcrumb on small screens */}
      {/* <div className="md:hidden flex items-center gap-2 px-4 py-2 text-sm bg-yellow-100 text-gray-800 dark:bg-yellow-900 dark:text-white shadow">
        <span className="font-medium">Home</span>
        <ChevronRight className="w-4 h-4" />
        <span>{activeItem?.label || "..."}</span>
      </div> */}

      {/* Sidebar */}
      <div className="w-16 md:w-56 h-full bg-gradient-to-r from-gray-100 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-all duration-300">
        <div className="flex items-center justify-center h-12 px-1 mt-2">
          <img
            src="/logo-new.png"
            alt="Qruil Logo"
            className="w-16 md:w-26 object-contain"
          />
        </div>

        <div className="flex flex-col p-3 gap-5">
          {sidebarItems.map(({ label, path, icon: Icon }: SidebarItem) => {
            const isActive = pathname === path;
            return (
              <Link key={path} href={path}>
                <div
                  className={`flex items-center md:justify-start justify-center gap-3 p-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-[0_2px_10px_rgba(250,204,21,0.4)]"
                      : "dark:hover:bg-yellow-900 text-gray-800 dark:text-gray-100"
                  }`}
                  style={{
                    background: isActive
                      ? "var(--color-yellow-500)"
                      : undefined,
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <p className="hidden md:block text-sm font-medium">{label}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
