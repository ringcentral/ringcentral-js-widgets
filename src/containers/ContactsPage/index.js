import { connect } from 'react-redux';
import ContactsView from '../../components/ContactsView';

function mapToProps(_, {
  locale,
  contacts,
}) {
  return {
    currentLocale: locale.currentLocale,
    contactSourceNames: contacts.sourceNames || [],
    contactGroups: contacts.contactGroups || [],
    searchSource: contacts.sourceFilter,
    searchString: contacts.searchFilter,
    currentPage: contacts.pageNumber,
    showSpinner: !(
      locale.ready &&
      contacts.ready
    ),
  };
}

function mapToFunctions(_, {
  router,
  contacts,
  onItemSelect,
}) {
  return {
    getAvatarUrl: async () => null,
    getPresence: async (contact) => {
      const presence = await contacts.getPresence(contact);
      return presence;
    },
    onItemSelect: onItemSelect || (async ({ type, id }) => {
      router.push(`/contacts/${type}/${id}`);
    }),
    onSearchContact: ({ searchSource, searchString, pageNumber }) => {
      contacts.updateFilter({
        sourceFilter: searchSource,
        searchFilter: searchString,
        pageNumber
      });
    },
  };
}

const ContactsPage = connect(mapToProps, mapToFunctions)(ContactsView);

export default ContactsPage;
