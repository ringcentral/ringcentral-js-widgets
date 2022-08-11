import { includes } from 'ramda';

import {
  action,
  computed,
  RcModuleV2,
  state,
  storage,
  track,
  watch,
} from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';
import { trackEvents } from '../../enums/trackEvents';
import {
  CarouselOptions,
  CarouselState,
  Deps,
  Guides,
} from './UserGuide.interface';

export const SUPPORTED_LOCALES = {
  'en-US': 'en-US',
  'fr-CA': 'fr-CA',
};

function getFileName(fileUrl: string) {
  return fileUrl.split('\\').pop()?.split('/').pop();
}

// Since file name has included file MD5, any file name change means file change
function anyFileDiff(urls1: string[], urls2: string[]) {
  const files1 = (urls1 ?? []).map((url) => getFileName(url));
  const files2 = (urls2 ?? []).map((url) => getFileName(url));
  return JSON.stringify(files1) !== JSON.stringify(files2);
}

@Module({
  name: 'UserGuide',
  deps: [
    'Auth',
    'Locale',
    'Storage',
    'Webphone',
    'AppFeatures',
    'Brand',
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
  allGuides: { [key: string]: Guides } = {};

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
    const oldGuides = this.allGuides[this._deps.brand.code] ?? {};
    this.allGuides[this._deps.brand.code] = guides;
    for (const locale of Object.keys(SUPPORTED_LOCALES)) {
      if (anyFileDiff(guides[locale], oldGuides[locale])) {
        this.start({ firstLogin: true });
        break;
      }
    }
  }

  @action
  _migrateGuides() {
    if (!this.allGuides[this._deps.brand.code]) {
      this.allGuides[this._deps.brand.code] = {};
    }
    Object.keys(SUPPORTED_LOCALES).forEach((locale) => {
      const allGuides: Guides = this.allGuides as any;
      if (allGuides[locale]) {
        this.allGuides[this._deps.brand.code][locale] = allGuides[locale];
        delete allGuides[locale];
      }
    });
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

  override async onInitSuccess() {
    if (this.hasPermission) {
      await this.initUserGuide();
    }
  }

  override _shouldInit() {
    return !!(
      this.pending &&
      this._deps.auth.ready &&
      this._deps.auth.loggedIn &&
      this._deps.locale.ready &&
      this._deps.storage.ready &&
      this._deps.appFeatures.ready &&
      this._deps.brand.ready
    );
  }

  override _shouldReset() {
    return !!(
      this.ready &&
      (!this._deps.auth.ready ||
        !this._deps.locale.ready ||
        !this._deps.storage.ready ||
        !this._deps.appFeatures.ready ||
        !this._deps.brand.ready)
    );
  }

  override onInitOnce() {
    this._migrateGuides();
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
    watch(
      this,
      () => this._deps.brand.brandConfig,
      async () => {
        if (this.hasPermission) {
          await this.initUserGuide();
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
   */
  resolveGuides(): Record<string, string[]> {
    let images =
      (this._deps.brand.brandConfig.assets?.guides as string[]) || [];

    if (
      images.length === 0 &&
      typeof this._deps.userGuideOptions?.context === 'function'
    ) {
      images = this._deps.userGuideOptions.context
        .keys()
        .sort()
        .map((key: string) => {
          const value = this._deps.userGuideOptions!.context(key);
          return typeof value === 'string' ? value : value?.default;
        }) as string[];
    }

    const locales = Object.keys(SUPPORTED_LOCALES);
    return images.reduce<Record<string, string[]>>((acc, curr: string) => {
      locales.forEach((locale) => {
        if (!acc[locale]) {
          acc[locale] = [];
        }
        if (includes(locale, curr)) {
          acc[locale].push(curr);
        }
      });
      return acc;
    }, {});
  }

  @proxify
  async dismiss() {
    if (
      this.carouselState.curIdx !== 0 ||
      this.carouselState.playing ||
      this.carouselState.entered ||
      this.firstLogin
    ) {
      this.updateCarousel({
        curIdx: 0,
        entered: false,
        playing: false,
        firstLogin: false,
      });
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
      this._deps.appFeatures.isCallingEnabled ||
      this._deps.appFeatures.hasReadMessagesPermission
    );
  }

  @proxify
  async initUserGuide() {
    const guides = this.resolveGuides();
    // Determine if it needs to be displayed when first log in,
    // the principles behind this is to use webpack's file hash,
    // i.e. if any of the guide files is changed, the file name hash
    // will be changed as well, in this case, it will be displayed.
    if (guides) {
      this.setGuides(guides);
      await this.preLoadImage();
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
    that.allGuides[that._deps.brand.code],
    that._deps.locale.currentLocale,
  ])
  get guides() {
    if (!this._deps.locale.ready) {
      return [];
    }
    const brandGuides = this.allGuides[this._deps.brand.code];
    if (brandGuides) {
      const currentGuides = brandGuides[this._deps.locale.currentLocale];
      if (currentGuides && currentGuides.length > 0) {
        return currentGuides;
      }
      return brandGuides[SUPPORTED_LOCALES['en-US']] || [];
    }
    return [];
  }

  get started() {
    return this.carouselState.entered && this.carouselState.playing;
  }
}
