import { EnergyInfrastructureMap } from "@/components/EnergyInfrastructureMap";
import React from 'react';
import Link from 'next/link';
import { GLOBAL_ENERGY_METRICS, COMMODITIES, AGENCY_DISAGREEMENT, AGENCY_VINTAGES } from '@/lib/energy-data';
import { formatAgencySpread } from '@/lib/vintage-guard';
import { Zap, Flame, Database, ArrowUpRight, AlertTriangle, TrendingUp, ShieldCheck, Gauge } from 'lucide-react';

export default function EnergywireHomePage() {
  const spreadText = formatAgencySpread(AGENCY_DISAGREEMENT);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner Alert */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-amber-500 text-white rounded-lg mt-0.5">
            <Flame className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200/60 text-amber-900 px-2 py-0.5 rounded">
                EUROPEAN GAS PRESSURE ALERT
              </span>
              <span className="text-xs text-amber-800 font-mono">18 Sep Close: €78.95/MWh</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-amber-950 mt-1">
              Dutch TTF Surges +24.6% Month-over-Month as EU Gas Storage Reaches 67%
            </h1>
            <p className="text-xs text-amber-800 mt-0.5">
              Storage deficit remains 23 percentage points below the mandatory 90% EU November 1 winter buffer target.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-white rounded-lg border border-amber-200 text-center font-mono shadow-sm">
            <div className="text-[10px] uppercase text-gray-500">Brent Benchmark</div>
            <div className="text-lg font-black text-gray-900">${GLOBAL_ENERGY_METRICS.brentCrudeBenchmark.toFixed(2)}</div>
          </div>
          <div className="p-3 bg-white rounded-lg border border-amber-200 text-center font-mono shadow-sm">
            <div className="text-[10px] uppercase text-gray-500">EU Storage Fill</div>
            <div className="text-lg font-black text-amber-600">{GLOBAL_ENERGY_METRICS.euGasStoragePercent}%</div>
          </div>
        </div>
      </div>

      <EnergyInfrastructureMap />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#F6F8FB] border border-[#E4E9F0] rounded-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Brent Crude (ICE)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-3xl font-black text-gray-900 font-mono">
            ${GLOBAL_ENERGY_METRICS.brentCrudeBenchmark.toFixed(2)}
          </div>
          <div className="mt-1 text-xs text-gray-600">USD per barrel (Parity Anchor)</div>
        </div>

        <div className="p-5 bg-[#F6F8FB] border border-[#E4E9F0] rounded-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Dutch TTF Natural Gas</span>
            <Flame className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-3xl font-black text-amber-600 font-mono">
            €{GLOBAL_ENERGY_METRICS.ttfNaturalGasEurMwh.toFixed(2)}
          </div>
          <div className="mt-1 text-xs text-amber-800 font-semibold">
            +{GLOBAL_ENERGY_METRICS.ttfMonthlyChangePercent}% m/m surge
          </div>
        </div>

        <div className="p-5 bg-[#F6F8FB] border border-[#E4E9F0] rounded-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>EU Gas Storage Level</span>
            <Gauge className="w-4 h-4 text-purple-600" />
          </div>
          <div className="mt-2 text-3xl font-black text-gray-900 font-mono">
            {GLOBAL_ENERGY_METRICS.euGasStoragePercent}%
          </div>
          <div className="mt-1 text-xs text-red-600 font-medium">Target: {GLOBAL_ENERGY_METRICS.euStorageTargetPercent}% by Nov 1</div>
        </div>

        <div className="p-5 bg-[#F6F8FB] border border-[#E4E9F0] rounded-xl">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>IEA vs OPEC Demand Spread</span>
            <AlertTriangle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-3xl font-black text-blue-600 font-mono">
            {GLOBAL_ENERGY_METRICS.ieaOpecDemandSpreadMbpd.toFixed(1)} mb/d
          </div>
          <div className="mt-1 text-xs text-gray-600">Empirical agency spread</div>
        </div>
      </div>

      {/* Agency Disagreement Invariant Box */}
      <div className="bg-white border border-[#E4E9F0] rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-[#E4E9F0]">
          <div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-gray-900">
                Agency Disagreement Invariant (§11): 2026 World Oil Demand Growth
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Strict Non-Averaging Policy: Official agency forecasts are preserved side by side as an empirical range.
            </p>
          </div>

          <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded font-mono font-bold text-xs border border-amber-200">
            {spreadText}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-900">International Energy Agency (IEA)</span>
              <span className="text-[10px] font-mono text-gray-500">OMR August 2026</span>
            </div>
            <div className="text-2xl font-mono font-black text-red-600">
              {AGENCY_DISAGREEMENT.ieaValue.toFixed(1)} mb/d
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Deceleration premise: Post-COVID rebound exhausted, EV adoption accelerating, Chinese petrochemical feedstock peaking.
            </p>
          </div>

          <div className="p-4 bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-900">OPEC Secretariat</span>
              <span className="text-[10px] font-mono text-gray-500">MOMR August 2026</span>
            </div>
            <div className="text-2xl font-mono font-black text-emerald-600">
              +{AGENCY_DISAGREEMENT.opecValue.toFixed(1)} mb/d
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Expansion premise: Strong non-OECD aviation, Indian urbanization, and resilient global transport mobility.
            </p>
          </div>
        </div>
      </div>

      {/* Commodities Table with Lag Chips */}
      <div className="bg-white border border-[#E4E9F0] rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-gray-900">Global Energy Commodities Telemetry</h2>
            <p className="text-xs text-gray-500">Mandatory lag chips and primary agency sources</p>
          </div>
          <Link
            href="/commodities"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>View All Commodities</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F6F8FB] border-b border-[#E4E9F0] text-gray-600 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Commodity</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price & Unit</th>
                <th className="py-3 px-3">24h Change</th>
                <th className="py-3 px-4">Freshness & Lag Tag</th>
                <th className="py-3 px-4 text-right">Primary Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9F0]">
              {COMMODITIES.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-gray-900">{c.name}</td>
                  <td className="py-3.5 px-3">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {c.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-gray-900">
                    {c.currency === 'EUR' ? '€' : '$'}{c.price.toFixed(2)} / {c.unit}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-semibold">
                    <span className={c.change24hPercent >= 0 ? 'text-emerald-700' : 'text-red-700'}>
                      {c.change24hPercent >= 0 ? '+' : ''}{c.change24hPercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200 text-[10px] font-mono font-semibold">
                      {c.lagChip}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-gray-600 font-medium">
                    {c.sourceAgency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
