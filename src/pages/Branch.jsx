import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { branches, semesters } from '../data/dummyData';
import SemesterCard from '../components/SemesterCard';

export default function Branch() {
    const { branchName } = useParams();
    const branch = branches.find((b) => b.id === branchName) || branches[0];

    const foundationSemesters = semesters.filter((s) => s.phase === 'foundation');
    const specializationSemesters = semesters.filter((s) => s.phase === 'specialization');

    return (
        <main className="pt-28 md:pt-32 pb-24 px-6 md:px-8 max-w-[1440px] mx-auto">
            {/* Header Section */}
            <header className="mb-12 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <motion.div
                    className="max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-2 text-primary font-semibold mb-4">
                        <span className="material-symbols-outlined text-lg">terminal</span>
                        <span className="tracking-widest text-xs uppercase">Department of Technology</span>
                    </div>
                    <h1 className="font-[Manrope] text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-tight">
                        {branch.name.split(' ')[0]} <br />
                        <span className="text-primary">{branch.name.split(' ').slice(1).join(' ')}</span>
                    </h1>
                    <p className="mt-6 text-on-surface-variant text-base md:text-lg leading-relaxed">
                        Explore the comprehensive curriculum designed to mold future architects of the digital landscape. From foundational mathematics to advanced cloud computing.
                    </p>
                </motion.div>
                <motion.div
                    className="flex gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col items-center">
                        <span className="text-3xl font-bold text-primary">8</span>
                        <span className="text-xs text-on-surface-variant font-medium">Semesters</span>
                    </div>
                    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col items-center">
                        <span className="text-3xl font-bold text-primary">52</span>
                        <span className="text-xs text-on-surface-variant font-medium">Core Units</span>
                    </div>
                </motion.div>
            </header>

            {/* Foundation Phase */}
            <section className="mb-12 md:mb-16">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-[Manrope] text-2xl font-bold">Foundation Phase</h2>
                    <div className="h-px flex-1 bg-surface-container-highest" />
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-wider">
                        Common Years
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {foundationSemesters.map((sem, index) => (
                        <SemesterCard key={sem.id} semester={sem} branchName={branchName} index={index} />
                    ))}
                </div>
            </section>

            {/* Specialization Phase */}
            <section className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="font-[Manrope] text-2xl font-bold">Specialization Phase</h2>
                    <div className="h-px flex-1 bg-surface-container-highest" />
                    <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold uppercase tracking-wider">
                        Branch Specific
                    </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {specializationSemesters.map((sem, index) => (
                        <SemesterCard key={sem.id} semester={sem} branchName={branchName} index={index} />
                    ))}
                </div>
            </section>

            {/* Academic Banner */}
            <motion.section
                className="mt-16 md:mt-24 bg-primary rounded-2xl p-8 md:p-12 text-on-primary relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M47.5,-59.2C60.7,-51.8,70.1,-36.8,75.1,-20.5C80.1,-4.2,80.7,13.4,74.7,28.8C68.7,44.2,56.1,57.4,41.2,65.7C26.3,73.9,9.1,77.2,-8.1,76.5C-25.3,75.8,-42.6,71.1,-55.8,60.8C-69,50.6,-78.2,34.8,-80.6,18.5C-83,2.2,-78.7,-14.7,-69.6,-28.9C-60.5,-43.1,-46.6,-54.6,-32.2,-61.6C-17.7,-68.6,-2.8,-71.1,12.7,-68.9C28.2,-66.7,47.5,-59.2Z"
                            fill="currentColor"
                            transform="translate(100 100)"
                        />
                    </svg>
                </div>
                <div className="relative z-10 flex-1">
                    <h2 className="font-[Manrope] text-3xl md:text-4xl font-extrabold mb-4">Master the Digital Future</h2>
                    <p className="text-primary-container text-base md:text-lg max-w-xl">
                        Join over 15,000 students in the {branch.shortName} track. Gain access to curated study materials and resources.
                    </p>
                </div>
            </motion.section>
        </main>
    );
}
