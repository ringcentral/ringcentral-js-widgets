import { connect } from 'react-redux';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import ContactDetailsView from '../../components/ContactDetailsView';
import withPhone from '../../lib/withPhone';

function mapToProps(_, {
  params,
  phone: {
    locale,
    contacts,
    contactDetails,
    contactSearch,
  },
}) {
  return {
    currentLocale: locale.currentLocale,
    contactItem: contactDetails.contact,
    showSpinner: !(
      locale.ready &&
      contactSearch.ready &&
      contactDetails.ready
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
    composeText,
    contactSearch,
  },
}) {
  return {
    getContact: () => {
      contactDetails.find({
        id: params.contactId,
        type: params.contactType
      });
    },
    clearContact: () => {
      contactDetails.clear();
    },
    formatNumber: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    }),
    getAvatar: contact => contactDetails.getProfileImage(contact),
    getPresence: contact => contactDetails.getPresence(contact),
    onBackClick: () => {
      routerInteraction.goBack();
    },
    onClickToDial: call ?
      (phoneNumber) => {
        if (call.isIdle) {
          routerInteraction.push(dialerRoute);
          call.onToNumberChange(phoneNumber);
          call.onCall();
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
      } :
      undefined,
  };
}

const ContactDetailsPage = withPhone(connect(mapToProps, mapToFunctions)(ContactDetailsView));

export default ContactDetailsPage;
