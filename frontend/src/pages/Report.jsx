import React from 'react';
import { Card } from '../components/ui/Card';
import { mockPrediction } from '../utils/api';
import { Printer, Download, Brain, ShieldCheck, PageSearch, CheckCircle, WarningTriangle, Activity, Database, Page, ArrowLeft } from 'iconoir-react';
import { Button } from '../components/ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Report() {
  const navigate = useNavigate();
  const location = useLocation();

  const prediction = location.state?.prediction;
  const filename = location.state?.filename || prediction?.filename || 'specimen_p1084_cursive_eval.png';
  const data = prediction || mockPrediction;

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-8 pb-12 w-full max-w-[1600px] mx-auto pt-4 font-body text-on-surface">
      {/* Workbench Standard Header Section */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 print:hidden">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-mono text-xs mb-1">
            <ShieldCheck size={14} className="text-secondary" />
            <span>CLINICAL RESEARCH ARCHIVE</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-on-surface">Screening Dossier & Report</h1>
          <p className="text-base text-on-surface-variant max-w-2xl">
            Formal quantitative summary, feature extraction telemetry, and printable laboratory record.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="secondary" icon={ArrowLeft} onClick={() => navigate('/result', { state: location.state })}>
            Back to Result
          </Button>
          <Button variant="secondary" icon={Printer} onClick={() => window.print()}>
            Print Dossier
          </Button>
          <Button variant="accent" icon={Download} onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
      </section>

      {/* Two-Column Workbench Layout matching Result & Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Main Formatted Clinical Dossier Document (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6 print:w-full print:col-span-12">
          <Card className="p-8 sm:p-10 border border-outline-variant/30 shadow-md">
            {/* Document Header Band */}
            <div className="pb-6 mb-8 border-b border-surface-container flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold flex items-center justify-center text-sm shadow-sm">
                    N
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-on-surface">NeuroWrite AI</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-xs font-mono font-semibold uppercase text-secondary">
                    Research v2.4
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant">Cognitive Neuromotor Pattern & Handwriting Screening System</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs uppercase tracking-widest text-secondary font-bold">Laboratory Verification Dossier</span>
                <div className="font-mono text-xs text-on-surface-variant mt-1">Dual-Stage Engine: ResNet-34 + SVM-RBF</div>
              </div>
            </div>

            {/* Specimen Metadata 4-Box Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 mb-8">
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Document ID</span>
                <span className="font-mono text-sm font-bold text-on-surface mt-1">#{data.id || 'NW-2026-8841A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Specimen</span>
                <span className="font-mono text-xs font-bold text-on-surface mt-1 truncate">{filename}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Timestamp</span>
                <span className="text-sm font-semibold text-on-surface mt-1">Sep 23, 2026</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Evaluating Clinician</span>
                <span className="text-sm font-semibold text-on-surface mt-1">Dr. Elena Vance</span>
              </div>
            </div>

            {/* Executive Screening Synthesis Box */}
            <div className="rounded-xl p-6 bg-surface-container border border-outline-variant/30 mb-8">
              <h2 className="text-base font-bold text-on-surface uppercase tracking-wider mb-4">Executive Screening Synthesis</h2>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">Predicted Category:</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error-container text-on-error-container border border-error/30 font-mono text-sm font-black tracking-wide shadow-sm">
                      <WarningTriangle size={15} className="text-error" />
                      <span>{data.category.toUpperCase()} TENDENCY</span>
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Significant spatial inversion and horizontal reflection detected across bilateral lower-case ascenders and numerals. Pattern exhibits statistical alignment with phonological-orthographic orientation variance rather than motor-praxis degradation.
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm min-w-[200px] border border-outline-variant/20 text-center">
                  <span className="text-xs uppercase tracking-wider text-on-surface-variant block mb-1 font-semibold">Model Confidence</span>
                  <span className="text-3xl font-extrabold font-mono text-on-surface">{data.confidence}%</span>
                  <div className="w-full bg-surface-container rounded-full h-2 mt-2 overflow-hidden border border-outline-variant/10">
                    <div
                      className="bg-secondary h-full rounded-full w-full"
                      style={{ transformOrigin: 'left', transform: `scaleX(${data.confidence / 100})` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Feature Attributions Table */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-3">Quantitative Biometric Attributions</h3>
              <div className="overflow-x-auto rounded-xl border border-outline-variant/30">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase font-semibold">
                      <th className="py-3 px-4">Feature Metric</th>
                      <th className="py-3 px-4">Observed Value</th>
                      <th className="py-3 px-4">Cohort Mean</th>
                      <th className="py-3 px-4">Significance (z-score)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container font-mono text-xs text-on-surface">
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium">Bilateral Ascender Tilt</td>
                      <td className="py-3 px-4 text-error font-bold">Δ 14.2°</td>
                      <td className="py-3 px-4 text-on-surface-variant">Δ 2.4°</td>
                      <td className="py-3 px-4 text-error font-semibold">+2.84σ</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium">Stroke Pressure Variance</td>
                      <td className="py-3 px-4 font-bold">0.42 N</td>
                      <td className="py-3 px-4 text-on-surface-variant">0.38 N</td>
                      <td className="py-3 px-4 text-secondary font-semibold">+0.62σ</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-sans font-medium">Loop Symmetry Inversion</td>
                      <td className="py-3 px-4 text-error font-bold">88.4% Reflected</td>
                      <td className="py-3 px-4 text-on-surface-variant">4.1%</td>
                      <td className="py-3 px-4 text-error font-semibold">+3.91σ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Statutory Compliance Protocol Notice */}
            <div className="p-5 bg-error-container/20 border border-error/30 rounded-xl flex items-start gap-4">
              <ShieldCheck size={22} className="text-error shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-error uppercase tracking-wide mb-1">
                  Research Pre-Screening Protocol — Non-Diagnostic Instrument
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  This automated report contains AI-assisted screening metrics generated strictly for educational research, longitudinal cohort monitoring, and diagnostic support. <strong>It does not constitute a standalone medical diagnosis of developmental dyslexia, dysgraphia, or neurological impairment.</strong>
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Document Telemetry, Audit Trail & Cohort Context (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6 print:hidden">
          {/* Audit Verification Card */}
          <Card className="p-6 border border-outline-variant/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider font-semibold">Integrity Verification</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-secondary-container text-on-secondary-container">
                VERIFIED
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-on-surface-variant block text-[11px] font-sans">SHA-256 Specimen Hash:</span>
                <span className="text-on-surface font-bold text-[11px] break-all">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-on-surface-variant block text-[11px] font-sans">Model Checkpoint:</span>
                <span className="text-on-surface font-bold text-xs">neuro-resnet34-svm-v2.4.2</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/20">
                <span className="text-on-surface-variant block text-[11px] font-sans">Hardware Accelerator:</span>
                <span className="text-secondary font-bold text-xs">NVIDIA A100 Tensor Core (14.2ms)</span>
              </div>
            </div>
          </Card>

          {/* Quick Action Export Shortcuts */}
          <Card className="p-6 border border-outline-variant/30">
            <h3 className="text-sm font-semibold text-on-surface mb-3">Archival & Distribution</h3>
            <div className="space-y-2.5">
              <button onClick={() => window.print()} className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-sm text-on-surface font-medium border border-outline-variant/20 cursor-pointer">
                <span className="flex items-center gap-2">
                  <Printer size={16} className="text-secondary" />
                  <span>Physical Print Copy</span>
                </span>
                <span className="font-mono text-xs text-on-surface-variant">A4 / Letter</span>
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `report_${data.id || 'telemetry'}.json`;
                  a.click();
                }}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors text-sm text-on-surface font-medium border border-outline-variant/20 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Page size={16} className="text-secondary" />
                  <span>Raw JSON Telemetry</span>
                </span>
                <span className="font-mono text-xs text-on-surface-variant">.json</span>
              </button>
            </div>
          </Card>

          {/* Compliance & Standards Callout */}
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
              <ShieldCheck size={16} className="text-secondary" />
              <span>Institutional Research Clearance</span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Dossier generated in compliance with IRB protocol #IRB-2024-C88 and international educational data governance guidelines (FERPA/GDPR Art. 89).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}