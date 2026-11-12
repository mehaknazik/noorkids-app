import React, { useState, useEffect } from 'react';
import { X, Gift, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundService } from '../services/soundService';
import { adMobService } from '../services/adMobService';
import confetti from 'canvas-confetti';

export default function RewardedAdModal({ isOpen, onClose, onRewardClaimed, lang }) {
  const [countdown, setCountdown] = useState(5);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Reset state
    setCountdown(5);
    setCompleted(false);

    // If native platform, try native AdMob rewarded ad
    if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform()) {
      adMobService.showRewardedAd(() => {
        setCompleted(true);
      });
      return;
    }

    // Interactive simulator timer
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCompleted(true);
          soundService.playVictory();
          confetti({
            particleCount: 80,
            spread: 80,
            origin: { y: 0.6 }
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClaim = () => {
    soundService.playStar();
    onRewardClaimed(10); // 10 stars reward!
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border-4 border-amber-400 flex flex-col">
        
        {/* Top Header */}
        <div className="bg-purple-700 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs bg-amber-400 text-purple-950 font-bold px-2 py-0.5 rounded-full uppercase">
              Ad • G Rated
            </span>
            <span className="text-xs font-bold font-kids">Families Compliant</span>
          </div>
          {completed && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Ad Video Simulator Screen */}
        <div className="p-6 text-center space-y-4 bg-gradient-to-b from-purple-50 to-white">
          
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg flex items-center justify-center text-5xl animate-bounce">
            🎁
          </div>

          <div>
            <h3 className={`font-bold text-gray-900 text-base ${lang === 'ur' ? 'font-urdu text-lg' : 'font-kids'}`}>
              {completed 
                ? (lang === 'ur' ? 'ماشاءاللہ! انعام تیار ہے!' : 'Hooray! Reward Unlocked!') 
                : (lang === 'ur' ? 'اشتہار دیکھا جا رہا ہے...' : 'Watching Sponsored Kids Clip...')}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {lang === 'ur' ? 'Google AdMob کے تحت فیملی فرینڈلی اشتہار' : 'COPPA Compliant Child-Directed Rewarded Ad'}
            </p>
          </div>

          {/* Countdown or Completed Banner */}
          {!completed ? (
            <div className="space-y-2">
              <div className="text-3xl font-extrabold text-purple-700 font-mono">
                00:0{countdown}
              </div>
              <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-600 h-full transition-all duration-1000"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-400">
                {lang === 'ur' ? 'سٹارز حاصل کرنے کے لیے ویڈیو پوری دیکھیں' : 'Please watch until timer ends to claim your stars!'}
              </p>
            </div>
          ) : (
            <div className="bg-emerald-100 border-2 border-emerald-400 p-4 rounded-2xl space-y-2 animate-pop">
              <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-sm">
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>+10 Golden Stars!</span>
              </div>
              <p className="text-xs text-emerald-700">
                {lang === 'ur' 
                  ? 'شاباش! آپ کے اکاونٹ میں 10 ستارے جمع کر دیے گئے۔' 
                  : 'Great job! 10 stars have been added to your little treasure!'}
              </p>
            </div>
          )}

        </div>

        {/* Action Button */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          {completed ? (
            <button
              onClick={handleClaim}
              className="btn-bounce w-full bg-amber-400 hover:bg-amber-500 text-purple-950 font-extrabold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-md border-2 border-amber-300"
            >
              <Star className="w-5 h-5 fill-purple-950" />
              <span>{lang === 'ur' ? 'ستارے وصول کریں (+10⭐)' : 'Claim +10 Stars Now ⭐'}</span>
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-200 text-gray-400 font-bold py-3 rounded-2xl text-xs cursor-not-allowed"
            >
              {lang === 'ur' ? `انتظار کریں (${countdown} سیکنڈ)` : `Reward in ${countdown}s...`}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
