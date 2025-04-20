"use client";
import { useState } from "react";
import axios from "axios";
import { uploadResume } from "@/lib/api";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    setLoading(true);
    setMessage(null);

    try {
      const res = await uploadResume(file);
      setMessage("✅ Resume uploaded successfully!");
      console.log("Uploaded:", res.data);
    } catch (err) {
      console.error("Upload failed", err);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-10 w-full max-w-md flex flex-col items-center gap-6 transition-all">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Upload Your Resume
        </h1>

        <label
          htmlFor="fileUpload"
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center w-full cursor-pointer hover:border-yellow-400 transition"
        >
          {file ? (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              📄 {file.name}
            </p>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Drag & drop or click to select your resume (PDF only)
            </p>
          )}
          <input
            id="fileUpload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className={`px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 ${
            loading
              ? "bg-yellow-300 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500"
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Uploading...
            </div>
          ) : (
            "Upload Resume"
          )}
        </button>

        {message && (
          <p
            className={`text-sm mt-2 ${
              message.startsWith("✅")
                ? "text-green-600"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
