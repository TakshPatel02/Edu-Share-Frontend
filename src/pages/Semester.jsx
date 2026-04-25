import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  branches,
  semesters,
  getSubjectsForBranchSemester,
  isInternshipSemester,
} from "../data/dummyData";
import SubjectCard from "../components/SubjectCard";

export default function Semester() {
  const { branchName, semId } = useParams();
  const branch = branches.find((b) => b.id === branchName) || branches[0];
  const semester =
    semesters.find((s) => s.id === parseInt(semId)) || semesters[0];
  const semesterNumber = parseInt(semId);
  const subjects = getSubjectsForBranchSemester(branchName, semesterNumber);
  const internshipMode = isInternshipSemester(semesterNumber);

  return (
    <main className="pt-28 md:pt-32 max-w-360 mx-auto px-6 md:px-12">
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
            <span className="text-primary-container">
              {semesterNumber === 8
                ? "Internship & Project Track"
                : "Core Curriculum"}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            {internshipMode
              ? "Focus on internship readiness, company targeting, and industry-level project execution."
              : "Master the foundational pillars of modern computing. This semester focuses on building essential skills and knowledge."}
          </p>
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
