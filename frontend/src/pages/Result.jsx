import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockPrediction } from '../utils/api';
import { ShieldCheck, Download, Flask, ScanBarcode, NavArrowRight, Activity, Cpu, BrainElectricity, GitCompare, ViewGrid, WarningTriangle, ArrowLeft, FireFlame, Expand, Copy, Check, Eye } from 'iconoir-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useToast } from '../context/ToastContext';

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const { addToast } = useToast();

  const stateData = location.state?.prediction || location.state?.record;
  const previewUrl = location.state?.previewUrl;
  const filename = location.state?.filename || stateData?.filename || 'specimen_p1084_cursive_eval.png';

  const data = {
    ...mockPrediction,
    ...(stateData || {}),
    id: stateData?.id || mockPrediction.id,
    category: stateData?.category || mockPrediction.category,
    confidence: stateData?.confidence || mockPrediction.confidence,
  };

  const isReversal = data.category === 'Reversal';
  const isCorrected = data.category === 'Corrected';

  const [isBinarized, setIsBinarized] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [copied, setCopied] = useState(false);

  // Prevent background scrolling when fullscreen modal is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const easeOut = [0.23, 1, 0.32, 1];

  const handleCopyId = () => {
    navigator.clipboard?.writeText(data.id);
    setCopied(true);
    addToast(`Copied Specimen ID #${data.id} to clipboard`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 pb-12 w-full max-w-[1600px] mx-auto pt-4 font-body text-on-surface">
      {/* Header Section with Executive Metadata & Quick Actions */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-mono text-xs mb-1">
            <ShieldCheck size={14} className="text-secondary" />
            <span>VALIDATED SCREENING SPECIMEN</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-on-surface">Analysis Result</h1>
          <p className="text-base text-on-surface-variant max-w-2xl">
            Automated feature extraction and discriminative hyperplane classification for handwriting specimen telemetry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleCopyId}
            title="Click to copy Specimen ID"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-lowest shadow-sm border border-outline-variant/30 hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="font-mono text-xs text-on-surface font-semibold">ID: #{data.id}</span>
            {copied ? <Check size={14} className="text-secondary" /> : <Copy size={14} className="text-on-surface-variant" />}
            <span className="text-outline-variant">•</span>
            <span className="text-xs text-on-surface-variant truncate max-w-[160px]">{filename}</span>
          </button>
          <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary-container/40 text-on-secondary-container font-medium text-sm border border-secondary/20">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>Completed • {data.confidence}% Confidence</span>
          </div>
          <button
            onClick={() => navigate('/report', { state: { prediction: data, previewUrl, filename } })}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-medium text-sm hover:bg-surface-container transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <Download size={16} />
            <span>Generate Dossier Report</span>
          </button>
        </div>
      </section>

      {/* Two-Column Primary Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Computer Vision Specimen Canvas (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 mb-4 bg-surface-container-low px-4 py-2.5 rounded-lg border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <ScanBarcode size={24} className="text-secondary" />
                <div>
                  <h2 className="text-lg font-semibold text-on-surface">Processed Handwriting Sample</h2>
                  <p className="text-xs text-on-surface-variant">Optical bounding, contour segmentation, and vector orientation heatmaps</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="hidden sm:inline font-mono text-xs bg-surface-container-lowest border border-outline-variant/30 text-on-surface px-2.5 py-1 rounded-md shadow-sm">
                  300 DPI • Otsu Filtered
                </span>

                {/* Viewport Mode Controls */}
                <div className="flex items-center bg-surface-container border border-outline-variant/30 rounded-lg p-0.5 shadow-sm">
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    title={showHeatmap ? "Disable Grad-CAM Heatmap" : "View Grad-CAM Attention Heatmap"}
                    className={`p-1.5 rounded text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer ${
                      showHeatmap ? 'bg-secondary text-on-secondary shadow-sm font-bold' : 'text-on-surface hover:bg-surface-container-lowest'
                    }`}
                  >
                    <FireFlame size={15} />
                    <span className="hidden md:inline">Heatmap</span>
                  </button>
                  <button
                    onClick={() => setIsBinarized(!isBinarized)}
                    title="Toggle Binarized Overlay"
                    className={`p-1.5 rounded transition-colors cursor-pointer ${
                      isBinarized ? 'bg-surface-container-lowest text-secondary shadow-sm' : 'text-on-surface hover:bg-surface-container-lowest'
                    }`}
                  >
                    <ViewGrid size={15} />
                  </button>
                  <button onClick={() => setZoom(z => Math.min(z + 0.1, 2))} className="p-1.5 rounded hover:bg-surface-container-lowest text-on-surface transition-colors active:scale-95 cursor-pointer"><span className="text-base leading-none font-bold">+</span></button>
                  <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} className="p-1.5 rounded hover:bg-surface-container-lowest text-on-surface transition-colors active:scale-95 cursor-pointer"><span className="text-base leading-none font-bold">-</span></button>
                  <button
                    onClick={() => setIsFullscreen(true)}
                    title="Fullscreen Lightbox"
                    className="p-1.5 rounded hover:bg-surface-container-lowest text-on-surface transition-colors cursor-pointer"
                  >
                    <Expand size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Specimen Display Workspace */}
            <div className="relative w-full h-[360px] rounded-lg overflow-hidden bg-surface-container-low select-none flex items-center justify-center p-6 border border-outline-variant/20">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

              <div className="relative z-10 w-full max-w-2xl h-full flex flex-col justify-center items-center transition-transform duration-300" style={{ transform: `scale(${zoom})` }}>
                <div className={`relative w-full p-6 sm:p-8 bg-surface-container-lowest/90 backdrop-blur rounded-lg shadow-sm flex flex-col gap-6 border border-outline-variant/20 ${isBinarized ? 'contrast-150 grayscale' : ''}`}>
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                    <span className="font-mono text-[10px] text-on-surface-variant font-medium">
                      SPECIMEN VIEWPORT // {showHeatmap ? "GRAD-CAM LAYER 4" : "TENSOR LAYER: L3"}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-secondary font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> {data.category} Pattern Tagged
                      </span>
                      <span className="font-mono text-[10px] text-on-surface bg-surface-container-high px-2 py-0.5 rounded font-bold">Δ 14.2° Tilt</span>
                    </div>
                  </div>

                  {/* Grad-CAM Thermal Saliency Simulation (Screen 08 Heatmap) */}
                  <AnimatePresence>
                    {showHeatmap && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.75 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: easeOut }}
                        className="absolute inset-0 pointer-events-none z-20 mix-blend-screen flex items-center justify-center overflow-hidden"
                      >
                        <div className="w-28 h-28 rounded-full bg-red-500 blur-2xl absolute left-[30%] top-[40%] animate-pulse"></div>
                        <div className="w-20 h-20 rounded-full bg-amber-400 blur-xl absolute left-[34%] top-[45%]"></div>
                        <div className="w-32 h-20 rounded-full bg-cyan-400 blur-2xl absolute left-[55%] top-[50%]"></div>
                        <div className="w-20 h-20 rounded-full bg-rose-500 blur-xl absolute left-[58%] top-[55%]"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* If user uploaded an actual file preview, show it with subtle analytics overlay */}
                  {previewUrl && !isBinarized ? (
                    <div className="relative w-full h-36 flex items-center justify-center overflow-hidden rounded">
                      <img src={previewUrl} alt="Analyzed specimen" className="max-h-full max-w-full object-contain" />
                      <div className="absolute inset-0 border border-secondary/30 pointer-events-none rounded"></div>
                    </div>
                  ) : (
                    /* SVG Vector with Analytical Heat Overlays */
                    <div className="relative w-full h-32 flex items-center justify-center">
                      <svg className="w-full h-full select-none" viewBox="0 0 760 180" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="strokeGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.85"></stop>
                            <stop offset="42%" stopColor="#14b8a6"></stop>
                            <stop offset="78%" stopColor="#f43f5e"></stop>
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0.85"></stop>
                          </linearGradient>
                        </defs>
                        <line stroke="currentColor" opacity="0.15" strokeDasharray="4 4" strokeWidth="1.5" x1="40" x2="720" y1="50" y2="50"></line>
                        <line stroke="currentColor" opacity="0.25" strokeWidth="1.5" x1="40" x2="720" y1="125" y2="125"></line>
                        <line stroke="currentColor" opacity="0.15" strokeDasharray="4 4" strokeWidth="1.5" x1="40" x2="720" y1="165" y2="165"></line>

                        <motion.path
                          initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.9, ease: easeOut }}
                          d="M 60,45 L 60,125 Q 60,135 72,130 M 50,75 L 75,75 M 85,45 L 85,125 Q 85,100 102,100 Q 118,100 118,125 M 132,110 C 132,95 152,95 152,110 L 128,110 C 128,125 152,128 155,120"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4.5"
                        />

                        <motion.path
                          initial={shouldReduceMotion ? {} : { pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.1, delay: 0.2, ease: easeOut }}
                          d="M 210,42 L 210,125 C 210,125 215,96 238,96 C 260,96 260,125 238,125 C 215,125 210,125 210,125"
                          fill="none"
                          stroke="url(#strokeGradient)"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="5"
                        />

                        <rect fill="rgba(20, 184, 166, 0.08)" height="102" rx="4" stroke="#14b8a6" strokeDasharray="3 3" strokeWidth="1.5" width="75" x="195" y="32"></rect>
                        <text className="font-mono" fill="#14b8a6" fontSize="10" fontWeight="600" x="198" y="24">ROI-1: MIRRORED LOOP [b↔d]</text>

                        <path d="M 300,110 C 300,95 280,95 280,110 C 280,125 300,125 300,110 M 310,100 C 310,95 330,95 330,110 L 330,145 C 330,165 305,165 305,150" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5"></path>
                        <path d="M 400,98 L 400,165 M 400,105 C 400,95 425,95 425,112 C 425,125 400,125 400,125 M 438,45 L 438,125 M 455,115 C 455,100 475,100 475,115 L 475,125 M 488,102 L 498,125 L 508,102 M 498,125 L 488,155" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5"></path>

                        <rect fill="rgba(244, 63, 94, 0.08)" height="85" rx="4" stroke="#f43f5e" strokeDasharray="3 3" strokeWidth="1.5" width="48" x="388" y="85"></rect>
                        <text className="font-mono" fill="#f43f5e" fontSize="10" fontWeight="600" x="390" y="78">ROI-2: LATERAL SHIFT</text>
                      </svg>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-surface-container font-mono text-xs text-on-surface-variant">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-secondary"></span> Primary Feature Vector</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-error"></span> Detected Inversion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grad-CAM Legend Strip (when active) */}
            {showHeatmap && (
              <div className="mt-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <span className="text-on-surface-variant font-medium">Grad-CAM Attribution Intensity:</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-on-surface-variant">0.0 Low</span>
                  <div className="w-32 h-2.5 rounded-full bg-gradient-to-r from-blue-600 via-teal-400 via-yellow-400 to-rose-500 shadow-xs"></div>
                  <span className="text-[10px] text-error font-bold">1.0 Thermal Peak</span>
                </div>
              </div>
            )}

            {/* Sample Technical Details Footer Strip */}
            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-on-surface-variant border-t border-outline-variant/20">
              <div className="flex items-center gap-6">
                <span>STROKE RESOLUTION: <strong className="text-on-surface font-semibold">1,240 × 820 px</strong></span>
                <span>INSPECTION WINDOW: <strong className="text-on-surface font-semibold">2.4 cm²</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsBinarized(!isBinarized)} className="text-secondary font-semibold hover:underline cursor-pointer">
                  {isBinarized ? "Show Optical View" : "Show Binarized Segmentation"}
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Inference Telemetry & Classification Metrics (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Main Inference Outcome Card */}
          <Card className={`p-6 border-l-4 ${isReversal ? 'border-l-error' : isCorrected ? 'border-l-secondary' : 'border-l-secondary'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">Classification Outcome</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono inline-flex items-center gap-1 border ${
                isReversal
                  ? 'bg-error-container text-on-error-container border-error/30'
                  : 'bg-secondary-container text-on-secondary-container border-secondary/30'
              }`}>
                {isReversal && <WarningTriangle size={12} />}
                {data.category}
              </span>
            </div>

            <div className="space-y-1.5 mb-6">
              <div className="text-xs text-on-surface-variant uppercase font-semibold tracking-wider">Predicted Category</div>
              <div className={`text-3xl font-bold tracking-tight ${isReversal ? 'text-error' : 'text-on-surface'}`}>
                {data.category} Pattern
              </div>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                {isReversal
                  ? "High concentration of character mirroring along the vertical axis detected within character clusters."
                  : isCorrected
                  ? "Overwritten stroke contours and self-corrected hesitation nodes detected along text baselines."
                  : "Continuous fluid stroke trajectory conforming to standard neuro-developmental baseline distributions."}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-surface-container">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-on-surface">Model Confidence</span>
                <span className="font-mono text-xl font-bold text-secondary">{data.confidence}%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden p-0.5 border border-outline-variant/20">
                <motion.div
                  style={{ transformOrigin: 'left' }}
                  initial={shouldReduceMotion ? { transform: `scaleX(${data.confidence / 100})` } : { transform: "scaleX(0)" }}
                  animate={{ transform: `scaleX(${data.confidence / 100})` }}
                  transition={{ duration: 0.75, ease: easeOut }}
                  className="bg-secondary h-full rounded-full w-full"
                />
              </div>
              <span className="text-[11px] text-on-surface-variant block">Margin threshold: &gt; 92.0% for high confidence tier</span>
            </div>
          </Card>

          {/* Probability Distribution */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-on-surface mb-4">Posterior Probability Distribution</h3>
            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-on-surface font-semibold">Reversal</span>
                  <span className="font-bold text-error">{isReversal ? `${data.confidence}%` : '4.2%'}</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden border border-outline-variant/10">
                  <motion.div
                    style={{ transformOrigin: 'left' }}
                    initial={shouldReduceMotion ? { transform: `scaleX(${isReversal ? data.confidence / 100 : 0.042})` } : { transform: "scaleX(0)" }}
                    animate={{ transform: `scaleX(${isReversal ? data.confidence / 100 : 0.042})` }}
                    transition={{ duration: 0.75, ease: easeOut }}
                    className="bg-error h-full rounded-full w-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-on-surface-variant">Corrected</span>
                  <span className="text-on-surface-variant">{isCorrected ? `${data.confidence}%` : '2.1%'}</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden border border-outline-variant/10">
                  <motion.div
                    style={{ transformOrigin: 'left' }}
                    initial={shouldReduceMotion ? { transform: `scaleX(${isCorrected ? data.confidence / 100 : 0.021})` } : { transform: "scaleX(0)" }}
                    animate={{ transform: `scaleX(${isCorrected ? data.confidence / 100 : 0.021})` }}
                    transition={{ duration: 0.75, delay: 0.08, ease: easeOut }}
                    className="bg-secondary h-full rounded-full w-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-on-surface-variant">Normal</span>
                  <span className="text-on-surface-variant">{!isReversal && !isCorrected ? `${data.confidence}%` : '0.7%'}</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden border border-outline-variant/10">
                  <motion.div
                    style={{ transformOrigin: 'left' }}
                    initial={shouldReduceMotion ? { transform: `scaleX(${!isReversal && !isCorrected ? data.confidence / 100 : 0.007})` } : { transform: "scaleX(0)" }}
                    animate={{ transform: `scaleX(${!isReversal && !isCorrected ? data.confidence / 100 : 0.007})` }}
                    transition={{ duration: 0.75, delay: 0.16, ease: easeOut }}
                    className="bg-surface-variant h-full rounded-full w-full"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Disclaimers & Ethics */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
              <ShieldCheck size={16} className="text-secondary" />
              <span>Ethical AI & Compliance Notice</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              This screening analysis is generated by automated statistical learning algorithms (ResNet-34 + SVM). It serves as an exploratory research metric and must not be interpreted as a psychological or medical diagnosis of dyslexia.
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Diagnostic Lightbox Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsFullscreen(false)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "scale(0.96) translateY(8px)" }}
              animate={{ opacity: 1, transform: "scale(1) translateY(0px)" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "scale(0.96) translateY(8px)" }}
              transition={{ duration: 0.18, ease: easeOut }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-2xl p-6 flex flex-col gap-4 font-body text-on-surface max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <ScanBarcode size={22} className="text-secondary" />
                  <span className="font-semibold text-base text-on-surface">Specimen Fullscreen Lightbox (#{data.id})</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsBinarized(!isBinarized)}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-surface-container hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    {isBinarized ? "Optical View" : "Binarized View"}
                  </button>
                  <button
                    onClick={() => setIsFullscreen(false)}
                    className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="relative w-full h-[60vh] bg-surface-container-low rounded-xl flex items-center justify-center p-8 overflow-auto border border-outline-variant/20">
                <div className="scale-125 transition-transform duration-200">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Fullscreen specimen" className="max-h-[50vh] object-contain" />
                  ) : (
                    <div className="p-8 bg-surface-container-lowest rounded-xl shadow-md border border-outline-variant/30 text-center font-mono">
                      <span className="text-sm font-bold text-on-surface block">{filename}</span>
                      <span className="text-xs text-secondary mt-1 block">Calibrated 300 DPI Stroke Map Loaded</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
}
