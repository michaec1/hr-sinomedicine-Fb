import React, { useRef, useMemo, useState } from 'react';
import { Upload, Trash2, Users, Wand2, AlertCircle, X } from 'lucide-react';
import Papa from 'papaparse';

interface NameInputProps {
  names: string[];
  setNames: (names: string[]) => void;
}

export function NameInput({ names, setNames }: NameInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState(names.join('\n'));
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [csvError, setCsvError] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const parsedNames = e.target.value
      .split(/[\n,]+/)
      .map((n) => n.trim())
      .filter(Boolean);
    setNames(parsedNames);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const parsedNames = results.data
          .flat()
          .map((n) => String(n).trim())
          .filter(Boolean);
        
        const newNames = [...names, ...parsedNames];
        setNames(newNames);
        setInputText(newNames.join('\n'));
        setCsvError(null);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        setCsvError('解析 CSV 檔案失敗。請確認檔案格式是否正確。');
      }
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearNames = () => {
    setNames([]);
    setInputText('');
    setShowClearConfirm(false);
  };

  const loadSampleData = () => {
    const sample = "王小明\n陳大喵\n林阿華\n張小龍\n李大媽\n趙鐵柱\n王小明\n孫悟空\n豬八戒\n沙悟淨\n陳大喵";
    setInputText(sample);
    setNames(sample.split('\n'));
  };

  const duplicates = useMemo(() => {
    const counts = new Map<string, number>();
    names.forEach(n => counts.set(n, (counts.get(n) || 0) + 1));
    return new Set(Array.from(counts.entries()).filter(([_, count]) => count > 1).map(([n]) => n));
  }, [names]);

  const removeDuplicates = () => {
    const uniqueNames = Array.from(new Set(names));
    setNames(uniqueNames);
    setInputText(uniqueNames.join('\n'));
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-800">
            <Users className="w-5 h-5 text-indigo-500" />
            參與者名單
          </h2>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
            {names.length} 人
          </span>
        </div>

        <div className="space-y-4 flex-1 flex flex-col">
          <div className="flex items-center gap-2">
            <button
              onClick={loadSampleData}
              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2 px-2 rounded-xl font-medium transition-colors text-xs sm:text-sm"
            >
              <Wand2 className="w-4 h-4" />
              載入範例
            </button>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-2 rounded-xl font-medium transition-colors text-xs sm:text-sm"
            >
              <Upload className="w-4 h-4" />
              上傳 CSV
            </button>
            <button
              onClick={() => setShowClearConfirm(true)}
              disabled={names.length === 0}
              className="flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 py-2 px-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
            >
              <Trash2 className="w-4 h-4" />
              清空
            </button>
          </div>

          {csvError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {csvError}
              </div>
              <button onClick={() => setCsvError(null)} className="text-red-400 hover:text-red-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex-1 flex flex-col gap-2">
            <label className="block text-sm font-medium text-slate-600">
              貼上名單 (每行一個名字或以逗號分隔)
            </label>
            <textarea
              className="w-full h-32 p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-sm"
              placeholder="王小明&#10;陳大喵&#10;林阿華..."
              value={inputText}
              onChange={handleTextChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-600">名單預覽</label>
              {duplicates.size > 0 && (
                <button 
                  onClick={removeDuplicates} 
                  className="text-xs flex items-center gap-1 bg-red-100 text-red-600 px-2.5 py-1 rounded-lg hover:bg-red-200 transition-colors font-medium"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  移除重複 ({duplicates.size} 個)
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[4rem] content-start">
              {names.length === 0 && <span className="text-sm text-slate-400 m-auto">尚無名單</span>}
              {names.map((name, i) => {
                const isDuplicate = duplicates.has(name);
                return (
                  <span 
                    key={i} 
                    className={`text-xs px-2.5 py-1.5 rounded-lg border ${
                      isDuplicate 
                        ? 'bg-red-50 border-red-200 text-red-700 font-medium' 
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                    title={isDuplicate ? '重複的姓名' : ''}
                  >
                    {name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showClearConfirm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-2">確認清空名單</h3>
            <p className="text-slate-600 mb-6 text-sm">確定要清空所有的參與者名單嗎？此動作無法復原。</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowClearConfirm(false)} 
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium transition-colors text-sm"
              >
                取消
              </button>
              <button 
                onClick={clearNames} 
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
