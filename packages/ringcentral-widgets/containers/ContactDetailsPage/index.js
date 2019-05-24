import { connect } from 'react-redux';
import { isE164, parseIncompletePhoneNumber } from '@ringcentral-integration/phone-number';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import ContactDetailsView from '../../components/ContactDetailsView';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, {
  params,
  phone: {
    locale,
    contactDetails,
    contactSearch,
    rolesAndPermissions,
    auth,
    audioSettings,
    webphone,
    callingSettings,
  },
}) {
  return {
    currentLocale: locale.currentLocale,
    contactItem: contactDetails.contact,
    disableCallButton:
      auth.ready &&
      audioSettings.ready &&
      webphone && webphone.ready &&
      auth.loggedIn &&
      (callingSettings.isWebphoneMode &&
        (!audioSettings.userMedia || !webphone.connected)
      ),
    showSpinner: !(
      locale.ready &&
      contactSearch.ready &&
      contactDetails.ready &&
      rolesAndPermissions.ready
    ),
    outboundSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.OutboundSMS
    ),
    internalSmsPermission: !!(
      rolesAndPermissions.permissions &&
      rolesAndPermissions.permissions.InternalSMS
    ),
  };
}

function mapToFunctions(_, {
  params,
  dialerRoute = '/dialer',
  composeTextRoute = '/composeText',
  phone: {
    routerInteraction,
    contactDetails,
    regionSettings,
    call,
    dialerUI,
    composeText,
    contactSearch,
    rolesAndPermissions
  },
}) {
  return {
    getContact() {
      contactDetails.find({
        id: params.contactId,
        type: params.contactType
      });
    },
    clearContact() {
      contactDetails.clear();
    },
    formatNumber(phoneNumber) {
      // if the cleaned phone number is not a E164 format, we will show it directly, doesn't format it.
      const cleanedNumber = parseIncompletePhoneNumber(phoneNumber.toString());
      const isE164Number = isE164(cleanedNumber);
      if (isE164Number) {
        const formatedNumber = formatNumber({
          phoneNumber,
          countryCode: regionSettings.countryCode,
        });
        return { phoneNumber: formatedNumber, beFormated: true };
      }
      return { phoneNumber, beFormated: false };
    },
    getAvatar: contact => contactDetails.getProfileImage(contact),
    getPresence: contact => contactDetails.getPresence(contact),
    onBackClick() {
      routerInteraction.goBack();
    },
    onClickToDial: dialerUI && rolesAndPermissions.callingEnabled ?
      (recipient) => {
        if (call.isIdle) {
          routerInteraction.push(dialerRoute);
          dialerUI.call({ recipient });
          contactDetails.onClickToCall();
        }
      } :
      undefined,
    onClickToSMS: composeText ?
      async (contact, isDummyContact = false) => {
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
      } :
      undefined,
  };
}

const ContactDetailsPage = withPhone(connect(mapToProps, mapToFunctions)(ContactDetailsView));

export default ContactDetailsPage;
