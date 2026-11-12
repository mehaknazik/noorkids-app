import React, { useEffect, useState } from 'react';
import { adMobService } from '../services/adMobService';

export default function AdBanner() {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform()) {
      setIsNative(true);
      adMobService.showBanner();
    }
  }, []);

  // If native AdMob banner is running, it renders at native Android bottom layer.
  // In web preview / PWA, we show an educational, kid-safe compliant Ad placeholder.
  return (
    <div className="w-full bg-amber-100/90 border-t border-amber-300 py-1.5 px-3 flex items-center justify-between shadow-inner">
      <div className="flex items-center gap-2">
        <span className="bg-amber-400 text-emerald-950 font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">
          Ad • Child-Safe (G)
        </span>
        <span className="text-[11px] font-medium text-amber-950 truncate max-w-[200px] sm:max-w-xs">
          🌟 Play & Learn Islam: Family Friendly Sponsored Content
        </span>
      </div>
      <span className="text-[10px] text-amber-800 font-bold hidden sm:inline">
        Google AdMob (COPPA)
      </span>
    </div>
  );
}
