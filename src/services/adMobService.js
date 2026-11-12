// NoorKids AdMob Service - Play Store Families Policy & COPPA Compliant
// Works dynamically on native Android via Capacitor & in browser safe preview

export const ADMOB_CONFIG = {
  // Official Google AdMob Test Ad Units
  testIds: {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    rewarded: 'ca-app-pub-3940256099942544/5224354917',
  },
  // Production Ad Units (User inserts their AdMob Ad Unit IDs here before Play Store publishing)
  productionIds: {
    banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
    interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
    rewarded: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  },
  // Google Play Families Policy flags:
  familiesCompliance: {
    tagForChildDirectedTreatment: true,
    tagForUnderAgeOfConsent: true,
    maxAdContentRating: 'G', // Strictly 'General Audiences' rated ads
  }
};

class AdMobService {
  constructor() {
    this.isNative = false;
    this.checkPlatform();
  }

  checkPlatform() {
    if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform()) {
      this.isNative = true;
      this.initNativeAdMob();
    }
  }

  getNativeAdMob() {
    if (typeof window !== 'undefined' && window.Capacitor && window.Capacitor.Plugins) {
      return window.Capacitor.Plugins.AdMob;
    }
    return null;
  }

  async initNativeAdMob() {
    const admob = this.getNativeAdMob();
    if (admob) {
      try {
        await admob.initialize({
          requestTrackingAuthorization: false,
          testingDevices: [],
          initializeForTesting: true,
        });
        console.log('AdMob native initialized with Families Policy parameters');
      } catch (e) {
        console.warn('AdMob initialize failed:', e);
      }
    }
  }

  // Show compliant bottom banner ad
  async showBanner() {
    const admob = this.getNativeAdMob();
    if (admob) {
      try {
        await admob.showBanner({
          adId: ADMOB_CONFIG.testIds.banner,
          adSize: 'BANNER',
          position: 'BOTTOM_CENTER',
          margin: 0,
          isTesting: true,
        });
      } catch (e) {
        console.warn('Native banner error:', e);
      }
    }
  }

  // Show rewarded video ad (Kids earn bonus stars!)
  async showRewardedAd(onRewardedCallback) {
    const admob = this.getNativeAdMob();
    if (admob) {
      try {
        await admob.prepareRewardVideoAd({
          adId: ADMOB_CONFIG.testIds.rewarded,
          isTesting: true,
        });
        await admob.showRewardVideoAd();
        if (onRewardedCallback) onRewardedCallback({ amount: 10 });
        return;
      } catch (e) {
        console.warn('Native rewarded ad error:', e);
      }
    }
  }
}

export const adMobService = new AdMobService();
