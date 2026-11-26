'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Zap, Clock } from 'lucide-react';

export default function FreshnessHeader() {
  const [lastCheck, setLastCheck] = useState<Date>(new Date());
  const [secondsAgo, setSecondsAgo] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(600);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [hiddenAt, setHiddenAt] = useState<number | null>(null);

  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastCheck(new Date());
      setSecondsAgo(0);
      setCountdown(600);
      setIsRefreshing(false);
    }, 400);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo(prev => prev + 1);
      setCountdown(prev => {
        if (prev <= 1) {
          refreshData();
          return 600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [refreshData]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setHiddenAt(Date.now());
      } else {
        if (hiddenAt && Date.now() - hiddenAt > 300000) {
          refreshData();
        }
        setHiddenAt(null);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [hiddenAt, refreshData]);

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        refreshData();
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [refreshData]);

  const formatCountdown = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleManualRefresh = () => {
    if (secondsAgo < 30) return;
    refreshData();
  };

  return (
    <div className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#E4E9F0] px-4 py-2.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
            <Zap className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>ENERGY TELEMETRY LIVE</span>
          </div>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">
            UTC Check: <strong className="text-gray-900 font-mono">{lastCheck.toISOString().slice(11, 19)}Z</strong>
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">
            Age: <strong className="text-gray-900 font-mono">{secondsAgo}s ago</strong>
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-gray-500">
            <span>Next Auto-Pull:</span>
            <span className="font-mono font-medium text-gray-800">{formatCountdown(countdown)}</span>
          </div>

          <button
            onClick={handleManualRefresh}
            disabled={secondsAgo < 30 || isRefreshing}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded font-medium transition ${
              secondsAgo < 30 || isRefreshing
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{secondsAgo < 30 ? `Throttled (${30 - secondsAgo}s)` : 'Pull Telemetry'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
