import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { getHistory } from '../utils/api';
import { Search, NavArrowRight, NavArrowDown, Filter, Download, Database, Activity, GraphUp, Flash, Check } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const easeOut = [0.23, 1, 0.32, 1];

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [exported, setExported] = useState(false);

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

  const filtered = history.filter(h => {
    const matchesSearch =
      h.id.toLowerCase().includes(search.toLowerCase()) ||
      h.subject.toLowerCase().includes(search.toLowerCase()) ||
      h.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || h.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["ID,Date,Subject,Category,Confidence,Status"].join(",") + "\n" +
      history.map(e => `${e.id},"${e.date}","${e.subject}",${e.category},${e.confidence}%,${e.status}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `screening_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12 pt-4 font-body text-on-surface">
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">Neuromotor Screening Telemetry</span>
            <span className="inline-block w-1 h-1 rounded-full bg-outline-variant"></span>
            <span className="font-mono text-xs text-on-surface-variant">Archival Database</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface">Analysis History</h1>
          <p className="text-base text-on-surface-variant mt-0.5">Review previous handwriting screening analyses, feature attributions, and neural classification records.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={exported ? Check : Download} onClick={handleExport}>
            {exported ? "CSV Exported" : "Export CSV Archive"}
          </Button>
        </div>
      </div>

      {/* Summary Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={shouldReduceMotion ? {} : { transform: "translateY(-2px)" }}
          transition={{ duration: 0.18, ease: easeOut }}
          className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/30 hover:shadow-md transition-shadow cursor-default"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wide font-semibold">Total Screenings</span>
            <Database className="text-secondary" size={20} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-on-surface">284</span>
            <span className="font-mono text-xs text-secondary font-semibold">+18 this week</span>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-secondary h-full rounded-full w-full"></div>
          </div>
        </motion.div>

        <motion.div
          whileHover={shouldReduceMotion ? {} : { transform: "translateY(-2px)" }}
          transition={{ duration: 0.18, ease: easeOut }}
          className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/30 hover:shadow-md transition-shadow cursor-default"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wide font-semibold">Avg Model Confidence</span>
            <Activity className="text-secondary" size={20} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-on-surface">95.4%</span>
            <span className="font-mono text-xs text-secondary font-semibold">99.1% High Conf</span>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full w-full"
              style={{ transformOrigin: 'left', transform: 'scaleX(0.954)' }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          whileHover={shouldReduceMotion ? {} : { transform: "translateY(-2px)" }}
          transition={{ duration: 0.18, ease: easeOut }}
          className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/30 hover:shadow-md transition-shadow cursor-default"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wide font-semibold">Reversal Rate</span>
            <GraphUp className="text-error" size={20} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-on-surface">14.8%</span>
            <span className="font-mono text-xs text-error font-semibold">42 Detected</span>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-error h-full rounded-full w-full"
              style={{ transformOrigin: 'left', transform: 'scaleX(0.148)' }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          whileHover={shouldReduceMotion ? {} : { transform: "translateY(-2px)" }}
          transition={{ duration: 0.18, ease: easeOut }}
          className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/30 hover:shadow-md transition-shadow cursor-default"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant uppercase tracking-wide font-semibold">Mean Turnaround</span>
            <Flash className="text-secondary" size={20} />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-on-surface">1.2s</span>
            <span className="font-mono text-xs text-secondary font-semibold">Edge CNN+SVM</span>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full w-full"
              style={{ transformOrigin: 'left', transform: 'scaleX(0.75)' }}
            ></div>
          </div>
        </motion.div>
      </div>

      {/* Filter & Toolbar Area */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col gap-4 border border-outline-variant/30">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-2.5 text-on-surface-variant" size={18} />
            <input
              className="w-full h-10 pl-9 pr-4 rounded-lg bg-surface text-sm text-on-surface placeholder:text-outline border border-outline-variant/30 focus:border-secondary focus:outline-none transition-colors"
              placeholder="Search by specimen ID, subject alias, or category..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              type="text"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="appearance-none h-10 pl-3.5 pr-9 rounded-lg bg-surface text-sm text-on-surface font-semibold border border-outline-variant/30 focus:border-secondary focus:outline-none cursor-pointer hover:bg-surface-container-low transition-colors shadow-sm"
              >
                <option value="All">All Categories</option>
                <option value="Reversal">Reversal Pattern</option>
                <option value="Normal">Normal</option>
                <option value="Corrected">Corrected</option>
              </select>
              <NavArrowDown size={16} className="absolute right-2.5 top-3 text-on-surface-variant pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Quick Filter Badges / Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-outline-variant/15">
          <span className="text-xs text-on-surface-variant font-semibold mr-1">Filter presets:</span>
          <button
            onClick={() => setCategoryFilter('All')}
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer ${
              categoryFilter === 'All'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            All Records
          </button>
          <button
            onClick={() => setCategoryFilter('Reversal')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              categoryFilter === 'Reversal'
                ? 'bg-error text-on-error'
                : 'bg-error-container/30 text-error hover:bg-error-container/50'
            }`}
          >
            Reversals Only
          </button>
          <button
            onClick={() => setCategoryFilter('Normal')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              categoryFilter === 'Normal'
                ? 'bg-secondary text-on-secondary'
                : 'bg-secondary-container/30 text-secondary hover:bg-secondary-container/50'
            }`}
          >
            Normal Only
          </button>
          <button
            onClick={() => setCategoryFilter('Corrected')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              categoryFilter === 'Corrected'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Corrected Only
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden transition-all border border-outline-variant/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/20">
                <th className="py-3.5 px-6 font-semibold">Date & Time</th>
                <th className="py-3.5 px-6 font-semibold">Sample ID & Crop</th>
                <th className="py-3.5 px-6 font-semibold">Predicted Category</th>
                <th className="py-3.5 px-6 font-semibold">Model Confidence</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-sm">
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
                      <div className="w-14 h-11 rounded-lg bg-surface-container flex items-center justify-center p-1 relative shadow-inner overflow-hidden text-[9px] text-on-surface-variant text-center uppercase font-mono font-bold border border-outline-variant/20">
                        {row.category}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-sm font-semibold text-on-surface">{row.id}</span>
                        <span className="text-xs text-on-surface-variant">{row.subject}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <Badge variant={getStatusVariant(row.category)} showDot>{row.category}</Badge>
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <div className="flex flex-col w-36 gap-1.5">
                      <div className="flex justify-between items-baseline font-mono text-xs">
                        <span className="font-bold text-on-surface">{row.confidence}%</span>
                        <span className="text-secondary font-medium">±0.4%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden border border-outline-variant/10">
                        <div className="h-full bg-secondary rounded-full" style={{ width: `${row.confidence}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 align-middle">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 align-middle text-right">
                    <button
                      onClick={() => navigate('/result', {
                        state: {
                          prediction: {
                            id: row.id,
                            category: row.category,
                            confidence: row.confidence,
                            filename: `${row.id.toLowerCase()}_specimen.png`
                          }
                        }
                      })}
                      className="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-all border border-outline-variant/20 hover:border-outline-variant cursor-pointer"
                    >
                      View Result
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-on-surface-variant">
                    No screening records match your current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}