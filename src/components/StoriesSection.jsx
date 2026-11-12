import React, { useState } from 'react';
import { BookOpen, Heart, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { STORY_CATEGORIES, STORIES_DATA } from '../data/storiesData';
import { soundService } from '../services/soundService';

export default function StoriesSection({ 
  lang, 
  favorites, 
  toggleFavorite, 
  completedStories, 
  openStoryReader 
}) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredStories = STORIES_DATA.filter((story) => {
    return activeCategory === 'all' || story.category === activeCategory;
  });

  return (
    <div className="space-y-4 pb-20">
      
      {/* Banner Card */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl p-4 text-white shadow-md flex items-center justify-between relative overflow-hidden">
        <div className="z-10 max-w-[70%]">
          <span className="bg-white/20 text-emerald-100 text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1">
            {lang === 'ur' ? '✨ مختصر اور سبق آموز' : '✨ Short & Meaningful Stories'}
          </span>
          <h2 className={`text-lg font-bold ${lang === 'ur' ? 'font-urdu' : 'font-kids'}`}>
            {lang === 'ur' ? 'پیاری اسلامی اخلاقی کہانیاں' : 'Inspiring Short Moral Stories'}
          </h2>
          <p className="text-xs text-emerald-100 mt-0.5">
            {lang === 'ur' ? 'سچائی، رحمدلی اور والدین کی محبت' : 'Honesty, kindness, compassion and Islamic values'}
          </p>
        </div>
        <div className="text-5xl animate-float pr-2 select-none">
          📖
        </div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {STORY_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                soundService.playPop();
                setActiveCategory(cat.id);
              }}
              className={`btn-bounce px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-emerald-200'
                  : 'bg-white text-emerald-900 border border-emerald-100 hover:bg-emerald-50'
              }`}
            >
              <span>{lang === 'ur' ? cat.titleUr : cat.titleEn}</span>
            </button>
          );
        })}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredStories.map((story) => {
          const isFav = favorites.includes(story.id);
          const isCompleted = completedStories.includes(story.id);

          return (
            <div
              key={story.id}
              className="bg-white rounded-3xl p-4 border-2 border-emerald-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Header row with Emoji, Badges & Favorite */}
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${story.coverColor} flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform select-none`}>
                    {story.coverEmoji}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isCompleted && (
                      <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Read</span>
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundService.playPop();
                        toggleFavorite(story.id);
                      }}
                      className="btn-bounce w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 shadow-xs"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Title & Read Time */}
                <div className="mt-3">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-medium mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{story.readTime}</span>
                  </div>

                  <h3 className={`font-bold text-gray-900 text-base line-clamp-1 ${lang === 'ur' ? 'font-urdu text-right text-lg' : 'font-kids'}`}>
                    {lang === 'ur' ? story.titleUr : story.titleEn}
                  </h3>

                  <p className={`text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed ${lang === 'ur' ? 'font-urdu text-right' : ''}`}>
                    {lang === 'ur' ? story.moralUr : story.moralEn}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  soundService.playPop();
                  openStoryReader(story);
                }}
                className="btn-bounce mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>{lang === 'ur' ? 'کہانی پڑھیں' : 'Read Story'}</span>
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}
