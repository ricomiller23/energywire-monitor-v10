import React from 'react';
import Link from 'next/link';
import { Zap, Flame, Database, BookOpen, Layers } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-[#FFFFFF] border-b border-[#E4E9F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black tracking-wider shadow-sm group-hover:bg-amber-600 transition">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-gray-900">ENERGYWIRE</span>
                <span className="ml-1 text-xs font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Global Telemetry
                </span>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Oil, Gas, LNG & Grid</p>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-6 text-sm font-medium">
              <Link href="/" className="text-gray-700 hover:text-amber-600 transition flex items-center space-x-1">
                <Layers className="w-4 h-4" />
                <span>Situation Board</span>
              </Link>
              <Link href="/commodities" className="text-gray-700 hover:text-amber-600 transition flex items-center space-x-1">
                <Flame className="w-4 h-4" />
                <span>Commodities</span>
              </Link>
              <Link href="/vintages" className="text-gray-700 hover:text-amber-600 transition flex items-center space-x-1">
                <Database className="w-4 h-4" />
                <span>Agency Vintages</span>
              </Link>
              <Link href="/methodology" className="text-gray-700 hover:text-amber-600 transition flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>Disagreement Standard</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 font-medium">
              <span>Primary Agency Verified</span>
            </div>
            <a
              href="/api/energy"
              target="_blank"
              className="px-3 py-1.5 rounded bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 font-mono"
            >
              /api/energy
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
