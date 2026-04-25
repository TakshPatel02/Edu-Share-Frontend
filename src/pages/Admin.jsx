import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { adminApi } from "../lib/api";
import { useAppContext } from "../context/AppContext";
import Modal from "../components/Modal";
import PdfViewer from "../components/PdfViewer";

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
  const navigate = useNavigate();
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
  const [previewPdf, setPreviewPdf] = useState(null);

  const totalCount =
    statusCounts.pending + statusCounts.approved + statusCounts.rejected;
  const reviewedCount = statusCounts.approved + statusCounts.rejected;
  const approvalRate =
    reviewedCount > 0
      ? Math.round((statusCounts.approved / reviewedCount) * 100)
      : 0;
  const backlogLoad =
    totalCount > 0 ? Math.round((statusCounts.pending / totalCount) * 100) : 0;
  const activeQueueCount = materials.length;

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

  const openPdfPreview = (material) => {
    if (!material?.fileUrl) {
      return;
    }

    setPreviewPdf({
      title: material.title,
      url: material.fileUrl,
    });
  };

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
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
    <div className="min-h-screen text-slate-900 font-[Inter] bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#eef4ff_25%,#f8fafc_58%,#ffffff_100%)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
        <header className="mb-7 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-sm px-4 md:px-6 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start gap-3 md:gap-4">
              <button
                type="button"
                onClick={handleBackClick}
                className="mt-0.5 inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span aria-hidden="true">←</span>
                Back
              </button>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold">
                  Administration Workspace
                </p>
                <h1 className="font-[Manrope] text-3xl md:text-4xl font-extrabold text-slate-900 mt-1.5">
                  EduShare Moderation Panel
                </h1>
                <p className="text-slate-600 mt-2 text-sm md:text-base">
                  Operational view for quality control and material
                  verification.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700">
                {user?.name || "Admin"}
              </div>
              <button
                onClick={logout}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-slate-200 p-5"
          >
            <p className="text-sm font-medium text-slate-500">Pending Queue</p>
            <p className="text-3xl font-extrabold font-[Manrope] mt-2">
              {statusCounts.pending}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Needs moderator action
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-2xl border border-slate-200 p-5"
          >
            <p className="text-sm font-medium text-slate-500">Reviewed Items</p>
            <p className="text-3xl font-extrabold font-[Manrope] mt-2">
              {reviewedCount}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Approved + rejected decisions
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 p-5"
          >
            <p className="text-sm font-medium text-slate-500">Approval Rate</p>
            <p className="text-3xl font-extrabold font-[Manrope] mt-2">
              {approvalRate}%
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Based on reviewed decisions
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl p-5 text-white bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_55%,#0ea5e9_100%)]"
          >
            <p className="text-sm font-medium text-blue-100">
              Current Queue Load
            </p>
            <p className="text-3xl font-extrabold font-[Manrope] mt-2">
              {backlogLoad}%
            </p>
            <p className="text-xs text-blue-100 mt-2">
              Pending share of all submissions
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
                {activeQueueCount} item{activeQueueCount === 1 ? "" : "s"} in
                this view.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 rounded-full p-1 w-fit overflow-x-auto">
              {FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setStatusFilter(filter.key)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
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
                      {material.fileUrl && material.type === "PDF" ? (
                        <button
                          type="button"
                          onClick={() => openPdfPreview(material)}
                          className="px-4 py-2 rounded-xl text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                          Preview
                        </button>
                      ) : null}

                      {material.fileUrl && material.type !== "PDF" ? (
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

        <Modal
          isOpen={!!previewPdf}
          onClose={() => setPreviewPdf(null)}
          title={previewPdf?.title || "PDF Preview"}
          subtitle="Admin in-app document viewer"
        >
          {previewPdf?.url ? (
            <PdfViewer url={previewPdf.url} title={previewPdf.title} />
          ) : null}
        </Modal>
      </div>
    </div>
  );
}
