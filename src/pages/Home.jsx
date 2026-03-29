import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { branches, features } from "../data/dummyData";
import BranchCard from "../components/BranchCard";

export default function Home() {
  return (
    <main className="pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col items-start gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-4 max-w-4xl">
            <h1 className="font-[Manrope] font-extrabold text-4xl md:text-7xl tracking-tight text-on-surface leading-tight">
              EduShare – One Place for{" "}
              <span className="text-primary italic">All GTU</span> Study
              Materials
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              Access a curated editorial collection of previous year papers,
              high-quality notes, and video playlists tailored for GTU students.
              Simplified for your success.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              to="/branch/IT"
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              Browse Materials
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link
              to="/signup"
              className="bg-surface-container-highest text-on-secondary-container px-8 py-4 rounded-xl font-semibold text-lg hover:bg-surface-container-high transition-all"
            >
              Join Free
            </Link>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="mt-12 md:mt-16 relative w-full h-[250px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-surface-container-low"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img
            alt="GTU students studying in library"
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyIClyc7ockqLNrClLSwI34RIpA8QftWvp7vXdk--2ggZURY2CTF3NF0TKDcNsBRcgvkPTUO4h1MEd88SBgjlQyYiKr2875N0GZRWvc0MFrW7rfa8bgFtGeFxR632xa_ztqXPyAdG5cFJuvLFukgW7IMr48H5VGKg4s6PWQ5BF6FtkdIVFzJUM4Z41WXIPC6SmXBT5qpAozoUSPBUBDIDMqj9REo1wTxYbhYEfGk2idqHxgztWN43lcn34W8orBp1GBpmDiw6a_T0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 md:py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[Manrope] text-3xl md:text-5xl font-bold mb-4">
              Curated for Excellence
            </h2>
            <p className="text-on-surface-variant">
              Designed to help you navigate your engineering journey with ease.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4  gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-surface-container-lowest p-8 rounded-2xl group hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mb-6`}
                >
                  <span className={`material-symbols-outlined ${feature.iconColor}`}>
                    {feature.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-on-surface-variant leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Branch Selection Section */}
      <section className="px-6 py-16 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-[Manrope] text-3xl md:text-5xl font-bold mb-4">
                Find Your Branch
              </h2>
              <p className="text-on-surface-variant">
                Tailored content for the most popular engineering disciplines at
                GTU.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <BranchCard key={branch.id} branch={branch} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16 md:mb-20">
        <motion.div
          className="primary-gradient rounded-2xl p-10 md:p-20 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl -ml-10 -mb-10" />
          <h2 className="font-[Manrope] font-extrabold text-3xl md:text-5xl text-white mb-6 relative z-10">
            Ready to boost your exam scores?
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
            Join thousands of GTU students who are using EduShare to organize
            their study life and excel in their academics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link
              to="/signup"
              className="bg-white text-primary px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-lg hover:scale-95 transition-all"
            >
              Sign Up Now
            </Link>
            <Link
              to="/branch/IT"
              className="bg-primary-container text-white border border-white/20 px-10 md:px-12 py-4 md:py-5 rounded-full font-black text-lg hover:bg-blue-500 transition-all"
            >
              Explore Materials
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
