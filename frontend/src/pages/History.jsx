import React, { useEffect, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { getHistory } from '../utils/api';
import { Search, NavArrowRight, Filter, Download, Database, Activity, GraphUp, Flash } from 'iconoir-react';
import { Input } from '../components/ui/Input';

export default function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [stateView, setStateView] = useState('active'); // active, empty, noresults, loading

  useEffect(() => {
    getHistory().then(res => setHistory(res.data));
  }, []);

  const getStatusVariant = (category) => {
    switch (category) {
      case 'Normal': return 'normal';
      case 'Corrected': return 'corrected';
      case 'Reversal': return 'reversal';
      default: return 'neutral';
    }
  };

  const filtered = history.filter(h =>
    h.id.toLowerCase().includes(search.toLowerCase()) ||
    h.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 pt-4">
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">Neuromotor Screening Telemetry</span>
            <span className="inline-block w-1 h-1 rounded-full bg-outline"></span>
            <span className="font-mono text-xs text-on-surface-variant">Archival Database</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Analysis History</h1>
          <p className="text-base text-on-surface-variant mt-0.5">Review previous handwriting screening analyses, feature attributions, and neural classification records.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={Download}>Export CSV / PDF</Button>
        </div>
      </div>

      {/* Summary Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wide font-medium">Total Screenings</span>
            <Database className="text-secondary" size={20} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-on-surface">284</span>
            <span className="font-mono text-xs text-secondary font-medium">+18 this week</span>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-secondary h-full rounded-full w-full"></div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wide font-medium">Avg Model Confidence</span>
            <Activity className="text-tertiary-container" size={20} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-on-surface">95.4%</span>
            <span className="font-mono text-xs text-secondary-container font-medium">99.1% High Conf</span>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{width: '95.4%'}}></div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wide font-medium">Reversal Rate</span>
            <GraphUp className="text-error" size={20} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-on-surface">14.8%</span>
            <span className="font-mono text-xs text-on-surface-variant">42 Samples Detected</span>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-error h-full rounded-full" style={{width: '14.8%'}}></div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wide font-medium">Mean Turnaround</span>
            <Flash className="text-outline" size={20} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-on-surface">1.2s</span>
            <span className="font-mono text-xs text-secondary font-medium">Edge CNN+SVM</span>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-secondary-container h-full rounded-full w-3/4"></div>
          </div>
        </div>
      </div>

      {/* Filter & Toolbar Area */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col gap-4 border border-outline-variant/20">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-2.5 text-outline" size={18} />
            <input
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-surface text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-low transition-colors shadow-inner"
              placeholder="Search by sample ID, patient alias, or notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <select className="appearance-none h-10 pl-3 pr-8 rounded-lg bg-surface text-sm text-on-surface focus:outline-none cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
              <option>All Categories</option>
              <option>Reversal</option>
              <option>Normal</option>
            </select>
            <select className="appearance-none h-10 pl-3 pr-8 rounded-lg bg-surface text-sm text-on-surface focus:outline-none cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
              <option>Last 30 Days</option>
            </select>
            <select className="appearance-none h-10 pl-3 pr-8 rounded-lg bg-surface text-sm text-on-surface focus:outline-none cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm">
              <option>All Confidence Levels</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Badges / Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-on-surface-variant mr-1">Filter presets:</span>
          <button className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-semibold shadow-sm">All (284)</button>
          <button className="px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-medium hover:opacity-90 transition-opacity">Reversals (42)</button>
          <button className="px-3 py-1 rounded-full bg-surface-container-high text-on-surface text-xs font-medium hover:bg-surface-container-highest transition-colors">Normal (198)</button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden transition-all border border-outline-variant/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6 font-semibold">Date & Time</th>
                <th className="py-3.5 px-6 font-semibold">Sample ID & Crop</th>
                <th className="py-3.5 px-6 font-semibold">Predicted Category</th>
                <th className="py-3.5 px-6 font-semibold">Model Confidence</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low text-sm">
              {filtered.map((row, i) => (
                <tr key={i} className="hover:bg-surface-container-low/60 transition-colors group">
                  <td className="py-4 px-6 align-middle">
                    <div className="flex flex-col">
                      <span className="font-medium text-on-surface">{row.date.split(',')[0]}</span>
                      <span className="font-mono text-xs text-on-surface-variant">{row.date.split(',')[1]}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-11 rounded-lg bg-surface-container-high flex items-center justify-center p-1 relative shadow-inner overflow-hidden text-[8px] text-outline text-center uppercase font-bold">
                        {row.category}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-semibold text-on-surface">{row.id}</span>
                        <span className="text-xs text-on-surface-variant">Alias: {row.subject}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <Badge variant={getStatusVariant(row.category)} showDot>{row.category}</Badge>
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <div className="flex flex-col w-36 gap-1.5">
                      <div className="flex justify-between items-baseline font-mono text-xs">
                        <span className="font-semibold text-on-surface">{row.confidence}%</span>
                        <span className="text-secondary font-medium">±0.4%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{width: `${row.confidence}%`}}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <Badge variant="neutral" showDot={false}>{row.status}</Badge>
                  </td>
                  <td className="py-4 px-6 align-middle text-right">
                    <Button variant="secondary" size="sm">View Result</Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Search className="text-outline mb-2" size={32} />
                      <h3 className="text-lg font-bold text-on-surface">No matching analyses found</h3>
                      <p className="text-sm text-on-surface-variant max-w-md mt-1">We couldn't find any screening records matching your active filter criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-outline-variant/10">
          <span className="text-sm text-on-surface-variant">
            Showing <span className="font-semibold text-on-surface">1–{filtered.length}</span> of <span className="font-semibold text-on-surface">{history.length}</span> analyses
          </span>
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface-variant font-medium text-sm shadow-sm transition-colors border border-outline-variant/10">Previous</button>
            <button className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container font-mono text-xs font-semibold">1</button>
            <button className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-medium text-sm shadow-sm hover:bg-surface-container transition-colors border border-outline-variant/10">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}