import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { predict } from '../utils/api';

export default function Processing() {
  const [step, setStep] = useState('Preprocessing image & stroke isolation...');
  const [progress, setProgress] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();

  const file = location.state?.file;
  const filename = location.state?.filename || 'sample_specimen.png';
  const previewUrl = location.state?.previewUrl;

  useEffect(() => {
    let active = true;

    const t1 = setTimeout(() => {
      if (active) {
        setStep('Extracting CNN spatial representations (ResNet backbone)...');
        setProgress(55);
      }
    }, 800);

    const t2 = setTimeout(() => {
      if (active) {
        setStep('Executing SVM decision hyperplane classification...');
        setProgress(85);
      }
    }, 1600);

    predict(file).then((res) => {
      if (!active) return;
      setProgress(100);
      setStep('Inference complete! Preparing report...');
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
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [navigate, file, previewUrl, filename]);

  return (
    <div className="max-w-md mx-auto my-12 space-y-4">
      <Card className="text-center py-8 px-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Processing Specimen</h2>

        {previewUrl && (
          <div className="border border-gray-200 rounded p-2 max-w-[200px] mx-auto bg-gray-50">
            <img src={previewUrl} alt="Processing specimen" className="max-h-32 mx-auto rounded object-contain" />
          </div>
        )}

        <div className="text-xs text-gray-500 font-mono">
          File: <span className="font-semibold text-gray-800">{filename}</span>
        </div>

        <p className="text-sm text-blue-600 font-medium">{step}</p>

        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 block font-mono">{progress}% complete</span>
      </Card>
    </div>
  );
}
