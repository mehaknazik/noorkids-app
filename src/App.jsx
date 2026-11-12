import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import CartoonsSection from './components/CartoonsSection';
import StoriesSection from './components/StoriesSection';
import RewardsSection from './components/RewardsSection';
import FavoritesSection from './components/FavoritesSection';
import StoryReaderModal from './components/StoryReaderModal';
import StoryQuizModal from './components/StoryQuizModal';
import ParentalGateModal from './components/ParentalGateModal';
import SettingsModal from './components/SettingsModal';
import RewardedAdModal from './components/RewardedAdModal';
import AdBanner from './components/AdBanner';
import { soundService } from './services/soundService';

export default function App() {
  // App state with local persistence
  const [activeTab, setActiveTab] = useState('cartoons');
  const [lang, setLangState] = useState(() => localStorage.getItem('noorkids_lang') || 'ur');
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('noorkids_stars');
    return saved !== null ? parseInt(saved, 10) : 5; // Start with 5 welcome stars!
  });
  const [soundEnabled, setSoundEnabled] = useState(() => soundService.isSoundEnabled());
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('noorkids_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [completedStories, setCompletedStories] = useState(() => {
    try {
      const saved = localStorage.getItem('noorkids_completed_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [activeStoryReader, setActiveStoryReader] = useState(null);
  const [activeQuizStory, setActiveQuizStory] = useState(null);
  const [isParentalGateOpen, setIsParentalGateOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRewardedAdOpen, setIsRewardedAdOpen] = useState(false);

  // Sync state changes with localStorage
  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('noorkids_lang', newLang);
  };

  const addStar = (amount = 1) => {
    setStars((prev) => {
      const updated = prev + amount;
      localStorage.setItem('noorkids_stars', updated.toString());
      return updated;
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('noorkids_favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleCompleteStory = (storyId) => {
    if (!completedStories.includes(storyId)) {
      const next = [...completedStories, storyId];
      setCompletedStories(next);
      localStorage.setItem('noorkids_completed_stories', JSON.stringify(next));
      addStar(1);
    }
    setActiveStoryReader(null);
  };

  const handleResetAllData = () => {
    localStorage.removeItem('noorkids_stars');
    localStorage.removeItem('noorkids_favorites');
    localStorage.removeItem('noorkids_completed_stories');
    setStars(5);
    setFavorites([]);
    setCompletedStories([]);
    soundService.playPop();
  };

  return (
    <div className={`min-h-screen bg-amber-50 flex flex-col justify-between font-kids antialiased ${lang === 'ur' ? 'direction-rtl' : ''}`}>
      
      {/* Sticky Header */}
      <Header
        stars={stars}
        lang={lang}
        setLang={setLang}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        openParentalGate={() => setIsParentalGateOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 overflow-y-auto">
        {activeTab === 'cartoons' && (
          <CartoonsSection
            lang={lang}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addStar={addStar}
          />
        )}

        {activeTab === 'stories' && (
          <StoriesSection
            lang={lang}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            completedStories={completedStories}
            openStoryReader={(story) => setActiveStoryReader(story)}
          />
        )}

        {activeTab === 'rewards' && (
          <RewardsSection
            stars={stars}
            completedStories={completedStories}
            favorites={favorites}
            lang={lang}
            openRewardedAd={() => setIsRewardedAdOpen(true)}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesSection
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            lang={lang}
            openStoryReader={(story) => setActiveStoryReader(story)}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Bottom Ad Banner (Google Families compliant) */}
      <div className="fixed bottom-14 left-0 right-0 z-30">
        <AdBanner />
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
      />

      {/* Modals */}
      {activeStoryReader && (
        <StoryReaderModal
          story={activeStoryReader}
          lang={lang}
          onClose={() => setActiveStoryReader(null)}
          onComplete={handleCompleteStory}
          openQuiz={(story) => {
            setActiveStoryReader(null);
            setActiveQuizStory(story);
          }}
        />
      )}

      {activeQuizStory && (
        <StoryQuizModal
          story={activeQuizStory}
          lang={lang}
          onClose={() => setActiveQuizStory(null)}
          addStar={addStar}
        />
      )}

      <ParentalGateModal
        isOpen={isParentalGateOpen}
        onClose={() => setIsParentalGateOpen(false)}
        onSuccess={() => {
          setIsParentalGateOpen(false);
          setIsSettingsOpen(true);
        }}
        lang={lang}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={lang}
        setLang={setLang}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        resetAllData={handleResetAllData}
      />

      <RewardedAdModal
        isOpen={isRewardedAdOpen}
        onClose={() => setIsRewardedAdOpen(false)}
        onRewardClaimed={(amt) => addStar(amt)}
        lang={lang}
      />

    </div>
  );
}
