import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockPrediction } from '../utils/api';
import { ShieldCheck, Download, Flask, ScanBarcode, NavArrowRight, Activity, Cpu, BrainElectricity, GitCompare, ViewGrid } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';

export default function Result() {
  const data = mockPrediction;
  const navigate = useNavigate();
  const [isBinarized, setIsBinarized] = useState(false);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="flex flex-col gap-8 pb-12 w-full max-w-[1600px] mx-auto pt-4">
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
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-lowest shadow-sm border border-outline-variant/20">
            <span className="font-mono text-xs text-on-surface font-semibold">ID: #NW-84920</span>
            <span className="text-outline-variant">•</span>
            <span className="text-xs text-on-surface-variant">Today, 10:42 AM</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary-container/40 text-on-secondary-container font-medium text-sm border border-secondary/10">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>Completed • High Confidence</span>
          </div>
          <button onClick={() => navigate('/report')} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-medium text-sm hover:bg-surface-container transition-all shadow-sm">
            <Download size={16} />
            <span>Download PDF Report</span>
          </button>
        </div>
      </section>

      {/* Two-Column Primary Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Computer Vision Specimen Canvas (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 mb-4 bg-surface-container-low px-4 py-2.5 rounded-lg border border-outline-variant/10">
              <div className="flex items-center gap-3">
                <ScanBarcode size={24} className="text-secondary" />
                <div>
                  <h2 className="text-lg font-semibold text-on-surface">Processed Handwriting Sample</h2>
                  <p className="text-xs text-on-surface-variant">Optical bounding, contour segmentation, and vector orientation heatmaps</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs bg-surface-container-lowest border border-outline-variant/20 text-on-surface px-2.5 py-1 rounded-md shadow-sm">
                  300 DPI • Otsu Filtered
                </span>
                {/* Zoom Controls */}
                <div className="flex items-center bg-surface-container border border-outline-variant/20 rounded-lg p-0.5 shadow-sm">
                  <button onClick={() => setZoom(z => Math.min(z + 0.1, 2))} className="p-1.5 rounded hover:bg-surface-container-lowest text-on-surface transition-colors"><span className="text-lg leading-none">+</span></button>
                  <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))} className="p-1.5 rounded hover:bg-surface-container-lowest text-on-surface transition-colors"><span className="text-lg leading-none">-</span></button>
                  <button onClick={() => setIsBinarized(!isBinarized)} className={`p-1.5 rounded hover:bg-surface-container-lowest text-secondary font-medium transition-colors ${isBinarized ? 'bg-surface-container-lowest shadow-sm' : ''}`}><ViewGrid size={16}/></button>
                </div>
              </div>
            </div>

            {/* Specimen Display Workspace */}
            <div className="relative w-full h-[360px] rounded-lg overflow-hidden bg-surface-container-low select-none flex items-center justify-center p-6 border border-outline-variant/20">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #cbdbf5 1px, transparent 1px), linear-gradient(to bottom, #cbdbf5 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

              <div className="relative z-10 w-full max-w-2xl h-full flex flex-col justify-center items-center transition-transform duration-300" style={{ transform: `scale(${zoom})` }}>
                <div className={`relative w-full p-8 bg-surface-container-lowest/90 backdrop-blur rounded-lg shadow-sm flex flex-col gap-6 ${isBinarized ? 'contrast-150 grayscale' : ''}`}>
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                    <span className="font-mono text-[10px] text-outline">SPECIMEN VIEWPORT // TENSOR LAYER: L3</span>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] text-secondary font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Ascender Reversal Detected
                      </span>
                      <span className="font-mono text-[10px] text-on-tertiary-container bg-surface-container px-2 py-0.5 rounded font-bold">Δ 14.2° Tilt</span>
                    </div>
                  </div>

                  {/* SVG Vector with Analytical Heat Overlays */}
                  <div className="relative w-full h-32 flex items-center justify-center">
                    <svg className="w-full h-full select-none" viewBox="0 0 760 180" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="strokeGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                          <stop offset="0%" stopColor="#0b1c30"></stop>
                          <stop offset="42%" stopColor="#006a61"></stop>
                          <stop offset="78%" stopColor="#ba1a1a"></stop>
                          <stop offset="100%" stopColor="#0b1c30"></stop>
                        </linearGradient>
                      </defs>
                      <line stroke="#dce9ff" strokeDasharray="4 4" strokeWidth="1.5" x1="40" x2="720" y1="50" y2="50"></line>
                      <line stroke="#cbdbf5" strokeWidth="1.5" x1="40" x2="720" y1="125" y2="125"></line>
                      <line stroke="#dce9ff" strokeDasharray="4 4" strokeWidth="1.5" x1="40" x2="720" y1="165" y2="165"></line>

                      <path d="M 60,45 L 60,125 Q 60,135 72,130 M 50,75 L 75,75 M 85,45 L 85,125 Q 85,100 102,100 Q 118,100 118,125 M 132,110 C 132,95 152,95 152,110 L 128,110 C 128,125 152,128 155,120" fill="none" stroke="#0b1c30" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5"></path>

                      <path d="M 210,42 L 210,125 C 210,125 215,96 238,96 C 260,96 260,125 238,125 C 215,125 210,125 210,125" fill="none" stroke="url(#strokeGradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5"></path>

                      <rect fill="rgba(0, 106, 97, 0.04)" height="102" rx="4" stroke="#006a61" strokeDasharray="3 3" strokeWidth="1.5" width="75" x="195" y="32"></rect>
                      <text className="font-mono" fill="#006a61" fontSize="10" fontWeight="600" x="198" y="24">ROI-1: MIRRORED LOOP [b↔d]</text>

                      <path d="M 300,110 C 300,95 280,95 280,110 C 280,125 300,125 300,110 M 310,100 C 310,95 330,95 330,110 L 330,145 C 330,165 305,165 305,150" fill="none" stroke="#0b1c30" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5"></path>
                      <path d="M 400,98 L 400,165 M 400,105 C 400,95 425,95 425,112 C 425,125 400,125 400,125 M 438,45 L 438,125 M 455,115 C 455,100 475,100 475,115 L 475,125 M 488,102 L 498,125 L 508,102 M 498,125 L 488,155" fill="none" stroke="#0b1c30" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4.5"></path>

                      <rect fill="rgba(186, 26, 26, 0.04)" height="85" rx="4" stroke="#ba1a1a" strokeDasharray="3 3" strokeWidth="1.5" width="48" x="388" y="85"></rect>
                      <text className="font-mono" fill="#ba1a1a" fontSize="10" fontWeight="600" x="390" y="78">ROI-2: LATERAL SHIFT</text>
                    </svg>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-surface-container font-mono text-xs text-on-surface-variant">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-secondary"></span> Primary Anomaly</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-error"></span> Angular Inversion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Technical Details Footer Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-surface-container-low mt-4 border border-outline-variant/10">
              <div>
                <span className="block text-outline text-xs">Native Resolution</span>
                <span className="font-mono text-xs font-semibold text-on-surface">1840 × 1120 px</span>
              </div>
              <div>
                <span className="block text-outline text-xs">Color Matrix</span>
                <span className="font-mono text-xs font-semibold text-on-surface">Grayscale (1-Channel)</span>
              </div>
              <div>
                <span className="block text-outline text-xs">Adaptive Filtering</span>
                <span className="font-mono text-xs font-semibold text-on-surface">Otsu Thresholding</span>
              </div>
              <div>
                <span className="block text-outline text-xs">Deskew Angle</span>
                <span className="font-mono text-xs font-semibold text-on-surface">-1.84° Corrected</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-on-surface">Structural Stroke Metrics</h3>
              <Badge variant="ml">Spatial Descriptors</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-outline-variant/10">
                <span className="text-xs text-outline font-medium uppercase">Ascender/Descender Ratio</span>
                <span className="text-3xl font-semibold tracking-tight">{data.metrics.ascenderRatio}</span>
                <span className="text-xs text-on-surface-variant mt-1 text-error font-medium">Target Mean: 1.35 (Elevated)</span>
              </div>
              <div className="p-4 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-outline-variant/10">
                <span className="text-xs text-outline font-medium uppercase">Stroke Width Var</span>
                <span className="text-3xl font-semibold tracking-tight">{data.metrics.strokeWidthVariation}</span>
                <span className="text-xs text-on-surface-variant mt-1 font-medium">Normal pressure</span>
              </div>
              <div className="p-4 rounded-lg bg-surface-container-low flex flex-col gap-1 border border-outline-variant/10">
                <span className="text-xs text-outline font-medium uppercase">Mirror Symmetry Index</span>
                <span className="text-3xl font-semibold tracking-tight text-error">{data.metrics.mirrorSymmetryIndex}</span>
                <span className="text-xs text-error mt-1 font-medium">Strong directional reflection</span>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Primary Classification & Confidence Engine (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="p-6 border border-outline-variant/20 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container mb-6">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-outline font-semibold mb-1">SVM Hyperplane Decision</span>
                <span className="text-xl font-semibold text-on-surface">Classification Outcome</span>
              </div>
              <BrainElectricity size={28} className="text-secondary" />
            </div>

            {/* Highlight Banner: Predicted Category */}
            <div className="p-5 rounded-xl bg-surface-container-high flex flex-col gap-3 relative overflow-hidden mb-6 border border-outline-variant/10">
              <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-secondary-container/50 blur-xl pointer-events-none"></div>
              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-bold tracking-widest text-outline uppercase">PREDICTED CATEGORY</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-lowest font-mono text-[10px] text-secondary font-bold shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> SVM Kernel Agreement
                </span>
              </div>
              <div className="flex items-baseline gap-3 relative z-10 mt-1">
                <span className="text-4xl font-bold tracking-tight text-primary-container uppercase">{data.category}</span>
                <span className="text-sm font-medium text-secondary">Pattern #RV-04</span>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed relative z-10 mt-2">
                This handwriting sample was classified in the <strong>{data.category}</strong> category based on high-frequency bilateral mirror characteristics learned from normative datasets.
              </p>
            </div>

            {/* Precision Radial / Dual Confidence Visualization */}
            <div className="p-5 rounded-xl bg-surface-container-low flex flex-col gap-4 border border-outline-variant/10">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-on-surface">Model Confidence</span>
                <span className="font-mono text-xs text-secondary font-bold bg-secondary-container/40 px-2 py-0.5 rounded shadow-sm border border-secondary/10">
                  {data.confidence}% Precision
                </span>
              </div>

              <div className="flex items-center gap-5 pt-2">
                <div className="relative w-20 h-20 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#dce9ff" strokeWidth="8"></circle>
                    <circle cx="50" cy="50" fill="transparent" r="40" stroke="#006a61" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * data.confidence / 100)} strokeLinecap="round" strokeWidth="8" className="transition-all duration-1000"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-on-surface">{data.confidence}%</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-on-surface">Confidence Score</span>
                    <span className="font-mono text-on-surface">0.{data.confidence.toString().replace('.','')} / 1.0</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden shadow-inner">
                    <div className="bg-secondary h-full rounded-full transition-all duration-1000" style={{ width: `${data.confidence}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-outline font-mono">
                    <span>Threshold: 85.0%</span>
                    <span className="text-secondary font-bold">+{data.confidence - 85}% Margin</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Category Probabilities */}
            <div className="pt-5 mt-5 border-t border-surface-container flex flex-col gap-3">
              <span className="text-xs uppercase tracking-wider text-outline font-semibold">Multi-Class Probability Vector</span>
              {data.probabilities.map((prob, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className={i === 0 ? "text-on-surface font-semibold" : "text-on-surface-variant"}>{prob.label}</span>
                    <span className={`font-mono text-xs font-bold ${i === 0 ? 'text-secondary' : 'text-on-surface-variant'}`}>{prob.value}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className={`h-full rounded-full ${i === 0 ? 'bg-secondary' : 'bg-surface-tint opacity-40'}`} style={{ width: `${prob.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Educational Clinical Context Accordion */}
          <Card className="p-6 bg-error-container/10 border-error/20">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-secondary shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wide mb-1">Research Screening Disclaimer</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  This report represents an algorithmic computer-vision screening metric and is <strong>not a clinical or neuropsychological diagnosis</strong>. Intended exclusively to assist certified specialists in longitudinal evaluations.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}