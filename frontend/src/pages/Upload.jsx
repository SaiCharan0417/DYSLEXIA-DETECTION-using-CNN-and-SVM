import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      setPreview(URL.createObjectURL(dropped));
    }
  };

  const handleQuickSample = () => {
    const blob = new Blob(["mock-specimen-bytes"], { type: "image/png" });
    const sampleFile = new File([blob], "sample_specimen_001.png", { type: "image/png" });
    setFile(sampleFile);
    setPreview(null);
  };

  const handleStartProcessing = () => {
    if (!file) return;
    const fileSize = (file.size / 1024).toFixed(1) + ' KB';
    navigate('/processing', {
      state: {
        file,
        filename: file.name,
        fileSize,
        previewUrl: preview
      }
    });
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Upload Handwriting Specimen</h1>
        <p className="text-sm text-gray-500">Select or drop an image containing handwriting samples for screening.</p>
      </div>

      <Card className="space-y-4">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded p-6 text-center hover:border-blue-500 bg-gray-50 cursor-pointer transition-colors"
        >
          <div className="text-sm text-gray-600 font-medium">Click to browse or drag and drop image here</div>
          <div className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG up to 25MB</div>
        </div>

        {preview && (
          <div className="space-y-2">
            <span className="text-xs text-gray-500 font-medium">Selected Image Preview</span>
            <div className="border border-gray-200 rounded p-2 bg-gray-50 flex items-center justify-center">
              <img src={preview} alt="Selected handwriting" className="max-h-48 rounded object-contain" />
            </div>
            <p className="text-xs text-gray-600 text-center font-mono">{file?.name} ({(file?.size / 1024).toFixed(1)} KB)</p>
          </div>
        )}

        {file && !preview && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
            Selected: <span className="font-mono font-semibold">{file.name}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>Need a test file?</span>
          <button
            type="button"
            onClick={handleQuickSample}
            className="text-blue-600 hover:underline font-medium cursor-pointer"
          >
            Load Sample Specimen
          </button>
        </div>

        <Button
          onClick={handleStartProcessing}
          disabled={!file}
          className="w-full"
        >
          Run Screening Analysis
        </Button>
      </Card>
    </div>
  );
}
