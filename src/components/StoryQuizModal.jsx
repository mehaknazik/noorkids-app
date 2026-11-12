import React, { useState } from 'react';
import { X, CheckCircle, HelpCircle, Star, Sparkles } from 'lucide-react';
import { soundService } from '../services/soundService';
import confetti from 'canvas-confetti';

export default function StoryQuizModal({ story, lang, onClose, addStar }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const quiz = story.quiz;
  if (!quiz) return null;

  const question = lang === 'ur' ? quiz.questionUr : quiz.questionEn;
  const options = lang === 'ur' ? quiz.optionsUr : quiz.optionsEn;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelectedOption(idx);
    setAnswered(true);

    if (idx === quiz.correctIndex) {
      setIsCorrect(true);
      soundService.playVictory();
      addStar(2); // 2 bonus stars for quiz
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } else {
      setIsCorrect(false);
      soundService.playPop();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border-4 border-amber-300 flex flex-col">
        
        {/* Header */}
        <div className="bg-amber-400 text-emerald-950 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-900" />
            <h3 className={`font-bold text-sm ${lang === 'ur' ? 'font-urdu' : 'font-kids'}`}>
              {lang === 'ur' ? 'ننھا اسلامی کوئز (+2⭐)' : 'Little Deen Quiz (+2⭐)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="btn-bounce w-8 h-8 rounded-full bg-emerald-900/10 hover:bg-emerald-900/20 flex items-center justify-center text-emerald-950"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Body */}
        <div className="p-5 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-3xl shadow-inner animate-bounce">
            🎯
          </div>

          <h4 className={`text-center font-bold text-gray-800 text-base leading-relaxed ${lang === 'ur' ? 'font-urdu text-lg' : 'font-kids'}`}>
            {question}
          </h4>

          {/* Options */}
          <div className="space-y-2.5">
            {options.map((opt, idx) => {
              const isPicked = selectedOption === idx;
              const isRightOne = idx === quiz.correctIndex;
              let btnStyle = 'bg-white border-2 border-emerald-100 text-gray-800 hover:border-emerald-300';

              if (answered) {
                if (isRightOne) {
                  btnStyle = 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-md animate-pop';
                } else if (isPicked && !isRightOne) {
                  btnStyle = 'bg-rose-100 text-rose-700 border-2 border-rose-300';
                } else {
                  btnStyle = 'bg-gray-100 text-gray-400 border-2 border-gray-200 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={answered}
                  className={`btn-bounce w-full p-3.5 rounded-2xl font-bold text-xs text-left transition-all flex items-center justify-between ${btnStyle} ${lang === 'ur' ? 'font-urdu text-right flex-row-reverse text-sm' : ''}`}
                >
                  <span>{opt}</span>
                  {answered && isRightOne && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Result Feedback Banner */}
          {answered && (
            <div className={`p-3.5 rounded-2xl text-center text-xs font-bold animate-pop ${
              isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {isCorrect ? (
                <div className="flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>
                    {lang === 'ur' 
                      ? 'ماشاءاللہ! بالکل صحیح جواب! آپ کو 2 ستارے ملے۔ ⭐⭐' 
                      : 'MashaAllah! Excellent answer! You earned 2 Golden Stars! ⭐⭐'}
                  </span>
                </div>
              ) : (
                <span>
                  {lang === 'ur'
                    ? 'کوئی بات نہیں پیارے بچے، کہانی دوبارہ پڑھ کر کوشش کریں! 🌸'
                    : 'Good try, little friend! Read the story again to find the answer! 🌸'}
                </span>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onClose}
            className="btn-bounce w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-2xl text-xs shadow-md"
          >
            {lang === 'ur' ? 'واپس جائیں' : 'Continue'}
          </button>
        </div>

      </div>
    </div>
  );
}
