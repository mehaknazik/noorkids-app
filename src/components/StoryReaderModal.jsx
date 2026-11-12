import React, { useState, useEffect } from 'react';
import { X, Volume2, ArrowLeft, ArrowRight, CheckCircle, Star, Sparkles, HelpCircle } from 'lucide-react';
import { soundService } from '../services/soundService';
import { ttsService } from '../services/ttsService';
import confetti from 'canvas-confetti';

export default function StoryReaderModal({ 
  story, 
  lang, 
  onClose, 
  onComplete, 
  openQuiz 
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  const slides = story.slides || [];
  const currentSlide = slides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === slides.length - 1;

  // Trigger TTS voice narration
  const handleReadAloud = () => {
    soundService.playPop();
    if (isReadingAloud) {
      ttsService.stop();
      setIsReadingAloud(false);
      return;
    }

    const textToRead = lang === 'ur' ? currentSlide.textUr : currentSlide.textEn;
    setIsReadingAloud(true);
    ttsService.speak(textToRead, lang, () => {
      setIsReadingAloud(false);
    });
  };

  // Stop TTS when changing slide or closing
  useEffect(() => {
    ttsService.stop();
    setIsReadingAloud(false);
  }, [currentSlideIndex]);

  const handleNext = () => {
    soundService.playWhoosh();
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      // Completed story
      soundService.playVictory();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
      onComplete(story.id);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      soundService.playWhoosh();
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border-4 border-amber-300 flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xl">{story.coverEmoji}</span>
            <h3 className={`font-bold text-sm line-clamp-1 ${lang === 'ur' ? 'font-urdu' : 'font-kids'}`}>
              {lang === 'ur' ? story.titleUr : story.titleEn}
            </h3>
          </div>
          <button
            onClick={() => {
              ttsService.stop();
              onClose();
            }}
            className="btn-bounce w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="bg-amber-100 px-4 py-2 flex items-center justify-between border-b border-amber-200">
          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlideIndex
                    ? 'w-7 bg-emerald-600 shadow-sm'
                    : idx < currentSlideIndex
                    ? 'w-2.5 bg-emerald-300'
                    : 'w-2.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-amber-900">
            {currentSlideIndex + 1} / {slides.length}
          </span>
        </div>

        {/* Slide Content Area */}
        <div className="p-5 flex-1 overflow-y-auto flex flex-col items-center justify-between space-y-4">
          
          {/* Illustration Emoji Bubble */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-300 flex items-center justify-center shadow-inner animate-float text-5xl">
            {currentSlide.emoji}
          </div>

          {/* Dual Language Text */}
          <div className="w-full space-y-3 text-center">
            {/* English Text */}
            <p className="text-gray-800 text-base font-semibold leading-relaxed font-kids px-2">
              "{currentSlide.textEn}"
            </p>
            
            {/* Urdu Text */}
            <p className="text-emerald-950 text-lg font-urdu leading-loose px-2 pt-1 border-t border-amber-100">
              "{currentSlide.textUr}"
            </p>
          </div>

          {/* Voice Read Aloud Button */}
          <button
            onClick={handleReadAloud}
            className={`btn-bounce px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm transition-all ${
              isReadingAloud
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-300'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>
              {isReadingAloud
                ? (lang === 'ur' ? 'آواز روکیں' : 'Stop Narration')
                : (lang === 'ur' ? 'کہانی سنیں 🔊' : 'Listen Aloud 🔊')}
            </span>
          </button>

          {/* If on final slide, show Golden Moral & Hadith Box */}
          {isLastSlide && (
            <div className="w-full bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-100 border-2 border-amber-300 rounded-2xl p-3.5 space-y-2 shadow-sm animate-pop text-left">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{lang === 'ur' ? 'سنہرا سبق (Golden Moral)' : 'Golden Moral Lesson'}</span>
              </div>
              <p className="text-xs font-bold text-emerald-900">
                {lang === 'ur' ? story.moralUr : story.moralEn}
              </p>
              <div className="text-[11px] text-gray-700 italic border-t border-amber-200 pt-1.5">
                {lang === 'ur' ? story.hadithUr : story.hadithEn}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation Buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className={`btn-bounce px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 ${
              currentSlideIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-gray-200 text-gray-400'
                : 'bg-white border-2 border-emerald-200 text-emerald-800 hover:bg-emerald-50 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'ur' ? 'پیچھے' : 'Previous'}</span>
          </button>

          {isLastSlide ? (
            <div className="flex gap-2">
              {story.quiz && (
                <button
                  onClick={() => {
                    soundService.playPop();
                    openQuiz(story);
                  }}
                  className="btn-bounce bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold px-3 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 shadow-md border-2 border-amber-300"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{lang === 'ur' ? 'کوئز کھیلیں (+2⭐)' : 'Play Quiz (+2⭐)'}</span>
                </button>
              )}
              <button
                onClick={handleNext}
                className="btn-bounce bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 shadow-md"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{lang === 'ur' ? 'مکمل (+1⭐)' : 'Finish (+1⭐)'}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleNext}
              className="btn-bounce bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-2xl text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>{lang === 'ur' ? 'اگلا صفحہ' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
