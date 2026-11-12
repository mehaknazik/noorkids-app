// NoorKids Text-to-Speech (TTS) Narration Service
// Reads story slides aloud for young children in English or Urdu

class TTSService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.enabled = localStorage.getItem('noorkids_tts') !== 'false';
    this.isSpeaking = false;
  }

  setEnabled(val) {
    this.enabled = val;
    localStorage.setItem('noorkids_tts', val ? 'true' : 'false');
    if (!val) {
      this.stop();
    }
  }

  isTTSEnabled() {
    return this.enabled;
  }

  speak(text, lang = 'en', onEnd = null) {
    if (!this.enabled || !this.synth) return;

    this.stop();

    if (!text || text.trim() === '') return;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower, clear for kids
      utterance.pitch = 1.1; // Cheerful tone

      if (lang === 'ur') {
        utterance.lang = 'ur-PK';
      } else {
        utterance.lang = 'en-US';
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        console.warn('TTS error:', e);
        this.isSpeaking = false;
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.warn('TTS speak exception:', e);
    }
  }

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        console.warn('TTS cancel error', e);
      }
    }
    this.isSpeaking = false;
  }
}

export const ttsService = new TTSService();
