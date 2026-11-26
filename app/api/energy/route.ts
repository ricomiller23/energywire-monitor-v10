import { NextResponse } from 'next/server';
import { GLOBAL_ENERGY_METRICS, COMMODITIES, AGENCY_DISAGREEMENT, AGENCY_VINTAGES } from '@/lib/energy-data';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    timestamp: new Date().toISOString(),
    metrics: GLOBAL_ENERGY_METRICS,
    commodities: COMMODITIES,
    agencyDisagreement: AGENCY_DISAGREEMENT,
    vintages: AGENCY_VINTAGES,
  });
}
