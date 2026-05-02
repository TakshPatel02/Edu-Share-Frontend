import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authApi } from "../lib/api";
import { useAppContext } from "../context/AppContext";

const STAT_CARDS = [
  { key: "total", label: "Books Uploaded", accent: "from-sky-500 to-cyan-400" },
  {
    key: "approved",
    label: "Accepted Books",
    accent: "from-emerald-500 to-lime-400",
  },
  {
    key: "rejected",
    label: "Rejected Books",
    accent: "from-rose-500 to-orange-400",
  },
  {
    key: "plans",
    label: "Study Plans",
    accent: "from-violet-500 to-indigo-400",
  },
];

const STATUS_STYLES = {
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-blue-100 text-blue-700",
  archived: "bg-slate-100 text-slate-700",
};

const formatDate = (value) => {
  if (!value) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export default function UserDashboard() {
  const { authLoading, isAuthenticated, token, user } = useAppContext();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedPlanId, setExpandedPlanId] = useState(null);

  const plans = dashboard?.studyPlans?.plans || [];
  const books = dashboard?.books || {
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  };
  const planCount = dashboard?.studyPlans?.count || 0;
  const acceptanceRate =
    books.total > 0 ? Math.round((books.approved / books.total) * 100) : 0;

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await authApi.dashboard(token);

        if (isMounted) {
          setDashboard(response.dashboard || null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load your dashboard.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const visiblePlans = useMemo(() => plans.slice(0, 6), [plans]);

  if (authLoading) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-50">
        <p className="text-slate-600 font-medium">Loading user dashboard...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="pt-28 md:pt-32 pb-16 px-4 md:px-8 min-h-screen bg-[radial-gradient(circle_at_top_left,#eff6ff_0%,#f8fafc_28%,#ffffff_66%,#f8fafc_100%)]">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 backdrop-blur-sm shadow-[0_20px_60px_rgba(15,23,42,0.08)] px-6 md:px-10 py-8 md:py-10"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.08),rgba(59,130,246,0.03),transparent)]" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.28em] font-bold text-sky-700 mb-3">
                User Dashboard
              </p>
              <h1 className="font-[Manrope] text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
              </h1>
              <p className="mt-4 text-slate-600 text-base md:text-lg max-w-2xl leading-relaxed">
                Track the books you uploaded, see how many were accepted or
                rejected, and review the study plans you created while logged
                in.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 lg:min-w-[320px]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Logged in as
                </p>
                <p className="font-semibold text-slate-900 mt-1 truncate">
                  {dashboard?.profile?.email || user?.email || "User"}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Acceptance Rate
                </p>
                <p className="font-semibold text-slate-900 mt-1">
                  {acceptanceRate}%
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STAT_CARDS.map((item, index) => {
            const value =
              item.key === "plans" ? planCount : books[item.key] || 0;

            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.05)]"
              >
                <div
                  className={`h-1.5 w-14 rounded-full bg-gradient-to-r ${item.accent}`}
                />
                <p className="mt-4 text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <p className="mt-2 text-4xl font-black font-[Manrope] text-slate-900">
                  {loading ? "--" : value}
                </p>
              </motion.article>
            );
          })}
        </section>

        <section className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 md:gap-8">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-[Manrope] text-2xl font-bold text-slate-900">
                  Book Upload Summary
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Status breakdown for your uploaded books.
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                {books.total} total
              </span>
            </div>

            {error ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            ) : null}

            {!error ? (
              <div className="space-y-4">
                {[
                  {
                    label: "Accepted",
                    value: books.approved,
                    bar: "bg-emerald-500",
                  },
                  {
                    label: "Rejected",
                    value: books.rejected,
                    bar: "bg-rose-500",
                  },
                  {
                    label: "Pending",
                    value: books.pending,
                    bar: "bg-amber-500",
                  },
                ].map((item) => {
                  const width =
                    books.total > 0
                      ? `${Math.max((item.value / books.total) * 100, item.value > 0 ? 10 : 0)}%`
                      : "0%";

                  return (
                    <div key={item.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-600">
                          {item.label}
                        </span>
                        <span className="font-semibold text-slate-900">
                          {item.value}
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.bar}`}
                          style={{ width }}
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Approval ratio
                    </p>
                    <p className="mt-2 text-2xl font-black font-[Manrope] text-slate-900">
                      {acceptanceRate}%
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Study plans
                    </p>
                    <p className="mt-2 text-2xl font-black font-[Manrope] text-slate-900">
                      {planCount}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="rounded-[2rem] border border-slate-200 bg-white p-6 md:p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="font-[Manrope] text-2xl font-bold text-slate-900">
                  Your Study Plans
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Plans created while you were logged in.
                </p>
              </div>
              <Link
                to="/study-guide"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                Create Plan
              </Link>
            </div>

            {loading ? (
              <p className="text-sm text-slate-500">
                Loading dashboard data...
              </p>
            ) : null}

            {!loading && !error && visiblePlans.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                <p className="font-semibold text-slate-900">
                  No study plans yet
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Generate your first plan to see it here.
                </p>
              </div>
            ) : null}

            {!loading && !error && visiblePlans.length > 0 ? (
              <div className="space-y-4">
                {visiblePlans.map((plan) => (
                  <article
                    key={plan.id}
                    className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-sky-100 text-sky-700">
                            {plan.subject}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${STATUS_STYLES[plan.status] || STATUS_STYLES.active}`}
                          >
                            {plan.status}
                          </span>
                        </div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {plan.learningGoal}
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {plan.summary}
                        </p>
                      </div>
                      <div className="shrink-0 rounded-2xl bg-white border border-slate-200 px-4 py-3 text-sm text-slate-500">
                        <p className="font-semibold text-slate-900">
                          {formatDate(plan.createdAt)}
                        </p>
                        <p className="mt-1">
                          {plan.prepWeeks} week{plan.prepWeeks === 1 ? "" : "s"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm text-slate-600">
                      <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Chapters
                        </p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {plan.chapters.length}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Routine steps
                        </p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {plan.dailyRoutine.length}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white border border-slate-200 px-4 py-3">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Videos mapped
                        </p>
                        <p className="mt-1 font-semibold text-slate-900">
                          {plan.videoPlan.length}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => setExpandedPlanId(expandedPlanId === plan.id ? null : plan.id)}
                        className="text-sm font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors"
                      >
                        {expandedPlanId === plan.id ? "Hide Details" : "View Full Plan"}
                        <span className={`material-symbols-outlined text-[18px] transition-transform ${expandedPlanId === plan.id ? "rotate-180" : ""}`}>
                          expand_more
                        </span>
                      </button>
                    </div>

                    {expandedPlanId === plan.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-slate-200 space-y-4"
                      >
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-2">Roadmap</h4>
                          <ul className="space-y-2">
                            {(plan.roadmap || []).map((item, idx) => (
                              <li key={idx} className="text-sm text-slate-600 bg-white rounded-xl p-3 border border-slate-200 shadow-sm">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-2">Daily Routine</h4>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {(plan.dailyRoutine || []).map((item, idx) => (
                              <div key={idx} className="rounded-xl bg-white border border-slate-200 px-3 py-2 text-sm text-slate-600 shadow-sm">
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-900 text-sm mb-2">Smart Tips</h4>
                          <ul className="space-y-2">
                            {(plan.tips || []).map((item, idx) => (
                              <li key={idx} className="text-sm text-slate-600">
                                • {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {(plan.videoPlan || []).length > 0 && (
                          <div className="rounded-xl border border-slate-200 p-4 bg-white shadow-sm">
                            <h4 className="font-bold text-slate-900 text-sm mb-2">Video Plan</h4>
                            <ul className="space-y-2">
                              {(plan.videoPlan || []).map((item, idx) => (
                                <li key={idx} className="text-sm text-slate-600">
                                  • {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {plan.resources?.youtubePlaylist && (
                          <a
                            href={plan.resources.youtubePlaylist}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-center rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800 hover:bg-sky-100 transition-colors"
                          >
                            Open recommended playlist
                          </a>
                        )}
                      </motion.div>
                    )}
                  </article>
                ))}
              </div>
            ) : null}
          </motion.article>
        </section>
      </div>
    </main>
  );
}
