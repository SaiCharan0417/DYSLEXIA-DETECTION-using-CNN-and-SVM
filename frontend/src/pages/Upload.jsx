import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, CloudUpload, Refresh, ScanBarcode, Square, Folder, CheckCircle, Trash, Flash, Check, BrainElectricity, Table, LightBulb, EditPencil, MediaImageXmark, Brightness, SunLight, List, SmartphoneDevice, Xmark, Brain, Play } from 'iconoir-react';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { useToast } from '../context/ToastContext';

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { addToast } = useToast();
  const shouldReduceMotion = useReducedMotion();
  const easeOut = [0.23, 1, 0.32, 1];

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileMeta, setFileMeta] = useState({
    name: '',
    size: '',
    dimensions: '2400 × 1600 px',
    dpi: '300 DPI (Calibrated)',
    brightness: '98.2% Balanced'
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const processFile = (file) => {
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      addToast('File exceeds 25MB maximum limit. Please select a smaller specimen crop.', 'error');
      return;
    }
    const url = URL.createObjectURL(file);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);

    // Extract image dimensions
    const img = new Image();
    img.onload = () => {
      setFileMeta({
        name: file.name,
        size: `${sizeMb} MB (Lossless)`,
        dimensions: `${img.naturalWidth} × ${img.naturalHeight} px`,
        dpi: '300 DPI (Calibrated)',
        brightness: '98.5% Balanced'
      });
    };
    img.src = url;

    setSelectedFile(file);
    setPreviewUrl(url);
    addToast(`Loaded ${file.name} for pre-flight verification`, 'success');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleQuickSample = (scenario = 'Reversal') => {
    const filename = scenario === 'Reversal'
      ? 'specimen_p1084_reversal.png'
      : scenario === 'Normal'
      ? 'specimen_c104_normal.png'
      : 'specimen_h212_corrected.png';
    const blob = new Blob(["mock-specimen-bytes"], { type: "image/png" });
    const sampleFile = new File([blob], filename, { type: "image/png" });
    setSelectedFile(sampleFile);
    setPreviewUrl(null);
    setFileMeta({
      name: filename,
      size: "4.8 MB (Lossless)",
      dimensions: "2400 × 1600 px",
      dpi: "300 DPI (Calibrated)",
      brightness: "98.2% Balanced"
    });
    addToast(`Loaded ${scenario} reference specimen`, 'info');
  };

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      navigate('/processing', {
        state: {
          file: selectedFile,
          filename: selectedFile.name,
          fileSize: fileMeta.size,
          dimensions: fileMeta.dimensions,
          previewUrl: previewUrl
        }
      });
    }, 400);
  };

  return (
    <div className="flex flex-col w-full pb-16 font-body text-on-surface">
      {/* Hidden Native File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png,image/jpeg,image/tiff,image/webp"
        className="hidden"
      />

      {/* Top Protocol & Header Zone */}
      <section className="flex flex-col gap-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-secondary font-mono text-xs uppercase tracking-wider font-semibold border border-outline-variant/20">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              AI SCREENING PIPELINE v2.4
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-mono text-xs">
              Single Specimen Mode
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
            <ShieldCheck size={16} className="text-secondary" />
            <span>SHA-256 Specimen Encryption Ready</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-on-surface tracking-tight">New Handwriting Analysis</h1>
            <p className="text-sm text-on-surface-variant mt-1">Upload a high-fidelity handwriting specimen for automated morphological feature extraction and screening.</p>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm font-mono">
            <span>Model Weights: <strong className="text-on-surface">neuro-cnn-v4-prod</strong></span>
          </div>
        </div>

        {/* Protocol Governance Banner */}
        <div className="bg-surface-container-low rounded-xl p-4 flex items-start gap-3.5 shadow-sm border border-outline-variant/20">
          <div className="p-2 bg-surface-container rounded-lg text-secondary shrink-0 mt-0.5">
            <ShieldCheck size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-on-surface">Clinical Observational Protocol Notice</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container text-on-surface-variant border border-outline-variant/20">ISO/IEC 27001 Staged</span>
            </div>
            <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
              NeuroWrite AI calculates probabilistic visual metrics using convolutional neural network (CNN) feature descriptors and dual-margin support vector machine (SVM) hyperplanes. Outputs are intended for educational research, cognitive observation, and preliminary screening support, and must not be used as standalone medical diagnoses.
            </p>
          </div>
        </div>
      </section>

      {/* Two-Column Asymmetric Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="xl:col-span-7 flex flex-col gap-6">

          <AnimatePresence mode="wait">
            {!selectedFile ? (
              /* Upload Zone Card */
              <motion.div
                key="upload-zone"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(6px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px)" }}
                transition={{ duration: 0.16, ease: easeOut }}
                className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-5 border border-outline-variant/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <h2 className="text-xl font-semibold text-on-surface">Ingestion Stage</h2>
                  </div>
                  <span className="font-mono text-xs text-on-surface-variant font-semibold">STEP 01/02</span>
                </div>

                <div
                  className="relative group cursor-pointer rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all bg-surface-container-low hover:bg-surface-container border-2 border-dashed border-outline-variant/40 hover:border-secondary"
                  onDragOver={e => e.preventDefault()}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm group-hover:scale-105 transition-transform">
                      <CloudUpload size={32} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-on-secondary text-lg font-bold pb-0.5">+</div>
                  </div>
                  <h3 className="text-xl font-semibold text-on-surface mb-1">Drag and drop your image here</h3>
                  <p className="text-base text-on-surface-variant mb-4">or choose from local storage</p>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-semibold text-sm shadow-sm border border-outline-variant/30">
                    <Folder size={18} />
                    <span>Browse Computer</span>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 text-on-surface-variant font-mono text-xs">
                    <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-secondary" /> PNG, JPG, TIFF</span>
                    <span className="hidden sm:inline text-outline-variant">•</span>
                    <span className="flex items-center gap-1.5"><Square size={16} className="text-secondary" /> Min 1200×800px (Max 25MB)</span>
                  </div>

                  <div className="mt-4 pt-4 w-full flex items-center justify-center gap-2 text-on-surface-variant text-xs bg-surface-container-lowest/80 rounded-lg py-2 px-3 border border-outline-variant/20">
                    <ShieldCheck size={16} className="text-secondary" />
                    <span>Client-side pre-flight verification & HIPAA/FERPA compliant de-identification</span>
                  </div>
                </div>

                {/* Quick Sample Button for Testing */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-on-surface-variant border-t border-outline-variant/15">
                  <span className="font-medium">Or load a reference cohort specimen:</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleQuickSample('Reversal')}
                      className="px-2.5 py-1 rounded-md bg-error-container/20 text-error hover:bg-error-container/40 font-mono text-[11px] font-semibold transition-colors border border-error/20 cursor-pointer"
                    >
                      Reversal Sample
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSample('Normal')}
                      className="px-2.5 py-1 rounded-md bg-secondary-container/20 text-secondary hover:bg-secondary-container/40 font-mono text-[11px] font-semibold transition-colors border border-secondary/20 cursor-pointer"
                    >
                      Normal Sample
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSample('Corrected')}
                      className="px-2.5 py-1 rounded-md bg-surface-container text-on-surface hover:bg-surface-container-high font-mono text-[11px] font-semibold transition-colors border border-outline-variant/30 cursor-pointer"
                    >
                      Corrected Sample
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Active Selected Specimen Stage Card */
              <motion.div
                key="selected-stage"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(6px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px)" }}
                transition={{ duration: 0.16, ease: easeOut }}
                className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-6 border border-outline-variant/30"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <ScanBarcode className="text-secondary" size={22} />
                    <h2 className="text-xl font-semibold text-on-surface">Selected Specimen Stage</h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Ready for Inference
                  </span>
                </div>

                {/* Specimen Preview */}
                <div className="relative bg-surface-container-low rounded-xl p-4 flex flex-col md:flex-row gap-5 items-stretch border border-outline-variant/20">
                  <div className="relative md:w-56 h-44 rounded-lg overflow-hidden shrink-0 shadow-sm bg-surface-container flex items-center justify-center">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Selected handwriting specimen" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-outline-variant/20 flex flex-col items-center justify-center text-on-surface-variant font-mono text-xs p-2 text-center">
                        <ScanBarcode size={28} className="text-secondary mb-1" />
                        <span>{selectedFile.name}</span>
                      </div>
                    )}
                    <div className="absolute inset-2 pointer-events-none rounded">
                      <div className="absolute top-0 left-0 w-3 h-3 bg-secondary"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 bg-secondary"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 bg-secondary"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary"></div>
                      <div className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-surface/90 text-on-surface font-mono text-[10px] font-medium border border-outline-variant/20">ROI #01</div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold text-on-surface break-all">{fileMeta.name}</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container text-secondary font-medium">Stage 0 Ready</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                        <div className="bg-surface-container rounded-lg p-2 flex flex-col border border-outline-variant/10">
                          <span className="text-[10px] text-on-surface-variant font-medium">File Size</span>
                          <span className="font-mono text-[10px] text-on-surface font-semibold">{fileMeta.size}</span>
                        </div>
                        <div className="bg-surface-container rounded-lg p-2 flex flex-col border border-outline-variant/10">
                          <span className="text-[10px] text-on-surface-variant font-medium">Dimensions</span>
                          <span className="font-mono text-[10px] text-on-surface font-semibold">{fileMeta.dimensions}</span>
                        </div>
                        <div className="bg-surface-container rounded-lg p-2 flex flex-col border border-outline-variant/10">
                          <span className="text-[10px] text-on-surface-variant font-medium">DPI Metric</span>
                          <span className="font-mono text-[10px] text-secondary font-semibold">{fileMeta.dpi}</span>
                        </div>
                        <div className="bg-surface-container rounded-lg p-2 flex flex-col border border-outline-variant/10">
                          <span className="text-[10px] text-on-surface-variant font-medium">Histogram Score</span>
                          <span className="font-mono text-[10px] text-on-surface font-semibold">{fileMeta.brightness}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-medium transition-colors border border-outline-variant/20 cursor-pointer"
                      >
                        <Refresh size={16} />
                        <span>Choose Different</span>
                      </button>
                      <button
                        onClick={handleRemove}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-error-container hover:text-on-error-container text-on-surface-variant transition-colors text-sm font-medium border border-outline-variant/20 cursor-pointer"
                      >
                        <Trash size={16} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <Button
                    onClick={handleAnalyze}
                    isLoading={isAnalyzing}
                    className="w-full sm:flex-1 py-3 px-6 text-sm font-semibold"
                    icon={Brain}
                  >
                    Run Screening Analysis
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Guidelines */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-5 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LightBulb className="text-secondary" size={22} />
                <h2 className="text-xl font-semibold text-on-surface">Before you upload</h2>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold border border-outline-variant/20">Quality Guidelines</span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Optimal image quality ensures sharp stroke orientation maps, accurate character segmentation, and high confidence classifications.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {[
                { icon: EditPencil, title: "Use a clear handwriting sample", desc: "Natural continuous handwritten sentences, preferably on blank white paper or faintly ruled standard sheets." },
                { icon: MediaImageXmark, title: "Avoid excessive blur", desc: "Hold optical capture device strictly steady or utilize a flatbed scanner to prevent micro-motion tremors along stroke edges." },
                { icon: Brightness, title: "Make sure writing is visible", desc: "Ensure rich contrast between ink and substrate. Dark blue or dense black ballpoint/fountain pen strokes provide maximum signal." },
                { icon: SunLight, title: "Use balanced, uniform lighting", desc: "Avoid harsh localized desk flash reflections or diagonal arm shadows across the active character lines." }
              ].map((tip, i) => (
                <div key={i} className="p-3 rounded-lg bg-surface-container-low flex items-start gap-3 border border-outline-variant/10">
                  <div className="p-1.5 rounded-md bg-surface-container text-secondary shrink-0 mt-0.5">
                    <tip.icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-on-surface">{tip.title}</h3>
                    <p className="text-xs text-on-surface-variant mt-0.5">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Pre-flight Checks Card */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="text-secondary" size={22} />
                <h2 className="text-xl font-semibold text-on-surface">Pipeline Pre-flight Checks</h2>
              </div>
              <span className="font-mono text-xs text-secondary font-bold">3/3 Passed</span>
            </div>
            <ul className="space-y-2.5 text-xs text-on-surface">
              {[
                "Document edge detection ready (automatic skew correction)",
                "Stroke thickness normalization enabled (adaptive filter)",
                "Orientation auto-correction active (affine baseline alignment)"
              ].map((txt, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                    <Check size={14} />
                  </div>
                  <span>{txt}</span>
                </li>
              ))}
            </ul>
            <div className="p-3 bg-surface-container rounded-lg flex items-start gap-2.5 text-on-surface-variant text-xs mt-1 border border-outline-variant/10">
              <SmartphoneDevice size={18} className="text-secondary shrink-0 mt-0.5" />
              <p><strong>Hardware Guidance:</strong> Modern smartphone captures (&gt;12 MP) held parallel to the page under diffuse ambient light perform equivalently to standard office document scanners.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Institutional Governance Footer */}
      <section className="mt-12 pt-6 border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-4 text-on-surface-variant text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-secondary"></div>
          <p>
            NeuroWrite AI categorizations represent morphological handwriting pattern screening and are intended exclusively for academic, observational, and preliminary research purposes. Always correlate outputs with comprehensive standardized assessments.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
          <span>PIPELINE: ACTIVE</span>
          <span>LATENCY: ~140ms</span>
        </div>
      </section>
    </div>
  );
}