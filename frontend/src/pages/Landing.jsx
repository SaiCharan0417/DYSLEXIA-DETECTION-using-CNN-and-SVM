import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Play, Lock, Network, ElectronicsChip, CheckCircle, CloudUpload, MagicWand, Cpu, GraphUp, Hammer, EditPencil, ArrowUpRight } from 'iconoir-react';
import { cn } from '../utils/cn';

export default function Landing() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
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
            <a href="#" className="text-on-surface-variant hover:text-on-surface transition-colors">How It Works</a>
            <a href="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Technology & Research</a>
            <a href="#" className="text-on-surface-variant hover:text-on-surface transition-colors">Governance & Ethics</a>
          </nav>
          <div className="flex items-center gap-4">
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
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping absolute"></span>
                <span className="w-2 h-2 rounded-full bg-secondary relative"></span>
                <span className="font-mono text-xs text-on-surface-variant tracking-wider uppercase font-semibold">Research-Grade Machine Learning Pipeline • CNN + SVM Dual Architecture</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-semibold text-on-surface tracking-tight leading-tight text-balance">
                Understand handwriting patterns with AI
              </h1>
              <p className="text-lg text-on-surface-variant max-w-3xl text-balance">
                NeuroWrite AI analyzes handwriting images using an integrated computer vision and machine learning pipeline to identify morphological markers and patterns associated with dyslexia-related research.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
                <Link to="/signup" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm bg-primary text-on-primary hover:bg-primary-container rounded-lg shadow-md transition-all">
                  <span>Get Started</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="#pipeline-breakdown" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm bg-surface-container-lowest text-on-surface hover:bg-surface-container rounded-lg shadow-sm transition-all border border-outline-variant/30">
                  <Play size={18} className="text-secondary" />
                  <span>Learn How It Works</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 pt-2 text-on-surface-variant text-xs font-medium">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck size={16} className="text-secondary" /> No clinical diagnosis claimed</span>
                <span className="inline-flex items-center gap-1.5"><Lock size={16} className="text-secondary" /> HIPAA & FERPA compliant data handling</span>
                <span className="inline-flex items-center gap-1.5"><Network size={16} className="text-secondary" /> Multi-cohort validated</span>
              </div>
            </div>
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
                {/* Stages */}
                {[
                  { stage: "01", status: "300 DPI Raw", title: "Handwriting Image", desc: "Optical scan capture with raw stroke slant guides." },
                  { stage: "02", status: "Tensors Active", title: "Feature Extraction", desc: "Wavelet decomposition, stroke pressure & Otsu mask." },
                  { stage: "03", status: "ResNet + SVM", title: "Dual-Stage Engine", desc: "ResNet-34 spatial layer + RBF Kernel margin check." },
                  { stage: "04", status: "Reversal Pattern", title: "Predicted Result", desc: "Categorical pattern probability & observational notation.", error: true }
                ].map((s, i) => (
                  <div key={i} className={`flex flex-col rounded-lg p-4 shadow-sm border border-outline-variant/20 relative ${s.error ? 'bg-surface-container' : 'bg-surface-container-low'}`}>
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
                  </div>
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
        <section className="bg-surface w-full">
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
                <div key={i} className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col group">
                  <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center text-on-surface mb-6 group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-colors">
                    <f.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-on-surface mb-2">{f.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-6 flex-1">{f.desc}</p>
                </div>
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
                ].map((s, i) => (
                  <div key={i} className="flex flex-col space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-secondary font-mono">{s.num}</span>
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                        <s.icon size={20} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-on-surface">{s.title}</h3>
                    <p className="text-sm text-on-surface-variant flex-1">{s.desc}</p>
                    <div className="font-mono text-[10px] text-on-surface-variant bg-surface-container-low px-2 py-1 rounded w-fit mt-2">
                      {s.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ethical Callout */}
        <section className="max-w-7xl mx-auto px-6 py-12 w-full">
          <div className="bg-surface-container-high border border-outline-variant/20 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface shadow-sm">
                <Hammer size={16} className="text-secondary" />
                <span className="text-xs font-bold uppercase tracking-wider">Scientific Protocol & Ethical Governance</span>
              </div>
              <h2 className="text-3xl md:text-4xl text-on-surface font-semibold tracking-tight">
                “This tool provides an AI-based screening result and is not a medical diagnosis.”
              </h2>
              <p className="text-lg text-on-surface-variant leading-relaxed">
                NeuroWrite AI categorizations represent morphological handwriting pattern screening and are intended strictly for academic, observational, and preliminary screening research. These analytical scores are not medical or psychological diagnoses of specific learning disabilities.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 pb-24 w-full">
          <div className="relative bg-primary-container text-on-primary rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="font-mono text-xs text-secondary-fixed uppercase tracking-wider font-bold">Join the Research Consortium</span>
              <h2 className="text-4xl text-on-primary font-semibold tracking-tight">
                Ready to explore AI handwriting screening for your research cohort?
              </h2>
              <p className="text-base text-on-primary-container">
                Get immediate sandbox access to the dual-stream CNN+SVM screening engine. Export reproducible data trails and join over 40+ cognitive science labs worldwide.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link to="/signup" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm bg-secondary text-on-secondary hover:bg-on-secondary-container rounded-lg shadow-md transition-all">
                  <span>Create Free Account</span>
                </Link>
                <a href="#pipeline-breakdown" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-sm bg-surface-container-low text-on-surface hover:bg-surface-container rounded-lg transition-all border border-transparent">
                  <span>Explore Live Sandbox</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low border-t border-outline-variant/20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-2 md:col-span-1">
              <span className="text-xl font-semibold text-on-surface">NeuroWrite AI</span>
              <p className="text-sm text-on-surface-variant">Precision machine learning handwriting analysis & cognitive biomarkers platform.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-on-surface mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li><a href="#" className="hover:text-on-surface transition-colors">Screening Engine</a></li>
                <li><a href="#" className="hover:text-on-surface transition-colors">Methodology</a></li>
                <li><a href="#" className="hover:text-on-surface transition-colors">Model Pipelines</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-on-surface mb-3">Compliance</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li><a href="#" className="hover:text-on-surface transition-colors">Ethical AI Framework</a></li>
                <li><a href="#" className="hover:text-on-surface transition-colors">IRB Standards</a></li>
                <li><a href="#" className="hover:text-on-surface transition-colors">Data Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-on-surface mb-3">Access</h4>
              <ul className="space-y-2 text-sm text-on-surface-variant">
                <li><Link to="/login" className="hover:text-on-surface transition-colors">Researcher Portal</Link></li>
                <li><Link to="/signup" className="hover:text-on-surface transition-colors">Request Clinical Trial Access</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-outline-variant/20 text-xs text-on-surface-variant">
            <p>© 2026 NeuroWrite AI Research Systems. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-on-surface transition-colors">Security Whitepaper</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}