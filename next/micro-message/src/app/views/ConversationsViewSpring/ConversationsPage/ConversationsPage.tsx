import { messageTypes } from '@ringcentral-integration/commons/enums/messageTypes';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { Alert } from '@ringcentral/spring-ui';
import React, { forwardRef, useMemo } from 'react';

import { SmsAccountCapabilityAlertContent } from '../../ConversationViewSpring/ConversationPanel';
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
      smsPermissionReason,
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
          {smsPermissionReason ? (
            <Alert severity="info" className="mx-3 my-2">
              <SmsAccountCapabilityAlertContent reason={smsPermissionReason} />
            </Alert>
          ) : null}
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
