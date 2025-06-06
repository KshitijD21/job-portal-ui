"use client";

import { useEffect, useState } from "react";

import RecruiterDashboard from "@/app/(main)/dashboard/RecuiterDashboard";
import JobList from "@/components/dashboard/JobList";

export default function HomePage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // read the role you stored at login
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  // only render JobList if the role is "JOBHUNTER"
  if (role !== "JOBHUNTER") {
    return (
      <main className="min-h-screen bg-white p-6">
        {/* <h1 className="text-3xl font-semibold mb-4">Recent Posts</h1> */}
        {/* <h1 className="text-3xl font-semibold mb-4">Candidate Profiles</h1> */}
        <RecruiterDashboard />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-3 overflow-x-hidden">
    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
  Recent Posts
</h1>
      <JobList />
    </main>
  );
}
