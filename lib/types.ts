export type CommodityCategory = 'CRUDE_OIL' | 'NATURAL_GAS' | 'LNG' | 'POWER_GRID';

export interface Commodity {
  id: string;
  name: string;
  category: CommodityCategory;
  price: number;
  currency: string;
  unit: string;
  change24hPercent: number;
  lagChip: string; // e.g. "Lag: Daily Spot", "Lag: Weekly EIA"
  sourceAgency: string;
  sourceUrl: string;
  description: string;
}

export interface AgencyForecastVintage {
  id: string;
  agency: 'IEA' | 'OPEC' | 'EIA';
  reportTitle: string;
  publicationDate: string;
  vintageDate: string;
  forecastYear: number;
  demandGrowthMbpd: number;
  crudePriceBrentForecast?: number;
  storageAssumption: string;
  sourceUrl: string;
}

export interface AgencyDisagreement {
  metricName: string;
  ieaValue: number;
  opecValue: number;
  unit: string;
  spread: number;
  spreadDescription: string;
  ieaSource: string;
  opecSource: string;
  asOfDate: string;
}

export interface GlobalEnergyMetrics {
  brentCrudeBenchmark: number;
  wtiCrudeBenchmark: number;
  ttfNaturalGasEurMwh: number;
  ttfMonthlyChangePercent: number;
  euGasStoragePercent: number;
  euStorageTargetPercent: number;
  henryHubUsdMmbpu: number;
  ieaOpecDemandSpreadMbpd: number;
  lastUpdatedUtc: string;
}
