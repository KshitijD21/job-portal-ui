// "use client";

// import { useEffect, useState } from "react";
// import { getJobs, Job } from "@/lib/api";
// import RecruiterList from "./RecruiterList";
// import { Card } from "@/components/ui/card";
// interface JobPosting {
//   id: string;
//   jobId: string;
//   Company: string;
//   JobTitle: string;
//   // ...any other fields you need
// }
// export default function RecruiterDashboard() {
//   const [jobs, setJobs] = useState<JobPosting[]>([]);
//   const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

//   // 🔄 Fetch from static JSON instead of API:
//   useEffect(() => {
//     fetch("/recruiterr.json")
//       .then((res) => res.json())
//       .then((data: JobPosting[]) => setJobs(data))
//       .catch(console.error);
//   }, []);

//   if (selectedJob) {
//     return (
//       <div className="px-4 py-8">
//         <button
//           onClick={() => setSelectedJob(null)}
//           className="mb-4 text-indigo-600 hover:underline"
//         >
//           ← Back to postings
//         </button>
//         <h2 className="text-2xl font-semibold mb-4">
//           Candidates for “{selectedJob.JobTitle}”
//         </h2>
//         <RecruiterList job={selectedJob} />
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 py-8">
//       <h2 className="text-3xl font-semibold mb-6">Your Job Postings</h2>
//       <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
//         {jobs.map((job, index) => (
//           <Card
//             key={index}
//             onClick={() => setSelectedJob(job)}
//             className="cursor-pointer rounded-lg bg-white p-4 shadow transition hover:shadow-lg"
//           >
//             <h3 className="text-xl font-bold">{job.JobTitle}</h3>
//             <p className="mt-1 text-sm text-gray-500">{job.Company}</p>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import RecruiterList from "@/components/dashboard/RecruiterList";

interface JobPosting {
  id: string;
  jobId: string;
  Company: string;
  JobTitle: string;
  // …any other fields
}

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  useEffect(() => {
    fetch("/recruiterr.json") // ← correct file
      .then((res) => res.json() as Promise<JobPosting[]>)
      .then((data) => {
        // build a map keyed by Company||JobTitle
        const uniqueMap = new Map<string, JobPosting>();
        data.forEach((job) => {
          const key = `${job.Company.trim()}||${job.JobTitle.trim()}`;
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, job);
          }
        });
        setJobs(Array.from(uniqueMap.values()));
      })
      .catch((err) => console.error("Failed to load postings:", err));
  }, []);

  if (selectedJob) {
    return (
      <div className="px-4 py-8">
        <button
          onClick={() => setSelectedJob(null)}
          className="mb-4 text-indigo-600 hover:underline"
        >
          ← Back to postings
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          Candidates for “{selectedJob.JobTitle}”
        </h2>
        <RecruiterList
          job={{ Company: selectedJob.Company, JobTitle: selectedJob.JobTitle }}
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6">Your Job Postings</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {jobs.map((job, idx) => (
          <Card
            key={idx}
            onClick={() => setSelectedJob(job)}
            className="cursor-pointer rounded-lg bg-white p-4 shadow transition hover:shadow-lg"
          >
            <h3 className="text-xl font-bold">{job.JobTitle}</h3>
            <p className="mt-1 text-sm text-gray-500">{job.Company}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
