import React, { useState } from 'react';
import { X, Volume2, VolumeX, Mic, Globe, ShieldCheck, Info, RotateCcw } from 'lucide-react';
import { soundService } from '../services/soundService';
import { ttsService } from '../services/ttsService';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  lang, 
  setLang, 
  soundEnabled, 
  setSoundEnabled, 
  resetAllData 
}) {
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' or 'privacy'
  const [ttsEnabled, setTtsEnabled] = useState(ttsService.isTTSEnabled());

  if (!isOpen) return null;

  const toggleSound = () => {
    const next = !soundEnabled;
    soundService.setEnabled(next);
    setSoundEnabled(next);
  };

  const toggleTTS = () => {
    const next = !ttsEnabled;
    ttsService.setEnabled(next);
    setTtsEnabled(next);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border-4 border-emerald-500 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-emerald-700 text-white px-5 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-sm font-kids">
              {lang === 'ur' ? 'والدین کا کمرہ اور ترتیبات' : 'Parents Area & Settings'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50 text-xs font-bold">
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {lang === 'ur' ? 'ایپ ترتیبات' : 'App Settings'}
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-3 border-b-2 transition-colors ${
              activeTab === 'privacy'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {lang === 'ur' ? 'پرائیویسی پالیسی (Play Store)' : 'Privacy Policy (COPPA)'}
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          
          {activeTab === 'settings' ? (
            <div className="space-y-4">
              
              {/* Language Selector */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">
                      {lang === 'ur' ? 'ایپ کی زبان (Language)' : 'App Language'}
                    </h4>
                    <p className="text-[11px] text-gray-500">English / اردو</p>
                  </div>
                </div>
                <div className="flex bg-gray-200 p-0.5 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setLang('en')}
                    className={`px-3 py-1 rounded-lg ${lang === 'en' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLang('ur')}
                    className={`px-3 py-1 rounded-lg ${lang === 'ur' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600'}`}
                  >
                    اردو
                  </button>
                </div>
              </div>

              {/* Sound Effects Switch */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">
                      {lang === 'ur' ? 'صوتی اثرات (Sound FX)' : 'Sound Effects'}
                    </h4>
                    <p className="text-[11px] text-gray-500">Pops, star chimes, fanfares</p>
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    soundEnabled ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Story Audio Narration Switch */}
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">
                      {lang === 'ur' ? 'کہانی آواز میں سننا (Voice TTS)' : 'Story Voice Narration'}
                    </h4>
                    <p className="text-[11px] text-gray-500">Read stories aloud for young kids</p>
                  </div>
                </div>
                <button
                  onClick={toggleTTS}
                  className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                    ttsEnabled ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      ttsEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Google AdMob Compliance Notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>Google Play Families Policy Ad System</span>
                </div>
                <p className="text-[11px] text-emerald-900 leading-relaxed">
                  This application strictly adheres to the <strong>Google Play Families Policy</strong> and <strong>COPPA</strong> guidelines. Advertisements served via Google AdMob are explicitly tagged as <code>tagForChildDirectedTreatment: true</code> and rated <code>G</code> for General Audiences.
                </p>
              </div>

              {/* Reset Data */}
              <button
                onClick={() => {
                  if (window.confirm('Reset all earned stars and reading progress?')) {
                    resetAllData();
                    onClose();
                  }
                }}
                className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Stars & Progress</span>
              </button>

            </div>
          ) : (
            /* Privacy Policy for Google Play Store */
            <div className="space-y-3 text-xs text-gray-700 leading-relaxed">
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 font-bold">
                NoorKids Privacy Policy (Children's Online Privacy Protection Act - COPPA Compliant)
              </div>
              <p>
                <strong>1. No Personal Data Collection:</strong> NoorKids is designed especially for children and families. We do NOT collect, store, or transmit any personally identifiable information (PII) such as names, phone numbers, addresses, or precise locations.
              </p>
              <p>
                <strong>2. Child-Directed Advertising:</strong> Our app is monetized exclusively through family-safe advertising via Google AdMob. All ad requests explicitly carry the COPPA flag (<code>childDirected: true</code>), ensuring that behavioral profiling and targeted advertisements are completely disabled.
              </p>
              <p>
                <strong>3. Video Streaming:</strong> Embedded cartoon videos are streamed safely using official embed protocols without collecting personal user identity.
              </p>
              <p>
                <strong>4. Parental Controls:</strong> Any external links, policy pages, or administrative options are strictly gated behind a math challenge verification to protect children.
              </p>
              <p>
                <strong>5. Contact:</strong> For inquiries regarding our privacy standards, contact us at: <code>support@noorkidsapp.com</code>.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="btn-bounce bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm"
          >
            {lang === 'ur' ? 'بند کریں' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
}
