import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center font-sans">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">NeuroWrite AI</h1>
      <p className="text-gray-600 max-w-md mb-6">
        AI-assisted handwriting screening tool. Validates handwriting patterns using dual-stage machine learning.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
          Login
        </Link>
        <Link to="/signup" className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 font-medium">
          Sign Up
        </Link>
      </div>
      <p className="mt-8 text-xs text-gray-400 max-w-sm">
        Notice: Research and screening assistance prototype only. Not intended for direct medical diagnosis.
      </p>
    </div>
  );
}