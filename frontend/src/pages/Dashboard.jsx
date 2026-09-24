import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { getHistory } from '../utils/api';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getHistory().then(res => {
      if (res && res.data) setHistory(res.data.slice(0, 4));
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Screening Dashboard</h1>
          <p className="text-sm text-gray-500">Overview of recent handwriting screening activities.</p>
        </div>
        <Link
          to="/upload"
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors shadow-xs"
        >
          + New Screening
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <div className="text-xs text-gray-500 font-medium">Total Screenings</div>
          <div className="text-2xl font-bold text-gray-800 mt-1">284</div>
        </Card>
        <Card>
          <div className="text-xs text-gray-500 font-medium">Reversals Flagged</div>
          <div className="text-2xl font-bold text-rose-600 mt-1">42</div>
        </Card>
        <Card>
          <div className="text-xs text-gray-500 font-medium">Mean Model Confidence</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">95.4%</div>
        </Card>
      </div>

      <Card>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-gray-800">Recent Records</h2>
          <Link to="/history" className="text-xs text-blue-600 hover:underline font-medium">View All History →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs bg-gray-50">
                <th className="py-2.5 px-3">Record ID</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Predicted Category</th>
                <th className="py-2.5 px-3">Model Confidence</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {history.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3 font-mono text-xs font-semibold">{row.id}</td>
                  <td className="py-2.5 px-3 text-gray-600 text-xs">{row.date}</td>
                  <td className="py-2.5 px-3 font-medium">
                    <span className={
                      row.category === 'Reversal' ? 'text-rose-600 font-semibold' :
                      row.category === 'Corrected' ? 'text-blue-600' : 'text-green-600'
                    }>
                      {row.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-xs font-bold">{row.confidence}%</td>
                  <td className="py-2.5 px-3 text-right">
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
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
