import { Module } from 'ringcentral-integration/lib/di';
import RcUIModule from '../../lib/RcUIModule';
import i18n from './i18n';

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
    'RolesAndPermissions',
    { dep: 'CallLogger', optional: true },
    { dep: 'Call', optional: true },
    { dep: 'ComposeText', optional: true },
    { dep: 'DialerUI', optional: true },
    { dep: 'ContactDetailsUI', optional: true },
    'ContactMatcher',
    'RouterInteraction',
    'ContactSearch',
    'ConnectivityManager',
  ],
})
export default class CallHistoryUI extends RcUIModule {
  getUIProps({
    phone: {
      brand,
      call,
      callHistory,
      callLogger,
      composeText,
      connectivityManager,
      connectivityMonitor,
      dateTimeFormat,
      locale,
      rateLimiter,
      regionSettings,
      rolesAndPermissions,
    },
    enableContactFallback = false,
    useNewList = false,
  }) {
    return {
      enableContactFallback,
      brand: brand.fullName,
      title: i18n.getString('title', locale.currentLocale),
      currentLocale: locale.currentLocale,
      calls: callHistory.latestCalls,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
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
      outboundSmsPermission: !!(
        rolesAndPermissions.permissions &&
        rolesAndPermissions.permissions.OutboundSMS
      ),
      internalSmsPermission: !!(
        rolesAndPermissions.permissions &&
        rolesAndPermissions.permissions.InternalSMS
      ),
      loggingMap: callLogger && callLogger.loggingMap,
      showSpinner: !(
        callHistory.ready &&
        locale.ready &&
        regionSettings.ready &&
        dateTimeFormat.ready &&
        connectivityMonitor.ready &&
        rolesAndPermissions.ready &&
        (!call || call.ready) &&
        (!composeText || composeText.ready) &&
        (!callLogger || callLogger.ready)
      ),
      autoLog: !!(callLogger && callLogger.autoLog),
      useNewList,
    };
  }

  getUIFunctions({
    phone: {
      dateTimeFormat,
      callLogger,
      contactMatcher,
      call,
      dialerUI,
      contactDetailsUI,
      composeText,
      routerInteraction,
      contactSearch,
      callHistory,
      rolesAndPermissions,
    },
    onCreateContact,
    dateTimeFormatter = dateTimeFormat.formatDateTime.bind(dateTimeFormat),
    onLogCall,
    isLoggedContact,
    dialerRoute = '/dialer',
    composeTextRoute = '/composeText',
    onViewContact,
  }) {
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
        ? async ({ phoneNumber, name, entityType }) => {
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
        dialerUI && rolesAndPermissions.callingEnabled
          ? (recipient) => {
              if (call.isIdle) {
                routerInteraction.push(dialerRoute);
                dialerUI.call({ recipient });
                callHistory.onClickToCall();
              }
            }
          : undefined,
      onClickToSms: composeText
        ? async (contact, isDummyContact = false) => {
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
