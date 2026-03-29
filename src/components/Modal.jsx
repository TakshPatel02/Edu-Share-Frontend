import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ isOpen, onClose, title, subtitle, children }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[60] bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="px-6 md:px-8 py-6 flex justify-between items-center border-b border-outline-variant/10">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary-fixed w-12 h-12 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>folder_open</span>
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface font-[Manrope]">{title}</h2>
                                    {subtitle && <p className="text-sm text-on-surface-variant">{subtitle}</p>}
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full hover:bg-surface-container-low flex items-center justify-center transition-colors"
                            >
                                <span className="material-symbols-outlined text-on-surface-variant">close</span>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 md:p-8 overflow-y-auto flex-1">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
