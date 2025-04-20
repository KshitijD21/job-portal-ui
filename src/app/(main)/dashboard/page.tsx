// "use client";
// import { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// export default function Dashboard() {
//   const [jobs, setJobs] = useState<any[]>([]);

//   useEffect(() => {
//     fetch("/dashboard.json")
//       .then((res) => res.json())
//       .then((data) => setJobs(data))
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-800">
//         Job Dashboard
//       </h1>

//       <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
//         {jobs.map((job, idx) => (
//           <Card
//             key={idx}
//             className="
//               relative
//               overflow-hidden
//               rounded-xl
//               bg-gradient-to-br from-indigo-50 to-purple-50
//               shadow-md
//               transition
//               duration-300
//               hover:shadow-xl
//               hover:scale-105
//             "
//           >
//             {/* Top‑Right Work‑Type Badge */}
//             <div className="absolute top-4 right-4">
//               <Badge
//                 variant="destructive"
//                 className="uppercase px-3 py-1 text-xs"
//               >
//                 {job["Work Type"]}
//               </Badge>
//             </div>

//             <CardHeader className="pt-6 pb-2 px-6">
//               <CardTitle className="text-2xl font-extrabold text-indigo-700">
//                 {job["Job Title"]}
//               </CardTitle>
//               <p className="text-sm text-gray-600">{job.Company}</p>
//             </CardHeader>

//             <CardContent className="px-6 pb-6 space-y-2 text-gray-700 text-sm">
//               <div>
//                 <strong>Location:</strong> {job.location}, {job.Country}
//               </div>
//               <div>
//                 <strong>Experience:</strong> {job.Experience}
//               </div>
//               <div>
//                 <strong>Salary:</strong> {job["Salary Range"]}
//               </div>
//               <div>
//                 <strong>Posted On:</strong> {job["Job Posting Date"]}
//               </div>

//               <div className="flex flex-wrap gap-2 mt-3">
//                 {job.skills
//                   ?.split(" ")
//                   .slice(0, 3)
//                   .map((s: string, j: number) => (
//                     <Badge key={j} variant="outline" className="text-xs">
//                       {s}
//                     </Badge>
//                   ))}
//               </div>

//               <div className="mt-3">
//                 <strong>Contact:</strong> {job["Contact Person"]} ({job.Contact}
//                 )
//               </div>

//               <Button variant="outline" size="sm" className="mt-4 w-full">
//                 View Details
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

import JobList from "./JobList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-semibold mb-4">Recent Posts</h1>
      <JobList />
    </main>
  );
}
