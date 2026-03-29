import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FormInput from "../components/FormInput";
import { authApi } from "../lib/api";
import { useAppContext } from "../context/AppContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const response = await authApi.login(form);
      setAuthFromResponse(response);
      navigate("/");
    } catch (err) {
      setError(err.message || "Unable to login. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary-fixed/30 rounded-full blur-[100px] pointer-events-none" />

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
            Elevate your <span className="text-primary">academic</span> journey.
          </h1>
          <p className="text-xl text-secondary leading-relaxed max-w-lg mb-12">
            Access a curated library of premium study materials, join study
            communities, and connect with fellow GTU students in a space
            designed for deep focus.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-4 border-surface bg-surface-container-high flex items-center justify-center text-xs font-bold text-secondary shadow-sm"
                >
                  {i === 1 ? "👨‍🎓" : i === 2 ? "👩‍🎓" : "🎓"}
                </div>
              ))}
            </div>
            <span className="text-sm font-medium text-secondary">
              Joined by 12k+ scholars this semester
            </span>
          </div>
        </motion.div>

        {/* Login Card */}
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
                Welcome Back
              </h2>
              <p className="text-secondary">
                Please enter your academic credentials.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <FormInput
                label="Email Address"
                type="email"
                placeholder="name@university.edu"
                icon="mail"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <div>
                <div className="flex justify-between items-center px-1 mb-2">
                  <label className="block text-sm font-semibold text-on-surface">
                    Password
                  </label>
                  <a
                    className="text-xs font-medium text-primary hover:underline"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <FormInput
                  label=""
                  type="password"
                  placeholder="••••••••"
                  icon="lock"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-3 px-1">
                <input
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 bg-surface-container-low"
                  type="checkbox"
                  id="remember"
                />
                <label
                  className="text-sm font-medium text-secondary select-none"
                  htmlFor="remember"
                >
                  Stay signed in for 30 days
                </label>
              </div>
              <button
                className="w-full primary-gradient text-on-primary font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-4"
                type="submit"
              >
                {submitting ? "Signing in..." : "Sign In to Portal"}
              </button>
              {error && (
                <p className="text-sm text-error font-medium">{error}</p>
              )}
            </form>
            <div className="mt-10 text-center">
              <p className="text-sm text-secondary">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-primary font-bold hover:underline decoration-primary/30 underline-offset-4 ml-1"
                >
                  Create Account
                </Link>
              </p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-2 opacity-40">
              <span className="material-symbols-outlined text-[18px]">
                verified_user
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold">
                Encrypted Academic Gateway
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
