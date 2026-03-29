import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function BranchCard({ branch, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
        >
            <Link to={`/branch/${branch.id}`} className="group cursor-pointer block">
                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
                    <div className={`h-48 ${branch.bgColor} relative overflow-hidden`}>
                        <img
                            alt={branch.name}
                            className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500"
                            src={branch.image}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-${branch.color}-900 to-transparent opacity-60`}></div>
                        <div className="absolute bottom-4 left-6">
                            <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                {branch.tag}
                            </span>
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold mb-2 font-[Manrope]">{branch.name}</h3>
                        <p className="text-on-surface-variant mb-6 text-sm">{branch.description}</p>
                        <div className="flex items-center text-primary font-bold gap-2">
                            Explore <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">north_east</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
