"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAIInsights } from "@/lib/api";
import { useParams } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function AIAssistant() {
  const { id } = useParams();
  const [showAIModal, setShowAIModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState<null | {
    missingSkills: string[];
    improvementSuggestions: string[];
  }>(null);

  const fetchAIInsights = async () => {
    setLoading(true);
    try {
      const data = await getAIInsights(id as string);
      setAiData(data);
    } catch (err) {
      console.error("AI insights error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showAIModal) {
      setAiData(null);
      fetchAIInsights();
    }
  }, [showAIModal]);

  return (
    <>
      {/* Floating AI Assistant Button with motion */}
      <AnimatePresence>
        {!showAIModal && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => setShowAIModal(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full p-4 shadow-lg hover:scale-110 transition-all"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Modal */}
      <AnimatePresence>
        {showAIModal && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 h-[75vh] w-[400px] bg-white z-50 shadow-xl p-6 overflow-y-auto rounded-xl border"
          >
            <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10 pb-2 border-b">
              <h2 className="text-lg font-semibold text-indigo-700">
                AI Career Assistant
              </h2>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-gray-500 hover:text-red-500 text-lg"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center h-52">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent mb-3" />
                <p className="text-sm text-indigo-600 font-medium">
                  Analyzing your resume...
                </p>
              </div>
            ) : aiData ? (
              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    🛑 Missing Skills
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {aiData.missingSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    ✨ Suggestions
                  </h4>
                  <ul className="list-decimal list-inside text-gray-600 space-y-1">
                    {aiData.improvementSuggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
