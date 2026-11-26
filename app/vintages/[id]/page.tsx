import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AGENCY_VINTAGES } from '@/lib/energy-data';
import { ArrowLeft, ExternalLink, Database, Calendar, ShieldCheck } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return AGENCY_VINTAGES.map(v => ({ id: v.id }));
}

export default function VintageDetailPage({ params }: PageProps) {
  const vintage = AGENCY_VINTAGES.find(v => v.id === params.id);

  if (!vintage) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/vintages"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Vintages</span>
        </Link>
      </div>

      <div className="bg-white border border-[#E4E9F0] rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700">
              Agency: {vintage.agency}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-xs text-gray-500 font-mono">Vintage Date: {vintage.vintageDate}</span>
          </div>

          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            Immutable Release
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          {vintage.reportTitle}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E4E9F0]">
          <div className="p-4 bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg">
            <div className="text-[10px] font-bold uppercase text-gray-400">Demand Growth Forecast</div>
            <div className="text-xl font-mono font-black mt-1">
              <span className={vintage.demandGrowthMbpd >= 0 ? 'text-emerald-700' : 'text-red-700'}>
                {vintage.demandGrowthMbpd >= 0 ? '+' : ''}{vintage.demandGrowthMbpd.toFixed(1)} mb/d
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg">
            <div className="text-[10px] font-bold uppercase text-gray-400">Brent Benchmark Forecast</div>
            <div className="text-xl font-mono font-black text-gray-900 mt-1">
              {vintage.crudePriceBrentForecast ? `$${vintage.crudePriceBrentForecast.toFixed(2)}/bbl` : 'N/A'}
            </div>
          </div>

          <div className="p-4 bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg">
            <div className="text-[10px] font-bold uppercase text-gray-400">Target Forecast Horizon</div>
            <div className="text-xl font-mono font-black text-gray-900 mt-1">
              Year {vintage.forecastYear}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Global Storage & Inventory Balance Hypothesis
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed bg-[#F6F8FB] p-4 rounded-lg border border-[#E4E9F0]">
            {vintage.storageAssumption}
          </p>
        </div>

        <div className="pt-6 border-t border-[#E4E9F0] flex justify-between items-center text-xs">
          <span className="text-gray-400 font-mono">Published {vintage.publicationDate}</span>
          <a
            href={vintage.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded font-semibold transition"
          >
            <span>Primary Report Archive</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
