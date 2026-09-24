import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { getHistory } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getHistory().then(res => {
      if (res && res.data) setHistory(res.data);
    });
  }, []);

  const filtered = history.filter(row =>
    row.id.toLowerCase().includes(search.toLowerCase()) ||
    row.category.toLowerCase().includes(search.toLowerCase()) ||
    (row.subject && row.subject.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Screening History</h1>
          <p className="text-sm text-gray-500">Record of past automated handwriting evaluations.</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-blue-500 bg-white"
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs bg-gray-50">
                <th className="py-2.5 px-3">Record ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Specimen</th>
                <th className="py-2.5 px-3">Predicted Category</th>
                <th className="py-2.5 px-3">Model Confidence</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="py-3 px-3 font-mono text-xs font-semibold text-gray-700">{row.id}</td>
                  <td className="py-3 px-3 text-gray-500 text-xs">{row.date}</td>
                  <td className="py-3 px-3 font-mono text-xs text-gray-600">{row.file || row.subject || `${row.id.toLowerCase()}.png`}</td>
                  <td className="py-3 px-3 font-medium">
                    <span className={
                      row.category === 'Reversal' ? 'text-rose-600 font-semibold' :
                      row.category === 'Corrected' ? 'text-blue-600' : 'text-green-600'
                    }>
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-xs font-bold">{row.confidence}%</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => navigate('/result', {
                        state: {
                          prediction: {
                            id: row.id,
                            category: row.category,
                            confidence: typeof row.confidence === 'string' ? parseFloat(row.confidence) : row.confidence,
                            filename: row.file || `${row.id.toLowerCase()}.png`
                          }
                        }
                      })}
                      className="text-xs text-blue-600 hover:underline font-medium cursor-pointer"
                    >
                      View Result →
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400 text-sm">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
