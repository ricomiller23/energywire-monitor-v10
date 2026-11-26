import React from 'react';
import Link from 'next/link';
import { AGENCY_VINTAGES } from '@/lib/energy-data';
import { Database, ArrowUpRight, ExternalLink, Calendar } from 'lucide-react';

export default function VintagesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <Database className="w-4 h-4 text-purple-600" />
          <span>Point-in-Time Statistical Releases</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
          Agency Forecast Vintages (Immutable Ledger)
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Monthly reports from IEA, OPEC, and EIA are anchored permanently by publication date; revisions append new rows without in-place mutation.
        </p>
      </div>

      <div className="overflow-x-auto border border-[#E4E9F0] rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F6F8FB] border-b border-[#E4E9F0] text-gray-600 font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Agency & Title</th>
              <th className="py-3 px-3">Vintage Date</th>
              <th className="py-3 px-3">Forecast Year</th>
              <th className="py-3 px-3">Demand Growth (mb/d)</th>
              <th className="py-3 px-3">Brent Forecast ($/bbl)</th>
              <th className="py-3 px-4">Storage Assumption</th>
              <th className="py-3 px-3 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E9F0]">
            {AGENCY_VINTAGES.map((v) => (
              <tr key={v.id} className="hover:bg-gray-50/80 transition">
                <td className="py-4 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    v.agency === 'IEA'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : v.agency === 'OPEC'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {v.agency}
                  </span>
                  <div className="font-bold text-gray-900 text-sm mt-1">{v.reportTitle}</div>
                </td>
                <td className="py-4 px-3 font-mono text-gray-600">{v.vintageDate}</td>
                <td className="py-4 px-3 font-mono font-bold text-gray-900">{v.forecastYear}</td>
                <td className="py-4 px-3 font-mono font-bold">
                  <span className={v.demandGrowthMbpd >= 0 ? 'text-emerald-700' : 'text-red-700'}>
                    {v.demandGrowthMbpd >= 0 ? '+' : ''}{v.demandGrowthMbpd.toFixed(1)} mb/d
                  </span>
                </td>
                <td className="py-4 px-3 font-mono font-bold text-gray-900">
                  {v.crudePriceBrentForecast ? `$${v.crudePriceBrentForecast.toFixed(2)}` : 'N/A'}
                </td>
                <td className="py-4 px-4 text-gray-600 max-w-xs truncate">{v.storageAssumption}</td>
                <td className="py-4 px-3 text-right">
                  <Link
                    href={`/vintages/${v.id}`}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium transition"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
