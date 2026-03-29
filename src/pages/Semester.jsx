import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { branches, semesters, subjectsBySemester } from "../data/dummyData";
import SubjectCard from "../components/SubjectCard";

export default function Semester() {
  const { branchName, semId } = useParams();
  const branch = branches.find((b) => b.id === branchName) || branches[0];
  const semester =
    semesters.find((s) => s.id === parseInt(semId)) || semesters[0];
  const subjects = subjectsBySemester[parseInt(semId)] || subjectsBySemester[1];

  return (
    <main className="pt-28 md:pt-32 max-w-[1440px] mx-auto px-6 md:px-12">
      {/* Hero Section */}
      <header className="mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-sm font-medium text-on-surface-variant flex-wrap">
            <Link to="/" className="hover:text-primary cursor-pointer">
              Home
            </Link>
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
            <Link
              to={`/branch/${branchName}`}
              className="hover:text-primary cursor-pointer"
            >
              {branch.name}
            </Link>
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
            <span className="text-primary">{semester.label}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-on-surface mb-6 font-[Manrope]">
            {semester.label}{" "}
            <span className="text-primary-container">Core Curriculum</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            Master the foundational pillars of modern computing. This semester
            focuses on building essential skills and knowledge.
          </p>
        </motion.div>

        <motion.div
          className="bg-surface-container-low p-6 md:p-8 rounded-2xl flex items-center gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e0e3e5"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#004ac6"
                strokeDasharray="65, 100"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
              65%
            </div>
          </div>
          <div>
            <span className="block font-bold text-on-surface">
              Overall Progress
            </span>
            <span className="text-sm text-on-surface-variant font-medium">
              {subjects.length} Courses
            </span>
          </div>
        </motion.div>
      </header>

      {/* Subjects Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
        {subjects.map((subject, index) => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            index={index}
            branchName={branchName}
            semId={semId}
          />
        ))}
      </section>
    </main>
  );
}
