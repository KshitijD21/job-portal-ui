"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAIInsights, getJobById, Job } from "@/lib/api";
import { Globe, Phone, UserCircle2 } from "lucide-react";
import AIAssistant from "@/components/AIAssistant";

export default function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchJob = async () => {
      try {
        const jobData = await getJobById(id as string);
        setJob(jobData);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) return <p className="p-6">Loading job details...</p>;

  const truncatedDescription = job.jobDescription.slice(0, 200) + "...";

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <AIAssistant />
  
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-6">
          {/* Main Job Info */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-indigo-800">
                  {job.jobTitle}
                </h1>
                <p className="text-sm text-gray-600">
                  {job.company} • {job.location}, {job.country}
                </p>
              </div>
              <a
                href="https://www.linkedin.com/jobs/search/?currentJobId=4187612487"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
              >
                Apply Now
              </a>
            </div>
  
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Salary</p>
                <p className="font-semibold text-gray-800">{job.salaryRange}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Experience</p>
                <p className="font-semibold text-gray-800">{job.experience}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Type</p>
                <p className="font-semibold text-gray-800">{job.workType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Posted</p>
                <p className="font-semibold text-gray-800">{job.jobPostingDate}</p>
              </div>
            </div>
  
            <div className="bg-white p-4 rounded shadow">
  <h2 className="text-lg font-semibold mb-2 text-indigo-700">
    Job Overview
  </h2>
  <p className="text-sm text-gray-700 mb-2 leading-relaxed">
    {showFullDescription ? (
      <>
        {job.jobDescription}
        <button
          onClick={() => setShowFullDescription(false)}
          className="ml-2 text-indigo-600 hover:underline text-sm"
        >
          Less..
        </button>
      </>
    ) : (
      <>
        {(() => {
          const end = job.jobDescription.slice(0, 200).lastIndexOf(".");
          return job.jobDescription.slice(0, end + 1);
        })()}
        <button
          onClick={() => setShowFullDescription(true)}
          className="ml-2 text-indigo-600 hover:underline text-sm"
        >
          More...
        </button>
      </>
    )}
  </p>

  <h3 className="text-sm font-medium mb-1 text-purple-700 mt-3">
    Responsibilities
  </h3>
  <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
    {job.responsibilities}
  </p>
</div>

  
            {/* Skills */}
            <div>
              <h2 className="text-lg font-semibold mb-2 text-indigo-700">
                Key Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1 text-xs rounded-full border border-indigo-200 shadow-sm"
                  >
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Bottom Card Section (Contact + People) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded shadow-sm">
            <h3 className="font-semibold text-md mb-2 text-indigo-700">
              Contact
            </h3>
            <div className="text-sm text-gray-800 space-y-1">
              <p className="flex items-center gap-2">
                <UserCircle2 size={16} /> {job.contactPerson}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> {job.contact}
              </p>
              <p className="flex items-center gap-2">
                <Globe size={16} /> {job.jobPortal}
              </p>
            </div>
          </div>
  
          {/* People */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded shadow-sm">
            <h3 className="font-semibold text-md mb-2 text-indigo-700">
              People at {job.company}
            </h3>
            <div className="space-y-3">
              {[
                { name: "Emily Carter", imgId: 10 },
                { name: "Michael Johnson", imgId: 3 },
                { name: "Sophia Miller", imgId: 25 },
                { name: "James Anderson", imgId: 8 },
                { name: "Olivia Brown", imgId: 30 },
              ].map((person, index) => (
                <div key={index} className="flex items-center gap-3">
                  <img
                    src={`https://randomuser.me/api/portraits/${
                      person.imgId % 2 === 0 ? "women" : "men"
                    }/${person.imgId}.jpg`}
                    alt={person.name}
                    className="w-9 h-9 rounded-full border"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-800">{person.name}</p>
                    <a
                      href="https://www.linkedin.com/in/kshitij-dumbre-1b6870175/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3.5 h-3.5 text-blue-700"
                      >
                        <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-1 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7c1 0 1.7.8 1.7 1.7s-.8 1.7-1.7 1.7zm13.5 11.3h-3v-5.4c0-1.3-.5-2.2-1.7-2.2-1 0-1.6.7-1.9 1.3-.1.2-.1.5-.1.8v5.5h-3v-10h3v1.4c.4-.7 1.3-1.6 3.1-1.6 2.3 0 4 1.5 4 4.6v5.6z" />
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
