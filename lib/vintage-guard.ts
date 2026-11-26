import { AgencyForecastVintage, AgencyDisagreement } from './types';

export class InvariantViolationError extends Error {
  constructor(message: string) {
    super(`[ENERGY_INVARIANT_VIOLATION]: ${message}`);
    this.name = 'InvariantViolationError';
  }
}

/**
 * MANDATORY INVARIANT (§11):
 * Agency disagreement (IEA vs OPEC) is preserved as an empirical range.
 * Never calculate an arithmetic midpoint or average.
 */
export function assertNoAgencyAveraging(attemptedAverage: any): void {
  if (attemptedAverage !== undefined && attemptedAverage !== null) {
    throw new InvariantViolationError(
      'Agency forecasts from IEA and OPEC must never be averaged into a synthetic midpoint.'
    );
  }
}

export function formatAgencySpread(disagreement: AgencyDisagreement): string {
  const min = Math.min(disagreement.ieaValue, disagreement.opecValue);
  const max = Math.max(disagreement.ieaValue, disagreement.opecValue);
  return `${min >= 0 ? '+' : ''}${min.toFixed(1)} to ${max >= 0 ? '+' : ''}${max.toFixed(1)} ${disagreement.unit} (Empirical Spread: ${disagreement.spread.toFixed(1)} ${disagreement.unit})`;
}

/**
 * MANDATORY INVARIANT:
 * Vintages are immutable. Revisions append a new record; never mutate in-place.
 */
export function assertNeverOverwrite(
  newVintageId: string,
  existingVintages: AgencyForecastVintage[]
): void {
  const exists = existingVintages.some(v => v.id === newVintageId);
  if (exists) {
    throw new InvariantViolationError(
      `Vintage '${newVintageId}' already exists in the immutable registry. New forecasts must be registered as new vintages.`
    );
  }
}
