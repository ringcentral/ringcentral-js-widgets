import type { AccountInfo } from '../AccountInfo';
import type { Brand } from '../Brand';
import { Environment } from '../Environment';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { ExtensionInfo } from '../ExtensionInfo';
import type { Locale } from '../Locale';

interface RouterInteraction {
  currentPath: string;
}

interface Auth {
  loggedIn: boolean;
  ownerId: string;
}

export interface Deps {
  auth: Auth;
  brand: Brand;
  environment: Environment;
  extensionFeatures: ExtensionFeatures;
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

  /** Self-hosting the Pendo Agent for applications with strict CSP  */
  useLocalPendoJS?: boolean;

  /** Self-hosting Analytics js for applications with strict CSP (e.g. chrome extension mv3)  */
  useLocalAnalyticsJS?: boolean;
  /** migrate to mixpanel */
  enableMixpanel?: boolean;
}

export interface TrackProps {
  appName: string;
  appVersion: string;
  brand: string;
  'App Language': string;
  'Browser Language': string;
  'Extension Type': string;
  'App Init Time': number;
  id?: string;
}

export type TrackRouter =
  | {
      eventPostfix: string;
      router: string;
    }
  | null
  | undefined;
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
    plaBrand?: string;
    countryCode?: string;
    [key: string]: string | undefined;
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

export interface IExtendedProps {
  [key: string]: string | number;
}
