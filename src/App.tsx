/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Gift, Users, LayoutGrid } from 'lucide-react';
import { NameInput } from './components/NameInput';
import { PrizeDraw } from './components/PrizeDraw';
import { Grouping } from './components/Grouping';

export default function App() {
  const [names, setNames] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'draw' | 'group'>('draw');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Gift className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">人資工具箱</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">功能選單</h2>
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('draw')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'draw'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <Gift className="w-5 h-5" />
                  產品抽獎456
                </button>
                <button
                  onClick={() => setActiveTab('group')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'group'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                  隨機分組2ab
                </button>
              </nav>
            </div>

            <div className="sticky top-24">
              <NameInput names={names} setNames={setNames} />
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'draw' ? (
              <PrizeDraw names={names} />
            ) : (
              <Grouping names={names} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
