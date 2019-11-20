import { Module } from 'ringcentral-integration/lib/di';
import {
  isE164,
  parseIncompletePhoneNumber,
} from '@ringcentral-integration/phone-number';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import RcUIModule from '../../lib/RcUIModule';

const DEFAULT_DIALER_ROUTE = '/dialer';
const DEFAULT_COMPOSETEXT_ROUTE = '/composeText';

@Module({
  name: 'ContactDetailsUI',
  deps: [
    'RouterInteraction',
    'ContactDetails',
    'ContactSearch',
    'RolesAndPermissions',
    'RateLimiter',
    'RegionSettings',
    'ConnectivityManager',
    'Call',
    'DialerUI',
    'ComposeText',
    'Brand',
    'Locale',
    'CallingSettings',
    {
      dep: 'Webphone',
      optional: true,
    },
    {
      dep: 'ContactDetailsUIOptions',
      optional: true,
    },
  ],
})
export default class ContactDetailsUI extends RcUIModule {
  getUIProps({
    params,
    dialerRoute = DEFAULT_DIALER_ROUTE,
    composeTextRoute = DEFAULT_COMPOSETEXT_ROUTE,
    phone: {
      locale,
      contactDetails,
      contactSearch,
      rolesAndPermissions,
      connectivityManager,
      rateLimiter,
    },
  }) {
    return {
      params,
      dialerRoute,
      composeTextRoute,
      currentLocale: locale.currentLocale,
      contactItem: contactDetails.contact,
      disableLinks:
        connectivityManager.isOfflineMode ||
        connectivityManager.isVoipOnlyMode ||
        rateLimiter.throttling,
      disableCallButton:
        connectivityManager.isOfflineMode ||
        connectivityManager.isWebphoneUnavailableMode ||
        connectivityManager.isWebphoneInitializing ||
        rateLimiter.throttling,
      showSpinner: !(
        locale.ready &&
        contactSearch.ready &&
        contactDetails.ready &&
        rolesAndPermissions.ready
      ),
      outboundSmsPermission:
        rolesAndPermissions.permissions &&
        rolesAndPermissions.permissions.OutboundSMS,
      internalSmsPermission:
        rolesAndPermissions.permissions &&
        rolesAndPermissions.permissions.InternalSMS,
    };
  }

  getUIFunctions({
    params,
    dialerRoute = DEFAULT_DIALER_ROUTE,
    composeTextRoute = DEFAULT_COMPOSETEXT_ROUTE,
    phone: {
      call,
      dialerUI,
      composeText,
      contactSearch,
      contactDetails,
      regionSettings,
      routerInteraction,
      rolesAndPermissions,
    },
  }) {
    return {
      getContact() {
        contactDetails.find({
          id: params.contactId,
          type: params.contactType,
        });
      },
      clearContact() {
        contactDetails.clear();
      },
      formatNumber(phoneNumber) {
        // if the cleaned phone number is not a E164 format
        // we will show it directly, doesn't format it.
        const cleanedNumber = parseIncompletePhoneNumber(
          phoneNumber.toString(),
        );
        const isE164Number = isE164(cleanedNumber);
        if (isE164Number) {
          const formatedNumber = formatNumber({
            phoneNumber,
            countryCode: regionSettings.countryCode,
          });
          return {
            phoneNumber: formatedNumber,
            beFormated: true,
          };
        }
        return {
          phoneNumber,
          beFormated: false,
        };
      },
      getAvatar(contact) {
        return contactDetails.getProfileImage(contact);
      },
      getPresence(contact) {
        return contactDetails.getPresence(contact);
      },
      onBackClick() {
        routerInteraction.goBack();
      },
      onClickToDial:
        dialerUI && rolesAndPermissions.callingEnabled
          ? (recipient) => {
              if (call.isIdle) {
                routerInteraction.push(dialerRoute);
                dialerUI.call({ recipient });
                contactDetails.onClickToCall();
              }
            }
          : undefined,
      onClickToSMS: composeText
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
            // for track
            contactDetails.onClickToSMS();
          }
        : undefined,
    };
  }
}
