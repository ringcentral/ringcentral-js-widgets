import { connect } from 'react-redux';
import withPhone from 'ringcentral-widgets/lib/withPhone';

import GlipGroupsPanel from '../../components/GlipGroupsPanel';

function mapToProps(
  _,
  { phone: { glipGroups, contactList }, hiddenCurrentGroup = false },
) {
  return {
    groups: glipGroups.groupsWithUnread,
    currentGroupId: hiddenCurrentGroup ? null : glipGroups.currentGroupId,
    searchFilter: glipGroups.searchFilter,
    currentPage: glipGroups.pageNumber,
    filteredContacts: contactList.filteredContacts,
    contactSearchFilter: contactList.searchFilter,
  };
}

function mapToFunctions(
  _,
  { phone: { glipGroups, contactList }, onSelectGroup },
) {
  return {
    onSelectGroup,
    updateSearchFilter(searchFilter) {
      glipGroups.updateFilter({ searchFilter });
    },
    onNextPage(pageNumber) {
      glipGroups.updateFilter({ pageNumber });
    },
    updateContactSearchFilter(searchFilter) {
      contactList.applyFilters({ searchFilter });
    },
    async createTeam({ teamName, selectedContacts }) {
      const groupId = await glipGroups.createTeam(
        teamName,
        selectedContacts.map((sc) => sc.email),
      );
      onSelectGroup(groupId);
    },
  };
}

const GlipGroupsPage = withPhone(
  connect(mapToProps, mapToFunctions)(GlipGroupsPanel),
);

export default GlipGroupsPage;
