import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full py-16 px-8 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mt-24 bg-slate-50 rounded-t-[3rem] mb-16 md:mb-0">
      <div className="space-y-4">
        <span className="text-xl font-bold text-slate-900 font-[Manrope]">
          EduShare
        </span>
        <p className="text-sm text-slate-500 leading-relaxed">
          Dedicated to making engineering education accessible, organized, and
          effective for every GTU student.
        </p>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
            language
          </span>
          <span className="material-symbols-outlined text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
            share
          </span>
          <span className="material-symbols-outlined text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
            mail
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="font-[Manrope] font-bold text-slate-900">Explore</h4>
        <Link
          to="/"
          className="text-sm text-slate-500 hover:text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/branch/IT"
          className="text-sm text-slate-500 hover:text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors"
        >
          Browse Library
        </Link>
        <Link
          to="/study-guide"
          className="text-sm text-slate-500 hover:text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors"
        >
          AI Study Guide
        </Link>
        <Link
          to="/upload"
          className="text-sm text-slate-500 hover:text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors"
        >
          Upload Material
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="font-[Manrope] font-bold text-slate-900">Legal</h4>
        <a
          href="#"
          className="text-sm text-slate-500 hover:text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="text-sm text-slate-500 hover:text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors"
        >
          Terms of Service
        </a>
        <a
          href="#"
          className="text-sm text-slate-500 hover:text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors"
        >
          Academic Integrity
        </a>
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="font-[Manrope] font-bold text-slate-900">Support</h4>
        <a
          href="#"
          className="text-sm text-slate-500 hover:text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors"
        >
          Accessibility
        </a>
        <a
          href="#"
          className="text-sm text-slate-500 hover:text-blue-600 underline decoration-blue-500/30 underline-offset-4 transition-colors"
        >
          Contact Support
        </a>
        <div className="mt-4 p-4 bg-surface-container rounded-xl">
          <p className="text-xs text-slate-500 font-medium">
            © 2026 EduShare Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
