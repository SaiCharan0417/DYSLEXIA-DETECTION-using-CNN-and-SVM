import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CloudUpload, Refresh, ScanBarcode, Square, Folder, CheckCircle, Trash, Flash, Check, BrainElectricity, Table, LightBulb, EditPencil, MediaImageXmark, Brightness, SunLight, List, SmartphoneDevice, Xmark } from 'iconoir-react';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';

export default function Upload() {
  const navigate = useNavigate();
  const [fileState, setFileState] = useState('staged'); // staged, analyzing
  const [hasFile, setHasFile] = useState(false);

  const handleFileDrop = (e) => {
    e.preventDefault();
    setHasFile(true);
    setFileState('staged');
  };

  const handleAnalyze = () => {
    setFileState('analyzing');
    setTimeout(() => {
      navigate('/processing');
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Protocol & Header Zone */}
      <section className="flex flex-col gap-4 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-secondary font-mono text-xs uppercase tracking-wider font-semibold">
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
          <div className="flex items-center gap-2 text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span>Model Weights: <strong className="text-on-surface font-mono text-xs">neuro-cnn-v4-prod</strong></span>
          </div>
        </div>

        {/* Protocol Governance Banner */}
        <div className="bg-surface-container-low rounded-xl p-4 flex items-start gap-3.5 shadow-sm">
          <div className="p-2 bg-surface-container rounded-lg text-secondary shrink-0 mt-0.5">
            <ShieldCheck size={20} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-on-surface">Clinical Observational Protocol Notice</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">ISO/IEC 27001 Staged</span>
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

          {!hasFile ? (
            /* Upload Zone Card */
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-5 border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <h2 className="text-xl font-semibold text-on-surface">Ingestion Stage</h2>
                </div>
                <span className="font-mono text-xs text-on-surface-variant">STEP 01/02</span>
              </div>

              <div
                className="relative group cursor-pointer rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all bg-surface-container-low hover:bg-surface-container border-2 border-dashed border-outline-variant/40"
                onDragOver={e => e.preventDefault()}
                onDrop={handleFileDrop}
                onClick={() => setHasFile(true)}
              >
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm group-hover:scale-105 transition-transform">
                    <CloudUpload size={32} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-on-secondary text-lg font-bold pb-0.5">+</div>
                </div>
                <h3 className="text-xl font-semibold text-on-surface mb-1">Drag and drop your image here</h3>
                <p className="text-base text-on-surface-variant mb-4">or choose from local storage</p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-medium text-sm shadow-sm border border-outline-variant/20">
                  <Folder size={18} />
                  <span>Browse Computer</span>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 text-on-surface-variant font-mono text-xs">
                  <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-secondary" /> PNG, JPG, TIFF (Uncompressed)</span>
                  <span className="hidden sm:inline text-outline-variant">•</span>
                  <span className="flex items-center gap-1.5"><Square size={16} className="text-secondary" /> Min 1200×800px (Max 25MB)</span>
                </div>

                <div className="mt-4 pt-4 w-full flex items-center justify-center gap-2 text-on-surface-variant text-xs bg-surface-container-lowest/80 rounded-lg py-2 px-3">
                  <ShieldCheck size={16} className="text-secondary" />
                  <span>Client-side pre-flight verification & HIPAA/FERPA compliant de-identification</span>
                </div>
              </div>
            </div>
          ) : (
            /* Active Selected Specimen Stage Card */
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-6 border border-outline-variant/20">
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
                <div className="relative md:w-56 h-44 rounded-lg overflow-hidden shrink-0 shadow-sm bg-surface-container">
                  <div className="w-full h-full bg-outline-variant/20 flex items-center justify-center text-on-surface-variant font-mono text-xs">
                    [Mock Handwriting Image]
                  </div>
                  <div className="absolute inset-2 pointer-events-none rounded">
                    <div className="absolute top-0 left-0 w-3 h-3 bg-secondary"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-secondary"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-secondary"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary"></div>
                    <div className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-surface/90 text-on-surface font-mono text-[10px] font-medium">ROI #01</div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold text-on-surface break-all">specimen_p1084_cursive_eval.png</span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-surface-container text-secondary font-medium">Stage 0 Ready</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                      <div className="bg-surface-container rounded-lg p-2 flex flex-col border border-outline-variant/10">
                        <span className="text-[10px] text-on-surface-variant">File Size</span>
                        <span className="font-mono text-[10px] text-on-surface font-medium">4.8 MB (Lossless)</span>
                      </div>
                      <div className="bg-surface-container rounded-lg p-2 flex flex-col border border-outline-variant/10">
                        <span className="text-[10px] text-on-surface-variant">Dimensions</span>
                        <span className="font-mono text-[10px] text-on-surface font-medium">2400 × 1600 px</span>
                      </div>
                      <div className="bg-surface-container rounded-lg p-2 flex flex-col border border-outline-variant/10">
                        <span className="text-[10px] text-on-surface-variant">DPI Metric</span>
                        <span className="font-mono text-[10px] text-secondary font-medium">300 DPI (Calibrated)</span>
                      </div>
                      <div className="bg-surface-container rounded-lg p-2 flex flex-col border border-outline-variant/10">
                        <span className="text-[10px] text-on-surface-variant">Histogram Score</span>
                        <span className="font-mono text-[10px] text-on-surface font-medium">98.2% Brightness</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-medium transition-colors border border-outline-variant/20">
                      <Refresh size={16} />
                      <span>Re-crop / Rotate</span>
                    </button>
                    <button
                      onClick={() => setHasFile(false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-error transition-colors text-sm font-medium border border-outline-variant/20"
                    >
                      <Trash size={16} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Pipeline State Simulator */}
              <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-3 border border-outline-variant/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant font-medium">Interactive Pipeline State</span>
                  <div className="flex items-center gap-1 bg-surface-container rounded-lg p-1">
                    <span className="px-2.5 py-1 rounded font-mono text-[10px] font-semibold bg-surface-container-lowest text-on-surface shadow-sm">Staged</span>
                  </div>
                </div>

                {fileState === 'staged' ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-on-surface-variant">Image validated for binarization and segment isolation. Press execution trigger to initiate inference.</p>
                    <div className="flex items-center gap-2 font-mono text-xs text-secondary font-medium">
                      <Flash size={16} />
                      <span>Estimated run latency: ~140ms on Edge CNN</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-on-surface font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                        Executing ML Pipeline v2.4
                      </span>
                      <span className="font-mono text-xs text-secondary font-bold">68% Complete</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                      <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{width: '68%'}}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Button
                  onClick={handleAnalyze}
                  isLoading={fileState === 'analyzing'}
                  className="w-full sm:flex-1 py-3 px-6 text-sm"
                  icon={Brain}
                >
                  Analyze Handwriting
                </Button>
                <Button variant="secondary" className="w-full sm:w-auto py-3 px-4 text-sm" disabled={fileState === 'analyzing'}>
                  Quick Test with Sample
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Guidelines */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-5 border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LightBulb className="text-secondary" size={22} />
                <h2 className="text-xl font-semibold text-on-surface">Before you upload</h2>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-medium">Quality Guidelines</span>
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

            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold block mb-3">Specimen Spec Comparison</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg overflow-hidden bg-surface-container-low p-2.5 flex flex-col gap-2 border border-outline-variant/10">
                  <div className="relative h-28 rounded-md overflow-hidden bg-surface-container flex items-center justify-center text-on-surface-variant text-xs font-mono">
                    [Clean Sample]
                    <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-secondary text-on-secondary font-mono text-[10px] flex items-center gap-1 font-semibold">
                      <Check size={12} /> Recommended
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-on-surface">Calibrated Scan (300 DPI)</span>
                    <span className="text-xs text-on-surface-variant">Uniform threshold, 0% glare</span>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden bg-surface-container-low p-2.5 flex flex-col gap-2 border border-outline-variant/10">
                  <div className="relative h-28 rounded-md overflow-hidden bg-surface-container flex items-center justify-center text-on-surface-variant text-xs font-mono opacity-75">
                    [Blurry Sample]
                    <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-error text-on-error font-mono text-[10px] flex items-center gap-1 font-semibold">
                      <Xmark size={12} /> Avoid
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-on-surface">Tilted Phone Capture</span>
                    <span className="text-xs text-on-surface-variant">Oblique perspective & shadows</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline Pre-flight Checks Card */}
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-4 border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List className="text-secondary" size={22} />
                <h2 className="text-xl font-semibold text-on-surface">Pipeline Pre-flight Checks</h2>
              </div>
              <span className="font-mono text-xs text-secondary font-medium">3/3 Passed</span>
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
          <span className="text-on-surface-variant">Model: CNN+SVM v2.4</span>
          <span className="text-outline-variant">•</span>
          <span className="text-secondary font-medium">FERPA/HIPAA Compliant Session</span>
        </div>
      </section>

    </div>
  );
}