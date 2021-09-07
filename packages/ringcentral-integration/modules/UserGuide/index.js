import { contains } from 'ramda';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import { actionTypes } from './actionTypes';
import getUserGuideReducer, { getGuidesReducer } from './getUserGuideReducer';

/**
 * Support localization
 */
const SUPPORTED_LOCALES = {
  'en-US': 'en-US',
  'fr-CA': 'fr-CA',
};

@Module({
  deps: [
    'Auth',
    'Locale',
    'Storage',
    'Webphone',
    'AppFeatures',
    { dep: 'UserGuideOptions', optional: true },
  ],
})
export default class UserGuide extends RcModule {
  constructor({ auth, locale, storage, webphone, appFeatures, ...options }) {
    super({
      actionTypes,
      ...options,
    });
    this._auth = auth;
    this._locale = locale;
    this._storage = storage;
    this._webphone = webphone;
    this._appFeatures = appFeatures;
    this._reducer = getUserGuideReducer(this.actionTypes);

    this._context = options.context;

    this._storageKey = 'userGuide';
    this._guideReducer = getGuidesReducer(this.actionTypes);
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: this._guideReducer,
    });
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    if (
      this.pending &&
      this._auth.ready &&
      this._locale.ready &&
      this._storage.ready &&
      this._appFeatures.ready &&
      this._auth.loggedIn
    ) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
      await this.initUserGuide();
      await this.preLoadImage();
    } else if (
      this.ready &&
      (!this._auth.ready ||
        !this._locale.ready ||
        !this._storage.ready ||
        !this._appFeatures.ready)
    ) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
    // When there is an incoming call,
    // the guide should be dismissed
    if (
      this._webphone.ready &&
      this._webphone.ringSession &&
      this._webphone.ringSession !== this._lastRingSession
    ) {
      this._lastRingSession = this._webphone.ringSession;
      this.dismiss();
    }
  }

  @proxify
  async _preLoadImage(url) {
    await new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = resolve;
    });
  }

  @proxify
  async preLoadImage() {
    const url = this.guides[0];
    if (url) {
      await this._preLoadImage(url);
    }
    this.store.dispatch({
      type: this.actionTypes.preLoadImageStatus,
    });
  }

  /**
   * Using webpack `require.context` to load guides files.
   * Image files will be ordered by file name ascendingly.
   * @return {Map<String, Array<URI>>}
   */
  resolveGuides() {
    if (this._context && typeof this._context === 'function') {
      const locales = Object.keys(SUPPORTED_LOCALES);
      return this._context
        .keys()
        .sort()
        .map((key) => this._context(key))
        .reduce((prev, curr) => {
          locales.forEach((locale) => {
            if (!prev[locale]) prev[locale] = [];
            if (contains(locale, curr)) {
              prev[locale].push(curr);
            }
          });
          return prev;
        }, {});
    }
    return {};
  }

  @proxify
  dismiss() {
    this.updateCarousel({
      curIdx: 0,
      entered: false,
      playing: false,
      firstLogin: false,
    });
  }

  @proxify
  async loadGuides(guides) {
    if (guides) {
      this.store.dispatch({
        type: this.actionTypes.loadGuides,
        guides,
      });
    }
  }

  @proxify
  async updateCarousel({
    curIdx,
    entered,
    playing,
    firstLogin = this.state.firstLogin,
  }) {
    this.store.dispatch({
      type: this.actionTypes.updateCarousel,
      curIdx,
      entered,
      playing,
      firstLogin,
    });
  }

  get hasPermission() {
    return (
      this._appFeatures.isCallingEnabled ||
      this._appFeatures.hasReadMessagePermission
    );
  }

  @proxify
  async initUserGuide() {
    if (!this.hasPermission) return;
    // eslint-disable-next-line
    const prevGuides = this.allGuides;
    const guides = this.resolveGuides();
    // Determine if it needs to be displayed when first log in,
    // the principles behind this is to use webpack's file hash,
    // i.e. if any of the guide files is changed, the file name hash
    // will be changed as well, in this case, it will be displayed.
    await this.loadGuides(guides);
    if (JSON.stringify(guides) !== JSON.stringify(prevGuides)) {
      this.start({ firstLogin: true });
    }
  }

  @proxify
  async start({ firstLogin = false } = {}) {
    // Start guides only when images are ready
    this.store.dispatch({
      type: this.actionTypes.updateCarousel,
      curIdx: 0,
      entered: true,
      playing: true,
      firstLogin,
    });
  }

  get guides() {
    if (!this._locale.ready) return [];
    if (this.allGuides) {
      const currentGuides = this.allGuides[this._locale.currentLocale];
      if (currentGuides && currentGuides.length > 0) return currentGuides;
      return this.allGuides[SUPPORTED_LOCALES['en-US']] || [];
    }
    return [];
  }

  get allGuides() {
    if (!this._storage.ready) return null;
    return this._storage.getItem(this._storageKey);
  }

  get carouselState() {
    return this.state.carouselState;
  }

  get started() {
    return this.carouselState.entered && this.carouselState.playing;
  }

  get status() {
    return this.state.status;
  }

  get preLoadImageStatus() {
    return this.state.preLoadImageStatus;
  }
}
