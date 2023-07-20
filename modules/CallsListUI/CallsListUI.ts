import { Module } from '@ringcentral-integration/commons/lib/di';
import { formatNumber } from '@ringcentral-integration/commons/lib/formatNumber';
import type { ToNumber } from '@ringcentral-integration/commons/modules/ComposeText';
import type { FormatDateTimeOptions } from '@ringcentral-integration/commons/modules/DateTimeFormat';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import type { RouteParams } from '../ContactDetailsUI';
import type {
  CallsListUIFunctions,
  CallsListUIProps,
  Deps,
  OnCreateContactOptions,
  OnLogCallOptions,
  UIFunctionsOptions,
  UIPropsOptions,
} from './CallsListUI.interface';

@Module({
  name: 'CallsListUI',
  deps: [
    'Brand',
    'CallMonitor',
    'Locale',
    'RegionSettings',
    'CallHistory',
    'ConnectivityMonitor',
    'RateLimiter',
    'DateTimeFormat',
    'Call',
    'ExtensionInfo',
    'ContactMatcher',
    'ContactSearch',
    'RouterInteraction',
    'AppFeatures',
    'AccountInfo',
    { dep: 'DialerUI', optional: true },
    { dep: 'DialerUI', optional: true },
    { dep: 'CallLogger', optional: true },
    { dep: 'Webphone', optional: true },
    { dep: 'ComposeText', optional: true },
    { dep: 'CallsListUIOptions', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
  ],
})
export class CallsListUI<T extends Deps = Deps> extends RcUIModuleV2<T> {
  constructor(deps: T) {
    super({ deps });
  }

  getUIProps({
    showContactDisplayPlaceholder = false,
    enableContactFallback = false,
  }: UIPropsOptions): CallsListUIProps {
    return {
      currentSiteCode: this._deps.extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled:
        this._deps.extensionInfo?.isMultipleSiteEnabled ?? false,
      maxExtensionLength: this._deps.accountInfo?.maxExtensionNumberLength,
      currentLocale: this._deps.locale.currentLocale,
      activeRingCalls: this._deps.callMonitor.activeRingCalls,
      activeOnHoldCalls: this._deps.callMonitor.activeOnHoldCalls,
      activeCurrentCalls: this._deps.callMonitor.activeCurrentCalls,
      otherDeviceCalls: this._deps.callMonitor.otherDeviceCalls,
      areaCode: this._deps.regionSettings.areaCode,
      countryCode: this._deps.regionSettings.countryCode,
      outboundSmsPermission: this._deps.appFeatures.hasOutboundSMSPermission,
      internalSmsPermission: this._deps.appFeatures.hasInternalSMSPermission,
      brand: this._deps.brand.name,
      showContactDisplayPlaceholder,
      autoLog: !!(this._deps.callLogger && this._deps.callLogger.autoLog),
      enableContactFallback,
      calls: this._deps.callHistory.latestCalls,
      disableLinks:
        !this._deps.connectivityMonitor.connectivity ||
        this._deps.rateLimiter.throttling,
      disableClickToDial: !(this._deps.call && this._deps.call.isIdle),
      // @ts-expect-error TS(2322): Type 'Record<string, boolean> | undefined' is not ... Remove this comment to see the full error message
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
      readTextPermission: this._deps.appFeatures.hasReadTextPermission,
      enableCDC: this._deps.appFeatures.isCDCEnabled,
    };
  }

  getUIFunctions({
    composeTextRoute = '/composeText',
    callCtrlRoute = '/calls/active',
    onCreateContact,
    onLogCall,
    isLoggedContact,
    onViewContact,
    dateTimeFormatter,
    dialerRoute = '/dialer',
  }: UIFunctionsOptions): CallsListUIFunctions {
    return {
      // @ts-expect-error TS(2322): Type '(phoneNumber: string) => string | null | und... Remove this comment to see the full error message
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: this._deps.regionSettings.areaCode,
          countryCode: this._deps.regionSettings.countryCode,
          maxExtensionLength: this._deps.accountInfo.maxExtensionNumberLength,
          isMultipleSiteEnabled: this._deps.extensionInfo.isMultipleSiteEnabled,
          siteCode: this._deps.extensionInfo.site?.code,
        }),
      // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
      webphoneAnswer: (sessionId: string) =>
        this._deps.webphone?.answer(sessionId),
      // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
      webphoneToVoicemail: (sessionId: string) =>
        this._deps.webphone?.toVoiceMail(sessionId),
      // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
      webphoneReject: (sessionId: string) =>
        this._deps.webphone?.reject(sessionId),
      // @ts-expect-error TS(2322): Type '(sessionId: string) => Promise<void> | undef... Remove this comment to see the full error message
      webphoneHangup: (sessionId: string) =>
        this._deps.webphone?.hangup(sessionId),
      webphoneResume: async (sessionId: string) => {
        if (!this._deps.webphone) {
          return;
        }
        await this._deps.webphone.resume(sessionId);
        if (this._deps.routerInteraction.currentPath !== callCtrlRoute) {
          this._deps.routerInteraction.push(callCtrlRoute);
        }
      },
      // @ts-expect-error TS(2322): Type '(({ phoneNumber, name, entityType }: OnCreat... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2322): Type '((...args: any) => boolean) | undefined' is ... Remove this comment to see the full error message
      isLoggedContact,
      // @ts-expect-error TS(2322): Type '((options: OnLogCallOptions) => Promise<void... Remove this comment to see the full error message
      onLogCall:
        onLogCall ||
        (this._deps.callLogger &&
          (async ({ call, contact, redirect = true }: OnLogCallOptions) => {
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            await this._deps.callLogger.logCall({
              call,
              contact,
              redirect,
            });
          })),

      // @ts-expect-error TS(2322): Type '({ utcTimestamp }: Partial<FormatDateTimeOpt... Remove this comment to see the full error message
      dateTimeFormatter:
        dateTimeFormatter ??
        (({ utcTimestamp }: Partial<FormatDateTimeOptions>) =>
          this._deps.dateTimeFormat.formatDateTime({
            utcTimestamp,
          })),
      onViewContact:
        onViewContact ||
        (({ contact: { type, id } }: { contact: RouteParams }) => {
          if (this._deps.contactDetailsUI) {
            this._deps.contactDetailsUI.showContactDetails({
              type,
              id,
              direct: true,
            });
          }
        }),
      // @ts-expect-error TS(2322): Type '((recipient: any) => void) | undefined' is n... Remove this comment to see the full error message
      onClickToDial: this._deps.dialerUI
        ? // TODO: fix type in dialerUI
          (recipient: any) => {
            if (this._deps.call.isIdle) {
              this._deps.routerInteraction.push(dialerRoute);
              this._deps.dialerUI.call({
                recipient,
              });
              this._deps.callHistory.onClickToCall();
            }
          }
        : undefined,
      // @ts-expect-error TS(2322): Type '((contact: ToNumber & { name?: string | unde... Remove this comment to see the full error message
      onClickToSms: this._deps.composeText
        ? async (
            contact: ToNumber & { name?: string },
            isDummyContact = false,
          ) => {
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
    };
  }
}
