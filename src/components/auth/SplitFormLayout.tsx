"use client";

import Image from "next/image";
import SignUpForm from "./SignUpForm";
import { Role } from "@/lib/constants/roles";

type Props = {
  role: Role;
};

import { motion } from "framer-motion";

export default function SplitFormLayout({ role }: { role: Role }) {
  const isRecruiter = role === Role.RECRUITER;

  return (
    <motion.div
      className="flex min-h-screen w-full"
      initial={{ opacity: 0, x: isRecruiter ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isRecruiter ? -100 : 100 }}
      transition={{ duration: 0.5 }}
    >
      {isRecruiter ? (
        <>
          <IllustrationPanel
            title="I'm here for Hiring"
            image="/recruiter.png"
            flip
          />
          <FormPanel role={role} />
        </>
      ) : (
        <>
          <FormPanel role={role} />
          <IllustrationPanel
            title="I'm here seeking a job"
            image="/jobseeker.png"
          />
        </>
      )}
    </motion.div>
  );
}

function FormPanel({ role }: { role: Role }) {
  return (
    <div className="flex-1 p-6 flex flex-col justify-between">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-md">
          <SignUpForm role={role} />
        </div>
      </div>
      <div className="text-xs text-gray-400 px-4 pb-2 flex justify-between">
        <p>@ Qruil 2025</p>
        <p>help@qruil.com</p>
      </div>
    </div>
  );
}

function IllustrationPanel({
  title,
  image,
  flip = false,
}: {
  title: string;
  image: string;
  flip?: boolean;
}) {
  return (
    <div className="w-1/2 bg-[#FFD233] rounded-2xl flex flex-col justify-center items-center text-black">
      <h2 className="text-4xl font-bold mb-4 text-center">{title}</h2>
      <img
        src={image}
        alt={title}
        className={`w-48 h-auto mb-6 ${flip ? "transform -scale-x-100" : ""}`}
      />
    </div>
  );
}
