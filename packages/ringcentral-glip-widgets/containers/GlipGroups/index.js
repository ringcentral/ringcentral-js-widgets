import React from 'react';
import { connect } from 'react-redux';
import withPhone from 'ringcentral-widgets/lib/withPhone';

import GlipGroupsPanel from '../../components/GlipGroupsPanel';

function mapToProps(_, {
  phone: {
    glipGroups,
    contacts,
  },
  hiddenCurrentGroup = false,
}) {
  return {
    groups: glipGroups.groupsWithUnread,
    currentGroupId: hiddenCurrentGroup ? null : glipGroups.currentGroupId,
    searchFilter: glipGroups.searchFilter,
    currentPage: glipGroups.pageNumber,
    filteredContacts: contacts.filteredContacts,
    contactSearchFilter: contacts.searchFilter,
  };
}

function mapToFunctions(_, {
  phone: {
    glipGroups,
    contacts,
  },
  onSelectGroup,
}) {
  return {
    onSelectGroup,
    updateSearchFilter(searchFilter) {
      glipGroups.updateFilter({ searchFilter });
    },
    onNextPage(pageNumber) {
      glipGroups.updateFilter({ pageNumber });
    },
    updateContactSearchFilter(searchFilter) {
      contacts.updateFilter({ searchFilter });
    },
    async createTeam({ teamName, selectedContacts }) {
      const groupId = await glipGroups.createTeam(teamName, selectedContacts.map(sc => sc.email));
      onSelectGroup(groupId);
    }
  };
}

const GlipGroupsPage = withPhone(connect(
  mapToProps,
  mapToFunctions
)(GlipGroupsPanel));

export default GlipGroupsPage;
