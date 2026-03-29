import { useState } from "react";
import { motion } from "framer-motion";
import { studyGuideApi } from "../lib/api.js";

const LEARNING_GOALS = [
  "Understand concepts from zero",
  "Revise quickly before exam",
  "Practice numericals and derivations",
  "Score 9+ CGPA in this subject",
];

const EXAM_TYPES = ["Mid Sem", "End Sem"];

const SUBJECT_SUGGESTIONS = [
  "Data Structures",
  "Operating System",
  "Database Management System",
  "Computer Networks",
  "Theory of Computation",
  "Software Engineering",
];

const CHAPTER_HINTS =
  "Example: Unit 1 (Stack/Queue), Unit 2 (Linked List), Unit 3 (Trees), Unit 4 (Graphs)";

export default function StudyGuideBot() {
  const [subject, setSubject] = useState("");
  const [goal, setGoal] = useState(LEARNING_GOALS[0]);
  const [examType, setExamType] = useState("Mid Sem");
  const [syllabus, setSyllabus] = useState("");
  const [chapters, setChapters] = useState("");
  const [weeks, setWeeks] = useState(2);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState(null);

  const canGenerate = subject.trim() && chapters.trim();

  const handleGeneratePlan = async () => {
    try {
      setIsLoading(true);
      setError("");

      const chapterArray = chapters
        .split(",")
        .map((ch) => ch.trim())
        .filter(Boolean);

      const response = await studyGuideApi.generatePlan({
        subject,
        learningGoal: goal,
        examType,
        syllabus: syllabus || "",
        chapters: chapterArray,
        prepWeeks: Number(weeks),
      });

      if (response.success) {
        setPlan(response.data);
        setHasGenerated(true);
      } else {
        setError(response.message || "Failed to generate study plan");
      }
    } catch (err) {
      setError(err.message || "An error occurred while generating the plan");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-28 md:pt-32 px-4 md:px-8 pb-20">
      <section className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-linear-to-br from-blue-700 via-blue-600 to-cyan-600 text-white p-6 md:p-10 shadow-2xl shadow-blue-900/20 relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-8 w-52 h-52 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-20 left-8 w-60 h-60 rounded-full bg-cyan-200/20 blur-3xl" />
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm font-semibold text-blue-100 mb-3">
            AI Assisted Study Guide
          </p>
          <h1 className="text-3xl md:text-5xl font-black font-[Manrope] leading-tight max-w-3xl">
            Build your exam-focused subject plan in under 60 seconds
          </h1>
          <p className="mt-4 text-blue-100 max-w-2xl">
            Answer a few guided prompts, share your syllabus and chapter
            targets, and get a personalized study roadmap.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: 0.45 }}
            className="bg-surface-container-lowest rounded-3xl p-5 md:p-7 shadow-xl border border-outline-variant/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  smart_toy
                </span>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-[Manrope] font-extrabold text-on-surface">
                  Study Bot Prompt Flow
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Predefined questions for personalized planning
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  1) What do you want to learn?
                </label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Example: Data Structures"
                  list="subject-suggestions"
                  className="w-full h-12 px-4 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <datalist id="subject-suggestions">
                  {SUBJECT_SUGGESTIONS.map((item) => (
                    <option key={item} value={item} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  2) What is your learning objective?
                </label>
                <div className="flex flex-wrap gap-2">
                  {LEARNING_GOALS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setGoal(item)}
                      className={`px-3.5 py-2 rounded-full text-sm transition-all border ${
                        goal === item
                          ? "bg-primary text-white border-primary"
                          : "bg-surface-container-low border-outline-variant/40 text-on-surface hover:border-primary/40"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  3) Which exam are you preparing for?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EXAM_TYPES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setExamType(item)}
                      className={`h-11 rounded-xl font-semibold transition-colors ${
                        examType === item
                          ? "primary-gradient text-white"
                          : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  4) Share syllabus overview
                </label>
                <textarea
                  value={syllabus}
                  onChange={(e) => setSyllabus(e.target.value)}
                  rows={4}
                  placeholder="Paste syllabus text or unit-wise topics"
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  5) Chapters included in exam
                </label>
                <input
                  value={chapters}
                  onChange={(e) => setChapters(e.target.value)}
                  placeholder={CHAPTER_HINTS}
                  className="w-full h-12 px-4 rounded-xl bg-surface-container-low border border-outline-variant/40 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-secondary mb-2">
                  6) Available prep window
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={weeks}
                  onChange={(e) => setWeeks(e.target.value)}
                  className="w-full accent-primary"
                />
                <p className="text-sm text-on-surface-variant mt-1">
                  {weeks} week(s) available for preparation
                </p>
              </div>

              <button
                type="button"
                disabled={!canGenerate || isLoading}
                onClick={handleGeneratePlan}
                className="w-full h-12 rounded-xl font-bold text-white primary-gradient shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 border-2 border-transparent border-t-white rounded-full"
                    />
                    Generating...
                  </>
                ) : (
                  "Generate Personalized Study Plan"
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="bg-surface-container-lowest rounded-3xl p-5 md:p-7 shadow-xl border border-outline-variant/20"
          >
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="text-lg md:text-xl font-[Manrope] font-extrabold text-on-surface">
                Personalized Plan Preview
              </h3>
              {plan && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                  AI Generated
                </span>
              )}
            </div>

            {error && (
              <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-center">
                <span className="material-symbols-outlined text-5xl text-red-500 mb-2">
                  error_outline
                </span>
                <p className="font-semibold text-red-900">{error}</p>
                <p className="text-sm text-red-700 mt-1">Please try again</p>
              </div>
            )}

            {!hasGenerated && !error ? (
              <div className="rounded-2xl border border-dashed border-outline-variant/50 bg-surface-container-low p-6 text-center">
                <span className="material-symbols-outlined text-5xl text-outline mb-2">
                  auto_awesome
                </span>
                <p className="font-semibold text-on-surface">
                  Your generated plan will appear here
                </p>
                <p className="text-sm text-on-surface-variant mt-1">
                  Fill subject and chapters, then click the generate button.
                </p>
              </div>
            ) : plan ? (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/70">
                  <p className="text-sm font-semibold text-blue-800">
                    AI Summary
                  </p>
                  <p className="mt-1 text-sm text-blue-900">{plan.summary}</p>
                </div>

                <div>
                  <h4 className="font-bold text-on-surface mb-2">Roadmap</h4>
                  <ul className="space-y-2">
                    {(plan.roadmap || []).map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-on-surface-variant bg-surface-container-low rounded-xl p-3"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-on-surface mb-2">
                    Daily Routine
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {(plan.dailyRoutine || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-surface-container-low px-3 py-2 text-sm text-on-surface-variant"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-on-surface mb-2">Smart Tips</h4>
                  <ul className="space-y-2">
                    {(plan.tips || []).map((item, idx) => (
                      <li key={idx} className="text-sm text-on-surface-variant">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {syllabus.trim() && (
                  <div className="rounded-xl border border-outline-variant/40 p-4 bg-surface-container-low">
                    <h4 className="font-bold text-on-surface mb-2">
                      Syllabus Notes
                    </h4>
                    <p className="text-sm text-on-surface-variant whitespace-pre-wrap line-clamp-6">
                      {syllabus}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-outline-variant/50 bg-surface-container-low p-6 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mx-auto w-12 h-12 border-4 border-outline/20 border-t-primary rounded-full mb-4"
                />
                <p className="font-semibold text-on-surface">
                  Generating your personalized plan...
                </p>
                <p className="text-sm text-on-surface-variant mt-1">
                  This usually takes a few seconds
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
