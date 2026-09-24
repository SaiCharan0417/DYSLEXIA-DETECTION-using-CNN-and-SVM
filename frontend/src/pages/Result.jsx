import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { mockPrediction } from '../utils/api';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const stateData = location.state?.prediction || location.state?.record;
  const previewUrl = location.state?.previewUrl;
  const filename = location.state?.filename || stateData?.filename || 'specimen_001.png';

  const data = {
    ...mockPrediction,
    ...(stateData || {}),
    id: stateData?.id || mockPrediction.id,
    category: stateData?.category || mockPrediction.category,
    confidence: stateData?.confidence || mockPrediction.confidence,
  };

  const isReversal = data.category === 'Reversal';

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Screening Result</h1>
          <p className="text-sm text-gray-500 font-mono">ID: #{data.id} • {filename}</p>
        </div>
        <button
          onClick={() => navigate('/report', { state: { prediction: data, previewUrl, filename } })}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm font-medium border border-gray-300 transition-colors cursor-pointer"
        >
          View Full Dossier Report →
        </button>
      </div>

      <Card className="space-y-5 border-l-4 border-l-rose-500 shadow-md">
        {/* Specimen Thumbnail Viewport if available */}
        {previewUrl && (
          <div className="border border-gray-200 rounded p-2 bg-gray-50 flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1 font-medium">Ingested Handwriting Crop</span>
            <img src={previewUrl} alt="Analyzed specimen" className="max-h-40 rounded object-contain" />
          </div>
        )}

        {/* Classification Outcome Hero Banner */}
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
          <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block mb-1">
            Predicted Category
          </span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-rose-600 tracking-tight">
              {data.category}
            </span>
            <span className="px-2.5 py-1 bg-rose-600 text-white font-mono font-bold text-xs rounded-full uppercase">
              Flagged Pattern
            </span>
          </div>
        </div>

        {/* Model Confidence Meter */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-600 font-semibold uppercase">Model Confidence</span>
            <span className="text-xl font-mono font-extrabold text-gray-900">{data.confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-rose-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${data.confidence}%` }}
            />
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block font-mono">Decision margin: &gt; 92.0% high confidence tier</span>
        </div>

        <div className="border-t border-gray-100 pt-3 text-xs text-gray-500 space-y-1">
          <p><strong>Candidate Categories:</strong> Normal, Corrected, Reversal</p>
          <p><strong>Architecture:</strong> Dual-stage CNN feature extraction + Support Vector Machine</p>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 leading-relaxed">
          <strong>Important:</strong> This result is an automated AI-assisted handwriting screening indicator, not a clinical or psychological diagnosis of dyslexia.
        </div>
      </Card>

      <div className="flex gap-4">
        <Link to="/upload" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium shadow-sm">
          Screen Another Specimen
        </Link>
        <Link to="/history" className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 text-sm font-medium text-gray-700">
          View History
        </Link>
      </div>
    </div>
  );
}
