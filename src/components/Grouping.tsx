import React, { useState } from 'react';
import { Users, Shuffle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GroupingProps {
  names: string[];
}

export function Grouping({ names }: GroupingProps) {
  const [groupMode, setGroupMode] = useState<'perGroup' | 'totalGroups'>('perGroup');
  const [groupCount, setGroupCount] = useState<number>(4);
  const [groups, setGroups] = useState<string[][]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateGroups = () => {
    if (names.length === 0) {
      return;
    }

    setIsGenerating(true);
    
    // Ensure count is at least 1
    const count = Math.max(1, groupCount);
    
    // Small delay for visual feedback
    setTimeout(() => {
      // Fisher-Yates shuffle
      const shuffled = [...names];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const newGroups: string[][] = [];
      
      if (groupMode === 'perGroup') {
        for (let i = 0; i < shuffled.length; i += count) {
          newGroups.push(shuffled.slice(i, i + count));
        }
      } else {
        const numGroups = Math.min(count, shuffled.length);
        for (let i = 0; i < numGroups; i++) {
          newGroups.push([]);
        }
        shuffled.forEach((person, index) => {
          newGroups[index % numGroups].push(person);
        });
      }

      setGroups(newGroups);
      setIsGenerating(false);
    }, 400);
  };

  const downloadGroups = () => {
    if (groups.length === 0) return;

    let csvContent = "組別,成員\n";
    groups.forEach((group, index) => {
      group.forEach(member => {
        // Escape quotes in member names just in case
        const safeMember = member.replace(/"/g, '""');
        csvContent += `第 ${index + 1} 組,"${safeMember}"\n`;
      });
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "groups.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">隨機分組</h2>
              <p className="text-sm text-slate-500">將參與者隨機分成小組</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setGroupMode('perGroup')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  groupMode === 'perGroup' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                依每組人數
              </button>
              <button
                onClick={() => setGroupMode('totalGroups')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  groupMode === 'totalGroups' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                依總組數
              </button>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
              <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
                {groupMode === 'perGroup' ? '每組人數：' : '分組數量：'}
              </label>
              <input
                type="number"
                min="1"
                max={groupMode === 'perGroup' ? Math.max(1, names.length) : Math.max(1, names.length)}
                value={groupCount}
                onChange={(e) => setGroupCount(parseInt(e.target.value) || 1)}
                className="w-16 bg-white border border-slate-300 rounded-lg px-2 py-1 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button
              onClick={generateGroups}
              disabled={isGenerating || names.length === 0}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              <Shuffle className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              開始分組
            </button>
            {groups.length > 0 && (
              <button
                onClick={downloadGroups}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-medium transition-colors"
                title="下載 CSV"
              >
                <Download className="w-4 h-4" />
                下載 CSV
              </button>
            )}
          </div>
        </div>
      </div>

      {groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {groups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="bg-slate-50 border-b border-slate-100 px-5 py-3 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-700">第 {index + 1} 組</h3>
                  <span className="text-xs font-medium bg-white border border-slate-200 text-slate-500 px-2 py-1 rounded-full">
                    {group.length} 人
                  </span>
                </div>
                <ul className="p-2">
                  {group.map((member, mIndex) => (
                    <li
                      key={mIndex}
                      className="px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-medium shrink-0">
                        {mIndex + 1}
                      </div>
                      <span className="truncate">{member}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
