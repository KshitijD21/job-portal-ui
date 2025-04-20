import { Role } from "@/lib/constants/roles";
import Link from "next/link";
import React from "react";

function LandingPage() {
  return (
    <div className="flex h-screen">
      {/* Left Section – Recruiter */}
      <div className="w-1/2 bg-[#FFD233] flex flex-col justify-center items-center text-white">
        <h2 className="text-4xl font-bold mb-4">I'm here for Hiring</h2>
        <img
          src="/recruiter.png"
          alt="Recruiter"
          className="w-48 h-auto mb-6 transform -scale-x-100"
        />
        <Link
          href={{
            pathname: "/auth/signup",
            query: { role: Role.RECRUITER },
          }}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition"
        >
          SIGNUP AS RECRUITER
        </Link>

        <p className="mt-4 text-sm text-black">
          Already have an account?{" "}
          <a href="/auth/signin" className="underline">
            Login here
          </a>
        </p>
      </div>

      {/* Right Section – Job Seeker */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center text-black">
        <h2 className="text-4xl font-bold mb-4">I'm here Seeking Job</h2>
        <img
          src="/jobseeker.png"
          alt="Recruiter"
          className="w-48 h-auto mb-6"
        />
        <Link
          href={{
            pathname: "/auth/signup",
            query: { role: Role.JOBHUNTER },
          }}
          className="bg-[#FFD233] text-black px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition"
        >
          SIGNUP AS A JOB SEEKER
        </Link>

        {/* <button className="bg-[#FFD233] text-black px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition">
          SIGNUP AS A JOB SEEKER
        </button> */}
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <a href="/auth/signin" className="underline">
            Login here
          </a>
        </p>
      </div>

      {/* middle box */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg bg-white rounded-xl p-4 z-10">
        <img
          src="/logo-middle.png"
          alt="Qruil Logo"
          className="w-40 h-auto rounded-2xl"
        />
      </div>
    </div>
  );
}

export default LandingPage;
