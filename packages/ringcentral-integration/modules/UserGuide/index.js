import RcModule from '../../lib/RcModule';
import proxify from '../../lib/proxy/proxify';
import { Module } from '../../lib/di';
import actionTypes from './actionTypes';
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
    'RolesAndPermissions',
    { dep: 'UserGuideOptions', optional: true }
  ]
})
export default class UserGuide extends RcModule {
  constructor({
    auth,
    locale,
    storage,
    webphone,
    rolesAndPermissions,
    ...options
  }) {
    super({
      actionTypes,
      ...options
    });
    this._auth = auth;
    this._locale = locale;
    this._storage = storage;
    this._webphone = webphone;
    this._rolesAndPermissions = rolesAndPermissions;
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
      this._rolesAndPermissions.ready &&
      this._auth.loggedIn
    ) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
      await this.initUserGuide();
    } else if (
      this.ready && (
        !this._auth.ready ||
        !this._locale.ready ||
        !this._storage.ready ||
        !this._rolesAndPermissions.ready
      )
    ) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
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

  /**
   * Using webpack `require.context` to load guides files.
   * Image files will be ordered by file name ascendingly.
   * @return {Map<String, Array<URI>>}
   */
  resolveGuides() {
    if (this._context && typeof this._context === 'function') {
      const locales = Object.keys(SUPPORTED_LOCALES);
      return this._context.keys().sort()
        .map(key => this._context(key))
        .reduce((prev, curr) => {
          locales.forEach((locale) => {
            if (!prev[locale]) prev[locale] = [];
            if (curr.includes(locale)) {
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
    this.updateCarousel({ curIdx: 0, entered: false, playing: false });
  }

  @proxify
  async loadGuides(guides) {
    if (guides) {
      this.store.dispatch({
        type: this.actionTypes.loadGuides,
        guides
      });
    }
  }

  @proxify
  async updateCarousel({ curIdx, entered, playing }) {
    this.store.dispatch({
      type: this.actionTypes.updateCarousel,
      curIdx,
      entered,
      playing
    });
  }

  @proxify
  async initUserGuide() {
    if (!this._rolesAndPermissions.hasUserGuidePermission) return;
    // eslint-disable-next-line
    const prevGuides = this.allGuides;
    const guides = this.resolveGuides();
    // Determine if it needs to be displayed when first log in,
    // the principles behind this is to use webpack's file hash,
    // i.e. if any of the guide files is changed, the file name hash
    // will be changed as well, in this case, it will be displayed.
    await this.loadGuides(guides);
    if (JSON.stringify(guides) !== JSON.stringify(prevGuides)) {
      await this.start();
    }
  }

  @proxify
  async start() {
    // Start guides only when images are ready
    if (this.guides.length > 0) {
      this.store.dispatch({
        type: this.actionTypes.updateCarousel,
        curIdx: 0,
        entered: true,
        playing: true,
      });
    }
  }

  get guides() {
    if (!this._locale.ready) return [];
    if (this.allGuides) {
      return this.allGuides[this._locale.currentLocale] ||
        this.allGuides[SUPPORTED_LOCALES['en-US']] || [];
    }
    return [];
  }

  get allGuides() {
    if (!this._storage.ready) return [];
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
}
