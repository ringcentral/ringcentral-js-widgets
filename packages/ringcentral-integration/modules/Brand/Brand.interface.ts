import type { RcThemeSwitcherProviderProps } from '@ringcentral/juno';

export interface CallWithJupiterConfig {
  /**
   * Branded Jupiter call  link
   */
  link: string;
  /**
   * Branded Jupiter call protocol
   */
  protocol: string;
  /**
   * Branded Jupiter app name
   */
  name: string;
}

/**
 * css module variables
 *
 * ! should not add new variables more, use Juno token please
 */
export type CssModuleVariable = {
  rcBlue?: string;
  bigRed?: string;
  darkRed?: string;
  tomato?: string;
  orange?: string;
  leaf?: string;
  dark?: string;
  night?: string;
  ash?: string;
  coin?: string;
  smoke?: string;
  silver?: string;
  egg?: string;
  snow?: string;
  rcOrange?: string;
  darkergray?: string;
  darkgray?: string;
  gray?: string;
  bggray?: string;
  lightergray?: string;
  lightgray?: string;
  greyLight?: string;
  missed?: string;
  active?: string;
  primaryColor?: string;
  primaryColorHighlight?: string;
  primaryColorHighlightSolid?: string;
  linePanelBackgroundColor?: string;
  callBtnColor?: string;
  extensionBackgroundColor?: string;
  smsBubbleBackgroundColor?: string;
  brandFontColor?: string;
  brandFontColorHighlight?: string;
  jupiterBackgroundColor?: string;

  // project related
  c2dArrowColor?: string;
  addMeetingBtnColor?: string;
  addMeetingBtnTextColor?: string;
  headerLogoWidth?: string;
  headerLogoHeight?: string;
};

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
   * App default locales.
   */
  defaultLocale?: string;
  /**
   * Preferred product name for zoom meetings.
   */
  rcmProductName?: string;
  /**
   * Preferred product name for RCVideo.
   */
  rcvProductName?: string;
  /**
   * Rcv E2EE support link
   */
  rcvE2EESupportUrl?: string;
  /**
   * call with Jupiter
   */
  callWithJupiter: {
    default: CallWithJupiterConfig;
  } & Record<string, CallWithJupiterConfig>;
  /**
   *
   */
  meetingUriReg: {
    /**
     *
     */
    rcv: string;
    /**
     *
     */
    rcm: string;
  };
  /**
   * rcv meeting teleconference Url
   * https://docs.google.com/spreadsheets/d/1fizbsFfVt0jur4BjJnYOD1bk1t_oH0XTquRNTfyv4Ws
   */
  rcvTeleconference: string;
  /**
   * allow region setting
   */
  allowRegionSetting?: boolean;
  /**
   * spartan Protocol
   */
  spartanProtocol?: string;
  /**
   * Allow JupiterUniversalLink
   */
  allowJupiterUniversalLink?: boolean;
  /**
   * theme for `RcThemeProvider`
   */
  theme?: RcThemeSwitcherProviderProps & {
    /**
     * variable for css module
     *
     * * make sure you need update that, all token should always get from Juno theme, prevent to use that
     */
    variable?: CssModuleVariable;
  };
}

export interface Deps<T extends BrandConfig = BrandConfig> {
  brandConfig: T;
  prefix?: string;
}
