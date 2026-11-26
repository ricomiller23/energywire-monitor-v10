import { describe, it, expect } from 'vitest';
import {
  assertNoAgencyAveraging,
  formatAgencySpread,
  assertNeverOverwrite,
  InvariantViolationError
} from '../lib/vintage-guard';
import {
  GLOBAL_ENERGY_METRICS,
  COMMODITIES,
  AGENCY_DISAGREEMENT,
  AGENCY_VINTAGES
} from '../lib/energy-data';

describe('ENERGYWIRE Monitor: Invariant & Vintage Guard Tests', () => {
  it('strictly prohibits averaging IEA and OPEC demand forecasts', () => {
    expect(() => assertNoAgencyAveraging((-1.6 + 1.4) / 2)).toThrow(InvariantViolationError);
    expect(() => assertNoAgencyAveraging(-0.1)).toThrow(
      'Agency forecasts from IEA and OPEC must never be averaged into a synthetic midpoint.'
    );
    expect(() => assertNoAgencyAveraging(undefined)).not.toThrow();
  });

  it('formats agency disagreement as an empirical range and spread', () => {
    const spreadStr = formatAgencySpread(AGENCY_DISAGREEMENT);
    expect(spreadStr).toContain('-1.6 to +1.4 mb/d');
    expect(spreadStr).toContain('Empirical Spread: 3.0 mb/d');
  });

  it('enforces immutable vintage insertions via assertNeverOverwrite', () => {
    expect(() =>
      assertNeverOverwrite('vintage-iea-omr-2026-08', AGENCY_VINTAGES)
    ).toThrow(InvariantViolationError);
    expect(() =>
      assertNeverOverwrite('vintage-iea-omr-2026-09-new', AGENCY_VINTAGES)
    ).not.toThrow();
  });

  it('asserts Brent crude benchmark matches $103.50/bbl for workspace parity', () => {
    expect(GLOBAL_ENERGY_METRICS.brentCrudeBenchmark).toBe(103.50);
  });

  it('asserts Dutch TTF gas closed at €78.95/MWh with +24.6% monthly change', () => {
    expect(GLOBAL_ENERGY_METRICS.ttfNaturalGasEurMwh).toBe(78.95);
    expect(GLOBAL_ENERGY_METRICS.ttfMonthlyChangePercent).toBe(24.6);
  });

  it('mandates lag chips and primary source URLs on all commodities', () => {
    expect(COMMODITIES.length).toBeGreaterThanOrEqual(6);
    for (const c of COMMODITIES) {
      expect(c.lagChip).toMatch(/^Lag:/);
      expect(c.sourceUrl).toMatch(/^https?:\/\//);
      expect(c.price).toBeGreaterThan(0);
    }
  });
});
