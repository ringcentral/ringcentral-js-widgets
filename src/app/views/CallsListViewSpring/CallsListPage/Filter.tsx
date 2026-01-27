import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import {
  SearchInputToggle,
  SingleFilter,
} from '@ringcentral-integration/micro-message/src/app/components';
import type { ChangeEvent } from 'react';
import React, { useState } from 'react';

import type { ViewCallsFilterType } from '../CallsList.view.interface';

import i18n from './i18n';

export type FilterProps = {
  className?: string;
  searchInput?: string;
  onSearchInputChange?: (value: string) => void;
  viewCallsFilter?: ViewCallsFilterType;
  setViewCallsFilter?: (value: ViewCallsFilterType) => void;
  viewCallsFilterSelections: { label: string; value: string }[];
};

export const Filter: React.FC<FilterProps> = ({
  searchInput,
  onSearchInputChange,
  viewCallsFilter,
  setViewCallsFilter,
  viewCallsFilterSelections,
}) => {
  const { t } = useLocale(i18n);
  const [searchExpanded, setSearchExpanded] = useState(false);

  return (
    <div className="flex px-3 py-1 items-center gap-2">
      <div className="flex-auto">
        <SearchInputToggle
          searchInput={searchInput || ''}
          onSearchInputChange={(e: ChangeEvent<HTMLInputElement>) => {
            onSearchInputChange?.(e.target.value);
          }}
          placeholder={t('searchAll')}
          data-sign="callsListSearch"
          expanded={searchExpanded}
          onExpandedChange={setSearchExpanded}
        />
      </div>
      <div className="flex-none" data-sign="callsListFilter">
        <SingleFilter
          data={viewCallsFilterSelections}
          visibleCount={searchExpanded ? 1 : 2}
          value={viewCallsFilter}
          onSelect={(value) => {
            setViewCallsFilter?.(value as ViewCallsFilterType);
          }}
          MoreButtonProps={{
            'data-sign': 'callsListFilterExpand',
          }}
          MenuProps={{
            onClose: () => {
              setSearchExpanded(false);
            },
          }}
        />
      </div>
    </div>
  );
};
