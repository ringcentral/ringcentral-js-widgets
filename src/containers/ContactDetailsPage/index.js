import { connect } from 'react-redux';
import ContactDetailsView from '../../components/ContactDetailsView';

function mapToProps(_, {
  params,
  locale,
  contacts,
}) {
  return {
    currentLocale: locale.currentLocale,
    contactItem: contacts.findContactItem({
      contactType: params.contactType,
      contactId: params.contactId,
    }),
    showSpinner: !(
      locale.ready &&
      contacts.ready
    ),
  };
}

function mapToFunctions(_, {
  router,
  contacts,
}) {
  return {
    getAvatarUrl: async (contact) => {
      const avatarUrl = await contacts.getImageProfile(contact);
      return avatarUrl;
    },
    getPresence: async (contact) => {
      const presence = await contacts.getPresence(contact);
      return presence;
    },
    onBackClick: () => {
      router.goBack();
    },
    onClickToSMS: ({ ...options }) => {
    },
    onClickToDial: ({ ...options }) => {
    },
    onClickToGmail: ({ ...options }) => {
    },
  };
}

const ContactDetailsPage = connect(mapToProps, mapToFunctions)(ContactDetailsView);

export default ContactDetailsPage;
