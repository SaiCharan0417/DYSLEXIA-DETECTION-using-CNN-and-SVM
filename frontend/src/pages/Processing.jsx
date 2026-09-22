import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { predict } from '../utils/api';
import { ShieldCheck, ArrowRight, Terminal, XmarkCircle, MediaImage, Filter, ElectronicsChip, Network, Lock, Check } from 'iconoir-react';
import { Spinner } from '../components/ui/Spinner';
import { cn } from '../utils/cn';

export default function Processing() {
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState(4.8);
  const [progress, setProgress] = useState(62);
  const [showLogs, setShowLogs] = useState(true);
  const scannerBeamRef = useRef(null);

  // Time & progress simulation
  useEffect(() => {
    let active = true;
    let timerInterval = setInterval(() => {
      setElapsed(prev => prev + 0.1);
    }, 100);

    let progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (Math.random() * 2);
        return next > 99 ? 99 : next;
      });
    }, 400);

    // Bounce scan beam
    let beamY = 15;
    let beamDir = 1;
    let animFrame;
    const animateScan = () => {
      beamY += 0.45 * beamDir;
      if (beamY > 90) beamDir = -1;
      else if (beamY < 10) beamDir = 1;
      if (scannerBeamRef.current) {
        scannerBeamRef.current.style.top = `${beamY}%`;
      }
      animFrame = requestAnimationFrame(animateScan);
    };
    animFrame = requestAnimationFrame(animateScan);

    // Call ML
    predict().then(() => {
      if (active) navigate('/result');
    });

    return () => {
      active = false;
      clearInterval(timerInterval);
      clearInterval(progressInterval);
      cancelAnimationFrame(animFrame);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col w-full pb-16 gap-6 pt-4">
      {/* Top Action & Diagnostic Status Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/20">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-outline text-xs">
            <span>Screening</span>
            <span>&gt;</span>
            <span>New Analysis</span>
            <span>&gt;</span>
            <span className="font-mono font-semibold text-secondary">Pipeline #NW-8942</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Screening in Progress: Sample #NW-8942</h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              <span>Phase 3 of 5 · Feature Extraction</span>
            </div>
          </div>
          <p className="text-sm text-on-surface-variant flex items-center gap-2">
            <span>Elapsed Time: <span className="font-mono font-semibold text-on-surface">00:{(elapsed < 10 ? '0' : '') + elapsed.toFixed(1)}s</span></span>
            <span className="text-outline">·</span>
            <span>Benchmark baseline: ~07.2s</span>
            <span className="text-outline">·</span>
            <span className="text-outline">Specimen.png (2.4 MB)</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLogs(!showLogs)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors font-medium text-sm"
          >
            <Terminal size={18} className="text-secondary" />
            <span>Stream Log</span>
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          </button>
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-error-container hover:text-on-error-container text-on-surface-variant transition-colors font-medium text-sm"
          >
            <XmarkCircle size={18} />
            <span>Abort Session</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT: CV Inspection Canvas (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-5 overflow-hidden relative border border-outline-variant/20">
            {/* Canvas Subheader */}
            <div className="flex items-center justify-between pb-4 mb-4 bg-surface-container-low px-4 py-2.5 rounded-lg border border-outline-variant/10">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="text-secondary" size={20} />
                <span className="text-sm font-semibold text-on-surface">Live Computer Vision Feature Grid</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">ResNet50 Backbone</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-on-surface-variant">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span>Spatial Bounding active</span>
                </span>
                <span className="text-outline">|</span>
                <span>Zoom 100%</span>
              </div>
            </div>

            {/* Synthetic Clinical Document Canvas */}
            <div className="relative w-full aspect-[16/10] bg-surface-container-lowest rounded-lg shadow-inner overflow-hidden flex items-center justify-center p-6 select-none border border-outline-variant/20">
              <div className="absolute inset-0 opacity-40 pointer-events-none" style={{backgroundImage: 'linear-gradient(to bottom, #dce9ff 1px, transparent 1px)', backgroundSize: '100% 36px'}}></div>

              <div className="relative z-10 w-full max-w-2xl h-full flex flex-col justify-center px-12 py-8 bg-surface-container-low/50">
                <div className="w-full h-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant font-mono text-xs opacity-50">
                   [Mock Handwriting Sample Render]
                </div>

                {/* Bounding Box 1 */}
                <div className="absolute top-[28%] left-[22%] w-48 h-20 bg-secondary/10 rounded pointer-events-none">
                  <div className="absolute -top-3 left-2 px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-mono text-[10px] flex items-center gap-1">
                    <span>Seg-01: Letter Topology (b/d)</span>
                  </div>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-secondary"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-secondary"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-secondary"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-secondary"></div>
                </div>

                {/* Bounding Box 2 */}
                <div className="absolute top-[52%] left-[44%] w-56 h-18 bg-tertiary-container/10 rounded pointer-events-none">
                  <div className="absolute -top-3 left-2 px-1.5 py-0.5 rounded bg-tertiary-container text-on-tertiary font-mono text-[10px]">
                    <span>Seg-02: Baseline Drift [-3.4°]</span>
                  </div>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-on-tertiary-container"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-on-tertiary-container"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-on-tertiary-container"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-on-tertiary-container"></div>
                </div>

                {/* Scanning Beam */}
                <div ref={scannerBeamRef} className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent pointer-events-none shadow-[0_0_16px_rgba(0,106,97,0.8)] z-20">
                  <div className="w-full h-8 -mt-4 bg-gradient-to-b from-secondary/20 to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-4 bg-surface-container-low px-4 py-2.5 rounded-lg font-mono text-xs text-on-surface-variant border border-outline-variant/10">
              <div className="flex items-center gap-4">
                <span>2480 × 1754 px</span>
                <span>·</span>
                <span>DPI: 300 Certified</span>
                <span>·</span>
                <span>Otsu Adaptive Threshold: 0.42</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-secondary font-medium">Stroke Heatmap: Live 24.3 fps</span>
              </div>
            </div>
          </div>

          {/* Extraction Real-Time Feature Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-outline text-xs">
                <span>Stroke Velocity Index</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-on-surface">142.6</span>
                <span className="font-mono text-xs text-on-surface-variant ml-1">mm/s</span>
              </div>
              <div className="mt-2 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{width: '72%'}}></div>
              </div>
            </Card>
            <Card className="p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-outline text-xs">
                <span>Pen Lift Frequency</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-on-surface">18</span>
                <span className="font-mono text-xs text-on-surface-variant ml-1">events/line</span>
              </div>
              <div className="mt-2 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-on-tertiary-container h-full rounded-full" style={{width: '58%'}}></div>
              </div>
            </Card>
            <Card className="p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-outline text-xs">
                <span>Curvature Entropy</span>
              </div>
              <div className="mt-3">
                <span className="text-2xl font-bold text-on-surface">0.841</span>
                <span className="font-mono text-xs text-secondary ml-1">σ (Optimal)</span>
              </div>
              <div className="mt-2 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{width: '84%'}}></div>
              </div>
            </Card>
          </div>
        </div>

        {/* RIGHT: Pipeline Stepper & Logs (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-on-surface">Inference Pipeline</h2>
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-semibold">{Math.floor(progress)}% Complete</span>
            </div>

            <div className="w-full bg-surface-container rounded-full h-2 mb-6 overflow-hidden">
              <div className="bg-secondary h-full rounded-full transition-all duration-500 ease-out" style={{width: `${progress}%`}}></div>
            </div>

            <div className="space-y-5 relative">
              <div className="absolute left-3.5 top-3 bottom-3 w-0.5 bg-surface-container -z-0"></div>

              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                  <Check size={14} />
                </div>
                <div className="flex flex-col min-w-0 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-on-surface">Image Uploaded</span>
                    <span className="font-mono text-xs text-secondary font-medium">0.4s</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">2.4 MB verified · SHA-256 Validated</p>
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
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-secondary text-on-secondary animate-pulse">In Progress</span>
                  </div>
                  <p className="text-xs text-on-surface mt-1">Extracting visual features: ResNet-50 stroke geometry.</p>
                  <div className="mt-2.5 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-secondary h-full rounded-full animate-pulse" style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 relative z-10 opacity-70">
                <div className="w-7 h-7 rounded-full bg-surface-container border border-outline flex items-center justify-center shrink-0"></div>
                <div className="flex flex-col min-w-0 w-full">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-on-surface">SVM Cohort Classification</span>
                    <span className="font-mono text-xs text-outline">Queued</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {showLogs && (
            <div className="bg-primary-container text-on-primary-container p-5 rounded-xl shadow-sm flex flex-col font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-2 bg-surface-container-highest/10 px-3 py-1.5 rounded">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                  <span className="font-semibold text-inverse-on-surface font-sans text-xs">Kernel Telemetry Stream</span>
                </div>
                <span className="text-[10px] text-outline">TTY /dev/v42</span>
              </div>
              <div className="space-y-1.5 h-36 overflow-y-auto leading-relaxed text-inverse-on-surface/90 pr-1">
                <div className="flex items-start gap-2"><span className="text-secondary-fixed shrink-0">[00:00.8]</span><span>Loaded tensor shape (1, 3, 1754, 2480). Transferred to GPU VRAM.</span></div>
                <div className="flex items-start gap-2"><span className="text-secondary-fixed shrink-0">[00:01.2]</span><span>Otsu adaptive binarization complete. Foreground stroke ratio: 14.8%.</span></div>
                <div className="flex items-start gap-2"><span className="text-secondary-fixed shrink-0">[00:02.1]</span><span>Extracted 42 word-level bounding contours across 4 text baselines.</span></div>
                <div className="flex items-start gap-2 text-surface-container-highest animate-pulse"><span className="shrink-0">[{elapsed.toFixed(1).padStart(5, '0')}]</span><span>Generating 512-dimensional stroke embedding vector (ResNet stage 4).</span></div>
              </div>
            </div>
          )}

          <div className="bg-surface-container-low p-4 rounded-xl flex items-start gap-3 border border-outline-variant/10">
            <Lock className="text-secondary shrink-0 mt-0.5" size={20} />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-on-surface">PHI & In-Memory Security</span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Protected Health Information Safe: Image is analyzed ephemerally in RAM and encrypted via AES-256. Not stored for model retraining without express consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}