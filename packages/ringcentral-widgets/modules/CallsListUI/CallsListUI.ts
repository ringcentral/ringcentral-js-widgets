import { Module } from '@ringcentral-integration/commons/lib/di';
import formatNumber from '@ringcentral-integration/commons/lib/formatNumber';
import { ToNumber } from '@ringcentral-integration/commons/modules/ComposeTextV2';
import { FormatDateTimeOptions } from '@ringcentral-integration/commons/modules/DateTimeFormatV2';
import { RcUIModuleV2 } from '@ringcentral-integration/core';

import { RouteParams } from '../ContactDetailsUI';
import {
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
    const {
      brand,
      callLogger,
      callMonitor,
      locale,
      regionSettings,
      appFeatures,
      callHistory,
      connectivityMonitor,
      rateLimiter,
      dateTimeFormat,
      call,
      composeText,
      extensionInfo,
    } = this._deps;
    return {
      currentSiteCode: extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled: extensionInfo?.isMultipleSiteEnabled ?? false,
      currentLocale: locale.currentLocale,
      activeRingCalls: callMonitor.activeRingCalls,
      activeOnHoldCalls: callMonitor.activeOnHoldCalls,
      activeCurrentCalls: callMonitor.activeCurrentCalls,
      otherDeviceCalls: callMonitor.otherDeviceCalls,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
      outboundSmsPermission: appFeatures.hasOutboundSMSPermission,
      internalSmsPermission: appFeatures.hasInternalSMSPermission,
      brand: brand.name,
      showContactDisplayPlaceholder,
      autoLog: !!(callLogger && callLogger.autoLog),
      enableContactFallback,
      calls: callHistory.latestCalls,
      disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
      disableClickToDial: !(call && call.isIdle),
      loggingMap: callLogger && callLogger.loggingMap,
      showSpinner: !(
        callHistory.ready &&
        locale.ready &&
        regionSettings.ready &&
        dateTimeFormat.ready &&
        connectivityMonitor.ready &&
        appFeatures.ready &&
        (!call || call.ready) &&
        (!composeText || composeText.ready) &&
        (!callLogger || callLogger.ready)
      ),
      readTextPermission: appFeatures.hasReadTextPermission,
      enableCDC: appFeatures.isCDCEnabled,
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
    const {
      callLogger,
      composeText,
      contactMatcher,
      contactSearch,
      regionSettings,
      contactDetailsUI,
      routerInteraction,
      webphone,
      call,
      dialerUI,
      callHistory,
      dateTimeFormat,
    } = this._deps;
    return {
      formatPhone: (phoneNumber: string) =>
        formatNumber({
          phoneNumber,
          areaCode: regionSettings.areaCode,
          countryCode: regionSettings.countryCode,
        }),
      webphoneAnswer: (sessionId: string) => webphone?.answer(sessionId),
      webphoneToVoicemail: (sessionId: string) =>
        webphone?.toVoiceMail(sessionId),
      webphoneReject: (sessionId: string) => webphone?.reject(sessionId),
      webphoneHangup: (sessionId: string) => webphone?.hangup(sessionId),
      async webphoneResume(sessionId: string) {
        if (!webphone) {
          return;
        }
        await webphone.resume(sessionId);
        if (routerInteraction.currentPath !== callCtrlRoute) {
          routerInteraction.push(callCtrlRoute);
        }
      },
      onCreateContact: onCreateContact
        ? async ({ phoneNumber, name, entityType }: OnCreateContactOptions) => {
            const hasMatchNumber = await contactMatcher.hasMatchNumber({
              phoneNumber,
              ignoreCache: true,
            });
            if (!hasMatchNumber) {
              await onCreateContact({ phoneNumber, name, entityType });
              await contactMatcher.forceMatchNumber({ phoneNumber });
            }
          }
        : undefined,
      isLoggedContact,
      onLogCall:
        onLogCall ||
        (callLogger &&
          (async ({ call, contact, redirect = true }: OnLogCallOptions) => {
            await callLogger.logCall({
              call,
              contact,
              redirect,
            });
          })),

      dateTimeFormatter:
        dateTimeFormatter ??
        (({ utcTimestamp }: Partial<FormatDateTimeOptions>) =>
          dateTimeFormat.formatDateTime({
            utcTimestamp,
          })),
      onViewContact:
        onViewContact ||
        (({ contact: { type, id } }: { contact: RouteParams }) => {
          if (contactDetailsUI) {
            contactDetailsUI.showContactDetails({ type, id, direct: true });
          }
        }),
      onClickToDial: dialerUI
        ? // TODO: fix type in dialerUI
          (recipient: any) => {
            if (call.isIdle) {
              routerInteraction.push(dialerRoute);
              dialerUI.call({ recipient });
              callHistory.onClickToCall();
            }
          }
        : undefined,
      onClickToSms: composeText
        ? async (
            contact: ToNumber & { name?: string },
            isDummyContact = false,
          ) => {
            if (routerInteraction) {
              routerInteraction.push(composeTextRoute);
            }
            // if contact autocomplete, if no match fill the number only
            if (contact.name && contact.phoneNumber && isDummyContact) {
              composeText.updateTypingToNumber(contact.name);
              contactSearch.search({ searchString: contact.name });
            } else {
              composeText.addToNumber(contact);
              if (composeText.typingToNumber === contact.phoneNumber) {
                composeText.cleanTypingToNumber();
              }
            }
            callHistory.onClickToSMS();
          }
        : undefined,
    };
  }
}
