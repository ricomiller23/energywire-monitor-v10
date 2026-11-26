import React from 'react';
import Link from 'next/link';
import { BookOpen, AlertTriangle, ShieldCheck, Database, Clock } from 'lucide-react';

export default function EnergywireMethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-gray-800">
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Statutory Data Integrity & Lag Standards</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight mt-1">
          ENERGYWIRE Methodology & Forecast Preservation
        </h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          How ENERGYWIRE guarantees reproducible econometric telemetry without synthesizing fictional consensus prices.
        </p>
      </div>

      {/* Disagreement Standard */}
      <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
        <div className="flex items-center space-x-2 text-amber-950 font-bold text-base">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>The Agency Disagreement Invariant (§11)</span>
        </div>
        <p className="text-xs text-amber-900 leading-relaxed">
          The International Energy Agency (IEA) and the Organization of the Petroleum Exporting Countries (OPEC) frequently present radically divergent outlooks for world oil consumption. In August 2026, IEA projected a −1.6 mb/d demand deceleration while OPEC projected a +1.4 mb/d expansion — a 3.0 mb/d empirical gulf.
        </p>
        <p className="text-xs text-amber-900 leading-relaxed font-semibold">
          ENERGYWIRE never averages or interpolates between these bodies. Calculating a midpoint (+0.1 mb/d) would represent neither agency&rsquo;s economic model and constitutes an invalid econometric synthesis. Divergent forecasts are permanently preserved as empirical ranges.
        </p>
      </div>

      {/* The Immutable Vintage Standard */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
          <Database className="w-5 h-5 text-purple-600" />
          <span>The Immutable Vintage Standard</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg space-y-1">
            <h3 className="font-bold text-gray-900">1. No In-Place Overwrites</h3>
            <p className="text-gray-600 leading-relaxed">
              When an agency updates past estimates in a new monthly release, previous figures are never overwritten in-place. Each release is preserved as an immutable point-in-time vintage.
            </p>
          </div>

          <div className="p-4 bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg space-y-1">
            <h3 className="font-bold text-gray-900">2. Mandatory Lag Chips</h3>
            <p className="text-gray-600 leading-relaxed">
              Every data point is decorated with its inherent reporting latency (e.g. `Lag: Real-time ICE`, `Lag: Weekly EIA`, `Lag: Monthly OMR`).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
