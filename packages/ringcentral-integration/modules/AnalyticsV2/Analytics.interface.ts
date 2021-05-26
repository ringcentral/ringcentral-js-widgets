import { BrandConfig } from '../BrandV2';
import { AccountInfo } from '../AccountInfoV2';
import { ExtensionInfo } from '../ExtensionInfoV2';
import { Locale } from '../LocaleV2';

interface RouterInteraction {
  currentPath: string;
}

interface Auth {
  loggedIn: boolean;
  ownerId: string;
}

export interface Deps {
  auth: Auth;
  brandConfig: BrandConfig;
  analyticsOptions: AnalyticsOptions;
  accountInfo?: AccountInfo;
  extensionInfo?: ExtensionInfo;
  locale?: Locale;
  routerInteraction?: RouterInteraction;
}

export interface AnalyticsOptions {
  /**
   * Segment key.
   */
  analyticsKey: string;
  /**
   * App version.
   */
  appVersion: string;
  /**
   * Pendo toggle, the default value is `false`.
   */
  enablePendo?: boolean;
  /**
   * Pendo app key.
   */
  pendoApiKey?: string;
  /**
   * Enable memory log, the default value is `false`.
   */
  useLog?: boolean;
  /**
   * Linger the router timeout, the default value is 1s.
   */
  lingerThreshold?: number;
  /**
   * Track router list
   */
  trackRouters?: TrackRouter[];

  env?: string;
}

export interface TrackProps {
  appName: string;
  appVersion: string;
  brand: string;
  'App Language': string;
  'Browser Language': string;
  'Extension Type': string;
}

export interface TrackRouter {
  eventPostfix: string;
  router: string;
}

export interface TrackLog {
  timeStamp: string;
  event: string;
  trackProps: TrackProps;
}

export interface PendoAgent {
  visitor: {
    id: string;
    appName: string;
    appVersion: string;
    appBrand: string;
    plaBrand: string;
    countryCode?: string;
    companyName?: string;
    [key: string]: string;
  };
  account: {
    id: string;
    [key: string]: string;
  };
}

export interface IdentifyOptions {
  userId: string;
  [K: string]: any;
}
