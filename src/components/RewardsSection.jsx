import React from 'react';
import { Trophy, Star, Award, Gift, Sparkles, PlayCircle } from 'lucide-react';
import { soundService } from '../services/soundService';

export default function RewardsSection({ 
  stars, 
  completedStories, 
  favorites, 
  lang, 
  openRewardedAd 
}) {
  // Rank calculations
  const getRank = (starCount) => {
    if (starCount >= 60) return { titleEn: 'Noor Champion 👑', titleUr: 'نور چیمپئن 👑', next: 100, progress: 100 };
    if (starCount >= 30) return { titleEn: 'Deen Star 🌟', titleUr: 'دین اسٹار 🌟', next: 60, progress: Math.min(100, Math.round(((starCount - 30) / 30) * 100)) };
    if (starCount >= 10) return { titleEn: 'Story Explorer 🚀', titleUr: 'کہانیوں کا مسافر 🚀', next: 30, progress: Math.min(100, Math.round(((starCount - 10) / 20) * 100)) };
    return { titleEn: 'Little Seeker 🌱', titleUr: 'ننھا متلاشی 🌱', next: 10, progress: Math.min(100, Math.round((starCount / 10) * 100)) };
  };

  const currentRank = getRank(stars);

  const badges = [
    {
      id: 'first-story',
      titleEn: 'First Story Reader',
      titleUr: 'پہلی کہانی کا قاری',
      descEn: 'Completed your first moral story',
      descUr: 'پہلی اخلاقی کہانی مکمل کی',
      icon: '📖',
      unlocked: completedStories.length >= 1,
    },
    {
      id: 'quiz-whiz',
      titleEn: 'Quiz Master',
      titleUr: 'کوئز ماسٹر',
      descEn: 'Solved a story quiz with flying colors',
      descUr: 'کہانی کا کوئز کامیابی سے حل کیا',
      icon: '🎯',
      unlocked: stars >= 5,
    },
    {
      id: 'star-collector',
      titleEn: 'Golden 10 Stars',
      titleUr: 'دس سنہرے ستارے',
      descEn: 'Gathered 10 shiny golden stars',
      descUr: '10 سنہرے ستارے جمع کیے',
      icon: '⭐',
      unlocked: stars >= 10,
    },
    {
      id: 'story-lover',
      titleEn: 'Story Lover',
      titleUr: 'کہانیوں کا عاشق',
      descEn: 'Completed 3 short moral stories',
      descUr: '3 اخلاقی کہانیاں مکمل کیں',
      icon: '🏆',
      unlocked: completedStories.length >= 3,
    },
    {
      id: 'favorite-fan',
      titleEn: 'Treasury Keeper',
      titleUr: 'پسندیدہ کا محافظ',
      descEn: 'Saved items to your favorites',
      descUr: 'پسندیدہ فہرست میں چیزیں محفوظ کیں',
      icon: '💖',
      unlocked: favorites.length >= 2,
    },
    {
      id: 'noor-champion',
      titleEn: 'Noor Champion',
      titleUr: 'نور کا ستارہ',
      descEn: 'Reached 30 stars milestone',
      descUr: '30 ستاروں کا سنگِ میل حاصل کیا',
      icon: '👑',
      unlocked: stars >= 30,
    },
  ];

  return (
    <div className="space-y-4 pb-20">
      
      {/* Rank & Progress Card */}
      <div className="bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-5 text-emerald-950 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-white/70 px-2.5 py-0.5 rounded-full inline-block">
              {lang === 'ur' ? 'آپ کا موجودہ رینک' : 'Your Little Rank'}
            </span>
            <h2 className={`text-xl font-bold mt-1 ${lang === 'ur' ? 'font-urdu' : 'font-kids'}`}>
              {lang === 'ur' ? currentRank.titleUr : currentRank.titleEn}
            </h2>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/90 shadow-md flex items-center justify-center text-3xl animate-bounce">
            🏆
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 mt-2">
          <div className="flex justify-between text-xs font-bold text-amber-950/80">
            <span>{stars} Stars</span>
            <span>Target: {currentRank.next} Stars</span>
          </div>
          <div className="w-full h-3.5 bg-amber-200/80 rounded-full overflow-hidden p-0.5 border border-amber-300">
            <div 
              className="h-full bg-emerald-600 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${currentRank.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Rewarded Ad Card: High-eCPM Play Store Engine */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-4 text-white shadow-md flex items-center justify-between relative overflow-hidden">
        <div className="z-10 max-w-[70%]">
          <span className="bg-amber-400 text-purple-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider inline-block mb-1">
            {lang === 'ur' ? 'مفت سنہرے ستارے ⭐' : 'Free Bonus Stars ⭐'}
          </span>
          <h3 className={`text-base font-bold ${lang === 'ur' ? 'font-urdu' : 'font-kids'}`}>
            {lang === 'ur' ? 'ایک چھوٹا اشتہار دیکھیں اور 10 ستارے پائیں!' : 'Watch a safe ad for +10 Free Stars!'}
          </h3>
          <p className="text-xs text-purple-200 mt-0.5">
            {lang === 'ur' ? 'محفوظ اور بچوں کے لیے مناسب ویڈیو' : 'Safe, child-directed sponsored clip'}
          </p>

          <button
            onClick={() => {
              soundService.playPop();
              openRewardedAd();
            }}
            className="btn-bounce mt-3 bg-amber-400 hover:bg-amber-300 text-purple-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md"
          >
            <PlayCircle className="w-4 h-4 fill-purple-950 text-amber-400" />
            <span>{lang === 'ur' ? 'ابھی دیکھیں (+10⭐)' : 'Watch & Get +10 Stars'}</span>
          </button>
        </div>

        <div className="text-5xl animate-float pr-1 select-none">
          🎁
        </div>
        <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Badges Collection Title */}
      <div className="flex items-center justify-between pt-1">
        <h3 className={`text-base font-bold text-gray-900 flex items-center gap-1.5 ${lang === 'ur' ? 'font-urdu text-lg' : 'font-kids'}`}>
          <Award className="w-5 h-5 text-emerald-600" />
          <span>{lang === 'ur' ? 'آپ کے حاصل کردہ بیجز' : 'Your Badges Collection'}</span>
        </h3>
        <span className="text-xs text-gray-500 font-bold">
          {badges.filter(b => b.unlocked).length} / {badges.length} Unlocked
        </span>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-2 gap-3">
        {badges.map((badge) => {
          return (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center relative ${
                badge.unlocked
                  ? 'bg-white border-amber-300 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-50 grayscale'
              }`}
            >
              <div className="text-3xl mb-1.5 select-none">
                {badge.icon}
              </div>
              <h4 className={`font-bold text-xs text-gray-900 ${lang === 'ur' ? 'font-urdu' : 'font-kids'}`}>
                {lang === 'ur' ? badge.titleUr : badge.titleEn}
              </h4>
              <p className={`text-[10px] text-gray-500 mt-0.5 line-clamp-1 ${lang === 'ur' ? 'font-urdu' : ''}`}>
                {lang === 'ur' ? badge.descUr : badge.descEn}
              </p>

              {badge.unlocked && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
