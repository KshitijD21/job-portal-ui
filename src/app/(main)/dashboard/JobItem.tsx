// components/JobItem.tsx
"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { MapPin, Clock } from "lucide-react";
import ApplyNowButton from "./ApplyNowButton";
import type { Job } from "./types";

interface JobItemProps {
  job: Job;
}

export default function JobItem({ job }: JobItemProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/view-job/${job.id}`)}
      className="
        grid grid-cols-[40px_1fr_auto] items-center 
        w-full cursor-pointer
        gap-4 overflow-hidden rounded-lg
        border bg-white px-4 py-3
        transition-shadow hover:shadow-md
      "
    >
      {/* 1) Company Logo Placeholder */}
      <div className="h-10 w-10 rounded-full bg-gray-200" />

      {/* 2) Details */}
      <div className="flex flex-col justify-center space-y-1">
        <div className="flex items-center space-x-2">
          <h2 className="text-base font-semibold text-gray-900">
            {job["Job Title"]}
          </h2>
          <span className="text-[10px] font-medium uppercase tracking-wider text-indigo-700 bg-indigo-100 rounded px-1.5 py-0.5">
            {job["Work Type"]}
          </span>
        </div>

        <div className="text-sm text-gray-600">{job.Company}</div>

        <div className="flex items-center text-xs text-gray-500 space-x-4">
          <span className="flex items-center">
            <Clock className="mr-1 h-3 w-3" /> {job["Job Posting Date"]}
          </span>
          <span className="flex items-center">
            <MapPin className="mr-1 h-3 w-3" /> {job.location}, {job.Country}
          </span>
        </div>
      </div>

      {/* 3) Apply Now */}
      <div onClick={(e) => e.stopPropagation()} className="justify-self-end">
        <ApplyNowButton onClick={() => console.log("apply to", job.id)} />
      </div>
    </Card>
  );
}
