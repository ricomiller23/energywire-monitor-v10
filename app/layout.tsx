import type { Metadata, Viewport } from 'next';
import './globals.css';
import FreshnessHeader from '../components/FreshnessHeader';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
  title: 'ENERGYWIRE — Global Energy, Gas, LNG & Grid Monitor',
  description: 'Authoritative telemetry for crude oil, European gas, LNG flows, and power grids. Empirical preservation of IEA vs OPEC forecast spreads.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head><link rel="stylesheet" href="/v10-responsive.css" /></head>
      <body className="bg-[#FFFFFF] text-[#0F172A] min-h-screen flex flex-col">
        <FreshnessHeader />
        <Navbar />
        <main className="flex-1 bg-[#FFFFFF]">{children}</main>
        <footer className="border-t border-[#E4E9F0] py-6 px-4 bg-[#F6F8FB] text-xs text-gray-500 text-center">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div>ENERGYWIRE Telemetry Systems — Part of THE MONITOR SERIES. Strictly Light-Theme Public Registry.</div>
            <div className="font-mono text-[11px] text-gray-400">Parity Benchmark: Brent $103.50/bbl | TTF Gas: €78.95/MWh</div>
          </div>
        </footer>
        <script src="/v10-suite.js" defer></script>
      </body>
    </html>
  );
}
