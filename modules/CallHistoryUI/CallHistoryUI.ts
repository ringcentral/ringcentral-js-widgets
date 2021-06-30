import { RcUIModuleV2 } from '@ringcentral-integration/core';
import { Entity } from '@ringcentral-integration/commons/interfaces/Entity.interface';
import { Module } from '@ringcentral-integration/commons/lib/di';
import { ToNumber } from '@ringcentral-integration/commons/modules/ComposeTextV2';
import { DateTimeFormat } from '@ringcentral-integration/commons/modules/DateTimeFormatV2';
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
    'ExtensionFeatures',
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
    const {
      locale,
      brand,
      callHistory,
      regionSettings,
      extensionInfo,
      connectivityMonitor,
      connectivityManager,
      rateLimiter,
      call,
      callLogger,
      dateTimeFormat,
      composeText,
      extensionFeatures,
    } = this._deps;
    return {
      enableContactFallback,
      brand: brand.fullName,
      title: i18n.getString('title', locale.currentLocale),
      currentLocale: locale.currentLocale,
      calls: callHistory.latestCalls,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
      currentSiteCode: extensionInfo?.site?.code ?? '',
      isMultipleSiteEnabled: extensionInfo?.isMultipleSiteEnabled ?? false,
      disableLinks:
        connectivityManager.isOfflineMode ||
        connectivityManager.isVoipOnlyMode ||
        rateLimiter.throttling,
      disableCallButton:
        connectivityManager.isOfflineMode ||
        connectivityManager.isWebphoneUnavailableMode ||
        connectivityManager.isWebphoneInitializing ||
        rateLimiter.throttling,
      disableClickToDial: !(call && call.isIdle),
      outboundSmsPermission: extensionFeatures.hasOutboundSMSPermission,
      internalSmsPermission: extensionFeatures.hasInternalSMSPermission,
      loggingMap: callLogger && callLogger.loggingMap,
      showSpinner: !(
        callHistory.ready &&
        locale.ready &&
        regionSettings.ready &&
        dateTimeFormat.ready &&
        connectivityMonitor.ready &&
        extensionFeatures.ready &&
        (!call || call.ready) &&
        (!composeText || composeText.ready) &&
        (!callLogger || callLogger.ready)
      ),
      autoLog: !!(callLogger && callLogger.autoLog),
      useNewList,
    };
  }

  getUIFunctions({
    onCreateContact,
    dateTimeFormatter = (
      ...args: Parameters<DateTimeFormat['formatDateTime']>
    ) => this._deps.dateTimeFormat.formatDateTime(...args),
    onLogCall,
    isLoggedContact,
    dialerRoute = '/dialer',
    composeTextRoute = '/composeText',
    onViewContact,
  }: CallHistoryUIComponentProps) {
    const {
      callLogger,
      contactMatcher,
      call,
      dialerUI,
      contactDetailsUI,
      composeText,
      routerInteraction,
      contactSearch,
      callHistory,
      extensionFeatures,
    } = this._deps;
    return {
      dateTimeFormatter,
      onViewContact:
        onViewContact ||
        (({ contact: { type, id } }) => {
          if (contactDetailsUI) {
            contactDetailsUI.showContactDetails({
              type,
              id,
              direct: true,
            });
          }
        }),
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
      onClickToDial:
        dialerUI && extensionFeatures.isCallingEnabled
          ? (recipient: any) => {
              if (call.isIdle) {
                routerInteraction.push(dialerRoute);
                dialerUI.call({ recipient });
                callHistory.onClickToCall();
              }
            }
          : undefined,
      onClickToSms: composeText
        ? // TODO: find a better way to define contact type
          async (contact: Entity & ToNumber, isDummyContact = false) => {
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
      isLoggedContact,
      onLogCall:
        onLogCall ||
        (callLogger &&
          (async ({ call, contact, redirect = true }) => {
            await callLogger.logCall({
              call,
              contact,
              redirect,
            });
          })),
    };
  }
}
