"use client";
import { Role } from "@/lib/constants/roles";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function LandingPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSwitch = () => {
    setIsRecruiter((prev) => !prev);
  };

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen w-full overflow-hidden relative">
        {/* Toggle Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={handleSwitch}
            className="bg-black text-white px-4 py-2 rounded-full shadow-md hover:scale-105 transition text-sm"
          >
            Switch to {isRecruiter ? "Job Seeker" : "Recruiter"}
          </button>
        </div>

        {/* Mobile Main Section */}
        <div className={`flex-1 flex flex-col justify-center items-center p-6 sm:p-8 transition-all duration-300 ${isRecruiter ? "bg-[#FFD233] text-white" : "bg-white text-black"}`}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            {isRecruiter ? "I'm here for Hiring" : "I'm here Seeking Job"}
          </h2>

          <img
            src={isRecruiter ? "/recruiter.png" : "/jobseeker.png"}
            alt={isRecruiter ? "Recruiter" : "Job Seeker"}
            className="w-24 sm:w-32 h-auto mb-6"
          />

          <Link
            href={{
              pathname: "/auth/signup",
              query: { role: isRecruiter ? Role.RECRUITER : Role.JOBHUNTER },
            }}
            className={`${
              isRecruiter ? "bg-white text-black" : "bg-[#FFD233] text-black"
            } px-6 py-3 text-base rounded-full font-semibold shadow-md hover:scale-105 transition w-56 text-center`}
          >
            SIGNUP AS {isRecruiter ? "RECRUITER" : "A JOB SEEKER"}
          </Link>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <a href="/auth/signin" className="underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* Left Section – Recruiter */}
      <div className="w-1/2 bg-[#FFD233] flex flex-col justify-center items-center text-white p-4 sm:p-6 md:p-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
          I'm here for Hiring
        </h2>
        <img
          src="/recruiter.png"
          alt="Recruiter"
          className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto mb-6"
        />
        <Link
          href={{ pathname: "/auth/signup", query: { role: Role.RECRUITER } }}
          className="bg-white text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-full font-semibold shadow-md hover:scale-105 transition w-48 sm:w-56 md:w-64 text-center"
        >
          SIGNUP AS RECRUITER
        </Link>
        <p className="mt-4 text-xs sm:text-sm text-black text-center">
          Already have an account?{" "}
          <a href="/auth/signin" className="underline">
            Login here
          </a>
        </p>
      </div>

      {/* Right Section – Job Seeker */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center text-black p-4 sm:p-6 md:p-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
          I'm here Seeking Job
        </h2>
        <img
          src="/jobseeker.png"
          alt="Job Seeker"
          className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto mb-6"
        />
        <Link
          href={{ pathname: "/auth/signup", query: { role: Role.JOBHUNTER } }}
          className="bg-[#FFD233] text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-full font-semibold shadow-md hover:scale-105 transition w-48 sm:w-56 md:w-64 text-center"
        >
          SIGNUP AS A JOB SEEKER
        </Link>
        <p className="mt-4 text-xs sm:text-sm text-center">
          Already have an account?{" "}
          <a href="/auth/signin" className="underline">
            Login here
          </a>
        </p>
      </div>

      {/* Middle Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg bg-white rounded-xl p-4 z-10">
        <img
          src="/logo-middle.png"
          alt="Qruil Logo"
          className="w-20 sm:w-28 md:w-32 lg:w-40 h-auto"
        />
      </div>
    </div>
  );
}

export default LandingPage;
