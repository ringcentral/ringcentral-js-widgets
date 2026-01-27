import type { I18nStrings } from '@ringcentral-integration/commons/modules/Brand';

export interface IAnalytics {
  track(event: string, data?: any): void;
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
   * App name.
   */
  appName?: string | I18nStrings<string>;
  /**
   * brand code
   */
  brandCode?: string;
  /**
   * App build number.
   */
  appBuildNumber?: string;
  /**
   * Mixpanel toggle, the default value is `false`.
   */
  enableMixpanel?: boolean;
  /**
   * also write track event into logger service for better debugging
   *
   * @default true
   */
  useLog?: boolean;
  /**
   * When Linger on a route for that threshold, will track that event.
   *
   * @default 1000ms
   */
  lingerThreshold?: number;
  /**
   * Track router list
   */
  trackRoutersMap?: Map<string, TrackRouter>;
  /**
   * build environment
   */
  env?: string;
  /**
   * Self-hosting Analytics js for applications with strict CSP (e.g. chrome extension mv3)
   * */
  useLocalAnalyticsJS?: boolean;
}

export type TrackRouter = {
  eventPostfix: string;
  router: string;
};

export interface IdentifyOptions {
  userId: string;
}

export interface IExtendedProps {
  [key: string]: string | number;
}
