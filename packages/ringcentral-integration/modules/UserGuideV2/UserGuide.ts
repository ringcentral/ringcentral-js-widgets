import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
  watch,
} from '@ringcentral-integration/core';
import { contains } from 'ramda';
import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { trackEvents } from '../Analytics';
import {
  CarouselOptions,
  CarouselState,
  Deps,
  Guides,
} from './UserGuide.interface';

const SUPPORTED_LOCALES = {
  'en-US': 'en-US',
  'fr-CA': 'fr-CA',
};

@Module({
  name: 'UserGuide',
  deps: [
    'Auth',
    'Locale',
    'Storage',
    'Webphone',
    'ExtensionFeatures',
    { dep: 'UserGuideOptions', optional: true },
  ],
})
export class UserGuide extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'UserGuide',
    });
  }

  @storage
  @state
  allGuides: Guides = {};

  @state
  carouselState: CarouselState = {
    curIdx: 0,
    entered: false,
    playing: false,
  };

  @state
  preLoadImageStatus = false;

  @state
  firstLogin = false;

  @action
  setPreLoadImageStatus() {
    this.preLoadImageStatus = true;
  }

  @action
  setGuides(guides: Guides) {
    this.allGuides = guides;
  }

  @track((that: UserGuide, options: Required<CarouselOptions>) => {
    if (options.curIdx === 0 && options.playing) {
      return [trackEvents.whatsNew];
    }
  })
  @action
  setCarousel({ firstLogin, ...carouselState }: Required<CarouselOptions>) {
    this.carouselState = carouselState;
    this.firstLogin = firstLogin;
  }

  async onInitSuccess() {
    await this.initUserGuide();
    await this.preLoadImage();
  }

  _shouldInit() {
    return !!(
      this.pending &&
      this._deps.auth.ready &&
      this._deps.locale.ready &&
      this._deps.storage.ready &&
      this._deps.extensionFeatures.ready &&
      this._deps.auth.loggedIn
    );
  }

  _shouldReset() {
    return !!(
      this.ready &&
      (!this._deps.auth.ready ||
        !this._deps.locale.ready ||
        !this._deps.storage.ready ||
        !this._deps.extensionFeatures.ready)
    );
  }

  onInitOnce() {
    // When there is an incoming call,
    // the guide should be dismissed
    watch(
      this,
      () => this._deps.webphone.ringSession,
      (ringSession) => {
        if (this._deps.webphone.ready && ringSession) {
          this.dismiss();
        }
      },
    );
  }

  @proxify
  async _preLoadImage(url: string) {
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = reject;
    });
  }

  @proxify
  async preLoadImage() {
    const url = this.guides[0];
    if (url) {
      await this._preLoadImage(url);
    }
    this.setPreLoadImageStatus();
  }

  /**
   * Using webpack `require.context` to load guides files.
   * Image files will be sorted by file name in ascending order.
   * @return {Map<String, Array<URI>>}
   */
  resolveGuides() {
    if (typeof this._deps.userGuideOptions?.context === 'function') {
      const locales = Object.keys(SUPPORTED_LOCALES);
      return this._deps.userGuideOptions.context
        .keys()
        .sort()
        .map((key: string) => this._deps.userGuideOptions.context(key))
        .reduce((prev: Record<string, string[]>, curr: string) => {
          locales.forEach((locale) => {
            if (!prev[locale]) prev[locale] = [];
            if (contains(locale, curr)) {
              prev[locale].push(curr);
            }
          });
          return prev;
        }, {} as Record<string, string[]>);
    }
    return {};
  }

  @proxify
  async dismiss() {
    this.updateCarousel({
      curIdx: 0,
      entered: false,
      playing: false,
      firstLogin: false,
    });
  }

  @proxify
  async loadGuides(guides: Guides) {
    if (guides) {
      this.setGuides(guides);
    }
  }

  @proxify
  async updateCarousel({
    curIdx,
    entered,
    playing,
    firstLogin = this.firstLogin,
  }: CarouselOptions) {
    this.setCarousel({
      curIdx,
      entered,
      playing,
      firstLogin,
    });
  }

  get hasPermission() {
    // For extensions without calling or read message permissions, most of the content in
    // the user guide is not applicable to them. So we should not show the user guide for
    // these extensions.
    return (
      this._deps.extensionFeatures.isCallingEnabled ||
      this._deps.extensionFeatures.hasReadMessagesPermission
    );
  }

  @proxify
  async initUserGuide() {
    if (!this.hasPermission) return;
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
    this.setCarousel({
      curIdx: 0,
      entered: true,
      playing: true,
      firstLogin,
    });
  }

  @computed((that: UserGuide) => [
    that._deps.locale.ready,
    that.allGuides,
    that._deps.locale.currentLocale,
  ])
  get guides() {
    if (!this._deps.locale.ready) return [];
    if (this.allGuides) {
      const currentGuides = this.allGuides[this._deps.locale.currentLocale];
      if (currentGuides && currentGuides.length > 0) return currentGuides;
      return this.allGuides[SUPPORTED_LOCALES['en-US']] || [];
    }
    return [];
  }

  get started() {
    return this.carouselState.entered && this.carouselState.playing;
  }
}
