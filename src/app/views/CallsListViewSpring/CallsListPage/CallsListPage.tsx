import { useEffectOnDocumentFocus } from '@ringcentral-integration/react-hooks';
import React, { FunctionComponent } from 'react';

import type { CallsListPanelSpringProps } from '../CallsList.view.interface';

import { CallsList } from './CallsList';
import { Filter } from './Filter';

export const CallsListPage: FunctionComponent<CallsListPanelSpringProps> = ({
  calls,
  searchInput,
  onSearchInputChange,
  viewCallsFilter,
  setViewCallsFilter,
  viewCallsFilterSelections,
  onFocus,
  ...rest
}) => {
  useEffectOnDocumentFocus(() => {
    onFocus?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Filter
        className="flex-none"
        searchInput={searchInput}
        onSearchInputChange={onSearchInputChange}
        viewCallsFilter={viewCallsFilter}
        setViewCallsFilter={setViewCallsFilter}
        viewCallsFilterSelections={viewCallsFilterSelections}
      />
      <CallsList
        searchInput={searchInput}
        className="flex-auto overflow-y-auto overflow-x-hidden"
        viewCallsFilter={viewCallsFilter}
        calls={calls}
        {...rest}
      />
    </>
  );
};

CallsListPage.displayName = 'CallsListPage';
