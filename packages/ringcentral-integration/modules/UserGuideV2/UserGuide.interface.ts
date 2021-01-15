import { Auth } from '../AuthV2';
import { Locale } from '../LocaleV2';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';
import { Storage } from '../StorageV2';
import { Webphone } from '../WebphoneV2';

export interface UserGuideOptions {
  //
}

export interface Deps {
  auth: Auth;
  locale: Locale;
  storage: Storage;
  webphone: Webphone;
  rolesAndPermissions: RolesAndPermissions;
  context: Context;
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

export interface Context {
  (path: string): string;
  keys(): string[];
}
