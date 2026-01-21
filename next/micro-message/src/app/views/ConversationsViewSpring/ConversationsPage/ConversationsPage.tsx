import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import React, { forwardRef, useMemo } from 'react';

import type { ConversationsPanelSpringProps } from '../Conversations.view.interface';

import { ConversationsList } from './ConversationsList';
import { Filter } from './Filter';
import i18n from './i18n';

export const ConversationsPage = forwardRef<any, ConversationsPanelSpringProps>(
  (
    {
      typeFilter,
      searchInput,
      readStatusFilter,
      updateReadStatusFilterMap,
      onSearchInputChange,
      createNewEntityTooltip,
      ...rest
    },
    ref,
  ) => {
    const { t } = useLocale(i18n);

    const searchMode = searchInput.length > 0;
    const faxMode = typeFilter === messageTypes.fax;
    const textMode = typeFilter === messageTypes.text;

    const inputPlaceholder = useMemo(() => {
      if (faxMode) {
        return t('searchFax');
      }
      if (textMode) {
        return t('searchText');
      }
      return t('searchAll');
    }, [t, faxMode, textMode]);

    return (
      <div data-sign="ConversationsPage" className="flex flex-col h-full">
        <div
          ref={ref}
          className="flex flex-col flex-auto overflow-hidden h-full"
        >
          <Filter
            searchInput={searchInput}
            inputPlaceholder={inputPlaceholder}
            readStatusFilter={readStatusFilter}
            updateReadStatusFilter={(status) => {
              updateReadStatusFilterMap(status, typeFilter);
            }}
            onSearchInputChange={onSearchInputChange}
          />
          <ConversationsList
            className="flex-auto overflow-auto"
            typeFilter={typeFilter}
            readStatusFilter={readStatusFilter}
            notFoundMessage={searchMode ? t('noSearchResults') : undefined}
            createNewEntityTooltip={createNewEntityTooltip}
            {...rest}
          />
        </div>
      </div>
    );
  },
);

ConversationsPage.displayName = 'ConversationsPage';
