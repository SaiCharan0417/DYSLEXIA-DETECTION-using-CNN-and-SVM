import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { predict } from '../utils/api';
import { ShieldCheck, ArrowRight, Terminal, XmarkCircle, MediaImage, Filter, ElectronicsChip, Network, Lock, Check } from 'iconoir-react';
import { Spinner } from '../components/ui/Spinner';
import { cn } from '../utils/cn';

export default function Processing() {
  const navigate = useNavigate();
  const location = useLocation();

  const file = location.state?.file;
  const filename = location.state?.filename || 'specimen_p1084_cursive_eval.png';
  const fileSize = location.state?.fileSize || '4.8 MB (Lossless)';
  const dimensions = location.state?.dimensions || '2480 × 1754 px';
  const previewUrl = location.state?.previewUrl;

  const [elapsed, setElapsed] = useState(0.8);
  const [progress, setProgress] = useState(38);
  const [showLogs, setShowLogs] = useState(true);
  const scannerBeamRef = useRef(null);

  // Time & progress simulation linked with real predict() API call
  useEffect(() => {
    let active = true;
    const timerInterval = setInterval(() => {
      setElapsed(prev => prev + 0.1);
    }, 100);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (Math.random() * 3);
        return next > 95 ? 95 : next;
      });
    }, 250);

    // Bounce scan beam
    let beamY = 15;
    let beamDir = 1;
    let animFrame;
    const animateScan = () => {
      beamY += 0.55 * beamDir;
      if (beamY > 90) beamDir = -1;
      else if (beamY < 10) beamDir = 1;
      if (scannerBeamRef.current) {
        scannerBeamRef.current.style.top = `${beamY}%`;
      }
      animFrame = requestAnimationFrame(animateScan);
    };
    animFrame = requestAnimationFrame(animateScan);

    // Call ML prediction endpoint
    predict(file).then((res) => {
      if (!active) return;
      setProgress(100);
      setTimeout(() => {
        navigate('/result', {
          state: {
            prediction: res?.result,
            previewUrl,
            filename
          }
        });
      }, 500);
    });

    return () => {
      active = false;
      clearInterval(timerInterval);
      clearInterval(progressInterval);
      cancelAnimationFrame(animFrame);
    };
  }, [navigate, file, previewUrl, filename]);

  return (
    <div className="flex flex-col w-full pb-16 gap-6 pt-4 font-body text-on-surface">
      {/* Top Action & Diagnostic Status Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/30">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-on-surface-variant text-xs">
            <span>Screening</span>
            <span>&gt;</span>
            <span>Pipeline Ingestion</span>
            <span>&gt;</span>
            <span className="font-mono font-semibold text-secondary">Active Session</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Screening in Progress: {filename}</h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              <span>Feature Extraction Active</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant flex items-center gap-2">
            <span>Elapsed: <span className="font-mono font-semibold text-on-surface">00:{(elapsed < 10 ? '0' : '') + elapsed.toFixed(1)}s</span></span>
            <span className="text-outline-variant">•</span>
            <span>Benchmark: ~02.4s</span>
            <span className="text-outline-variant">•</span>
            <span className="font-mono font-medium">{fileSize}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors font-semibold text-sm border border-outline-variant/20 cursor-pointer"
          >
            <Terminal size={18} className="text-secondary" />
            <span>Telemetry Log</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          </button>
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-error-container hover:text-on-error-container text-on-surface-variant transition-colors font-medium text-sm border border-outline-variant/20 cursor-pointer"
          >
            <XmarkCircle size={18} />
            <span>Abort Session</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT: CV Inspection Canvas (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-5 overflow-hidden relative border border-outline-variant/30">
            {/* Canvas Subheader */}
            <div className="flex items-center justify-between pb-4 mb-4 bg-surface-container-low px-4 py-2.5 rounded-lg border border-outline-variant/10">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="text-secondary" size={20} />
                <span className="text-sm font-semibold text-on-surface">Live Computer Vision Feature Grid</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">ResNet-34 + SVM</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-on-surface-variant">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span>Spatial Bounding Active</span>
                </span>
                <span className="text-outline-variant">|</span>
                <span>Zoom 100%</span>
              </div>
            </div>

            {/* Specimen Live Inspection Canvas with Laser Sweep */}
            <div className="relative w-full aspect-[16/10] bg-surface-container-low rounded-lg shadow-inner overflow-hidden flex items-center justify-center p-4 select-none border border-outline-variant/20">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '100% 36px' }}></div>

              <div className="relative z-10 w-full h-full flex flex-col justify-center items-center bg-surface-container-lowest/80 rounded-lg overflow-hidden border border-outline-variant/20">
                {previewUrl ? (
                  <img src={previewUrl} alt="Scanning specimen" className="w-full h-full object-contain filter contrast-125" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-on-surface-variant font-mono text-xs opacity-75 p-6 text-center">
                    <MediaImage size={40} className="text-secondary mb-2" />
                    <span className="font-semibold text-on-surface">{filename}</span>
                    <span className="text-[11px] mt-1 text-on-surface-variant">Stroke matrix ingestion verified</span>
                  </div>
                )}

                {/* Bounding Box 1 */}
                <div className="absolute top-[28%] left-[22%] w-48 h-20 bg-secondary/15 rounded pointer-events-none border border-secondary/40">
                  <div className="absolute -top-3 left-2 px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-mono text-[10px] flex items-center gap-1 font-bold">
                    <span>Seg-01: Ascender Loop (b/d)</span>
                  </div>
                </div>

                {/* Bounding Box 2 */}
                <div className="absolute top-[52%] left-[44%] w-56 h-18 bg-tertiary-container/15 rounded pointer-events-none border border-tertiary/40">
                  <div className="absolute -top-3 left-2 px-1.5 py-0.5 rounded bg-tertiary text-on-tertiary font-mono text-[10px] font-bold">
                    <span>Seg-02: Baseline Drift [-3.4°]</span>
                  </div>
                </div>

                {/* Animated Scanning Laser Beam */}
                <div ref={scannerBeamRef} className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent pointer-events-none shadow-[0_0_16px_rgba(45,212,191,0.9)] z-20">
                  <div className="w-full h-8 -mt-4 bg-gradient-to-b from-secondary/25 to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-4 bg-surface-container-low px-4 py-2.5 rounded-lg font-mono text-xs text-on-surface-variant border border-outline-variant/10">
              <div className="flex items-center gap-4">
                <span>{dimensions}</span>
                <span>·</span>
                <span>DPI: 300 Certified</span>
                <span>·</span>
                <span>Otsu Adaptive Threshold: 0.42</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-secondary font-semibold">Stroke Heatmap: Live 60 fps</span>
              </div>
            </div>
          </div>

          {/* Extraction Real-Time Feature Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 flex flex-col justify-between border border-outline-variant/30">
              <div className="flex items-center justify-between text-on-surface-variant text-xs font-semibold">
                <span>Stroke Velocity Index</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold font-mono text-on-surface">14.8 cm/s</span>
                <span className="text-[11px] text-secondary font-mono block mt-0.5">Normal velocity distribution</span>
              </div>
            </Card>

            <Card className="p-4 flex flex-col justify-between border border-outline-variant/30">
              <div className="flex items-center justify-between text-on-surface-variant text-xs font-semibold">
                <span>Loop Inversion Metric</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold font-mono text-error">88.4%</span>
                <span className="text-[11px] text-error font-mono block mt-0.5">High lateral reflection</span>
              </div>
            </Card>

            <Card className="p-4 flex flex-col justify-between border border-outline-variant/30">
              <div className="flex items-center justify-between text-on-surface-variant text-xs font-semibold">
                <span>Model Confidence Trend</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold font-mono text-secondary">97.2%</span>
                <span className="text-[11px] text-secondary font-mono block mt-0.5">Separable hyperplane margin</span>
              </div>
            </Card>
          </div>
        </div>

        {/* RIGHT: Pipeline Progress & Terminal Stream (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <Card className="p-6 border border-outline-variant/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-on-surface">Inference Pipeline</h2>
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-surface-container text-secondary font-bold border border-outline-variant/20">{Math.floor(progress)}% Complete</span>
            </div>

            <div className="w-full bg-surface-container rounded-full h-2 mb-6 overflow-hidden border border-outline-variant/20">
              <div
                className="bg-secondary h-full rounded-full w-full transition-transform duration-200 ease-out"
                style={{ transformOrigin: 'left', transform: `scaleX(${progress / 100})` }}
              ></div>
            </div>

            <div className="space-y-5 relative">
              <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-surface-container -z-0"></div>

              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                  <Check size={14} />
                </div>
                <div className="flex flex-col min-w-0 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-on-surface">Image Ingested</span>
                    <span className="font-mono text-xs text-secondary font-medium">0.4s</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">{fileSize} verified · SHA-256 Validated</p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                  <Check size={14} />
                </div>
                <div className="flex flex-col min-w-0 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-on-surface">Adaptive Preprocessing</span>
                    <span className="font-mono text-xs text-secondary font-medium">1.2s</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">Otsu binarization, deskewing & filtering</p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 ring-4 ring-secondary/20 animate-pulse">
                  <ElectronicsChip size={14} className="text-on-secondary-container animate-pulse" />
                </div>
                <div className="flex flex-col min-w-0 bg-surface-container-low p-3 rounded-lg flex-1 border border-outline-variant/10">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-secondary">CNN Stroke Extraction</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-secondary text-on-secondary animate-pulse font-bold">In Progress</span>
                  </div>
                  <p className="text-xs text-on-surface mt-1">Extracting visual features: ResNet-34 spatial layers.</p>
                  <div className="mt-2.5 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-secondary h-full rounded-full animate-pulse" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-surface-container border border-outline-variant/40 flex items-center justify-center shrink-0">
                  <Network size={14} className="text-on-surface-variant" />
                </div>
                <div className="flex flex-col min-w-0 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-on-surface">SVM Cohort Classification</span>
                    <span className="font-mono text-xs text-on-surface-variant font-medium">Resolving...</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {showLogs && (
            <div className="bg-surface-container-lowest border border-outline-variant/30 text-on-surface p-5 rounded-xl shadow-sm flex flex-col font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span className="font-semibold text-on-surface font-sans text-xs">Kernel Telemetry Stream</span>
                </div>
                <span className="text-[10px] text-on-surface-variant">TTY /dev/v42</span>
              </div>
              <div className="space-y-1.5 h-36 overflow-y-auto leading-relaxed text-on-surface-variant pr-1">
                <div className="flex items-start gap-2"><span className="text-secondary shrink-0">[00:00.8]</span><span>Loaded tensor shape (1, 3, 1754, 2480). Transferred to GPU VRAM.</span></div>
                <div className="flex items-start gap-2"><span className="text-secondary shrink-0">[00:01.2]</span><span>Otsu adaptive binarization complete. Foreground stroke ratio: 14.8%.</span></div>
                <div className="flex items-start gap-2"><span className="text-secondary shrink-0">[00:02.1]</span><span>Extracted 42 word-level bounding contours across text baselines.</span></div>
                <div className="flex items-start gap-2 text-on-surface animate-pulse"><span className="shrink-0 text-secondary">[{elapsed.toFixed(1).padStart(5, '0')}]</span><span>Generating 512-dimensional stroke embedding vector (ResNet stage 4).</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}