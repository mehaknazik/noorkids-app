import React from 'react';
import { Star, Volume2, VolumeX, Shield, Globe } from 'lucide-react';
import { soundService } from '../services/soundService';

export default function Header({ 
  stars, 
  lang, 
  setLang, 
  soundEnabled, 
  setSoundEnabled, 
  openParentalGate 
}) {
  const toggleSound = () => {
    const nextVal = !soundEnabled;
    soundService.setEnabled(nextVal);
    setSoundEnabled(nextVal);
    if (nextVal) soundService.playPop();
  };

  const toggleLanguage = () => {
    soundService.playPop();
    setLang(lang === 'en' ? 'ur' : 'en');
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-lg px-4 py-2.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* App Logo & Title */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center shadow-md animate-bounce">
            <span className="text-2xl">🌙</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide font-kids flex items-center gap-1.5">
              <span>NoorKids</span>
              <span className="text-xs bg-amber-300 text-emerald-950 font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                نور
              </span>
            </h1>
            <p className="text-[11px] text-emerald-100 font-medium -mt-0.5">
              {lang === 'ur' ? 'کارٹونز اور اسلامی کہانیاں' : 'Islamic Cartoons & Stories'}
            </p>
          </div>
        </div>

        {/* Top Actions: Stars, Language, Sound, Parental Lock */}
        <div className="flex items-center space-x-2">
          
          {/* Star Counter */}
          <div className="flex items-center bg-emerald-900/40 backdrop-blur-sm border border-emerald-400/30 px-3 py-1 rounded-full shadow-inner">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin-slow mr-1.5" />
            <span className="font-bold text-amber-200 text-sm">{stars}</span>
          </div>

          {/* Language Toggle (EN / اردو) */}
          <button
            onClick={toggleLanguage}
            className="btn-bounce bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-400/40 px-2.5 py-1 rounded-full text-xs font-bold text-amber-200 flex items-center gap-1 shadow-sm"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'اردو' : 'EN'}</span>
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={toggleSound}
            className="btn-bounce w-8 h-8 rounded-full bg-emerald-800/60 hover:bg-emerald-800 border border-emerald-400/40 flex items-center justify-center text-emerald-100 shadow-sm"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-300" />}
          </button>

          {/* Parents Gate Button */}
          <button
            onClick={() => {
              soundService.playPop();
              openParentalGate();
            }}
            className="btn-bounce w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 flex items-center justify-center shadow-md border-2 border-amber-200"
            title="Parents Zone / Settings"
          >
            <Shield className="w-4 h-4 stroke-[2.5]" />
          </button>

        </div>
      </div>
    </header>
  );
}
