import { trackEvents } from '@ringcentral-integration/commons/enums/trackEvents';
import {
  AppFeatures,
  Auth,
  track,
} from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Brand,
  Locale,
} from '@ringcentral-integration/micro-core/src/app/services';
import type { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import {
  action,
  computed,
  delegate,
  dynamic,
  injectable,
  optional,
  RcModule,
  state,
  storage,
  StoragePlugin,
  watch,
} from '@ringcentral-integration/next-core';
import { includes } from 'ramda';

import type {
  CarouselOptions,
  CarouselState,
  Guides,
  UserGuideOptions,
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

@injectable({
  name: 'UserGuide',
})
export class UserGuide extends RcModule {
  constructor(
    protected _auth: Auth,
    protected _locale: Locale,
    protected _storage: StoragePlugin,
    protected _appFeatures: AppFeatures,
    protected _brand: Brand,
    @optional('UserGuideOptions')
    protected _userGuideOptions?: UserGuideOptions,
  ) {
    super();
    this._storage.enable(this);
  }

  @dynamic('Webphone')
  protected readonly _webphone?: Webphone;

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
    const oldGuides = this.allGuides[this._brand.code] ?? {};
    this.allGuides[this._brand.code] = guides;
    for (const locale of Object.keys(SUPPORTED_LOCALES)) {
      if (anyFileDiff(guides[locale], oldGuides[locale])) {
        this.start({ firstLogin: true });
        break;
      }
    }
  }

  @action
  _migrateGuides() {
    if (!this.allGuides[this._brand.code]) {
      this.allGuides[this._brand.code] = {};
    }
    Object.keys(SUPPORTED_LOCALES).forEach((locale) => {
      const allGuides: Guides = this.allGuides as any;
      if (allGuides[locale]) {
        this.allGuides[this._brand.code][locale] = allGuides[locale];
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
    return !!(super._shouldInit() && this._auth.loggedIn);
  }

  override _shouldReset() {
    return !!(super._shouldReset() || (this.ready && !this._auth.loggedIn));
  }

  override onInitOnce() {
    this._migrateGuides();
    // When there is an incoming call,
    // the guide should be dismissed
    watch(
      this,
      () => this._webphone?.ringSession,
      (ringSession) => {
        if (this._webphone?.ready && ringSession) {
          this.dismiss();
        }
      },
    );
    watch(
      this,
      () => this._brand.brandConfig,
      async () => {
        if (this.hasPermission) {
          await this.initUserGuide();
        }
      },
    );
  }

  @delegate('server')
  async _preLoadImage(url: string) {
    await new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = reject;
    });
  }

  @delegate('server')
  async preLoadImage() {
    const url = this.guides[0];
    if (url) {
      try {
        await this._preLoadImage(url);
      } catch (ex) {
        console.warn('[UserGuide] Preload image failed', ex);
      }
    }
    this.setPreLoadImageStatus();
  }

  resolveGuides(): Record<string, string[]> {
    const images = (this._brand.brandConfig.assets?.guides as string[]) || [];

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

  @delegate('server')
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

  @delegate('server')
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
      this._appFeatures.isCallingEnabled ||
      this._appFeatures.hasReadMessagesPermission
    );
  }

  @delegate('server')
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

  @delegate('server')
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
    that._locale.ready,
    that.allGuides[that._brand.code],
    that._locale.currentLocale,
  ])
  get guides() {
    if (!this._locale.ready || !this._auth.loggedIn) {
      return [];
    }
    const brandGuides = this.allGuides[this._brand.code];
    if (brandGuides) {
      const currentGuides = brandGuides[this._locale.currentLocale];
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
