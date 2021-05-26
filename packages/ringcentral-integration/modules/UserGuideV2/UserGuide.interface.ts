import { Auth } from '../AuthV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { Locale } from '../LocaleV2';
import { Storage } from '../StorageV2';
import { Webphone } from '../WebphoneV2';

export interface UserGuideOptions {
  // TODO: fix type with `@types/webpack-env` - `RequireContext`
  context: any;
}

export interface Deps {
  auth: Auth;
  locale: Locale;
  storage: Storage;
  webphone: Webphone;
  extensionFeatures: ExtensionFeatures;
  userGuideOptions?: UserGuideOptions;
}

export interface CarouselOptions extends CarouselState {
  firstLogin?: boolean;
}

export interface CarouselState {
  curIdx: number;
  entered: boolean;
  playing: boolean;
}

export type Guides = Record<string, string[]>;
