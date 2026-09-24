import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockPrediction } from '../utils/api';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Report() {
  const navigate = useNavigate();
  const location = useLocation();

  const stateData = location.state?.prediction;
  const filename = location.state?.filename || stateData?.filename || 'specimen_001.png';
  const data = stateData || mockPrediction;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dossier Report</h1>
          <p className="text-sm text-gray-500">Formal printable record for screening specimen #{data.id}.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/result', { state: location.state })} className="bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300">
            Back to Result
          </Button>
          <Button onClick={() => window.print()} className="bg-blue-600 text-white hover:bg-blue-700">
            Print / PDF
          </Button>
        </div>
      </div>

      <Card className="p-8 space-y-6 border border-gray-300">
        {/* Document Header */}
        <div className="border-b border-gray-200 pb-4 flex justify-between items-start">
          <div>
            <div className="text-xl font-bold text-gray-900">NeuroWrite AI</div>
            <div className="text-xs text-gray-500">Handwriting Telemetry & Screening Record</div>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-semibold bg-gray-100 px-2 py-0.5 rounded">v2.4 Prototype</span>
            <div className="text-xs text-gray-400 mt-1 font-mono">Date: {new Date().toISOString().slice(0, 10)}</div>
          </div>
        </div>

        {/* Specimen Metadata Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-3 rounded border border-gray-200 text-xs">
          <div>
            <span className="text-gray-500 block">Record ID</span>
            <span className="font-mono font-bold">{data.id}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Specimen</span>
            <span className="font-mono font-semibold truncate block">{filename}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Status</span>
            <span className="text-green-700 font-semibold">Completed</span>
          </div>
          <div>
            <span className="text-gray-500 block">Method</span>
            <span className="font-mono font-semibold">CNN + SVM</span>
          </div>
        </div>

        {/* Prediction Synthesis */}
        <div className="p-4 bg-rose-50 border border-rose-200 rounded">
          <span className="text-xs font-bold text-rose-700 uppercase block mb-1">Predicted Category</span>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-black text-rose-700">{data.category} Tendency</span>
            <span className="text-lg font-mono font-bold text-gray-900">{data.confidence}% Confidence</span>
          </div>
        </div>

        {/* Quantitative Attribution Breakdown */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Biometric Attributions</h3>
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2 border-b">Feature</th>
                <th className="p-2 border-b">Value</th>
                <th className="p-2 border-b">Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              <tr>
                <td className="p-2">Ascender Axial Tilt</td>
                <td className="p-2 font-bold text-rose-600">Δ 14.2°</td>
                <td className="p-2 text-rose-600">+2.84σ</td>
              </tr>
              <tr>
                <td className="p-2">Stroke Variance</td>
                <td className="p-2">0.42 N</td>
                <td className="p-2 text-blue-600">+0.62σ</td>
              </tr>
              <tr>
                <td className="p-2">Loop Symmetry Inversion</td>
                <td className="p-2 font-bold text-rose-600">88.4%</td>
                <td className="p-2 text-rose-600">+3.91σ</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <div className="p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 leading-relaxed">
          <strong>Notice:</strong> This automated screening evaluation is an exploratory research instrument and does not constitute a standalone medical or psychological diagnosis of developmental dyslexia.
        </div>
      </Card>
    </div>
  );
}
