import { connect } from 'react-redux';
import ContactsView from '../../components/ContactsView';

function mapToProps(_, {
  locale,
  contactSearch,
}) {
  return {
    currentLocale: locale.currentLocale,
    contactSourceNames: contactSearch.contactSourceNames || [],
    contactGroups: contactSearch.contactGroups || [],
    searchSource: contactSearch.searchCriteria && contactSearch.searchCriteria.sourceName,
    searchString: contactSearch.searchCriteria && contactSearch.searchCriteria.searchString,
    currentPage: contactSearch.searchCriteria && contactSearch.searchCriteria.pageNumber,
    showSpinner: !(
      locale.ready &&
      contactSearch.ready
    ),
  };
}

function mapToFunctions(_, {
  router,
  contacts,
  contactSearch,
}) {
  return {
    getAvatarUrl: async (contact) => {
      // const avatarUrl = await contacts.getImageProfile(contact);
      // return avatarUrl;
      return null;
    },
    getPresence: async (contact) => {
      const presence = await contacts.getPresence(contact);
      return presence;
    },
    onItemSelect: async ({ type, id }) => {
      const searchSource = contacts[`${type}Contacts`] || [];
      const isInsure = searchSource.map(({ id }) => id.toString()).includes(id);
      if (!isInsure) {
        const searchCriteria = JSON.parse(JSON.stringify(contactSearch.state.searchCriteria));
        await contacts.showAlert();
        const searchCriteria= contactSearch.state.searchCriteria;
        await contactSearch.searchPlus({ ...searchCriteria, searchString: undefined });
        await contactSearch.searchPlus(searchCriteria);
      } else {
        router.push(`/contacts/${type}/${id}`);
      }
    },
    // onRestSearch: () => {
    //   contactSearch.resetSearchStatus();
    // },
    onSearchContact: ({ searchSource, searchString, pageNumber }) => {
      contactSearch.searchPlus({
        sourceName: searchSource,
        searchString,
        pageNumber,
      });
    },
  };
}

const ContactsPage = connect(mapToProps, mapToFunctions)(ContactsView);

export default ContactsPage;
