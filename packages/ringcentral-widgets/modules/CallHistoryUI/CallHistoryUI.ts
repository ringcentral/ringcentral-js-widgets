import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import { ToNumber } from '@ringcentral-integration/commons/modules/ComposeText';
import { DateTimeFormat } from '@ringcentral-integration/commons/modules/DateTimeFormat';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import { OnCreateContactOptions } from '../CallsListUI/CallsListUI.interface';
import { CallHistoryUIComponentProps, Deps } from './CallHistoryUI.interface';
import i18n from './i18n';

/**
 * TODO:
 * * Add type info for getUIProps and getUIFunctions when CallsPanel is refactored into ts.
 */
@Module({
  name: 'CallHistoryUI',
  deps: [
    'Locale',
    'Brand',
    'CallHistory',
    'RegionSettings',
    'ConnectivityMonitor',
    'RateLimiter',
    'DateTimeFormat',
    'AppFeatures',
    'AccountInfo',
    { dep: 'CallLogger', optional: true },
    { dep: 'Call', optional: true },
    { dep: 'ComposeText', optional: true },
    { dep: 'DialerUI', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
    { dep: 'ExtensionInfo', optional: true },
    'ContactMatcher',
    'RouterInteraction',
    'ContactSearch',
    'ConnectivityManager',
  ],
})
export class CallHistoryUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  getUIProps({
    enableContactFallback = false,
    useNewList = false,
  }: CallHistoryUIComponentProps) {
    return {
      enableContactFallback,
      brand: this._deps.brand.name,
      title: i18n.getString('title', this._deps.locale.currentLocale),
      currentLocale: this._deps.locale.currentLocale,
      calls: this._deps.callHistory.latestCalls,
      areaCode: this._deps.regionSettings.areaCode,
      countryCode: this._deps.regionSettings.countryCode,
      currentSiteCode: this._deps.extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled:
        this._deps.extensionInfo?.isMultipleSiteEnabled ?? false,
      disableLinks:
        this._deps.connectivityManager.isOfflineMode ||
        this._deps.connectivityManager.isVoipOnlyMode ||
        this._deps.rateLimiter.throttling,
      disableCallButton:
        this._deps.connectivityManager.isOfflineMode ||
        this._deps.connectivityManager.isWebphoneUnavailableMode ||
        this._deps.connectivityManager.isWebphoneInitializing ||
        this._deps.rateLimiter.throttling,
      disableClickToDial: !(this._deps.call && this._deps.call.isIdle),
      outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
      internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
      loggingMap: this._deps.callLogger && this._deps.callLogger.loggingMap,
      showSpinner: !(
        this._deps.callHistory.ready &&
        this._deps.locale.ready &&
        this._deps.regionSettings.ready &&
        this._deps.dateTimeFormat.ready &&
        this._deps.connectivityMonitor.ready &&
        this._deps.appFeatures.ready &&
        (!this._deps.call || this._deps.call.ready) &&
        (!this._deps.composeText || this._deps.composeText.ready) &&
        (!this._deps.callLogger || this._deps.callLogger.ready)
      ),
      autoLog: !!(this._deps.callLogger && this._deps.callLogger.autoLog),
      useNewList,
      enableCDC: this._deps.appFeatures.isCDCEnabled,
      maxExtensionNumberLength: this._deps.accountInfo.maxExtensionNumberLength,
    };
  }

  getUIFunctions({
    onCreateContact,
    // @ts-expect-error TS(2322): Type '(args_0: Partial<FormatDateTimeOptions>) => ... Remove this comment to see the full error message
    dateTimeFormatter = (
      ...args: Parameters<DateTimeFormat['formatDateTime']>
    ) => this._deps.dateTimeFormat.formatDateTime(...args),
    onLogCall,
    isLoggedContact,
    dialerRoute = '/dialer',
    composeTextRoute = '/composeText',
    onViewContact,
  }: CallHistoryUIComponentProps) {
    return {
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
          isMultipleSiteEnabled:
            this._deps.extensionInfo?.isMultipleSiteEnabled,
          siteCode: this._deps.extensionInfo?.site?.code,
        }),
      dateTimeFormatter,
      onViewContact:
        onViewContact ||
        (({ contact: { type, id } }) => {
          if (this._deps.contactDetailsUI) {
            this._deps.contactDetailsUI.showContactDetails({
              type,
              id,
              direct: true,
            });
          }
        }),
      onCreateContact: onCreateContact
        ? async ({ phoneNumber, name, entityType }: OnCreateContactOptions) => {
            const hasMatchNumber =
              await this._deps.contactMatcher.hasMatchNumber({
                phoneNumber,
                ignoreCache: true,
              });

            if (!hasMatchNumber) {
              await onCreateContact({ phoneNumber, name, entityType });
              await this._deps.contactMatcher.forceMatchNumber({ phoneNumber });
            }
          }
        : undefined,
      onClickToDial:
        this._deps.dialerUI && this._deps.appFeatures.isCallingEnabled
          ? (recipient: any) => {
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              if (this._deps.call.isIdle) {
                this._deps.routerInteraction.push(dialerRoute);
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._deps.dialerUI.call({
                  recipient,
                  isStandAlone: window?.runner?._standAlone,
                });
                this._deps.callHistory.onClickToCall();
              }
            }
          : undefined,
      onClickToSms: this._deps.composeText
        ? // TODO: find a better way to define contact type
          async (contact: Entity & ToNumber, isDummyContact = false) => {
            if (this._deps.routerInteraction) {
              this._deps.routerInteraction.push(composeTextRoute);
            }
            // if contact autocomplete, if no match fill the number only
            if (contact.name && contact.phoneNumber && isDummyContact) {
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._deps.composeText.updateTypingToNumber(contact.name);
              this._deps.contactSearch.search({ searchString: contact.name });
            } else {
              // @ts-expect-error TS(2532): Object is possibly 'undefined'.
              this._deps.composeText.addToNumber(contact);
              if (
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._deps.composeText.typingToNumber === contact.phoneNumber
              ) {
                // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                this._deps.composeText.cleanTypingToNumber();
              }
            }
            this._deps.callHistory.onClickToSMS();
          }
        : undefined,
      isLoggedContact,
      onLogCall:
        onLogCall ||
        (this._deps.callLogger &&
          (async ({ call, contact, redirect = true }) => {
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            await this._deps.callLogger.logCall({
              call,
              contact,
              redirect,
            });
          })),
    };
  }
}
