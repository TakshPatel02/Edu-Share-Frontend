import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { materialCategories } from "../data/dummyData";
import Modal from "../components/Modal";
import MaterialCard from "../components/MaterialCard";
import PdfViewer from "../components/PdfViewer";
import { materialsApi } from "../lib/api";

export default function Subject() {
  const { branchName, semId, subjectName } = useParams();
  const [activeCategory, setActiveCategory] = useState(null);
  const [previewPdf, setPreviewPdf] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const decodedName = decodeURIComponent(subjectName);
  const semester = Number(semId);

  const openModal = (categoryId) => setActiveCategory(categoryId);
  const closeModal = () => setActiveCategory(null);
  const closePreview = () => setPreviewPdf(null);

  const activeCat = materialCategories.find((c) => c.id === activeCategory);

  useEffect(() => {
    let isMounted = true;

    const fetchMaterials = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await materialsApi.list({
          branch: branchName,
          semester,
          subject: decodedName,
        });

        if (isMounted) {
          setMaterials(response.materials || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Unable to load materials right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMaterials();

    return () => {
      isMounted = false;
    };
  }, [branchName, semester, decodedName]);

  const activeMaterials = useMemo(() => {
    if (!activeCategory) {
      return [];
    }

    return materials
      .filter((material) => material.category === activeCategory)
      .map((material) => ({
        id: material._id,
        title: material.title,
        type: material.type,
        fileUrl: material.fileUrl,
        uploadedBy: material.uploadedBy?.name || "Unknown",
      }));
  }, [activeCategory, materials]);

  // Category card layout mapping for bento grid
  const getSpanClass = (index) => {
    if (index === 0) return "md:col-span-8";
    if (index === 1) return "md:col-span-4";
    if (index === 2) return "md:col-span-4";
    if (index === 3) return "md:col-span-4";
    if (index === 4) return "md:col-span-4";
    return "md:col-span-12";
  };

  return (
    <main className="pt-28 md:pt-32 pb-24 px-6 md:px-8 max-w-360 mx-auto">
      {/* Header */}
      <header className="mb-12 md:mb-16 grid grid-cols-12 gap-6 md:gap-8 items-end">
        <motion.div
          className="col-span-12 md:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="flex items-center gap-2 text-sm text-outline mb-4 flex-wrap">
            <span>Courses</span>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="text-primary font-medium">{decodedName}</span>
          </nav>
          <h1 className="font-[Manrope] text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
            {decodedName}
          </h1>
          <p className="text-lg text-secondary max-w-2xl leading-relaxed">
            Master the core building blocks. Explore comprehensive resources
            curated for academic excellence and technical growth.
          </p>
        </motion.div>
        <motion.div
          className="col-span-12 md:col-span-5 flex justify-start md:justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-secondary-container rounded-2xl p-6 flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <p className="text-xs font-bold text-on-secondary-container uppercase tracking-wider">
                Study Material
              </p>
              <p className="font-bold text-on-surface">
                6 Categories Available
              </p>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Category Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {materialCategories.map((category, index) => {
          const spanClass = getSpanClass(index);
          const isSolutions = category.id === "solutions";
          const isBooks = index === 5;

          return (
            <motion.div
              key={category.id}
              className={`col-span-1 ${spanClass} cursor-pointer`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => openModal(category.id)}
            >
              {isSolutions ? (
                <div className="bg-primary text-white rounded-2xl p-8 flex flex-col justify-between group overflow-hidden relative h-full">
                  <div className="relative z-10">
                    <h3 className="font-[Manrope] text-xl font-bold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-primary-fixed/80 text-sm mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    <button className="px-6 py-2 bg-white text-primary rounded-full text-xs font-bold hover:bg-primary-fixed transition-colors">
                      Get Solutions
                    </button>
                  </div>
                  <div className="absolute -right-4 -bottom-4 text-white/10 rotate-12">
                    <span className="material-symbols-outlined text-[8rem]">
                      fact_check
                    </span>
                  </div>
                </div>
              ) : isBooks ? (
                <div className="bg-surface-container-low rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 h-full">
                  <div className="flex-1">
                    <div
                      className={`w-14 h-14 rounded-2xl ${category.iconBg} flex items-center justify-center ${category.iconColor} mb-6`}
                    >
                      <span className="material-symbols-outlined text-3xl">
                        {category.icon}
                      </span>
                    </div>
                    <h3 className="font-[Manrope] text-2xl md:text-3xl font-bold mb-4">
                      {category.name}
                    </h3>
                    <p className="text-secondary max-w-xl mb-8">
                      {category.description}
                    </p>
                  </div>
                  <div className="shrink-0 flex gap-4">
                    <div className="w-28 md:w-32 h-40 md:h-44 bg-surface-container-highest rounded-xl shadow-lg rotate-[-10deg] flex items-center justify-center border-l-4 border-primary">
                      <span className="text-[10px] font-bold text-center p-2">
                        CLRS ALGORITHMS
                      </span>
                    </div>
                    <div className="w-28 md:w-32 h-40 md:h-44 bg-surface-container-highest rounded-xl shadow-lg rotate-[5deg] -ml-8 mt-8 flex items-center justify-center border-l-4 border-tertiary">
                      <span className="text-[10px] font-bold text-center p-2">
                        DS IN C++
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`${
                    index === 0
                      ? "bg-surface-container-lowest rounded-2xl p-8 group hover:shadow-xl border border-transparent hover:border-primary/10"
                      : index === 1
                        ? "bg-surface-container-low rounded-2xl p-8 relative overflow-hidden group"
                        : index === 2
                          ? "bg-surface-container-highest rounded-2xl p-8 hover:bg-white hover:shadow-xl"
                          : "bg-surface-container-lowest rounded-2xl p-8 shadow-sm hover:shadow-xl border border-outline-variant/10"
                  } transition-all duration-300 h-full`}
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${category.iconBg} flex items-center justify-center ${category.iconColor} mb-6 md:mb-8`}
                  >
                    <span className="material-symbols-outlined text-2xl md:text-3xl">
                      {category.icon}
                    </span>
                  </div>
                  <h3
                    className={`font-[Manrope] ${index === 0 ? "text-2xl md:text-3xl" : "text-xl"} font-bold mb-2 md:mb-4`}
                  >
                    {category.name}
                  </h3>
                  <p className="text-secondary text-sm mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  {index === 0 && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      <span className="px-3 py-1 bg-surface-container-low rounded-lg text-xs font-medium">
                        6 Modules
                      </span>
                      <span className="px-3 py-1 bg-surface-container-low rounded-lg text-xs font-medium">
                        Exam Weightage
                      </span>
                    </div>
                  )}
                  <button className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all text-sm">
                    View Materials{" "}
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Material Modal */}
      <Modal
        isOpen={!!activeCategory}
        onClose={closeModal}
        title={activeCat?.name || "Materials"}
        subtitle={decodedName}
      >
        <div className="space-y-4">
          {loading && (
            <p className="text-sm text-on-surface-variant">
              Loading materials...
            </p>
          )}
          {!loading && error && <p className="text-sm text-error">{error}</p>}
          {!loading && !error && activeMaterials.length === 0 && (
            <p className="text-sm text-on-surface-variant">
              No approved materials found in this category yet.
            </p>
          )}
          {activeMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              onPreviewPdf={setPreviewPdf}
            />
          ))}
        </div>
        {!loading && !error && activeMaterials.length > 0 && (
          <div className="mt-6 pt-6 border-t border-outline-variant/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-on-surface-variant italic">
              Showing {activeMaterials.length} materials
            </p>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!previewPdf}
        onClose={closePreview}
        title={previewPdf?.title || "PDF Preview"}
        subtitle="In-app document viewer"
      >
        {previewPdf?.url ? (
          <PdfViewer url={previewPdf.url} title={previewPdf.title} />
        ) : null}
      </Modal>
    </main>
  );
}
