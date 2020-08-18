export interface BrandConfig {
  /**
   * Brand ID registered in RingCentral
   */
  id: string;
  /**
   * Brand Code registered in RingCentral
   */
  code: string;
  /**
   * Deprecated brand code property.
   */
  brandCode?: string;
  /**
   * Simple name of the brand
   */
  name: string;
  /**
   * Full name of the brand. Used in places where displaying
   * the full name is preferred.
   */
  fullName?: string;
  /**
   * Short name of the brand. Used in places where the display
   * area is limited.
   */
  shortName?: string;
  /**
   * Name of the application.
   */
  appName: string;
  /**
   * Name of the integration target of the application.
   */
  application: string;
  /**
   * Teleconference Url
   */
  teleconference?: string;
  /**
   * Signup Url
   */
  signupUrl?: string;
  /**
   * List of supported locales.
   */
  supportedLocales?: string[];
  /**
   * Prefered product name for zoom meetings.
   */
  zoomProductName?: string;
  /**
   * Prefered product name for RCVideo.
   */
  rcvProductName?: string;
}

export interface Deps {
  brandConfig: BrandConfig;
  prefix?: string;
}
