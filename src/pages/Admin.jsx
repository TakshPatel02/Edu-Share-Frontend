import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { adminApi } from "../lib/api";
import { useAppContext } from "../context/AppContext";

const FILTERS = [
  { key: "pending", label: "Verification Queue" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

export default function Admin() {
  const { token, isAuthenticated, isAdmin, authLoading, logout, user } =
    useAppContext();
  const [statusFilter, setStatusFilter] = useState("pending");
  const [materials, setMaterials] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState("");

  const totalCount =
    statusCounts.pending + statusCounts.approved + statusCounts.rejected;

  const loadAdminData = useCallback(
    async (showLoader = true) => {
      if (!token || !isAdmin) {
        return;
      }

      if (showLoader) {
        setLoading(true);
      }

      setError("");

      try {
        const statuses = ["pending", "approved", "rejected"];
        const responses = await Promise.all(
          statuses.map((status) => adminApi.getMaterials({ token, status })),
        );

        const dataByStatus = statuses.reduce((acc, status, index) => {
          acc[status] = responses[index] || {};
          return acc;
        }, {});

        setMaterials(dataByStatus[statusFilter]?.materials || []);
        setStatusCounts({
          pending: Number(dataByStatus.pending?.count || 0),
          approved: Number(dataByStatus.approved?.count || 0),
          rejected: Number(dataByStatus.rejected?.count || 0),
        });
      } catch (err) {
        setError(err.message || "Failed to load verification queue.");
      } finally {
        setLoading(false);
      }
    },
    [token, isAdmin, statusFilter],
  );

  useEffect(() => {
    loadAdminData(true);
  }, [loadAdminData]);

  const updateMaterialStatus = async (materialId, actionType) => {
    setActionLoadingId(materialId);
    try {
      if (actionType === "approve") {
        await adminApi.approveMaterial({ token, materialId });
      } else {
        await adminApi.rejectMaterial({ token, materialId });
      }

      await loadAdminData(false);
    } catch (err) {
      setError(err.message || "Unable to update material status.");
    } finally {
      setActionLoadingId("");
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-50">
        <p className="text-slate-600 font-medium">Loading admin console...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_85%_0%,#dbeafe_0,#f8fafc_40%,#f8fafc_100%)] text-slate-900 font-[Inter]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
              Admin Console
            </p>
            <h1 className="font-[Manrope] text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
              EduShare Admin Dashboard
            </h1>
            <p className="text-slate-600 mt-2">
              Review and moderate uploaded materials before publishing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700">
              {user?.name || "Admin"}
            </div>
            <button
              onClick={logout}
              className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-200 p-5"
          >
            <p className="text-sm font-medium text-slate-500">Pending Review</p>
            <p className="text-3xl font-extrabold font-[Manrope] mt-3">
              {statusCounts.pending}
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="bg-white rounded-2xl border border-slate-200 p-5"
          >
            <p className="text-sm font-medium text-slate-500">Approved Items</p>
            <p className="text-3xl font-extrabold font-[Manrope] mt-3">
              {statusCounts.approved}
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl p-5 text-white"
          >
            <p className="text-sm font-medium text-blue-100">Total Moderated</p>
            <p className="text-3xl font-extrabold font-[Manrope] mt-3">
              {totalCount}
            </p>
          </motion.article>
        </section>

        <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="font-[Manrope] text-2xl font-bold text-slate-900">
                Moderation Queue
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Approve or reject user-submitted materials.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1 w-fit">
              {FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setStatusFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    statusFilter === filter.key
                      ? "bg-white text-blue-700 shadow"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 md:p-6 space-y-3">
            {loading ? (
              <p className="text-slate-500 text-sm px-2">
                Loading materials...
              </p>
            ) : null}

            {!loading && error ? (
              <p className="text-rose-600 text-sm bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
                {error}
              </p>
            ) : null}

            {!loading && !error && materials.length === 0 ? (
              <p className="text-slate-500 text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-5">
                No materials in the {statusFilter} queue.
              </p>
            ) : null}

            {!loading && !error
              ? materials.map((material) => (
                  <article
                    key={material._id}
                    className="border border-slate-200 rounded-2xl p-4 md:p-5 flex flex-col lg:flex-row lg:items-center gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                            STATUS_STYLES[material.status] ||
                            "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {material.status}
                        </span>
                        <span className="text-xs text-slate-500 uppercase tracking-wide">
                          {material.branch} • Sem {material.semester}
                        </span>
                      </div>

                      <h3 className="font-semibold text-slate-900 truncate">
                        {material.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1 truncate">
                        {material.subject} • {material.category} • Uploaded by{" "}
                        {material.uploadedBy?.name || "Unknown"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {material.fileUrl ? (
                        <a
                          href={material.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          Preview
                        </a>
                      ) : null}

                      {statusFilter === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              updateMaterialStatus(material._id, "reject")
                            }
                            disabled={actionLoadingId === material._id}
                            className="px-4 py-2 rounded-xl text-sm font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 disabled:opacity-50 transition-colors"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() =>
                              updateMaterialStatus(material._id, "approve")
                            }
                            disabled={actionLoadingId === material._id}
                            className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
                          >
                            Approve
                          </button>
                        </>
                      ) : null}
                    </div>
                  </article>
                ))
              : null}
          </div>
        </section>
      </div>
    </div>
  );
}
