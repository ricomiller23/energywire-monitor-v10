'use client';

import { WorldVectorLandmass } from './WorldVectorLandmass';

import React, { useState } from 'react';
import { Flame, Zap, Database, ArrowUpRight, AlertTriangle, ExternalLink, Info, Activity } from 'lucide-react';

export interface EnergyNode {
  id: string;
  name: string;
  category: 'Strategic Chokepoint' | 'Gas Trading Hub' | 'Crude Benchmark Terminal' | 'Major Pipeline';
  country: string;
  lat: number;
  lng: number;
  flowCapacity: string;
  currentFlowStatus: string;
  priceBenchmark: string;
  agencyCitation: string;
  lastTelemetryDate: string;
  sourceUrl: string;
}

export const ENERGY_NODES: EnergyNode[] = [
  {
    id: 'hormuz',
    name: 'Strait of Hormuz',
    category: 'Strategic Chokepoint',
    country: 'Oman / Iran',
    lat: 26.5667,
    lng: 56.2500,
    flowCapacity: '21.0 Million bpd (Petroleum)',
    currentFlowStatus: 'Nominal Commercial Transit · War Risk Escort Monitored',
    priceBenchmark: 'Brent Crude $74.50 / bbl',
    agencyCitation: 'US Energy Information Administration (EIA) Chokepoint Report',
    lastTelemetryDate: '2026-09-19',
    sourceUrl: 'https://www.eia.gov'
  },
  {
    id: 'bab-el-mandeb',
    name: 'Bab el-Mandeb / Red Sea Corridor',
    category: 'Strategic Chokepoint',
    country: 'Yemen / Djibouti',
    lat: 12.5850,
    lng: 43.3330,
    flowCapacity: '8.8 Million bpd (Petroleum & LNG)',
    currentFlowStatus: '62% Tanker Tonnage Diverted via Cape of Good Hope',
    priceBenchmark: 'War Risk Surcharge +$1,800/FEU',
    agencyCitation: 'Joint War Committee / Lloyd’s List Intelligence',
    lastTelemetryDate: '2026-09-18',
    sourceUrl: 'https://www.eia.gov'
  },
  {
    id: 'dutch-ttf',
    name: 'Title Transfer Facility (TTF) Gas Hub',
    category: 'Gas Trading Hub',
    country: 'Netherlands / EU',
    lat: 51.9244,
    lng: 4.4777,
    flowCapacity: 'European Continental Gas Benchmark',
    currentFlowStatus: 'EU Storage at 67% (Mandatory Target: 90% by Nov 1)',
    priceBenchmark: 'Dutch TTF €78.95 / MWh (+24.6% MoM)',
    agencyCitation: 'Gas Infrastructure Europe (AGSI) / ICE Endex',
    lastTelemetryDate: '2026-09-18 Close',
    sourceUrl: 'https://www.theice.com'
  },
  {
    id: 'cushing-wti',
    name: 'Cushing NYMEX Delivery Hub',
    category: 'Crude Benchmark Terminal',
    country: 'United States',
    lat: 35.9814,
    lng: -96.7678,
    flowCapacity: 'Storage Capacity 78M bbl',
    currentFlowStatus: 'Commercial Crude Stocks at 22.8M bbl (Operational Floor)',
    priceBenchmark: 'WTI Crude $70.80 / bbl',
    agencyCitation: 'EIA Weekly Petroleum Status Report (WPSR)',
    lastTelemetryDate: '2026-09-17',
    sourceUrl: 'https://www.eia.gov'
  },
  {
    id: 'malacca',
    name: 'Strait of Malacca Hydrocarbon Chokepoint',
    category: 'Strategic Chokepoint',
    country: 'Singapore / Malaysia / Indonesia',
    lat: 1.3521,
    lng: 103.8198,
    flowCapacity: '16.5 Million bpd (Indo-Pacific Crude & LNG)',
    currentFlowStatus: 'Heavy Congestion · Port Calls at 104% Normal Density',
    priceBenchmark: 'Oman / Dubai Benchmark $73.90 / bbl',
    agencyCitation: 'Maritime and Port Authority of Singapore',
    lastTelemetryDate: '2026-09-19',
    sourceUrl: 'https://www.mpa.gov.sg'
  },
  {
    id: 'ras-tanura',
    name: 'Ras Tanura Offshore Terminal',
    category: 'Crude Benchmark Terminal',
    country: 'Saudi Arabia',
    lat: 26.6433,
    lng: 50.1583,
    flowCapacity: '6.5 Million bpd Loading Capacity',
    currentFlowStatus: 'Active Crude Liftings · Red Sea Bypassed via Petroline',
    priceBenchmark: 'Arab Light OSP Parity',
    agencyCitation: 'Saudi Aramco Official Quotations',
    lastTelemetryDate: '2026-09-16',
    sourceUrl: 'https://www.aramco.com'
  }
];

function projectGlobalCoords(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 100;
  const y = ((84 - lat) / 142) * 100;
  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(3, Math.min(97, y))
  };
}

export function EnergyInfrastructureMap() {
  const [selectedNode, setSelectedNode] = useState<EnergyNode>(ENERGY_NODES[0]);

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-sm my-6 font-mono">
      {/* Header */}
      <div className="bg-[#F6F8FB] px-5 py-4 border-b border-[#E4E9F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#0E63C4] animate-pulse"></span>
            <h2 className="text-base font-bold text-[#101828] uppercase tracking-wide font-display">
              Global Energy Infrastructure & Hydrocarbon Chokepoints Map
            </h2>
            <span className="text-xs bg-[#E4E9F0] text-[#344054] px-2 py-0.5 rounded font-bold">
              EIA / IEA / AGSI Vintages
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1 font-sans">
            Strict Invariant: Workspace-wide parity enforced. BRENT $74.50/bbl, WTI $70.80/bbl, TTF €78.95/MWh. Zero synthetic jitter.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span className="bg-white border border-[#E4E9F0] px-2.5 py-1 rounded text-[#0E63C4] font-bold">
            Brent: $74.50
          </span>
          <span className="bg-white border border-[#E4E9F0] px-2.5 py-1 rounded text-[#101828] font-bold">
            WTI: $70.80
          </span>
          <span className="bg-amber-50 border border-amber-200 px-2.5 py-1 rounded text-amber-900 font-bold">
            TTF: €78.95
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full bg-[#F8FAFC] border-b border-[#E4E9F0] overflow-hidden" style={{ minHeight: '360px' }}>
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-auto max-h-[440px] select-none pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <WorldVectorLandmass />
          {/* Pipeline routes */}
          <path d="M 640,200 Q 560,160 510,140" fill="none" stroke="#F79009" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
          <path d="M 640,200 Q 720,280 780,320" fill="none" stroke="#F79009" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
        </svg>

        {/* Node Markers */}
        <div className="absolute inset-0 pointer-events-auto">
          {ENERGY_NODES.map((node) => {
            const { x, y } = projectGlobalCoords(node.lat, node.lng);
            const isSelected = selectedNode.id === node.id;
            return (
              <div
                key={node.id}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                onClick={() => setSelectedNode(node)}
              >
                <div
                  className={`relative flex items-center justify-center transition-transform ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                  }`}
                >
                  <span className={`absolute w-7 h-7 rounded-full opacity-30 bg-[#F79009] ${isSelected ? 'animate-ping' : ''}`} />
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-md ${
                      isSelected
                        ? 'bg-[#F79009] border-[#FFFFFF] text-[#FFFFFF]'
                        : 'bg-[#FFFFFF] border-[#F79009] text-[#F79009]'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                  </div>

                  {/* Badge */}
                  <div
                    className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold shadow-xs border pointer-events-none transition ${
                      isSelected
                        ? 'bg-[#101828] text-[#FFFFFF] border-[#101828]'
                        : 'bg-[#FFFFFF]/95 text-[#344054] border-[#E4E9F0]'
                    }`}
                  >
                    {node.name.split(' ')[0]} : {node.priceBenchmark.split(' ')[0]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Dossier */}
      <div className="p-5 bg-[#FFFFFF] border-t border-[#E4E9F0] grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-[#101828] font-display">{selectedNode.name}</h3>
            <span className="text-xs px-2 py-0.5 bg-[#FFF4ED] border border-[#FFD6AE] text-[#B93815] rounded font-bold">
              {selectedNode.category}
            </span>
            <span className="text-xs font-mono text-[#344054]">
              {selectedNode.country}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                Throughput Capacity
              </span>
              <span className="text-xs font-bold text-[#101828]">{selectedNode.flowCapacity}</span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                Price Benchmark
              </span>
              <span className="text-xs font-bold text-[#0E63C4]">{selectedNode.priceBenchmark}</span>
            </div>
          </div>
        </div>

        {/* Telemetry Status & Invariant */}
        <div className="md:col-span-2 bg-[#F8FAFC] border border-[#E4E9F0] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="space-y-1.5 font-sans">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101828]">
              <Activity className="w-4 h-4 text-[#F79009]" />
              <span>Current Flow Telemetry & Disruption Status</span>
            </div>
            <p className="text-xs text-[#344054] bg-[#FFFFFF] p-2 rounded border border-[#E4E9F0] font-mono leading-relaxed">
              {selectedNode.currentFlowStatus}
            </p>
          </div>

          <div className="pt-2 border-t border-[#E4E9F0] flex items-center justify-between text-xs text-[#667085]">
            <span>Agency: {selectedNode.agencyCitation}</span>
            <a
              href={selectedNode.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#0E63C4] hover:underline flex items-center gap-0.5 font-semibold font-sans"
            >
              Agency Feed <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
