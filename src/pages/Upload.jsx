import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FormInput from "../components/FormInput";
import {
  branches,
  semesters,
  getSubjectsForBranchSemester,
  materialCategories,
} from "../data/dummyData";
import { materialsApi } from "../lib/api";
import { useAppContext } from "../context/AppContext";

export default function Upload() {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAppContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    branch: "",
    semester: "",
    subject: "",
    category: "",
    files: [],
    link: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files: selectedFiles } = e.target;

    if (name === "file") {
      const newFiles = Array.from(selectedFiles || []);

      const invalid = newFiles.find((f) => f.type !== "application/pdf");
      if (invalid) {
        setError(`"${invalid.name}" is not a PDF. Only PDF files are allowed.`);
        return;
      }

      const tooLarge = newFiles.find((f) => f.size > 5 * 1024 * 1024);
      if (tooLarge) {
        setError(`"${tooLarge.name}" is too large. Maximum allowed size is 5MB per file.`);
        return;
      }

      setError("");
      setForm((prev) => {
        const existingNames = new Set(prev.files.map((f) => f.name));
        const uniqueNew = newFiles.filter((f) => !existingNames.has(f.name));
        return {
          ...prev,
          files: [...prev.files, ...uniqueNew],
        };
      });
      // Reset the input so the same files can be re-selected if removed
      e.target.value = "";
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "branch" || name === "semester" ? { subject: "" } : {}),
    }));
  };

  const removeFile = (index) => {
    setForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isAuthenticated) {
      setError("Please login before uploading materials.");
      navigate("/login");
      return;
    }

    const normalizedLink = form.link.trim();

    if (
      !form.title ||
      !form.branch ||
      !form.semester ||
      !form.subject ||
      !form.category
    ) {
      setError("Please fill in all required fields before uploading.");
      return;
    }

    if (form.files.length === 0 && !normalizedLink) {
      setError("Please upload at least one PDF or provide an external link.");
      return;
    }

    const type = form.files.length > 0 ? "PDF" : "Link";
    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("description", form.description);
    payload.append("branch", form.branch);
    payload.append("semester", form.semester);
    payload.append("subject", form.subject);
    payload.append("category", form.category);
    payload.append("type", type);

    for (const file of form.files) {
      payload.append("file", file);
    }

    if (normalizedLink) {
      payload.append("fileUrl", normalizedLink);
    }

    setSubmitting(true);

    try {
      const response = await materialsApi.create({ token, formData: payload });
      setSuccess(response.message || "Material submitted for approval.");
      setForm({
        title: "",
        description: "",
        branch: "",
        semester: "",
        subject: "",
        category: "",
        files: [],
        link: "",
      });
    } catch (err) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const availableSubjects =
    form.branch && form.semester
      ? getSubjectsForBranchSemester(form.branch, parseInt(form.semester)).map(
          (s) => ({ value: s.name, label: `${s.code} - ${s.name}` }),
        )
      : [];

  return (
    <main className="pt-28 md:pt-32 pb-20 px-6 max-w-300 mx-auto">
      {/* Header */}
      <motion.div
        className="mb-12 md:mb-16 md:ml-0 lg:ml-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-[3.5rem] font-extrabold text-on-surface leading-tight tracking-tight font-[Manrope]">
          Contribute to the <br />{" "}
          <span className="text-primary">Knowledge Base</span>
        </h1>
        <p className="text-on-surface-variant text-base md:text-lg mt-4 max-w-xl">
          Upload your research, notes, or academic materials to help the
          EduShare community grow. Quality contributions earn academic badges.
        </p>
      </motion.div>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Form */}
          <motion.div
            className="lg:col-span-7 bg-surface-container-low p-8 md:p-10 rounded-2xl space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="space-y-6">
              <FormInput
                label="Material Title"
                placeholder="e.g. Data Structures Unit 1 Notes"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
              <FormInput
                label="Description (optional)"
                placeholder="Briefly describe what this material covers"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  label="Branch"
                  type="select"
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  options={branches.map((b) => ({
                    value: b.id,
                    label: b.name,
                  }))}
                />
                <FormInput
                  label="Semester"
                  type="select"
                  name="semester"
                  value={form.semester}
                  onChange={handleChange}
                  options={semesters.map((s) => ({
                    value: String(s.id),
                    label: s.label,
                  }))}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  label="Subject"
                  type="select"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  options={availableSubjects}
                />
                <FormInput
                  label="Category"
                  type="select"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  options={materialCategories.map((c) => ({
                    value: c.id,
                    label: c.name,
                  }))}
                />
              </div>
              {/* Optional Link Input */}
              <FormInput
                label="External Link (optional)"
                placeholder="https://youtube.com/playlist/..."
                icon="link"
                name="link"
                value={form.link}
                onChange={handleChange}
              />
            </div>
            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full h-14 md:h-16 bg-linear-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform"
              >
                {submitting ? "Uploading..." : "Confirm and Upload"}
              </button>
              {error && <p className="text-sm text-error mt-4">{error}</p>}
              {success && (
                <p className="text-sm text-green-700 mt-4">{success}</p>
              )}
              <p className="text-center text-xs text-outline mt-4">
                By uploading, you agree to the EduShare Academic Integrity
                Policy.
              </p>
            </div>
          </motion.div>

          {/* Right Column: File Drop Zone + Tips */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FormInput
              type="file"
              name="file"
              onChange={handleChange}
              accept=".pdf,application/pdf"
              multiple
            />
            {form.files.length > 0 && (
              <div className="space-y-2 px-1">
                <p className="text-sm font-semibold text-on-surface">
                  {form.files.length} file{form.files.length > 1 ? "s" : ""} selected
                </p>
                {form.files.map((file, i) => (
                  <div
                    key={`${file.name}-${i}`}
                    className="flex items-center justify-between bg-surface-container-low rounded-xl px-4 py-2.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="material-symbols-outlined text-primary text-xl">description</span>
                      <span className="text-sm text-on-surface truncate">{file.name}</span>
                      <span className="text-xs text-outline shrink-0">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="ml-3 shrink-0 w-7 h-7 flex items-center justify-center rounded-full hover:bg-error/10 text-outline hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* Guidance Card */}
            <div className="bg-surface-container-high p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-tertiary">
                  verified
                </span>
                <h4 className="font-bold text-on-surface">Curator's Tips</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-on-surface-variant">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 mt-0.5">
                    1
                  </span>
                  Ensure the title includes the course code for better
                  discoverability.
                </li>
                <li className="flex gap-3 text-sm text-on-surface-variant">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 mt-0.5">
                    2
                  </span>
                  High-quality lecture notes are eligible for the 'Master
                  Contributor' status.
                </li>
                <li className="flex gap-3 text-sm text-on-surface-variant">
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 mt-0.5">
                    3
                  </span>
                  Select the correct semester and subject for accurate
                  categorization.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </form>
    </main>
  );
}
