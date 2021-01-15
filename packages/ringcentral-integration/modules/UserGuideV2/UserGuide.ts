import { contains } from 'ramda';
import {
  action,
  RcModuleV2,
  state,
  storage,
  computed,
  watch,
  track,
} from '@ringcentral-integration/core';
import proxify from '../../lib/proxy/proxify';
import { Module } from '../../lib/di';
import { trackEvents } from '../Analytics';
import {
  CarouselOptions,
  CarouselState,
  Context,
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
    'RolesAndPermissions',
    { dep: 'UserGuideOptions', optional: true },
  ],
})
export class UserGuide extends RcModuleV2<Deps> {
  protected _context: Context;

  constructor(deps: Deps) {
    super({
      deps,
      enableCache: true,
      storageKey: 'UserGuide',
    });
    // TODO: refactor providing context without DI
    this._context = deps.context;
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
      this._deps.rolesAndPermissions.ready &&
      this._deps.auth.loggedIn
    );
  }

  _shouldReset() {
    return !!(
      this.ready &&
      (!this._deps.auth.ready ||
        !this._deps.locale.ready ||
        !this._deps.storage.ready ||
        !this._deps.rolesAndPermissions.ready)
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

  @proxify
  async initUserGuide() {
    if (!this._deps.rolesAndPermissions.hasUserGuidePermission) return;
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

  @computed<UserGuide>((that) => [
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
