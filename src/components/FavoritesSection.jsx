import React from 'react';
import { Bookmark, Play, BookOpen, Trash2, Heart } from 'lucide-react';
import { CARTOONS_DATA } from '../data/cartoonsData';
import { STORIES_DATA } from '../data/storiesData';
import { soundService } from '../services/soundService';

export default function FavoritesSection({ 
  favorites, 
  toggleFavorite, 
  lang, 
  openStoryReader, 
  setActiveTab 
}) {
  const favoriteCartoons = CARTOONS_DATA.filter(c => favorites.includes(c.id));
  const favoriteStories = STORIES_DATA.filter(s => favorites.includes(s.id));

  const isEmpty = favoriteCartoons.length === 0 && favoriteStories.length === 0;

  return (
    <div className="space-y-4 pb-20">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 rounded-3xl p-4 text-white shadow-md flex items-center justify-between">
        <div>
          <span className="bg-white/20 text-rose-100 text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1">
            {lang === 'ur' ? 'آپ کا ذاتی خزانہ' : 'Your Little Treasure'}
          </span>
          <h2 className={`text-lg font-bold ${lang === 'ur' ? 'font-urdu' : 'font-kids'}`}>
            {lang === 'ur' ? 'پسندیدہ کارٹونز اور کہانیاں' : 'Saved Favorites'}
          </h2>
          <p className="text-xs text-rose-100 mt-0.5">
            {lang === 'ur' ? 'اپنی محفوظ کردہ ویڈیوز اور کہانیاں یہاں دیکھیں' : 'Quick access to what you love most'}
          </p>
        </div>
        <div className="text-4xl animate-bounce pr-2 select-none">
          💖
        </div>
      </div>

      {isEmpty ? (
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-100 text-center space-y-3 shadow-xs">
          <div className="text-5xl animate-float">🌟</div>
          <h3 className={`font-bold text-gray-800 text-base ${lang === 'ur' ? 'font-urdu' : 'font-kids'}`}>
            {lang === 'ur' ? 'ابھی کوئی پسندیدہ چیز موجود نہیں ہے!' : 'No favorites saved yet!'}
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto">
            {lang === 'ur' 
              ? 'کارٹونز یا کہانیوں پر موجود دل کے نشان پر کلک کریں تاکہ وہ یہاں محفوظ ہو جائیں۔' 
              : 'Tap the heart icon on any cartoon or story to save it here for easy re-watching!'}
          </p>
          <button
            onClick={() => {
              soundService.playPop();
              setActiveTab('cartoons');
            }}
            className="btn-bounce inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-2xl shadow-sm"
          >
            <span>{lang === 'ur' ? 'کارٹونز دریافت کریں' : 'Explore Cartoons'}</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Favorite Cartoons */}
          {favoriteCartoons.length > 0 && (
            <div className="space-y-2">
              <h3 className={`text-sm font-bold text-gray-800 ${lang === 'ur' ? 'font-urdu text-base' : 'font-kids'}`}>
                {lang === 'ur' ? 'پسندیدہ کارٹونز 🎬' : 'Favorite Cartoons 🎬'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoriteCartoons.map((cartoon) => (
                  <div
                    key={cartoon.id}
                    className="bg-white rounded-2xl p-3 border-2 border-emerald-100 flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{cartoon.character}</div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 line-clamp-1">
                          {lang === 'ur' ? cartoon.titleUr : cartoon.titleEn}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {cartoon.duration}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(cartoon.id)}
                      className="p-1.5 text-rose-500 hover:text-rose-600"
                    >
                      <Heart className="w-4 h-4 fill-rose-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Favorite Stories */}
          {favoriteStories.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className={`text-sm font-bold text-gray-800 ${lang === 'ur' ? 'font-urdu text-base' : 'font-kids'}`}>
                {lang === 'ur' ? 'پسندیدہ کہانیاں 📖' : 'Favorite Stories 📖'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoriteStories.map((story) => (
                  <div
                    key={story.id}
                    className="bg-white rounded-2xl p-3 border-2 border-emerald-100 flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{story.coverEmoji}</div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 line-clamp-1">
                          {lang === 'ur' ? story.titleUr : story.titleEn}
                        </h4>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {story.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openStoryReader(story)}
                        className="btn-bounce bg-emerald-100 text-emerald-700 hover:bg-emerald-200 p-1.5 rounded-xl"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleFavorite(story.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-600"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
