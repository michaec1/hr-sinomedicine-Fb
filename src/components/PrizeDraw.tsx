import React, { useState } from 'react';
import { Gift, RefreshCw, Trash2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

interface PrizeDrawProps {
  names: string[];
}

export function PrizeDraw({ names }: PrizeDrawProps) {
  const [allowRepeat, setAllowRepeat] = useState(false);
  const [winners, setWinners] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const availableNames = allowRepeat
    ? names
    : names.filter((name) => !winners.includes(name));

  const drawWinner = () => {
    if (availableNames.length === 0) {
      return;
    }

    setIsDrawing(true);
    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      const randomName = availableNames[Math.floor(Math.random() * availableNames.length)];
      setCurrentName(randomName);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        const finalWinner = availableNames[Math.floor(Math.random() * availableNames.length)];
        setCurrentName(finalWinner);
        setWinners((prev) => [finalWinner, ...prev]);
        setIsDrawing(false);
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#ec4899']
        });
      }
    }, 100);
  };

  const clearWinners = () => {
    setWinners([]);
    setCurrentName(null);
    setShowClearConfirm(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <Gift className="w-6 h-6 text-purple-500" />
                獎品抽籤
              </h2>
              <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={allowRepeat}
                  onChange={(e) => setAllowRepeat(e.target.checked)}
                  className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                />
                允許重複中獎
              </label>
            </div>

            <div className="min-h-[200px] flex flex-col items-center justify-center mb-8 bg-slate-50 rounded-2xl border border-slate-100 p-8">
              <AnimatePresence mode="wait">
                {currentName ? (
                  <motion.div
                    key={currentName}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className={`text-4xl md:text-5xl font-bold ${isDrawing ? 'text-slate-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'}`}
                  >
                    {currentName}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-400 text-xl font-medium"
                  >
                    準備抽籤！
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={drawWinner}
              disabled={isDrawing || availableNames.length === 0}
              className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isDrawing ? '抽取中...' : '抽出得獎者'}
            </button>
            
            {!allowRepeat && (
              <p className="mt-4 text-sm text-slate-500">
                剩餘 {availableNames.length} 位參與者
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
              <Trophy className="w-5 h-5 text-yellow-500" />
              得獎紀錄
            </h3>
            <button
              onClick={() => setShowClearConfirm(true)}
              disabled={winners.length === 0}
              className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
              title="清空紀錄"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            <AnimatePresence>
              {winners.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-slate-400 text-sm py-8"
                >
                  尚無得獎者
                </motion.div>
              ) : (
                winners.map((winner, index) => (
                  <motion.div
                    key={`${winner}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm shrink-0">
                      #{winners.length - index}
                    </div>
                    <div className="font-medium text-slate-700 truncate">
                      {winner}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {showClearConfirm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-2">確認清空紀錄</h3>
            <p className="text-slate-600 mb-6 text-sm">確定要清空所有的得獎紀錄嗎？此動作無法復原。</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowClearConfirm(false)} 
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors text-sm"
              >
                取消
              </button>
              <button 
                onClick={clearWinners} 
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors text-sm"
              >
                確定清空
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
