import { Module } from 'ringcentral-integration/lib/di';
import RcUIModule from '../../lib/RcUIModule';
import i18n from './i18n';

@Module({
  name: 'CallMonitorUI',
  deps: [
    'Brand',
    'CallMonitor',
    'CallLogger',
    'ConnectivityMonitor',
    'ContactMatcher',
    'ContactSearch',
    'ComposeText',
    'DateTimeFormat',
    'Locale',
    'RateLimiter',
    'RegionSettings',
    'RolesAndPermissions',
    'RouterInteraction',
    'Webphone',
  ],
})
export class CallMonitorUI extends RcUIModule {
  private _brand: any;
  private _locale: any;
  private _callMonitor: any;
  private _regionSettings: any;
  private _connectivityMonitor: any;
  private _rateLimiter: any;
  private _rolesAndPermissions: any;
  private _callLogger: any;
  private _dateTimeFormat: any;
  private _composeText: any;
  private _contactMatcher: any;
  private _routerInteraction: any;
  private _contactSearch: any;
  private _webphone: any;
  constructor({
    brand,
    callMonitor,
    callLogger,
    connectivityMonitor,
    contactMatcher,
    contactSearch,
    composeText,
    dateTimeFormat,
    locale,
    rateLimiter,
    regionSettings,
    rolesAndPermissions,
    routerInteraction,
    webphone,
    ...options
  }) {
    super({ ...options });
    this._brand = brand;
    this._locale = locale;
    this._callMonitor = callMonitor;
    this._regionSettings = regionSettings;
    this._connectivityMonitor = connectivityMonitor;
    this._rateLimiter = rateLimiter;
    this._rolesAndPermissions = rolesAndPermissions;
    this._callLogger = callLogger;
    this._dateTimeFormat = dateTimeFormat;
    this._composeText = composeText;
    this._contactMatcher = contactMatcher;
    this._routerInteraction = routerInteraction;
    this._contactSearch = contactSearch;
    this._webphone = webphone;
  }

  getUIProps({ enableContactFallback = false }) {
    return {
      enableContactFallback,
      active: true,
      brand: this._brand.fullName,
      title: i18n.getString('title', this._locale.currentLocale),
      currentLocale: this._locale.currentLocale,
      calls: this._callMonitor.calls,
      areaCode: this._regionSettings.areaCode,
      countryCode: this._regionSettings.countryCode,
      disableLinks:
        !this._connectivityMonitor.connectivity || this._rateLimiter.throttling,
      outboundSmsPermission: !!(
        this._rolesAndPermissions.permissions &&
        this._rolesAndPermissions.permissions.OutboundSMS
      ),
      internalSmsPermission: !!(
        this._rolesAndPermissions.permissions &&
        this._rolesAndPermissions.permissions.InternalSMS
      ),
      loggingMap: this._callLogger && this._callLogger.loggingMap,
      showSpinner: !(
        this._locale.ready &&
        this._callMonitor.ready &&
        this._regionSettings.ready &&
        this._connectivityMonitor.ready &&
        this._dateTimeFormat.ready &&
        (!this._callLogger || this._callLogger.ready) &&
        (!this._rolesAndPermissions || this._rolesAndPermissions.ready) &&
        (!this._composeText || this._composeText.ready)
      ),
      autoLog: !!(this._callLogger && this._callLogger.autoLog),
    };
  }

  getUIFunctions({
    onViewContact,
    onCreateContact,
    dateTimeFormatter = ({ utcTimestamp }) =>
      this._dateTimeFormat.formatDateTime({
        utcTimestamp,
      }),
    onLogCall,
    isLoggedContact,
    composeTextRoute = '/composeText',
  }) {
    return {
      dateTimeFormatter,
      onViewContact: onViewContact
        ? async ({ phoneNumber, contact }) => {
            const hasMatchNumber = await this._contactMatcher.hasMatchNumber({
              phoneNumber,
              ignoreCache: true,
            });
            if (hasMatchNumber) {
              await onViewContact({ phoneNumber, contact });
            }
          }
        : undefined,
      onCreateContact: onCreateContact
        ? async ({ phoneNumber, name, entityType }) => {
            const hasMatchNumber = await this._contactMatcher.hasMatchNumber({
              phoneNumber,
              ignoreCache: true,
            });
            if (!hasMatchNumber) {
              await onCreateContact({ phoneNumber, name, entityType });
              await this._contactMatcher.forceMatchNumber({ phoneNumber });
            }
          }
        : undefined,
      isLoggedContact,
      onLogCall:
        onLogCall ||
        (this._callLogger &&
          (async ({ call, contact, redirect = true }) => {
            await this._callLogger.logCall({
              call,
              contact,
              redirect,
            });
          })),
      onClickToSms: this._composeText
        ? async (contact, isDummyContact = false) => {
            if (this._routerInteraction) {
              this._routerInteraction.push(composeTextRoute);
            }
            if (contact.name && contact.phoneNumber && isDummyContact) {
              this._composeText.updateTypingToNumber(contact.name);
              this._contactSearch.search({ searchString: contact.name });
            } else {
              this._composeText.addToNumber(contact);
              if (this._composeText.typingToNumber === contact.phoneNumber) {
                this._composeText.cleanTypingToNumber();
              }
            }
          }
        : undefined,
      webphoneAnswer: (...args) =>
        this._webphone && this._webphone.answer(...args),
      webphoneReject: (...args) =>
        this._webphone && this._webphone.reject(...args),
      webphoneHangup: (...args) =>
        this._webphone && this._webphone.hangup(...args),
      webphoneResume: (...args) =>
        this._webphone && this._webphone.resume(...args),
    };
  }
}
