import { Commodity, AgencyForecastVintage, AgencyDisagreement, GlobalEnergyMetrics } from './types';

export const GLOBAL_ENERGY_METRICS: GlobalEnergyMetrics = {
  brentCrudeBenchmark: 103.50,
  wtiCrudeBenchmark: 85.60,
  ttfNaturalGasEurMwh: 78.95,
  ttfMonthlyChangePercent: 24.6,
  euGasStoragePercent: 67.0,
  euStorageTargetPercent: 90.0,
  henryHubUsdMmbpu: 2.85,
  ieaOpecDemandSpreadMbpd: 3.0,
  lastUpdatedUtc: "2026-09-19T09:30:00Z"
};

export const COMMODITIES: Commodity[] = [
  {
    id: "brent-crude",
    name: "Brent Crude Oil",
    category: "CRUDE_OIL",
    price: 103.50,
    currency: "USD",
    unit: "bbl",
    change24hPercent: 1.15,
    lagChip: "Lag: Real-time ICE ICE-B",
    sourceAgency: "ICE Futures Europe / Platts",
    sourceUrl: "https://www.theice.com/products/219/Brent-Crude-Futures",
    description: "North Sea physical sweet crude oil benchmark; reflects global maritime chokepoint and refinery demand pressures."
  },
  {
    id: "wti-crude",
    name: "WTI Light Sweet Crude",
    category: "CRUDE_OIL",
    price: 85.60,
    currency: "USD",
    unit: "bbl",
    change24hPercent: 0.88,
    lagChip: "Lag: NYMEX Spot",
    sourceAgency: "CME Group / NYMEX",
    sourceUrl: "https://www.cmegroup.com/markets/energy/crude-oil/light-sweet-crude.html",
    description: "Cushing, Oklahoma physical delivery pricing for inland US refining and Permian pipeline egress."
  },
  {
    id: "dutch-ttf-gas",
    name: "Dutch TTF Natural Gas",
    category: "NATURAL_GAS",
    price: 78.95,
    currency: "EUR",
    unit: "MWh",
    change24hPercent: 2.45,
    lagChip: "Lag: Daily ICE Endex Close",
    sourceAgency: "ICE Endex TTF",
    sourceUrl: "https://www.theice.com/products/27996665/Dutch-TTF-Gas-Futures",
    description: "Continental European benchmark natural gas price; closed €78.95/MWh on 18 Sep 2026 (+24.6% m/m from August levels; reached €80/MWh peak on 9 Sep)."
  },
  {
    id: "henry-hub-gas",
    name: "Henry Hub Natural Gas",
    category: "NATURAL_GAS",
    price: 2.85,
    currency: "USD",
    unit: "MMBtu",
    change24hPercent: -0.35,
    lagChip: "Lag: Daily NYMEX Spot",
    sourceAgency: "EIA / CME Group",
    sourceUrl: "https://www.eia.gov/dnav/ng/ng_pri_fut_s1_d.htm",
    description: "Louisiana pipeline nexus benchmark pricing; primary feedgas valuation for US Gulf Coast LNG export terminals."
  },
  {
    id: "platts-jkm-lng",
    name: "Platts JKM LNG",
    category: "LNG",
    price: 13.90,
    currency: "USD",
    unit: "MMBtu",
    change24hPercent: 1.82,
    lagChip: "Lag: Daily Assessment",
    sourceAgency: "S&P Global Commodity Insights",
    sourceUrl: "https://www.spglobal.com/commodityinsights/en/market-insights/topics/lng",
    description: "Japan Korea Marker physical spot cargo assessment for Northeast Asian utility discharge."
  },
  {
    id: "german-power-baseload",
    name: "German Baseload Power Cal-2027",
    category: "POWER_GRID",
    price: 94.20,
    currency: "EUR",
    unit: "MWh",
    change24hPercent: 1.10,
    lagChip: "Lag: EEX Daily Settlement",
    sourceAgency: "European Energy Exchange (EEX)",
    sourceUrl: "https://www.eex.com",
    description: "Forward electricity contracting benchmark for Central European manufacturing and grid stabilization."
  }
];

export const AGENCY_DISAGREEMENT: AgencyDisagreement = {
  metricName: "2026 World Oil Demand Growth",
  ieaValue: -1.6,
  opecValue: 1.4,
  unit: "mb/d",
  spread: 3.0,
  spreadDescription: "3.0 mb/d empirical divergence between IEA contraction (−1.6 mb/d) and OPEC expansion (+1.4 mb/d)",
  ieaSource: "IEA Oil Market Report (OMR) August 2026",
  opecSource: "OPEC Monthly Oil Market Report (MOMR) August 2026",
  asOfDate: "2026-08-15"
};

export const AGENCY_VINTAGES: AgencyForecastVintage[] = [
  {
    id: "vintage-iea-omr-2026-08",
    agency: "IEA",
    reportTitle: "Oil Market Report (OMR) — August 2026 Release",
    publicationDate: "2026-08-13",
    vintageDate: "2026-08-01",
    forecastYear: 2026,
    demandGrowthMbpd: -1.6,
    crudePriceBrentForecast: 84.00,
    storageAssumption: "OECD Commercial Stocks Build",
    sourceUrl: "https://www.iea.org/reports/oil-market-report-august-2026"
  },
  {
    id: "vintage-opec-momr-2026-08",
    agency: "OPEC",
    reportTitle: "Monthly Oil Market Report (MOMR) — August 2026 Release",
    publicationDate: "2026-08-12",
    vintageDate: "2026-08-01",
    forecastYear: 2026,
    demandGrowthMbpd: 1.4,
    crudePriceBrentForecast: 92.50,
    storageAssumption: "Market Deficit Supported by Voluntary Cuts",
    sourceUrl: "https://www.opec.org/opec_web/en/publications/338.htm"
  },
  {
    id: "vintage-eia-steo-2026-09",
    agency: "EIA",
    reportTitle: "Short-Term Energy Outlook (STEO) — September 2026",
    publicationDate: "2026-09-10",
    vintageDate: "2026-09-01",
    forecastYear: 2026,
    demandGrowthMbpd: 0.9,
    crudePriceBrentForecast: 90.00,
    storageAssumption: "Global Inventories Fall by 0.8 mb/d in 2H26",
    sourceUrl: "https://www.eia.gov/outlooks/steo/"
  }
];
