import { path } from 'ramda';
import { connect } from 'react-redux';
import ContactsView from '../../components/ContactsView';
import { withPhone } from '../../lib/phoneContext';

function mapToProps(_, { phone: { locale, contacts, extensionInfo } }) {
  return {
    currentLocale: locale.currentLocale,
    contactSourceNames: contacts.sourceNames || [],
    contactGroups: contacts.contactGroups || [],
    searchSource: contacts.sourceFilter,
    searchString: contacts.searchFilter,
    showSpinner: !(locale.ready && contacts.ready),
    currentSiteCode: extensionInfo?.site?.code ?? '',
    isMultipleSiteEnabled: extensionInfo?.isMultipleSiteEnabled ?? false,
  };
}

function mapToFunctions(
  _,
  {
    phone: {
      //
      contacts,
      contactDetailsUI,
    },
    onItemSelect,
    onVisitPage,
    onRefresh,
  },
) {
  return {
    getAvatarUrl() {
      return null;
    },
    async getPresence(contact) {
      return contacts.getPresence(contact);
    },
    onItemSelect:
      onItemSelect ||
      (async ({ type, id }) => {
        if (contactDetailsUI) {
          contactDetailsUI.showContactDetails({ type, id });
        }
      }),
    onSearchContact({ searchSource, searchString }) {
      contacts.updateFilter({
        sourceFilter: searchSource,
        searchFilter: searchString,
      });
    },
    onVisitPage,
    onRefresh,
  };
}

const ContactsPage = withPhone(
  connect(mapToProps, mapToFunctions)(ContactsView),
);

export default ContactsPage;
