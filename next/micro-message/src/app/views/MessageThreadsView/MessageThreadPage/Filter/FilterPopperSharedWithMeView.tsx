import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import type { CallQueueInfo } from '@ringcentral-integration/micro-phone/src/app/services/CallQueues/CallQueues.interface';
import { CaretLeftMd, SearchMd } from '@ringcentral/spring-icon';
import {
  Button,
  Checkbox,
  Icon,
  IconButton,
  MenuDivider,
  MenuHeader,
  MenuItem,
  MenuItemText,
  MenuList,
  TextField,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React from 'react';

import conversationsI18n from '../../../ConversationsViewSpring/ConversationsPage/i18n';
import i18n from '../i18n';

const footerClassName =
  'px-3 pt-2 border-t border-neutral-b4 flex items-center justify-end gap-3';

export type FilterPopperSharedWithMeViewProps = {
  isActive: boolean;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  filteredCallQueues: CallQueueInfo[];
  tempSelectedRecipientExtensionIds: string[];
  isShowAllCallQueuesSelected: boolean;
  isShowAllCallQueuesIndeterminate: boolean;
  onShowAllCallQueuesChange: (checked: boolean) => void;
  onCallQueuesChange: (ids: string[]) => void;
  onBack: () => void;
  onDone: () => void;
};

export const FilterPopperSharedWithMeView: React.FC<
  FilterPopperSharedWithMeViewProps
> = ({
  isActive,
  searchQuery,
  onSearchQueryChange,
  filteredCallQueues,
  tempSelectedRecipientExtensionIds,
  isShowAllCallQueuesSelected,
  isShowAllCallQueuesIndeterminate,
  onShowAllCallQueuesChange,
  onCallQueuesChange,
  onBack,
  onDone,
}) => {
  const { t } = useLocale(i18n, conversationsI18n);

  const handleShowAllClick = (e: any) => {
    e.stopPropagation();
    onShowAllCallQueuesChange(!isShowAllCallQueuesSelected);
  };

  const handleQueueClick = (queue: CallQueueInfo) => (e: any) => {
    e.stopPropagation();
    const isSelected = tempSelectedRecipientExtensionIds.includes(queue.id);
    const newSelected = isSelected
      ? tempSelectedRecipientExtensionIds.filter((id) => id !== queue.id)
      : [...tempSelectedRecipientExtensionIds, queue.id];
    onCallQueuesChange(newSelected);
  };

  return (
    <div
      data-sign="sharedWithMeFilterListContainer"
      data-active={isActive}
      className={clsx(
        'transition-all duration-300 ease-in-out',
        isActive
          ? 'translate-x-0 opacity-100 relative z-10 pointer-events-auto'
          : '-translate-x-full opacity-0 absolute inset-0 pointer-events-none z-0 invisible',
      )}
    >
      <MenuHeader
        start={
          <IconButton
            color="secondary"
            variant="icon"
            size="small"
            symbol={CaretLeftMd}
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
            data-sign="sharedWithMeMenuBack"
          />
        }
      >
        {t('sharedWithMe')}
      </MenuHeader>

      <div className="px-4 py-2">
        <TextField
          placeholder={t('search')}
          startAdornment={<Icon symbol={SearchMd} size="small" />}
          fullWidth
          size="medium"
          value={searchQuery}
          onChange={(e) => {
            e.stopPropagation();
            onSearchQueryChange(e.target.value);
          }}
          inputProps={{
            'data-sign': 'sharedWithMeSearch',
          }}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <MenuList
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={false}
        className="max-h-[200px] overflow-y-auto"
      >
        {searchQuery.trim().length === 0 ? (
          <MenuItem
            tabIndex={0}
            onClick={handleShowAllClick}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={false}
            autoClose={false}
            data-sign="sharedWithMeShowAll"
          >
            <MenuItemText className="flex-1">{t('selectAll')}</MenuItemText>
            <Checkbox
              inputProps={{
                tabIndex: -1,
                'aria-label': t('selectAll'),
              }}
              checked={isShowAllCallQueuesSelected}
              indeterminate={isShowAllCallQueuesIndeterminate}
              onChange={handleShowAllClick}
            />
          </MenuItem>
        ) : null}
        <MenuDivider />

        {searchQuery.trim().length > 0 && filteredCallQueues.length === 0 ? (
          <MenuItem disabled>
            <MenuItemText className="typography-descriptor text-neutral-b2 text-center mb-2">
              {t('noSearchResults')}
            </MenuItemText>
          </MenuItem>
        ) : null}

        {filteredCallQueues.map((queue) => {
          const isSelected = tempSelectedRecipientExtensionIds.includes(
            queue.id,
          );
          const displayName = queue.site
            ? `${queue.name} | ${queue.site.name}`
            : queue.name;

          return (
            <MenuItem
              key={queue.id}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={false}
              onClick={handleQueueClick(queue)}
              autoClose={false}
              data-sign="sharedWithMeQueueItem"
            >
              <MenuItemText className="flex-1">{displayName}</MenuItemText>
              <Checkbox
                inputProps={{
                  tabIndex: -1,
                  'aria-label': displayName,
                }}
                checked={isSelected}
                onChange={handleQueueClick(queue)}
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
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          data-sign="sharedWithMeMenuBackToMain"
        >
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          size="medium"
          fullWidth
          disabled={tempSelectedRecipientExtensionIds.length === 0}
          onClick={(e) => {
            e.stopPropagation();
            onDone();
          }}
          data-sign="sharedWithMeMenuDone"
        >
          {t('done')}
        </Button>
      </div>
    </div>
  );
};
