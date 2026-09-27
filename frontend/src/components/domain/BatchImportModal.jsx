import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Xmark, Folder, CloudUpload, CheckCircle, WarningTriangle, Database, Check } from 'iconoir-react';
import { useToast } from '../../context/ToastContext';

export function BatchImportModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { addToast } = useToast();
  const shouldReduceMotion = useReducedMotion();
  const easeOut = [0.23, 1, 0.32, 1];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleStartImport = () => {
    if (!file) return;
    setImporting(true);
    setProgress(20);
    const t1 = setTimeout(() => setProgress(60), 600);
    const t2 = setTimeout(() => {
      setProgress(100);
      setCompleted(true);
      setImporting(false);
      addToast('Batch archive processed: 18 specimens added to history', 'success');
    }, 1400);
  };

  const handleClose = () => {
    setFile(null);
    setImporting(false);
    setProgress(0);
    setCompleted(false);
    onClose();
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18, ease: easeOut }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-2xl p-6 sm:p-8 font-body text-on-surface space-y-6"
          >
            <div className="flex items-start justify-between border-b border-outline-variant/20 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider block mb-1">
                  Bulk Archival Ingestion
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-on-surface">Batch Import (.ZIP)</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Upload multi-specimen archives for concurrent automated inference.</p>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
              >
                <Xmark size={18} />
              </button>
            </div>

            {!completed ? (
              <div className="space-y-4">
                <div
                  onClick={() => {
                    const sampleZip = new File(["mock-zip-bytes"], "cohort_gamma_eval_specimens.zip", { type: "application/zip" });
                    setFile(sampleZip);
                  }}
                  className="border-2 border-dashed border-outline-variant/50 hover:border-secondary rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-surface-container-low"
                >
                  <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-secondary mb-3 shadow-xs">
                    <Folder size={28} />
                  </div>
                  <span className="text-sm font-semibold text-on-surface">
                    {file ? file.name : "Click to select or drop ZIP archive"}
                  </span>
                  <span className="text-xs text-on-surface-variant mt-1">
                    {file ? `${(file.size / 1024).toFixed(1)} KB • 18 Specimen Crops Identified` : "Supports .ZIP or .TAR.GZ up to 250MB"}
                  </span>
                </div>

                {importing && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-secondary font-semibold">Decompressing & Segmenting...</span>
                      <span className="text-on-surface font-bold">{progress}%</span>
                    </div>
                    <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                      <div className="bg-secondary h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!file || importing}
                    onClick={handleStartImport}
                    className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    {importing ? "Processing Batch..." : "Begin Batch Inference"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-5 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mx-auto shadow-sm">
                  <Check size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface">Batch Processing Completed</h3>
                  <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto">
                    18 handwriting specimens successfully processed through ResNet-34 + SVM pipelines. All records synchronized to historical database.
                  </p>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 grid grid-cols-3 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Normal</span>
                    <span className="font-bold text-secondary">13</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Reversal</span>
                    <span className="font-bold text-error">3</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Corrected</span>
                    <span className="font-bold text-on-surface">2</span>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
