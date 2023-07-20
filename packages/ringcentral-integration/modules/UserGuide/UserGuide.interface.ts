import type { AppFeatures } from '../AppFeatures';
import type { Auth } from '../Auth';
import type { Brand } from '../Brand';
import type { Locale } from '../Locale';
import type { Storage } from '../Storage';
import type { Webphone } from '../Webphone';

export interface UserGuideOptions {
  // TODO: fix type with `@types/webpack-env` - `RequireContext`
  context: any;
}

export interface Deps {
  auth: Auth;
  locale: Locale;
  storage: Storage;
  webphone: Webphone;
  appFeatures: AppFeatures;
  userGuideOptions?: UserGuideOptions;
  brand: Brand;
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
