import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import type { CallQueueInfo } from '@ringcentral-integration/micro-phone/src/app/services';
import { FilterMd } from '@ringcentral/spring-icon';
import {
  Button,
  Checkbox,
  Icon,
  IconButton,
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemText,
  MenuList,
  TextField,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useMemo, useRef, useState } from 'react';

import { SearchInputToggle } from '../../../components';
import { type QueueConversationFilter } from '../../../services';
import conversationsI18n from '../ConversationsPage/i18n';

const filterButtonClassName =
  'sui-filter-button sui-filter-button-root max-w-[120px]';
const footerClassName =
  'px-3 pt-2 border-t border-neutral-b4 flex items-center justify-end gap-3';
const QUEUE_SEARCH_MINIMUM_COUNT = 7;

export type QueueConversationsFilterProps = {
  searchInput: string;
  filter: QueueConversationFilter;
  selectedCallQueueIds: string[];
  callQueues: CallQueueInfo[];
  onSearchInputChange: (value: string) => void;
  onFilterChange: (filter: QueueConversationFilter) => void;
  onCallQueuesChange: (queueIds: string[]) => void;
  onReset: () => void;
};

export const QueueConversationsFilter: React.FC<
  QueueConversationsFilterProps
> = ({
  searchInput,
  filter,
  selectedCallQueueIds,
  callQueues,
  onSearchInputChange,
  onFilterChange,
  onCallQueuesChange,
  onReset,
}) => {
  const { t } = useLocale(conversationsI18n);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [queueSearchInput, setQueueSearchInput] = useState('');
  const [tempSelectedCallQueueIds, setTempSelectedCallQueueIds] = useState<
    string[]
  >([]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const allCallQueueIds = useMemo(
    () => callQueues.map((queue) => queue.id),
    [callQueues],
  );

  const filteredCallQueues = useMemo(() => {
    const normalizedSearch = queueSearchInput.trim().toLowerCase();
    if (!normalizedSearch) {
      return callQueues;
    }

    return callQueues.filter((queue) =>
      [queue.name, queue.site?.name]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedSearch)),
    );
  }, [callQueues, queueSearchInput]);

  const isAdvancedFilterActive = filter === 'Draft' || filter === 'Failed';
  const isUnreadFilterActive = filter === 'Unread';
  const hasQueueFilter =
    selectedCallQueueIds.length > 0 &&
    selectedCallQueueIds.length < callQueues.length;

  const activeFilterCount =
    (isAdvancedFilterActive ? 1 : 0) +
    (hasQueueFilter ? selectedCallQueueIds.length : 0);
  const hasActiveFilters = activeFilterCount > 0;

  const openMenu = () => {
    setTempSelectedCallQueueIds(
      selectedCallQueueIds.length > 0 ? selectedCallQueueIds : allCallQueueIds,
    );
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setQueueSearchInput('');
  };

  const handleMenuClose = () => {
    closeMenu();
    setTempSelectedCallQueueIds(
      selectedCallQueueIds.length > 0 ? selectedCallQueueIds : allCallQueueIds,
    );
  };

  const handleQueueClick = (queueId: string) => {
    setTempSelectedCallQueueIds((current) =>
      current.includes(queueId)
        ? current.filter((id) => id !== queueId)
        : [...current, queueId],
    );
  };

  const handleShowAllCallQueuesChange = (checked: boolean) => {
    setTempSelectedCallQueueIds(checked ? allCallQueueIds : []);
  };

  const isShowAllCallQueuesSelected =
    callQueues.length > 0 &&
    tempSelectedCallQueueIds.length === callQueues.length &&
    callQueues.every((queue) => tempSelectedCallQueueIds.includes(queue.id));

  const isShowAllCallQueuesIndeterminate =
    tempSelectedCallQueueIds.length > 0 &&
    tempSelectedCallQueueIds.length < callQueues.length;

  const handleDone = () => {
    onCallQueuesChange(
      isShowAllCallQueuesSelected ? [] : tempSelectedCallQueueIds,
    );
    closeMenu();
  };

  const allText = t('all');
  const allButton = (
    <button
      type="button"
      className={clsx(
        filterButtonClassName,
        !isUnreadFilterActive && 'sui-selected',
      )}
      aria-current={!isUnreadFilterActive}
      title={allText}
      data-sign="queueFilterAll"
      onClick={onReset}
    >
      {allText}
    </button>
  );

  const unreadText = t('unread');
  const unreadButton = (
    <button
      type="button"
      className={clsx(
        filterButtonClassName,
        isUnreadFilterActive && 'sui-selected',
      )}
      aria-current={isUnreadFilterActive}
      title={unreadText}
      data-sign="queueFilterUnread"
      onClick={() => onFilterChange('Unread')}
    >
      {unreadText}
    </button>
  );
  const selectedFilterButton = isUnreadFilterActive ? unreadButton : allButton;

  return (
    <div className="flex px-3 py-1 items-center gap-2">
      <div className="flex-auto">
        <SearchInputToggle
          searchInput={searchInput}
          onSearchInputChange={(event) =>
            onSearchInputChange(event.currentTarget.value)
          }
          placeholder={t('searchText')}
          data-sign="callQueueSearch"
          expanded={searchExpanded}
          onExpandedChange={setSearchExpanded}
        />
      </div>
      <div
        className="flex-none flex items-center gap-1"
        data-sign="callQueueFilter"
      >
        <div className="sui-single-filter sui-single-filter-root">
          {searchExpanded ? (
            selectedFilterButton
          ) : (
            <>
              {allButton}
              {unreadButton}
            </>
          )}
        </div>
        {/* only when call queues more than 1 need show the filter */}
        {callQueues.length > 1 && (
          <div className="relative flex items-center">
            <IconButton
              ref={menuButtonRef}
              variant="icon"
              size="small"
              className="flex items-center flex-row"
              color={hasActiveFilters ? 'primary' : 'secondary'}
              onClick={openMenu}
              aria-expanded={menuOpen}
              aria-label={t('byCallQueue')}
              data-sign="callQueueFilterMore"
              data-highlighted={hasActiveFilters}
            >
              <Icon symbol={FilterMd} size="small" />
              {hasActiveFilters && (
                <span className="typography-descriptor">
                  ({activeFilterCount})
                </span>
              )}
            </IconButton>
          </div>
        )}
      </div>
      <Menu
        anchorEl={menuButtonRef.current}
        open={menuOpen}
        onClose={handleMenuClose}
        placement="bottom-end"
        data-sign="callQueueFilterMenu"
        className="overflow-hidden"
      >
        <div className="relative w-[268px]">
          <MenuItem disabled>
            <MenuItemText className="typography-descriptor text-neutral-b2">
              {t('byCallQueue')}
            </MenuItemText>
          </MenuItem>
          {callQueues.length >= QUEUE_SEARCH_MINIMUM_COUNT ? (
            <div className="px-4 py-2">
              <TextField
                fullWidth
                size="medium"
                value={queueSearchInput}
                placeholder={t('searchCallQueues')}
                inputProps={{ 'data-sign': 'callQueueFilterSearch' }}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => setQueueSearchInput(event.target.value)}
              />
            </div>
          ) : null}
          <MenuList
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={false}
            className="max-h-[200px] overflow-y-auto"
          >
            {!queueSearchInput.trim() ? (
              <MenuItem
                autoClose={false}
                onClick={(event) => {
                  event.stopPropagation();
                  handleShowAllCallQueuesChange(!isShowAllCallQueuesSelected);
                }}
                data-sign="queueFilterAllCallQueues"
              >
                <MenuItemText className="flex-1">
                  {t('allCallQueues')}
                </MenuItemText>
                <Checkbox
                  inputProps={{
                    tabIndex: -1,
                    'aria-label': t('allCallQueues'),
                  }}
                  checked={isShowAllCallQueuesSelected}
                  indeterminate={isShowAllCallQueuesIndeterminate}
                />
              </MenuItem>
            ) : null}
            <MenuDivider />

            {queueSearchInput.trim() && filteredCallQueues.length === 0 ? (
              <MenuItem disabled>
                <MenuItemText className="typography-descriptor text-neutral-b2 text-center mb-2">
                  {t('noSearchResults')}
                </MenuItemText>
              </MenuItem>
            ) : null}

            {filteredCallQueues.map((queue) => {
              const label = queue.site?.name
                ? `${queue.name} | ${queue.site.name}`
                : queue.name;
              const isSelected = tempSelectedCallQueueIds.includes(queue.id);

              return (
                <MenuItem
                  key={queue.id}
                  autoClose={false}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleQueueClick(queue.id);
                  }}
                  data-sign={`queueFilterCallQueue-${queue.id}`}
                >
                  <MenuItemText className="flex-1" title={label}>
                    {label}
                  </MenuItemText>
                  <Checkbox
                    inputProps={{
                      tabIndex: -1,
                      'aria-label': label,
                    }}
                    checked={isSelected}
                  />
                </MenuItem>
              );
            })}
          </MenuList>
          <div className={footerClassName}>
            <Button
              variant="text"
              size="medium"
              fullWidth
              onClick={handleMenuClose}
              data-sign="queueFilterCancel"
            >
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              size="medium"
              fullWidth
              disabled={tempSelectedCallQueueIds.length === 0}
              onClick={handleDone}
              data-sign="queueFilterDone"
            >
              {t('done')}
            </Button>
          </div>
        </div>
      </Menu>
    </div>
  );
};
