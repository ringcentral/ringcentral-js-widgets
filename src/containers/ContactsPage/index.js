import { connect } from 'react-redux';
import ContactsView from '../../components/ContactsView';
import withPhone from '../../lib/withPhone';

function mapToProps(_, {
  phone: {
    locale,
    contacts,
    rolesAndPermissions,
  },
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
  phone: {
    routerInteraction,
    contacts,
  },
  onItemSelect,
  onVisitPage,
}) {
  return {
    getAvatarUrl: async () => null,
    getPresence: async (contact) => {
      const presence = await contacts.getPresence(contact);
      return presence;
    },
    onItemSelect: onItemSelect || (async ({ type, id }) => {
      routerInteraction.push(`/contacts/${type}/${id}`);
    }),
    onSearchContact: ({ searchSource, searchString, pageNumber }) => {
      contacts.updateFilter({
        sourceFilter: searchSource,
        searchFilter: searchString,
        pageNumber
      });
    },
    onVisitPage,
  };
}

const ContactsPage = withPhone(connect(mapToProps, mapToFunctions)(ContactsView));

export default ContactsPage;
