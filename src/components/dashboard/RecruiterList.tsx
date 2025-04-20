// components/RecruiterList.tsx
"use client";

import { useEffect, useState } from "react";

interface Recruiter {
  Gender: string;
  Experience: {
    year: number;
    description: string;
  };
  Skills: string[];
  Education: string;
  Field: string;
  "Notice period": string;
  Scoring: Record<string, number>;
  Location: string;
  "expected salary": number;
  linkedInProfile: string; // NEW field
}

export default function RecruiterList() {
  const [candidates, setCandidates] = useState<Recruiter[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/recruiters.json")
      .then((res) => res.json())
      .then((data: Recruiter[]) => setCandidates(data))
      .catch(console.error);
  }, []);

  // Helper: compute sum of all scores
  const totalScore = (c: Recruiter) =>
    Object.values(c.Scoring).reduce((sum, v) => sum + v, 0);

  // Helper: map notice period to a numeric rank
  const noticeRank = (period: string) => {
    if (period.toLowerCase() === "immediate") return 0;
    const match = period.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : Infinity;
  };

  // Filter by search query
  const filtered = candidates.filter((c) =>
    [c.Field, c.Education, ...c.Skills, c.Experience.description, c.Location]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  // Sort by totalScore desc, then noticeRank asc
  const sorted = [...filtered].sort((a, b) => {
    const diff = totalScore(b) - totalScore(a);
    if (diff !== 0) return diff;
    return noticeRank(a["Notice period"]) - noticeRank(b["Notice period"]);
  });

  return (
    <div className="px-4 py-8">
      {/* <h2 className="text-3xl font-semibold mb-4">Candidate Profiles</h2> */}

      {/* search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by field, skill, education…"
          onChange={(e) => setQuery(e.target.value)}
          className="w-64 max-w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {[
                "#",
                "Gender",
                "Experience",
                "Skills",
                "Education",
                "Field",
                "Notice Period",
                "Location",
                "Expected Salary",
                "LinkedIn",
                "Scoring",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {sorted.map((c, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-700">{i + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{c.Gender}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {c.Experience.year} yr
                  <div className="text-xs text-gray-500">
                    {c.Experience.description}
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {c.Skills.join(", ")}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {c.Education}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">{c.Field}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {c["Notice period"]}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {c.Location}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  ${c["expected salary"].toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm">
                  <a
                    href={c.linkedInProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    Profile
                  </a>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 space-y-1">
                  {Object.entries(c.Scoring).map(([skill, score]) => (
                    <div
                      key={skill}
                      className="inline-block rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 mr-1"
                    >
                      {skill}: {score}
                    </div>
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
