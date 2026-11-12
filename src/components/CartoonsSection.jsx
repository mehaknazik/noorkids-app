import React, { useState } from 'react';
import { Play, Heart, Search, X, Star, Sparkles, Clock } from 'lucide-react';
import { CARTOON_CATEGORIES, CARTOONS_DATA } from '../data/cartoonsData';
import { soundService } from '../services/soundService';
import confetti from 'canvas-confetti';

export default function CartoonsSection({ 
  lang, 
  favorites, 
  toggleFavorite, 
  addStar 
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Filter cartoons by category and search term
  const filteredCartoons = CARTOONS_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.titleEn.toLowerCase().includes(query) ||
      item.titleUr.includes(query) ||
      item.descriptionEn.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleOpenVideo = (cartoon) => {
    soundService.playPop();
    setSelectedVideo(cartoon);
  };

  const handleCloseVideo = () => {
    soundService.playStar();
    addStar(1); // Reward child for watching!
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    setSelectedVideo(null);
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Banner / Mascot Callout */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-4 text-emerald-950 shadow-md flex items-center justify-between relative overflow-hidden">
        <div className="z-10 max-w-[70%]">
          <span className="bg-white/80 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1">
            {lang === 'ur' ? '✨ حلال اور محفوظ کارٹونز' : '✨ 100% Halal & Safe'}
          </span>
          <h2 className={`text-lg font-bold ${lang === 'ur' ? 'font-urdu' : 'font-kids'}`}>
            {lang === 'ur' ? 'پیارے بچو! اسلامی کارٹونز دیکھیں' : 'Watch & Learn with Islamic Cartoons!'}
          </h2>
          <p className="text-xs text-amber-950/80 mt-0.5">
            {lang === 'ur' ? 'انبیاء کے سچے واقعات اور پیاری سنتیں' : 'Prophet stories, sweet duas and good manners'}
          </p>
        </div>
        <div className="text-5xl animate-float pr-2 select-none">
          🏰
        </div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === 'ur' ? 'کارٹون تلاش کریں...' : 'Search cartoons (Yunus, Dua, Manners)...'}
          className="w-full bg-white border-2 border-emerald-100 rounded-2xl pl-11 pr-10 py-2.5 text-sm font-medium text-emerald-950 placeholder:text-gray-400 focus:outline-none focus:border-emerald-400 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CARTOON_CATEGORIES.map((cat) => {
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

      {/* Cartoon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredCartoons.map((cartoon) => {
          const isFav = favorites.includes(cartoon.id);
          return (
            <div
              key={cartoon.id}
              className="bg-white rounded-3xl overflow-hidden border-2 border-emerald-100 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              {/* Thumbnail / Header with Gradient & Mascot */}
              <div 
                className={`relative h-40 bg-gradient-to-br ${cartoon.color} flex items-center justify-center cursor-pointer`}
                onClick={() => handleOpenVideo(cartoon)}
              >
                <div className="text-6xl transform group-hover:scale-110 transition-transform duration-300 select-none">
                  {cartoon.character}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 text-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-emerald-600 translate-x-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {cartoon.duration}
                </span>

                {/* Badge (Popular / Featured) */}
                <span className="absolute top-2.5 left-2.5 bg-amber-400 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                  {cartoon.badge}
                </span>

                {/* Favorite Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundService.playPop();
                    toggleFavorite(cartoon.id);
                  }}
                  className="btn-bounce absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`} />
                </button>
              </div>

              {/* Info Content */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className={`font-bold text-gray-900 text-sm line-clamp-1 ${lang === 'ur' ? 'font-urdu text-right text-base' : 'font-kids'}`}>
                    {lang === 'ur' ? cartoon.titleUr : cartoon.titleEn}
                  </h3>
                  <p className={`text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed ${lang === 'ur' ? 'font-urdu text-right text-xs' : ''}`}>
                    {lang === 'ur' ? cartoon.descriptionUr : cartoon.descriptionEn}
                  </p>
                </div>

                {/* Watch Now Button */}
                <button
                  onClick={() => handleOpenVideo(cartoon)}
                  className="btn-bounce mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{lang === 'ur' ? 'ابھی دیکھیں' : 'Watch Cartoon'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Player Modal (Safe embed, Play Store Compliant) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border-4 border-amber-400 flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-emerald-700 text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedVideo.character}</span>
                <h3 className={`font-bold text-sm line-clamp-1 ${lang === 'ur' ? 'font-urdu' : 'font-kids'}`}>
                  {lang === 'ur' ? selectedVideo.titleUr : selectedVideo.titleEn}
                </h3>
              </div>
              <button
                onClick={handleCloseVideo}
                className="btn-bounce w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container (Safe kid-directed embed) */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                title={selectedVideo.titleEn}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer with Star Reward & Finish Button */}
            <div className="p-4 bg-amber-50 flex items-center justify-between border-t border-amber-200">
              <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                <span>{lang === 'ur' ? 'دیکھنے پر +1 ستارہ ملے گا!' : 'Earn +1 Golden Star for watching!'}</span>
              </div>
              <button
                onClick={handleCloseVideo}
                className="btn-bounce bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md"
              >
                {lang === 'ur' ? 'ختم کریں اور ستارہ لیں ⭐' : 'Finish & Claim Star ⭐'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
