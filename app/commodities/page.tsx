import React from 'react';
import Link from 'next/link';
import { COMMODITIES } from '@/lib/energy-data';
import { Flame, ExternalLink, ArrowLeft } from 'lucide-react';

export default function CommoditiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <Flame className="w-4 h-4 text-amber-600" />
          <span>Primary Energy Commodity Registry</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
          Global Energy Benchmarks & Physical Flows
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Real-time and delayed exchange telemetry across crude grades, pipeline natural gas, and LNG delivered cargoes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COMMODITIES.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-[#E4E9F0] rounded-xl p-5 hover:border-gray-400 hover:shadow-sm transition flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold">
                  {c.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200 font-semibold">
                  {c.lagChip}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mt-3">
                {c.name}
              </h3>

              <div className="mt-2 p-3 bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg">
                <div className="text-[10px] uppercase font-bold text-gray-400">Current Price Benchmark</div>
                <div className="text-2xl font-mono font-black text-gray-900 mt-0.5">
                  {c.currency === 'EUR' ? '€' : '$'}{c.price.toFixed(2)}{' '}
                  <span className="text-xs text-gray-500 font-normal">/ {c.unit}</span>
                </div>
                <div className="text-xs font-mono font-semibold mt-1">
                  <span className={c.change24hPercent >= 0 ? 'text-emerald-700' : 'text-red-700'}>
                    {c.change24hPercent >= 0 ? '+' : ''}{c.change24hPercent.toFixed(2)}% (24h)
                  </span>
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-600 leading-relaxed">
                {c.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E4E9F0] flex justify-between items-center text-xs">
              <span className="text-gray-400 font-medium">{c.sourceAgency}</span>
              <a
                href={c.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <span>Exchange</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
