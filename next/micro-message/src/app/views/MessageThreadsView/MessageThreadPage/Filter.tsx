import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { type CallQueueInfo } from '@ringcentral-integration/micro-phone/src/app/services';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import { FilterMd } from '@ringcentral/spring-icon';
import {
  Icon,
  IconButton,
  useDebounce,
  usePrevious,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useMemo, useRef, useState } from 'react';
import { noop } from 'rxjs';

import { SearchInputToggle } from '../../../components';
import conversationsI18n from '../../ConversationsViewSpring/ConversationsPage/i18n';
import type {
  SharedFilterType,
  SharedSearchForm,
} from '../MessageThreads.view.interface';
import type { AssignmentOption } from '../utils/constants';

import { FilterPopper } from './FilterPopper';
import i18n from './i18n';

const filterStyle = 'sui-filter-button sui-filter-button-root max-w-[120px]';

type FilterProps = {
  form: SharedSearchForm;
  onSharedSearchFormUpdate?: (
    updates: Partial<SharedSearchForm> | 'reset',
  ) => void;
  className?: string;
  callQueues?: CallQueueInfo[];
  assignmentOptions: readonly AssignmentOption[];
};

export const Filter: React.FC<FilterProps> = ({
  className,
  form,
  onSharedSearchFormUpdate = noop,
  callQueues = [],
  assignmentOptions,
}) => {
  const { t } = useLocale(i18n, conversationsI18n);
  const [filterPopperOpen, setFilterPopperOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const filterIconRef = useRef<HTMLButtonElement>(null);

  const debouncedOnSearchInputChange = useDebounce((value: string) => {
    onSharedSearchFormUpdate({ searchInput: value });
  }, 500);

  const [searchInput, setSearchInput] = useAsyncState(
    form.searchInput,
    (value) => {
      debouncedOnSearchInputChange(value);
    },
  );

  const handleFilterIconClick = () => {
    setFilterPopperOpen((prev) => !prev);
  };

  const { filter, statusFilter, selectedAssignees, selectedCallQueues } = form;

  const activeFilterCount = useMemo(() => {
    let count = 0;
    // If not all statuses are selected (meaning some are filtered out)
    if (statusFilter.length < 2) {
      count += 1;
    }
    // If selectedAssignees length equals max possible (assignmentOptions.length), treat as 0 (all selected)
    count +=
      selectedAssignees.length === assignmentOptions.length
        ? 0
        : selectedAssignees.length;
    // If selectedCallQueues length equals max possible (callQueues.length), treat as 0 (all selected)
    count +=
      selectedCallQueues.length === callQueues.length && callQueues.length > 0
        ? 0
        : selectedCallQueues.length;
    return count;
  }, [
    statusFilter,
    selectedAssignees,
    selectedCallQueues,
    callQueues,
    assignmentOptions,
  ]);

  const hasActiveFilters = activeFilterCount > 0;

  const prevFilter = usePrevious(() => filter);

  // Determine which filter to show on the right button and if it's active
  const rightButtonState = useMemo(() => {
    // When search is expanded, show only active filter
    const isActive = filter === 'Unread' || filter === 'AssignedToMe';

    const filterValue: SharedFilterType =
      filter === 'All' ? prevFilter ?? 'AssignedToMe' : filter;
    return {
      filter: filterValue,
      isActive,
    };
  }, [filter, prevFilter]);

  const handleAllClick = () => {
    // All is an independent action that clears all filters
    onSharedSearchFormUpdate('reset');
  };

  const handleRightButtonClick = (filter: SharedFilterType) => {
    // Toggle between AssignedToMe and Unread
    onSharedSearchFormUpdate({
      filter,
      ...(filter === 'AssignedToMe'
        ? { selectedAssignees: ['__CURRENT_USER__'] }
        : {}),
    });
  };

  const allText = t('all');
  const allButton = (
    <button
      className={clsx(
        filterStyle,
        !rightButtonState.isActive && 'sui-selected',
      )}
      title={allText}
      aria-current={!rightButtonState.isActive}
      type="button"
      onClick={handleAllClick}
      data-sign="filterAllButton"
    >
      {allText}
    </button>
  );

  const rightText =
    rightButtonState.filter === 'Unread' ? t('unread') : t('assignedToMe');
  const rightButton = (
    <button
      className={clsx(filterStyle, rightButtonState.isActive && 'sui-selected')}
      title={rightText}
      aria-current={rightButtonState.isActive}
      type="button"
      onClick={() =>
        handleRightButtonClick(
          rightButtonState.filter === 'Unread' ? 'Unread' : 'AssignedToMe',
        )
      }
      data-sign="filterToggleButton"
    >
      {rightText}
    </button>
  );

  return (
    <>
      <div className={clsx('flex px-3 py-1 items-center gap-2', className)}>
        <div className="flex-auto">
          <SearchInputToggle
            data-sign="sharedThreadSearch"
            searchInput={searchInput}
            onSearchInputChange={(e) => setSearchInput(e.currentTarget.value)}
            expanded={searchExpanded}
            onExpandedChange={setSearchExpanded}
            placeholder={t('searchText')}
          />
        </div>
        <div className="flex items-center flex-shrink-0 gap-1">
          {/* When search is expanded, only show active filter */}
          {searchExpanded ? (
            rightButtonState.isActive ? (
              <div className="sui-single-filter sui-single-filter-root">
                {rightButton}
              </div>
            ) : (
              <div className="sui-single-filter sui-single-filter-root">
                {allButton}
              </div>
            )
          ) : (
            <div className="sui-single-filter sui-single-filter-root">
              {allButton}
              {rightButton}
            </div>
          )}
          <div className="relative flex items-center">
            <IconButton
              ref={filterIconRef}
              variant="icon"
              size="small"
              className="flex items-center flex-row"
              color={hasActiveFilters ? 'primary' : 'secondary'}
              onClick={handleFilterIconClick}
              data-sign="messageThreadFilterIcon"
            >
              <Icon symbol={FilterMd} size="small" />
              {hasActiveFilters && (
                <span className="typography-descriptor">
                  ({activeFilterCount})
                </span>
              )}
            </IconButton>
          </div>
        </div>
      </div>
      <FilterPopper
        anchorEl={filterIconRef.current}
        open={filterPopperOpen}
        onClose={() => setFilterPopperOpen(false)}
        selectedAssignees={selectedAssignees}
        statusFilter={statusFilter}
        callQueues={callQueues}
        selectedCallQueues={form.selectedCallQueues}
        filter={filter}
        onSharedSearchFormUpdate={onSharedSearchFormUpdate}
      />
    </>
  );
};
