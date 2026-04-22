import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function PdfPage({ pdfDocument, pageNumber, scale = 1.35 }) {
  const canvasRef = useRef(null);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    let renderTask = null;
    let isCancelled = false;

    const renderPage = async () => {
      try {
        setPageError("");
        const page = await pdfDocument.getPage(pageNumber);

        if (isCancelled) {
          return;
        }

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");

        if (!context) {
          throw new Error("Canvas context is unavailable.");
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        renderTask = page.render({ canvasContext: context, viewport });
        await renderTask.promise;
      } catch (error) {
        if (!isCancelled) {
          setPageError(error.message || `Failed to render page ${pageNumber}.`);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDocument, pageNumber, scale]);

  return (
    <div className="rounded-xl border border-outline-variant/20 bg-white overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-outline-variant/10 flex items-center justify-between gap-3 bg-surface-container-low">
        <span className="text-sm font-semibold text-on-surface">
          Page {pageNumber}
        </span>
        <span className="text-xs text-on-surface-variant">
          Rendered with PDF.js
        </span>
      </div>
      {pageError ? (
        <div className="p-4 text-sm text-error">{pageError}</div>
      ) : (
        <canvas ref={canvasRef} className="block w-full h-auto" />
      )}
    </div>
  );
}

export default function PdfViewer({ url, title }) {
  const [pdfDocument, setPdfDocument] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) {
      setError("No PDF URL provided.");
      setLoading(false);
      return undefined;
    }

    let isCancelled = false;
    let loadingTask = null;
    let documentInstance = null;

    const loadDocument = async () => {
      setLoading(true);
      setError("");
      setPdfDocument(null);
      setPageCount(0);

      try {
        loadingTask = pdfjsLib.getDocument({
          url,
          withCredentials: false,
        });

        documentInstance = await loadingTask.promise;

        if (isCancelled) {
          await documentInstance.destroy();
          return;
        }

        setPdfDocument(documentInstance);
        setPageCount(documentInstance.numPages);
      } catch (documentError) {
        if (!isCancelled) {
          setError(documentError.message || "Unable to load the PDF preview.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadDocument();

    return () => {
      isCancelled = true;
      if (loadingTask) {
        loadingTask.destroy();
      }
      if (documentInstance) {
        documentInstance.destroy();
      }
    };
  }, [url]);

  if (loading) {
    return (
      <div className="min-h-[40vh] grid place-items-center rounded-2xl border border-outline-variant/20 bg-surface-container-low">
        <div className="text-center">
          <div className="mx-auto w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="mt-4 text-sm text-on-surface-variant">Loading PDF...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[30vh] grid place-items-center rounded-2xl border border-outline-variant/20 bg-surface-container-low px-6 text-center">
        <div>
          <p className="font-semibold text-error">PDF preview unavailable</p>
          <p className="mt-2 text-sm text-on-surface-variant">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="text-lg font-bold text-on-surface">{title}</h3>
          <p className="text-sm text-on-surface-variant">
            {pageCount} page{pageCount === 1 ? "" : "s"} available
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary-container transition-colors"
        >
          Open original
        </a>
      </div>

      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {Array.from({ length: pageCount }, (_, index) => (
          <PdfPage
            key={index + 1}
            pdfDocument={pdfDocument}
            pageNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
