import { LocaleCode } from '@ringcentral-integration/locale-settings';
import type { PaletteReturnType, RcThemeInput } from '@ringcentral/juno';

export const I18nFlag = '__i18n__';

export type I18nStrings<T = string> = {
  [I18nFlag]: true;
  translations: {
    [k: string]: T;
  };
};

export type URL = `https://${string}` | `http://${string}`;

export type Protocol = `${string}://`;

type CssModuleVariableValue = string | PaletteReturnType;

/**
 * css module variables
 *
 * ! should not add new variables more, use Juno token please
 */
export type CssModuleVariable = {
  rcBlue?: CssModuleVariableValue;
  bigRed?: CssModuleVariableValue;
  darkRed?: CssModuleVariableValue;
  tomato?: CssModuleVariableValue;
  orange?: CssModuleVariableValue;
  leaf?: CssModuleVariableValue;
  dark?: CssModuleVariableValue;
  night?: CssModuleVariableValue;
  ash?: CssModuleVariableValue;
  coin?: CssModuleVariableValue;
  smoke?: CssModuleVariableValue;
  silver?: CssModuleVariableValue;
  egg?: CssModuleVariableValue;
  snow?: CssModuleVariableValue;
  rcOrange?: CssModuleVariableValue;
  darkergray?: CssModuleVariableValue;
  darkgray?: CssModuleVariableValue;
  gray?: CssModuleVariableValue;
  bggray?: CssModuleVariableValue;
  lightgray?: CssModuleVariableValue;
  greyLight?: CssModuleVariableValue;
  missed?: CssModuleVariableValue;
  active?: CssModuleVariableValue;
  primaryColor?: CssModuleVariableValue;
  primaryColorHighlight?: CssModuleVariableValue;
  primaryColorHighlightSolid?: CssModuleVariableValue;
  linePanelBackgroundColor?: CssModuleVariableValue;
  callBtnColor?: CssModuleVariableValue;
  extensionBackgroundColor?: CssModuleVariableValue;
  smsBubbleBackgroundColor?: CssModuleVariableValue;
  brandFontColor?: CssModuleVariableValue;
  brandFontColorHighlight?: CssModuleVariableValue;
  jupiterBackgroundColor?: CssModuleVariableValue;

  // project related
  c2dArrowColor?: CssModuleVariableValue;
  addMeetingBtnColor?: CssModuleVariableValue;
  addMeetingBtnTextColor?: CssModuleVariableValue;
  extOptionBtnColor?: CssModuleVariableValue;
};

export interface PhoneAppDownloadUrlType {
  default?: string;
  windows?: string;
  mac?: string;
}

export type Mode = 'development' | 'production';
export interface CallWithJupiterConfig {
  /**
   * Branded Jupiter call  link
   */
  link: URL;
  /**
   * Branded Jupiter call protocol
   */
  protocol: Protocol;
  /**
   * Branded Jupiter app name
   */
  name: I18nStrings | string;

  /**
   * phone call app download url, set as a string if only one url, else set Windows and Mac separately with an object.
   */
  appDownloadUrl?: PhoneAppDownloadUrlType;
}

export interface CallWithSoftphoneConfig {
  /**
   * Softphone protocol
   */
  protocol: Protocol;
  /**
   * Softphone app name
   */
  name: I18nStrings | string;

  /**
   * phone call app download url, set as a string if only one url, else set Windows and Mac separately with an object.
   */
  appDownloadUrl?: PhoneAppDownloadUrlType;
}

export interface SubBrand {
  id: string;
  code: string;
}

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
   * Full name of the brand, aka fullBrandName
   */
  name: I18nStrings | string;
  /**
   * Short name of the brand. Used in places where the display
   * area is limited. aka shortBrandName
   */
  shortName: I18nStrings | string;
  /**
   * Name of the application.
   */
  appName: I18nStrings | string;
  /**
   * Short name of the application. Used in where can't accept special characters.
   */
  shortAppName?: I18nStrings | string;
  /**
   * Name of the integration target of the application.
   */
  application: string;
  /**
   * Eula or Terms of Service link
   */
  eulaLink?: I18nStrings<URL> | URL;
  /**
   * Eula or Terms of Service link label
   */
  eulaLabel?: I18nStrings | string;
  /**
   * Teleconference Url (for RCM)
   */
  teleconference?: URL;
  /**
   * Signup Url
   */
  signupUrl?: string;
  /**
   * List of supported locales.
   */
  supportedLocales?: readonly LocaleCode[];
  /**
   * App default locales.
   */
  defaultLocale?: LocaleCode;

  /**
   * Preferred product name for zoom meetings.
   */
  rcmProductName?: I18nStrings | string;
  /**
   * Preferred product name for RCVideo.
   */
  rcvProductName: I18nStrings | string;
  /**
   * Feature toggle: enable rcm schedule on behalf feature
   */
  enableRcmScheduleOnBehalf?: boolean;
  /**
   * Rcv E2EE support link
   */

  rcvE2EESupportUrl?: URL;
  /**
   * RCV default Meeting topic
   */
  rcvMeetingTopic: I18nStrings | string;
  /**
   * RCV Settings title
   */
  rcvSettingsTitle: I18nStrings | string;
  /**
   * RCV invite meeting content
   */
  rcvInviteMeetingContent: I18nStrings | string;
  /**
   * RCV brand name
   */
  rcvBrandName?: string;
  /**
   * Add RCV meeting button text
   */
  addRcvMeetingButtonText?: I18nStrings | string;
  /**
   * Edit RCV meeting button text
   */
  editRcvMeetingButtonText?: I18nStrings | string;
  /**
   * call with Jupiter
   */
  callWithJupiter?: CallWithJupiterConfig;
  /**
   * call with softphone
   */
  callWithSoftphone?: CallWithSoftphoneConfig;
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
  rcvTeleconference: URL;
  /**
   * allow region setting
   */
  allowRegionSettings?: boolean;
  /**
   * Allow JupiterUniversalLink
   */
  allowJupiterUniversalLink?: boolean;
  /**
   * theme for `RcThemeProvider`
   */
  theme?: {
    defaultTheme?: string;
    themeMap?: { [key: string]: RcThemeInput };
    /**
     * variable for css module
     *
     * * make sure you need update that, all token should always get from Juno theme, prevent to use that
     */
    variable?: CssModuleVariable;
  };
  /**
   * assets path array
   */
  assets?: Record<string, string | string[]>;
  /**
   *
   */
  conference: {
    /**
     * dialInNumbers link for Conference call
     */
    dialInNumbersLink: URL;
    /**
     * conference invite text
     */
    inviteText: I18nStrings | string;
  };
  /**
   * support Enterprise dial plan
   */
  enableEDP?: boolean;
  /**
   * sub brands
   */
  subBrands?: SubBrand[];
  /**
   * build mode
   */
  mode?: Mode;
  /**
   * disable call with RingCentral phone
   */
  isDisableSpartan?: boolean;
  /**
   * show feedback in setting page
   */
  showFeedback?: boolean;
}

export type SubBrandOverride = Partial<
  Omit<BrandConfig, 'assets' | 'subBrands'>
>;
