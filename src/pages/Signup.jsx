import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FormInput from "../components/FormInput";
import { authApi } from "../lib/api";
import { useAppContext } from "../context/AppContext";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setAuthFromResponse } = useAppContext();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await authApi.signup(form);
      setAuthFromResponse(response);
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to signup. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-fixed/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-tertiary-fixed/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Branding Column */}
        <motion.div
          className="lg:col-span-7 pr-0 lg:pr-12 hidden lg:block"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <Link
              to="/"
              className="text-primary font-[Manrope] text-2xl font-black tracking-tight"
            >
              EduShare
            </Link>
          </div>
          <h1 className="font-[Manrope] text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.1] mb-8">
            Join the <span className="text-primary">academic</span> community.
          </h1>
          <p className="text-xl text-secondary leading-relaxed max-w-lg mb-12">
            Create your free account and start accessing thousands of curated
            study materials for GTU students. Upload your own notes to help
            others succeed.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-sm">
            {[
              { icon: "auto_stories", label: "10k+ Notes" },
              { icon: "history_edu", label: "500+ Papers" },
              { icon: "play_circle", label: "200+ Videos" },
            ].map(({ icon, label }) => (
              <div
                key={icon}
                className="bg-surface-container-low p-4 rounded-xl text-center"
              >
                <span className="material-symbols-outlined text-primary text-2xl mb-2 block">
                  {icon}
                </span>
                <span className="text-xs font-bold text-secondary">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Signup Card */}
        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-surface-container-lowest glass-effect w-full max-w-md p-8 lg:p-12 rounded-2xl shadow-xl shadow-on-surface/5 border border-white/40">
            <div className="lg:hidden mb-10 text-center">
              <Link
                to="/"
                className="text-primary font-[Manrope] text-2xl font-black tracking-tight"
              >
                EduShare
              </Link>
            </div>
            <div className="mb-10">
              <h2 className="font-[Manrope] text-3xl font-bold text-on-surface mb-2">
                Create Account
              </h2>
              <p className="text-secondary">
                Start your journey with EduShare.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <FormInput
                label="Full Name"
                type="text"
                placeholder="John Doe"
                icon="person"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <FormInput
                label="Email Address"
                type="email"
                placeholder="name@university.edu"
                icon="mail"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <FormInput
                label="Password"
                type="password"
                placeholder="Create a strong password"
                icon="lock"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <div className="flex items-center gap-3 px-1">
                <input
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 bg-surface-container-low"
                  type="checkbox"
                  id="terms"
                />
                <label
                  className="text-sm font-medium text-secondary select-none"
                  htmlFor="terms"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                </label>
              </div>
              <button
                className="w-full primary-gradient text-on-primary font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4"
                type="submit"
              >
                {submitting ? "Creating account..." : "Create Academic Profile"}
              </button>
              {error && (
                <p className="text-sm text-error font-medium">{error}</p>
              )}
            </form>
            <div className="mt-10 text-center">
              <p className="text-sm text-secondary">
                Already have an account?
                <Link
                  to="/login"
                  className="text-primary font-bold hover:underline decoration-primary/30 underline-offset-4 ml-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
