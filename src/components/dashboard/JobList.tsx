"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Clock, MapPin } from "lucide-react";
import ApplyNowButton from "./ApplyNowButton";
import { getJobs, Job } from "@/lib/api";

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    getJobs().then(setJobs).catch(console.error);
  }, []);

  const filtered = jobs.filter((j) =>
    [j.company, j.jobTitle, j.role]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[84vh] overflow-y-auto">
      {/* 🔍 Search + Filters */}
      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search by company, title, role…"
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:flex-1 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <button
          onClick={() => console.log("open filters")}
          className="flex items-center space-x-2 rounded-lg border px-4 py-2 text-sm shadow-sm hover:bg-gray-50"
        >
          <MapPin className="h-4 w-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* 🖥️ Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto rounded-md">
        <table className="min-w-[1200px] table-fixed divide-y divide-gray-200 bg-white shadow rounded-lg">
          <thead className="bg-gray-50 sticky h-11 top-0 z-10">
            <tr>
              {[
                "#",
                "Job ID",
                "Title",
                "Company",
                "Role",
                "Location",
                "Experience",
                "Salary",
                "Type",
                "Posted",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-2 text-${
                    h === "Action" ? "right" : "left"
                  } text-xs font-medium text-gray-500 uppercase`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((job, i) => (
              <tr
                key={job.id}
                onClick={() => router.push(`/dashboard/job/${job.id}`)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-sm text-gray-700">{i + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{job.jobId}</td>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  {job.jobTitle}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {job.company}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{job.role}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {job.location}
                </td>
                <td className="px-4 py-2 text-sm min-w-36 max-w-36 truncate text-gray-700">
                  {job.experience}
                </td>
                <td className="px-4 py-2 text-sm min-w-36 max-w-36 truncate text-gray-700">
                  {job.salaryRange}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {job.workType}
                </td>
                <td className="px-4 py-2 flex items-center space-x-1 text-sm text-gray-700">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{job.jobPostingDate}</span>
                </td>
                <td className="px-4 py-2 text-right">
                  <div onClick={(e) => e.stopPropagation()}>
                    <ApplyNowButton
                      onClick={() => console.log("apply to", job.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile / Tablet Card View */}
      <div className="block lg:hidden space-y-4">
        {filtered.map((job, i) => (
          <div
            key={job.id}
            onClick={() => router.push(`/dashboard/job/${job.id}`)}
            className="rounded-lg border p-4 shadow hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="text-sm font-semibold text-gray-900">
              {job.jobTitle}
            </div>
            <div className="text-sm text-gray-700">{job.company}</div>
            <div className="text-sm text-gray-500">{job.role}</div>

            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {job.location}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                {job.experience}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                {job.salaryRange}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                {job.workType}
              </span>
              <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                <Clock className="h-3 w-3 text-gray-400" />
                {job.jobPostingDate}
              </span>
            </div>

            <div className="mt-3">
              <ApplyNowButton
                onClick={(e: any) => {
                  e.stopPropagation();
                  console.log("apply to", job.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
