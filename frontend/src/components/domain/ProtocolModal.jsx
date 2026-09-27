import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Xmark, ShieldCheck, Check } from 'iconoir-react';

export function ProtocolModal({ isOpen, onClose }) {
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

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18, ease: easeOut }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-2xl p-6 sm:p-8 font-body text-on-surface max-h-[88vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-start justify-between border-b border-outline-variant/20 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-mono font-bold mb-1.5">
                  PROTOCOL v2.4.2
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-on-surface">Screening Protocol & Specifications</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Clinical investigator capture standards for automated morphological screening.</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
              >
                <Xmark size={18} />
              </button>
            </div>

            {/* 1. Categorization Criteria */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface">1. Categorical Classification Definitions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-error-container/20 border border-error/30 space-y-1">
                  <span className="font-bold text-error font-mono block">Reversal Pattern</span>
                  <p className="text-on-surface-variant">Mirror writing, vertical axis inversion across characters [b/d, p/q], or lateral ascender reflections.</p>
                </div>
                <div className="p-3 rounded-xl bg-secondary-container/20 border border-secondary/30 space-y-1">
                  <span className="font-bold text-secondary font-mono block">Normal Baseline</span>
                  <p className="text-on-surface-variant">Continuous, unimpeded motor stroke velocity conforming to age-standardized developmental distributions.</p>
                </div>
                <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 space-y-1">
                  <span className="font-bold text-on-surface font-mono block">Corrected / Hesitation</span>
                  <p className="text-on-surface-variant">Overwritten strokes, double-traced ascenders, and micro-tremor pauses at character junction nodes.</p>
                </div>
              </div>
            </div>

            {/* 2. Image Capture Standards */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-on-surface">2. Specimen Capture Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5">
                  <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-on-surface block">Resolution & DPI</span>
                    <span className="text-on-surface-variant">Recommended 300 DPI flatbed optical scan or &gt;12 MP digital camera capture.</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5">
                  <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-on-surface block">Lighting & Illumination</span>
                    <span className="text-on-surface-variant">Diffuse ambient lighting; avoid localized flashlight reflection or shadows.</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5">
                  <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-on-surface block">Substrate & Medium</span>
                    <span className="text-on-surface-variant">Blank white paper or standard faintly ruled notebook paper with dark ink.</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-2.5">
                  <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-on-surface block">Supported Formats</span>
                    <span className="text-on-surface-variant">Uncompressed PNG, JPG, or TIFF up to 25MB per specimen crop.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Decision Boundary Margins */}
            <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold text-on-surface">
                <ShieldCheck size={16} className="text-secondary" />
                <span>Classification Margin Thresholds</span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Support Vector Machine decision hyperplanes require an optimal posterior margin of <strong>&tau; &ge; 0.92</strong> to classify into High Confidence tier. Confidence scores between 0.85 and 0.92 are flagged for observational cohort review.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer shadow-sm active:scale-[0.98]"
              >
                Acknowledge & Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
