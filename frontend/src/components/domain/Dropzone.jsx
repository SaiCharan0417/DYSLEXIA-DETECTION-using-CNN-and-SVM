import React, { useCallback } from 'react';
import { CloudUpload, MediaImagePlus } from 'iconoir-react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';

export function Dropzone({ onFileSelect, className }) {
  return (
    <div
      className={cn(
        "relative group rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-all duration-200 p-8 flex flex-col items-center justify-center text-center cursor-pointer border-2 border-dashed border-outline-variant/40",
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-surface-container-lowest shadow-md flex items-center justify-center text-secondary group-hover:scale-105 transition-transform duration-200 mb-4">
        <CloudUpload size={32} />
      </div>
      <div className="flex flex-col items-center max-w-md">
        <span className="text-xl font-semibold">Drop a handwriting image here</span>
        <span className="text-sm text-on-surface-variant mt-1">
          Supports high-res PNG, JPG, or JPEG up to 25MB (Minimum recommended 300 DPI for stroke gradient fidelity)
        </span>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Button variant="primary" icon={MediaImagePlus}>Choose Image</Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-outline">or inspect verified research samples:</span>
          <button className="px-2.5 py-1.5 rounded-md bg-surface-container-lowest text-on-surface hover:text-secondary shadow-sm font-mono text-xs transition-colors">
            Pediatric Specimen #4401
          </button>
          <button className="px-2.5 py-1.5 rounded-md bg-surface-container-lowest text-on-surface hover:text-secondary shadow-sm font-mono text-xs transition-colors">
            Adult Control #108
          </button>
        </div>
      </div>
    </div>
  );
}