import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ShieldCheck, ArrowRight, Play, Lock, Network, ElectronicsChip, CheckCircle, CloudUpload, MagicWand, Cpu, GraphUp, Hammer, EditPencil, ArrowUpRight, HalfMoon, SunLight } from 'iconoir-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const easeOut = [0.23, 1, 0.32, 1];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: "translateY(12px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: { duration: 0.28, ease: easeOut }
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">
      {/* Header with Solid Opaque Background */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant/20 shadow-sm">
        <div className="h-16 max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary text-on-primary font-bold flex items-center justify-center">N</div>
              <span className="font-headline text-xl text-on-surface tracking-tight font-semibold">NeuroWrite AI</span>
            </div>
            <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold tracking-wider">
              AI Screening Platform
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#" className="font-medium text-on-surface transition-colors">Platform</a>
            <a href="#pipeline-breakdown" className="text-on-surface-variant hover:text-on-surface transition-colors">How It Works</a>
            <a href="#system-architecture" className="text-on-surface-variant hover:text-on-surface transition-colors">Technology & Research</a>
            <a href="#governance" className="text-on-surface-variant hover:text-on-surface transition-colors">Governance & Ethics</a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <SunLight size={19} className="text-amber-400" /> : <HalfMoon size={19} />}
            </button>
            <Link to="/login" className="hidden sm:inline-flex px-4 py-2 font-medium text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors rounded-lg">
              Sign In
            </Link>
            <Link to="/signup" className="inline-flex items-center justify-center px-4 py-2 font-medium text-sm bg-primary text-on-primary hover:bg-primary-container rounded-lg transition-all shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              Get Started Free
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full pt-16 flex-1 flex flex-col">
        {/* Top Decorative Ambient Glow */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-secondary-fixed/40 via-surface-variant/20 to-transparent blur-3xl pointer-events-none -z-10"></div>

          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping absolute"></span>
                <span className="w-2 h-2 rounded-full bg-secondary relative"></span>
                <span className="font-mono text-xs text-on-surface-variant tracking-wider uppercase font-semibold">Research-Grade Machine Learning Pipeline • CNN + SVM Dual Architecture</span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-semibold text-on-surface tracking-tight leading-tight text-balance">
                Understand handwriting patterns with AI
              </motion.h1>
              <motion.p variants={itemVariants} className="text-lg text-on-surface-variant max-w-3xl text-balance">
                NeuroWrite AI analyzes handwriting images using an integrated computer vision and machine learning pipeline to identify morphological markers and patterns associated with dyslexia-related research.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
                <Link to="/signup" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm bg-primary text-on-primary hover:bg-primary-container rounded-lg shadow-md transition-all active:scale-[0.98]">
                  <span>Get Started</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="#pipeline-breakdown" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm bg-surface-container-lowest text-on-surface hover:bg-surface-container rounded-lg shadow-sm transition-all border border-outline-variant/30 active:scale-[0.98]">
                  <Play size={18} className="text-secondary" />
                  <span>Learn How It Works</span>
                </a>
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 pt-2 text-on-surface-variant text-xs font-medium">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={16} className="text-secondary" /> No clinical diagnosis claimed</span>
                <span className="inline-flex items-center gap-1.5"><Lock size={16} className="text-secondary" /> HIPAA & FERPA compliant data handling</span>
                <span className="inline-flex items-center gap-1.5"><Network size={16} className="text-secondary" /> Multi-cohort validated</span>
              </motion.div>
            </motion.div>
          </section>

          {/* Hero Visual Pipeline Workbench */}
          <section className="max-w-7xl mx-auto px-6 pb-20 w-full">
            <div className="relative bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden p-6 md:p-8 border border-outline-variant/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-4 bg-surface-container-low px-4 py-3 rounded-lg border border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="text-lg font-semibold text-on-surface">Live Pipeline Inference Workspace</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-variant text-on-primary-fixed ml-2 font-medium">SPECIMEN #EXP-9920-B</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-xs text-on-surface-variant">
                  <span>DPI: <strong className="text-on-surface text-sm">300 Raw</strong></span>
                  <span>INFERENCE: <strong className="text-on-surface text-sm">18.4ms</strong></span>
                  <span className="hidden md:inline-flex items-center gap-1.5 text-secondary font-semibold">
                    <ElectronicsChip size={16} /> ResNet-34 + SVM-RBF
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch">
                {[
                  { stage: "01", status: "300 DPI Raw", title: "Handwriting Image", desc: "Optical scan capture with raw stroke slant guides." },
                  { stage: "02", status: "Tensors Active", title: "Feature Extraction", desc: "Wavelet decomposition, stroke pressure & Otsu mask." },
                  { stage: "03", status: "ResNet + SVM", title: "Dual-Stage Engine", desc: "ResNet-34 spatial layer + RBF Kernel margin check." },
                  { stage: "04", status: "Reversal Pattern", title: "Predicted Result", desc: "Categorical pattern probability & observational notation.", error: true }
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    whileHover={shouldReduceMotion ? {} : { transform: "translateY(-2px)" }}
                    transition={{ duration: 0.18, ease: easeOut }}
                    className={`flex flex-col rounded-lg p-4 shadow-sm border border-outline-variant/20 relative transition-shadow hover:shadow-md ${s.error ? 'bg-surface-container' : 'bg-surface-container-low'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">Stage {s.stage}</span>
                      <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-medium ${s.error ? 'bg-error-container text-error' : 'bg-surface-container text-on-surface'}`}>
                        {s.status}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-on-surface mb-1">{s.title}</h3>
                    <p className="text-xs text-on-surface-variant mb-3">{s.desc}</p>
                    <div className="mt-auto bg-surface-container-lowest border border-outline-variant/10 rounded-md p-3 h-44 flex flex-col justify-center items-center text-outline text-xs italic">
                      [Visual Representation {i+1}]
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-on-surface-variant text-xs font-medium border-t border-surface-container">
                <div className="flex items-center gap-2">
                  <ElectronicsChip size={16} className="text-secondary" />
                  <span>Edge Pipeline Status: <strong className="text-on-surface">Operational (1,420 specimens processed today)</strong></span>
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px]">
                  <span>Loss: 0.012</span>
                  <span>F1-Score: 0.941</span>
                  <span className="text-secondary font-semibold">Cross-Val: 94.6%</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Features Section */}
        <section className="bg-surface w-full" id="system-architecture">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
              <span className="font-mono text-xs text-secondary uppercase tracking-widest font-bold">System Architecture</span>
              <h2 className="text-4xl font-semibold text-on-surface tracking-tight">Engineered for academic & cognitive research</h2>
              <p className="text-base text-on-surface-variant">Designed to translate unstructured handwritten strokes into rigorous, interpretable quantitative biometrics.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ElectronicsChip, title: "AI-Powered Analysis", desc: "Leverages a dual-stream CNN and Support Vector Machine architecture to process subtle pen strokes, character contour symmetry, and micro-hesitations with 94.6% cross-validated accuracy." },
                { icon: Cpu, title: "Visual Processing", desc: "Real-time image pre-processing pipeline featuring synthetic shear correction, Otsu adaptive binarization, skeletonization, and Class Activation Maps (CAM)." },
                { icon: GraphUp, title: "Cohort & Session History", desc: "Longitudinal session tracking, specimen batch processing, and multi-cohort stratification tailored for academic institutions, clinical trials, and cognitive research labs." }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={shouldReduceMotion ? {} : { transform: "translateY(-3px)" }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center text-on-surface mb-6 group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                    <f.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-on-surface mb-2">{f.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-6 flex-1">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology Stepper */}
        <section className="bg-surface w-full" id="pipeline-breakdown">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-8 md:p-12 shadow-md">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <span className="font-mono text-xs text-secondary uppercase tracking-widest font-bold">Methodology</span>
                  <h2 className="text-3xl font-semibold text-on-surface mt-2 tracking-tight">Four-step quantitative pipeline</h2>
                </div>
                <p className="text-base text-on-surface-variant max-w-md">
                  From specimen ingestion to multi-stage statistical categorization, every transformation step is reproducible and transparent.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {[
                  { num: "01", icon: CloudUpload, title: "Upload", desc: "Upload scanned documents, flatbed captures, or digital stylus handwriting specimens in PNG, JPG, or TIFF at 300+ DPI.", tag: "Inputs: Stylus • Flatbed • Camera" },
                  { num: "02", icon: MagicWand, title: "Preprocess", desc: "Automated adaptive thresholding, baseline alignment drift normalization, and stroke-width equalization.", tag: "Methods: Otsu • Shear Correction" },
                  { num: "03", icon: ElectronicsChip, title: "Analyze", desc: "Convolutional spatial feature extraction combined with non-linear SVM decision boundaries to classify stroke traits.", tag: "Models: ResNet-34 + SVM-RBF" },
                  { num: "04", icon: GraphUp, title: "View Results", desc: "Receive granular confidence probabilities, morphological biometrics, and research-backed pattern explanations.", tag: "Output: Probability Vector + CAM" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-center text-secondary shadow-sm">
                        <step.icon size={22} />
                      </div>
                      <span className="font-mono text-3xl font-bold text-outline-variant/50">{step.num}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-on-surface">{step.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
                    <div className="pt-2">
                      <span className="inline-block px-2.5 py-1 rounded bg-surface-container text-on-surface-variant text-[11px] font-mono font-medium">
                        {step.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Governance & Ethics Disclosures */}
        <section className="bg-surface-container-low w-full py-16 border-t border-outline-variant/10" id="governance">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="flex items-start gap-4 max-w-3xl">
                <div className="p-3 rounded-lg bg-surface-container text-secondary shrink-0 mt-1">
                  <ShieldCheck size={28} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-on-surface">Screening vs. Diagnosis Protocol Notice</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    NeuroWrite AI is an assistive handwriting screening and statistical feature-extraction instrument designed exclusively for researchers and educational specialists. It does not provide psychological, neurological, or clinical diagnoses.
                  </p>
                </div>
              </div>
              <Link to="/signup" className="shrink-0 px-5 py-2.5 bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container rounded-lg font-medium text-sm transition-all shadow-sm">
                Request Research Access
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant font-medium">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center">N</div>
            <span className="font-semibold text-on-surface">NeuroWrite AI</span>
            <span>• Research Telemetry Platform</span>
          </div>
          <div>
            <span>© 2026 NeuroWrite Research Collective. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}