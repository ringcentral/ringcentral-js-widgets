import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { useVirtuosoScrollPosition } from '@ringcentral-integration/react-hooks';
import NoCalls from '@ringcentral-integration/next-core/assets/no_calls.svg';
import { VirtualizedList } from '@ringcentral/spring-ui';
import React from 'react';

import type { CallsListPanelSpringProps } from '../CallsList.view.interface';

import { CallsListItem } from './CallsListItem';
import i18n from './i18n';

type CallsListProps = {
  className?: string;
} & Omit<CallsListPanelSpringProps, 'viewCallsFilterSelections'>;

export const CallsList: React.FC<CallsListProps> = ({
  calls,
  className,
  lastPosition,
  setLastPosition,
  viewCallsFilter,
  searchInput,
  ...rest
}) => {
  const { virtuosoActionsRef, scrollerRef } = useVirtuosoScrollPosition(
    (snapshot) => setLastPosition(viewCallsFilter, snapshot),
  );
  const { t } = useLocale(i18n);

  const searchMode = searchInput && searchInput.length > 0;

  if (calls.length === 0) {
    return (
      <div
        data-sign="no-calls"
        className="flex-auto flex justify-center items-center overflow-auto"
      >
        <div className="flex-col flex justify-center items-center gpa-4">
          <NoCalls />
          <div className="text-center text-14 text-gray-500 mt-4">
            {searchMode ? t('noSearchResults') : t('noCalls')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-sign="callsList" className="h-full">
      <VirtualizedList
        key={viewCallsFilter}
        className={className}
        data={calls}
        virtuosoActions={virtuosoActionsRef}
        scrollerRef={scrollerRef}
        // null is not a valid type for restoreStateFrom, if lastPosition is null, it should use undefined
        restoreStateFrom={lastPosition || undefined}
      >
        {(index, call) => (
          <CallsListItem
            key={call.id || call.telephonySessionId}
            call={call}
            index={index}
            {...rest}
          />
        )}
      </VirtualizedList>
    </div>
  );
};
