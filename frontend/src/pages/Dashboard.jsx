import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Dropzone } from '../components/domain/Dropzone';
import { getHistory, mockHistory } from '../utils/api';
import { ShieldCheck, OpenBook, Folder, CloudUpload, GraphUp, Activity, ScanBarcode, Filter, ClockRotateRight, Network, ElectronicsChip, NavArrowRight, Play } from 'iconoir-react';
import { ProtocolModal } from '../components/domain/ProtocolModal';
import { BatchImportModal } from '../components/domain/BatchImportModal';

export default function Dashboard() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const easeOut = [0.23, 1, 0.32, 1];

  const [history, setHistory] = useState(mockHistory);
  const [isProtocolOpen, setIsProtocolOpen] = useState(false);
  const [isBatchOpen, setIsBatchOpen] = useState(false);

  useEffect(() => {
    getHistory().then(res => {
      if (res && res.data) {
        setHistory(res.data);
      }
    });
  }, []);

  const getStatusVariant = (category) => {
    switch (category) {
      case 'Normal': return 'normal';
      case 'Corrected': return 'corrected';
      case 'Reversal': return 'reversal';
      default: return 'neutral';
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 pb-12">
      {/* Top Greeting & Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-headline text-3xl text-on-surface">Good morning, Dr. Vance</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-xs font-semibold">Cohort Alpha Active</span>
          </div>
          <p className="font-body text-base text-on-surface-variant mt-1">
            Upload a handwriting sample to begin dual-stage screening or inspect current cohort telemetry.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={() => setIsProtocolOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-low shadow-sm transition-all font-medium text-sm border border-outline-variant/20 cursor-pointer"
          >
            <OpenBook size={18} className="text-secondary" />
            <span>Quick Guide / Protocol</span>
          </button>
          <button
            onClick={() => setIsBatchOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-all font-medium text-sm border border-outline-variant/20 cursor-pointer"
          >
            <Folder size={18} />
            <span>Batch Import (.ZIP)</span>
          </button>
        </div>
      </div>

      {/* Primary Hero Section: Upload & Inference Launch Canvas */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm p-6 lg:p-8">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-24 w-72 h-72 rounded-full bg-surface-container-high/40 blur-2xl pointer-events-none"></div>

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="max-w-xl flex flex-col">
            <div className="inline-flex items-center gap-1.5 text-secondary font-medium text-xs uppercase tracking-wider mb-1">
              <ShieldCheck size={16} />
              <span>Dual-Stage Diagnostic Feature Extraction</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-semibold text-on-surface tracking-tight">Start a handwriting analysis</h2>
            <p className="text-base text-on-surface-variant mt-1 leading-relaxed">
              Drag and drop a scanned document, dysgraphia test sheet, or digital stylus specimen. Runs real-time Otsu binarization, deep CNN spatial tensor mapping, and SVM boundary classification.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start lg:self-auto px-4 py-2 rounded-lg bg-surface-container-low">
            <ShieldCheck className="text-secondary" size={20} />
            <div className="flex flex-col">
              <span className="font-mono text-sm text-on-surface font-semibold">CNN-ResNet18 + RBF-SVM</span>
              <span className="font-medium text-xs text-on-surface-variant">Model Checkpoint v2.4.2 • Latency ∼140ms</span>
            </div>
          </div>
        </div>

        {/* Drag & Drop Interactive Zone */}
        <Dropzone className="w-full" onClick={() => navigate('/upload')} />

        {/* Quick Demo Scenarios Row */}
        <div className="mt-4 pt-3 border-t border-outline-variant/15 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-on-surface-variant font-medium">Quick Demonstration Scenarios:</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate('/result', {
                state: {
                  prediction: {
                    id: 'DEMO-REV',
                    category: 'Reversal',
                    confidence: 97.2,
                    filename: 'reversal_pattern_specimen.png'
                  }
                }
              })}
              className="px-3 py-1.5 rounded-lg bg-error-container/30 hover:bg-error-container/50 text-error font-mono font-semibold transition-all border border-error/20 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Play size={12} />
              <span>Simulate Reversal (97.2%)</span>
            </button>
            <button
              onClick={() => navigate('/result', {
                state: {
                  prediction: {
                    id: 'DEMO-NORM',
                    category: 'Normal',
                    confidence: 98.4,
                    filename: 'normal_control_specimen.png'
                  }
                }
              })}
              className="px-3 py-1.5 rounded-lg bg-secondary-container/30 hover:bg-secondary-container/50 text-secondary font-mono font-semibold transition-all border border-secondary/20 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Play size={12} />
              <span>Simulate Normal (98.4%)</span>
            </button>
            <button
              onClick={() => navigate('/result', {
                state: {
                  prediction: {
                    id: 'DEMO-CORR',
                    category: 'Corrected',
                    confidence: 91.5,
                    filename: 'corrected_hesitation_specimen.png'
                  }
                }
              })}
              className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-mono font-semibold transition-all border border-outline-variant/30 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Play size={12} />
              <span>Simulate Corrected (91.5%)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Three Compact Statistics Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total Analyses */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { transform: "translateY(-2px)" }}
          transition={{ duration: 0.18, ease: easeOut }}
          className="rounded-xl bg-surface-container-lowest p-4 shadow-sm flex flex-col justify-between border border-outline-variant/20 hover:shadow-md transition-shadow cursor-default"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-on-surface-variant font-medium">Total Analyses</span>
              <span className="text-3xl font-semibold text-on-surface mt-1">1,248</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface">
              <Folder size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-1">
            <span className="inline-flex items-center gap-1 font-mono text-sm font-semibold text-secondary">
              <GraphUp size={16} />
              +12.4% this month
            </span>
            <span className="text-xs font-medium text-on-surface-variant">Across 4 cohorts</span>
          </div>
        </motion.div>

        {/* Card 2: Recent Analyses */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { transform: "translateY(-2px)" }}
          transition={{ duration: 0.18, ease: easeOut }}
          className="rounded-xl bg-surface-container-lowest p-4 shadow-sm flex flex-col justify-between border border-outline-variant/20 hover:shadow-md transition-shadow cursor-default"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-on-surface-variant font-medium">Recent Analyses</span>
              <span className="text-3xl font-semibold text-on-surface mt-1">38</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface">
              <Activity size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-on-surface-variant">Last 7 rolling days</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-mono text-xs font-medium">
              5 pending review
            </span>
          </div>
        </motion.div>

        {/* Card 3: Model Confidence */}
        <motion.div
          whileHover={shouldReduceMotion ? {} : { transform: "translateY(-2px)" }}
          transition={{ duration: 0.18, ease: easeOut }}
          className="rounded-xl bg-surface-container-lowest p-4 shadow-sm flex flex-col justify-between border border-outline-variant/20 hover:shadow-md transition-shadow cursor-default"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-on-surface-variant font-medium">Average Model Confidence</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-semibold text-on-surface">93.4%</span>
                <span className="font-mono text-sm text-secondary font-medium">±1.8% sd</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
              <ShieldCheck size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-1">
            <span className="inline-flex items-center gap-1 font-medium text-xs text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              High Reliability Band
            </span>
            <span className="font-mono text-xs text-on-surface-variant">τ ≥ 0.85 margin</span>
          </div>
        </motion.div>
      </div>

      {/* Educational Flow Card: Dual-Stage Machine Learning Pipeline */}
      <div className="rounded-xl bg-surface-container-lowest p-6 lg:p-8 shadow-sm flex flex-col border border-outline-variant/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-on-surface">How NeuroWrite AI works</h3>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-mono text-xs font-medium border border-outline-variant/20">
                Dual-Stage Machine Learning Pipeline
              </span>
            </div>
            <p className="text-sm text-on-surface-variant mt-0.5">
              End-to-end telemetry transformation from raw digitizer stroke matrices to separable hyperspace classification.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 font-mono text-xs text-secondary">
            <Filter size={16} />
            <span>Hyperplane Margin: Optimal C=1.4</span>
          </div>
        </div>

        {/* 4-Step Diagram Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {[
            { num: "01", icon: CloudUpload, title: "Upload & Ingest", desc: "Raw document scan (PNG/JPG). Automatic edge detection & boundary isolation." },
            { num: "02", icon: Filter, title: "Preprocess", desc: "Adaptive Otsu thresholding, horizontal slant correction, and morphological cleanup." },
            { num: "03", icon: ElectronicsChip, title: "CNN Feature Extraction", desc: "Extracts multi-scale convolutional spatial tensors, loops, and micro-variations." },
            { num: "04", icon: Network, title: "SVM Classification", desc: "Non-linear RBF decision boundary separates feature projections into topologies." }
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={shouldReduceMotion ? {} : { transform: "translateY(-2px)" }}
              transition={{ duration: 0.18, ease: easeOut }}
              className="flex flex-col p-4 rounded-lg bg-surface-container-low border border-outline-variant/20 hover:border-outline-variant/40 hover:shadow-xs transition-colors relative cursor-default"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-semibold border border-outline-variant/20">{step.num}</span>
                <step.icon className="text-secondary" size={20} />
              </div>
              <span className="font-semibold text-sm text-on-surface">{step.title}</span>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
            <ShieldCheck size={16} className="text-secondary" />
            <span>Strictly for clinical research & exploratory screening. Not a medical diagnostic device.</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant">
            <span>Kernel: RBF</span><span>•</span><span>Gamma: Scale</span><span>•</span><span>Fold Validation: 10-k</span>
          </div>
        </div>
      </div>

      {/* Recent Analyses Section */}
      <div className="flex flex-col rounded-xl bg-surface-container-lowest shadow-sm p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-on-surface">Recent Analyses</h3>
            <span className="text-sm text-on-surface-variant">Review recent handwriting screening outputs and inference records.</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => navigate('/history')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-secondary text-sm font-semibold transition-colors cursor-pointer border border-outline-variant/20"
            >
              <span>View All Records</span>
              <NavArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="text-on-surface-variant text-xs border-b border-surface-container-low">
                <th className="pb-2 font-semibold">Date & Time</th>
                <th className="pb-2 font-semibold">Specimen ID / Subject</th>
                <th className="pb-2 font-semibold">Predicted Category</th>
                <th className="pb-2 font-semibold">Model Confidence</th>
                <th className="pb-2 font-semibold">Status</th>
                <th className="pb-2 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low text-sm">
              {history.map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="py-3 font-medium text-on-surface">{row.date}</td>
                  <td className="py-3">
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-semibold text-on-surface">{row.id}</span>
                      <span className="text-xs text-on-surface-variant">{row.subject}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant={getStatusVariant(row.category)} showDot>{row.category} Pattern</Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex flex-col gap-1 w-28">
                      <span className="font-mono text-xs font-semibold text-on-surface">{row.confidence}%</span>
                      <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full w-full"
                          style={{ transformOrigin: 'left', transform: `scaleX(${row.confidence / 100})` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-semibold">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => navigate('/result', {
                        state: {
                          prediction: {
                            id: row.id,
                            category: row.category,
                            confidence: row.confidence,
                            filename: `${row.id.toLowerCase()}_specimen.png`
                          }
                        }
                      })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors text-xs font-semibold border border-outline-variant/20 hover:border-outline-variant cursor-pointer"
                    >
                      <span>View Result</span>
                      <NavArrowRight size={14} className="text-secondary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-medium text-on-surface-variant">
            <span>Showing 5 of 1,248 total specimen records</span>
            <div className="inline-flex items-center gap-1">
              <button className="px-3 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface disabled:opacity-50">Previous</button>
              <span className="px-2 font-mono text-xs text-on-surface font-semibold">Page 1 of 250</span>
              <button className="px-3 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Protocol Modal */}
      <ProtocolModal
        isOpen={isProtocolOpen}
        onClose={() => setIsProtocolOpen(false)}
      />

      {/* Batch Archive Ingestion Modal */}
      <BatchImportModal
        isOpen={isBatchOpen}
        onClose={() => setIsBatchOpen(false)}
      />
    </div>
  );
}