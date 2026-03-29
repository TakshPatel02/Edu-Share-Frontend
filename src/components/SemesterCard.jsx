import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SemesterCard({ semester, branchName, index }) {
    const isSpecialization = semester.phase === 'specialization';
    const semNum = String(semester.id).padStart(2, '0');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="relative group"
        >
            {isSpecialization && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl -m-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
            <Link
                to={`/branch/${branchName}/semester/${semester.id}`}
                className={`relative block ${isSpecialization
                        ? 'bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/20'
                        : 'bg-surface-container-lowest rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-primary/5 border border-transparent hover:border-primary/10'
                    } transition-all duration-500 flex flex-col justify-between h-full`}
            >
                <div>
                    <span className={`${isSpecialization ? 'text-tertiary' : 'text-primary-container'} font-black text-4xl opacity-20 block mb-4`}>
                        {semNum}
                    </span>
                    <h3 className="font-[Manrope] text-xl font-bold mb-2">{semester.label}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{semester.description}</p>
                    {isSpecialization && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-bold uppercase">
                                Branch Specific
                            </span>
                        </div>
                    )}
                </div>
                <div className="mt-8 pt-6 border-t border-surface-container-low flex justify-between items-center">
                    <span className="text-xs font-semibold text-on-surface-variant">{semester.courses} Courses</span>
                    <span className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
