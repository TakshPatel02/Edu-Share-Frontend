export default function MaterialCard({ material, onPreviewPdf }) {
  const isPDF = material.type === "PDF";
  const actionLabel = isPDF ? "View PDF" : "Open Link";
  const openResource = () => {
    if (!material.fileUrl) {
      return;
    }

    if (isPDF) {
      if (onPreviewPdf) {
        onPreviewPdf({
          url: material.fileUrl,
          title: material.title,
        });
        return;
      }

      window.open(material.fileUrl, "_blank", "noopener,noreferrer");
    } else {
      window.open(material.fileUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-surface-container-low rounded-xl hover:bg-secondary-container transition-all duration-300 gap-4">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 bg-surface-container-lowest rounded-lg flex items-center justify-center ${isPDF ? "text-error" : "text-primary"} group-hover:scale-110 transition-transform shrink-0`}
        >
          <span className="material-symbols-outlined text-2xl md:text-3xl">
            {isPDF ? "picture_as_pdf" : "link"}
          </span>
        </div>
        <div>
          <p className="font-bold text-on-surface text-sm md:text-base">
            {material.title}
          </p>
          <span className="text-xs font-medium uppercase tracking-wider text-on-surface-variant">
            {isPDF ? "PDF Document" : "External Resource"}
          </span>
          {material.uploadedBy && (
            <p className="text-xs text-on-surface-variant mt-1">
              Uploaded by {material.uploadedBy}
            </p>
          )}
        </div>
      </div>
      <button
        className={`${
          isPDF
            ? "bg-primary hover:bg-primary-container text-white"
            : "bg-surface-container-highest hover:bg-outline-variant text-on-surface"
        } px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 active:scale-95 flex items-center gap-2 shrink-0`}
        onClick={openResource}
      >
        <span className="material-symbols-outlined text-lg">
          {isPDF ? "picture_as_pdf" : "open_in_new"}
        </span>
        {actionLabel}
      </button>
    </div>
  );
}
