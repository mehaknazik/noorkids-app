import React from 'react';
import { Film, BookOpen, Trophy, Bookmark } from 'lucide-react';
import { soundService } from '../services/soundService';

export default function BottomNav({ activeTab, setActiveTab, lang }) {
  const tabs = [
    { id: 'cartoons', labelEn: 'Cartoons', labelUr: 'کارٹونز', icon: Film, emoji: '🎬' },
    { id: 'stories', labelEn: 'Stories', labelUr: 'کہانیاں', icon: BookOpen, emoji: '📖' },
    { id: 'rewards', labelEn: 'Rewards', labelUr: 'انعامات', icon: Trophy, emoji: '🏆' },
    { id: 'favorites', labelEn: 'Favorites', labelUr: 'پسندیدہ', icon: Bookmark, emoji: '⭐' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-emerald-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
      <div className="max-w-md mx-auto grid grid-cols-4 px-2 py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundService.playPop();
                setActiveTab(tab.id);
              }}
              className={`btn-bounce flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-200 relative ${
                isActive 
                  ? 'text-emerald-700 font-bold scale-105' 
                  : 'text-gray-400 hover:text-gray-600 font-medium'
              }`}
            >
              <div className={`p-1.5 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'bg-emerald-100 text-emerald-700 shadow-sm' 
                  : 'bg-transparent text-gray-500'
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${lang === 'ur' ? 'font-urdu leading-none pt-0.5 text-xs' : 'font-kids'}`}>
                {lang === 'ur' ? tab.labelUr : tab.labelEn}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
