import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SubjectCard({ subject, index, branchName, semId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link
        to={`/branch/${branchName}/semester/${semId}/subject/${encodeURIComponent(subject.name)}`}
        className="group bg-surface-container-lowest p-8 rounded-2xl shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full border border-transparent hover:border-primary/10 block"
      >
        <div
          className={`w-16 h-16 rounded-xl ${subject.iconBg} mb-8 flex items-center justify-center ${subject.iconColor} group-hover:scale-110 transition-transform`}
        >
          <span className="material-symbols-outlined text-3xl">
            {subject.icon}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-3 font-[Manrope]">
          {subject.name}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-8 flex-grow">
          Access comprehensive study materials and resources.
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs font-bold text-outline">6 Categories</span>
          <span className="material-symbols-outlined text-primary-container p-2 rounded-full bg-secondary-container/30">
            arrow_forward
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
