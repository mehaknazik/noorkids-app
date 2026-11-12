import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, KeyRound, Check } from 'lucide-react';
import { soundService } from '../services/soundService';

export default function ParentalGateModal({ isOpen, onClose, onSuccess, lang }) {
  const [num1, setNum1] = useState(4);
  const [num2, setNum2] = useState(7);
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate two random single/double digit numbers for parents
      const n1 = Math.floor(Math.random() * 8) + 4;
      const n2 = Math.floor(Math.random() * 9) + 5;
      setNum1(n1);
      setNum2(n2);
      setInputVal('');
      setErrorMsg(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const correctAnswer = num1 + num2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(inputVal.trim(), 10) === correctAnswer) {
      soundService.playVictory();
      onSuccess();
    } else {
      soundService.playPop();
      setErrorMsg(true);
      setInputVal('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border-4 border-amber-400">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-sm font-kids">
              {lang === 'ur' ? 'والدین کا تصدیقی گیٹ (Parental Gate)' : 'Parents Only Gate'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-2xl">
            🔒
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-sm">
              {lang === 'ur' 
                ? 'براہ کرم سوال حل کر کے تصدیق کریں کہ آپ بڑے ہیں:' 
                : 'Google Play Families Policy: Solve this math challenge to enter Settings:'}
            </h4>
            <p className="text-2xl font-bold text-emerald-800 mt-2 font-mono bg-emerald-50 py-2 rounded-xl border border-emerald-200">
              {num1} + {num2} = ?
            </p>
          </div>

          <input
            type="number"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setErrorMsg(false);
            }}
            placeholder="Answer..."
            autoFocus
            className="w-full text-center text-xl font-bold py-2 border-2 border-emerald-300 rounded-xl focus:outline-none focus:border-emerald-600 shadow-inner"
          />

          {errorMsg && (
            <p className="text-xs font-bold text-rose-600 animate-shake">
              {lang === 'ur' ? 'جواب غلط ہے، دوبارہ کوشش کریں!' : 'Incorrect answer. Please try again!'}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-bounce flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-xl text-xs"
            >
              {lang === 'ur' ? 'منسوخ' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="btn-bounce flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>{lang === 'ur' ? 'داخل ہوں' : 'Verify'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
