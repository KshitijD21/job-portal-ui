// components/RecruiterList.tsx
"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin } from "lucide-react";

interface Recruiter {
  "User Name": string;
  "LinkedIn URL": string;
  Gender: string;
  Experience: { year: number; description: string };
  Skills: string[];
  Education: string;
  Field: string;
  "Notice period": string;
  Scoring: Record<string, number>;
  Location: string;
  "expected salary": number;
  Company: string;
  JobTitle: string; // matches your JSON key
}

interface RecruiterListProps {
  job: { Company: string; JobTitle: string };
}

export default function RecruiterList({ job }: RecruiterListProps) {
  const [candidates, setCandidates] = useState<Recruiter[]>([]);
  const [query, setQuery] = useState("");

  // Load static JSON and filter by company & title
  useEffect(() => {
    fetch("/recruiterr.json")
      .then((res) => res.json())
      .then((all: Recruiter[]) =>
        setCandidates(
          all.filter(
            (c) => c.Company === job.Company && c.JobTitle === job.JobTitle
          )
        )
      )
      .catch(console.error);
  }, [job]);

  // Helpers
  const totalScore = (c: Recruiter) =>
    Object.values(c.Scoring).reduce((sum, v) => sum + v, 0);
  const noticeRank = (p: string) => {
    if (p.toLowerCase() === "immediate") return 0;
    const m = p.match(/\d+/);
    return m ? parseInt(m[0], 10) : Infinity;
  };

  // Filter by name, gender, experience, skills, field, location
  const filtered = candidates.filter((c) => {
    const haystack = [
      c["User Name"],
      c.Gender,
      String(c.Experience.year),
      c.Experience.description,
      ...c.Skills,
      c.Field,
      c.Location,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  // Sort by totalScore desc, then notice period asc
  const sorted = [...filtered].sort((a, b) => {
    const diff = totalScore(b) - totalScore(a);
    return diff !== 0
      ? diff
      : noticeRank(a["Notice period"]) - noticeRank(b["Notice period"]);
  });

  return (
    <div className="px-4 py-6">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, gender, experience…"
          onChange={(e) => setQuery(e.target.value)}
          className="w-90 max-w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {[
                "#",
                "Name",
                "Gender",
                "Experience",
                "Skills",
                "Education",
                "Notice",
                "Location",
                "Salary",
                "LinkedIn",
                "Total Score",
                "Individual Scoring",
              ].map((h) => (
                <th
                  key={h}
                  className={`px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase ${
                    h === "Experience" ? "w-20" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sorted.map((c, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-3 py-2 text-sm text-gray-700">{i + 1}</td>
                <td className="px-3 py-2 text-sm font-medium text-indigo-900">
                  {c["User Name"]}
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">{c.Gender}</td>
                {/* Experience: only year, small width */}
                <td className="px-3 py-2 text-sm text-gray-700 w-20">
                  {c.Experience.year} yr
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">
                  {c.Skills.join(", ")}
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">
                  {c.Education}
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">
                  {c["Notice period"]}
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">
                  {c.Location}
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">
                  ${c["expected salary"].toLocaleString()}
                </td>
                <td className="px-3 py-2 text-sm">
                  <a
                    href={c["LinkedIn URL"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Profile
                  </a>
                </td>
                <td className="px-3 py-2 text-sm text-gray-700">
                  {totalScore(c)}
                </td>
                <td className="px-3 py-2 space-x-1">
                  {Object.entries(c.Scoring).map(([skill, score]) => (
                    <span
                      key={skill}
                      className="inline-block rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700"
                    >
                      {skill}: {score}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
