import { NextResponse } from 'next/server';
import { COMMODITIES, AGENCY_VINTAGES } from '@/lib/energy-data';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'energywire-monitor',
    commoditiesTracked: COMMODITIES.length,
    vintagesRegistered: AGENCY_VINTAGES.length,
    activeConnectors: [
      'IEA-Oil-Market-Report-Feeds',
      'OPEC-Secretariat-MOMR-Feeds',
      'EIA-STEO-API-v2',
      'ICE-Futures-Europe-Brent',
      'ICE-Endex-Dutch-TTF',
      'Gas-Infrastructure-Europe-AGSI',
      'EEX-European-Energy-Exchange'
    ],
    invariantContract: 'AGENCY_SPREAD_PRESERVED_NO_MIDPOINT',
  });
}
