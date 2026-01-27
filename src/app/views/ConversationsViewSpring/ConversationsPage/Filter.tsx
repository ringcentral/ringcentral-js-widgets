import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

import { SearchInputToggle, SingleFilter } from '../../../components';
import type { ReadStatusFilter } from '../../../services';

import i18n from './i18n';

type FilterProps = {
  searchInput: string;
  readStatusFilter: ReadStatusFilter;
  inputPlaceholder?: string;
  updateReadStatusFilter: (readStatus: ReadStatusFilter) => void;
  onSearchInputChange: (options: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const Filter: React.FC<FilterProps> = ({
  className,
  searchInput,
  readStatusFilter,
  inputPlaceholder,
  onSearchInputChange,
  updateReadStatusFilter,
}) => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { t } = useLocale(i18n);

  const filters = useMemo(
    () => [
      {
        label: t('all'),
        value: 'All' satisfies ReadStatusFilter,
      },
      {
        label: t('unread'),
        value: 'Unread' satisfies ReadStatusFilter,
      },
    ],
    [t],
  );

  return (
    <div className={clsx('flex px-3 py-1 items-center gap-2', className)}>
      <div className="flex-auto">
        <SearchInputToggle
          searchInput={searchInput}
          onSearchInputChange={onSearchInputChange}
          placeholder={inputPlaceholder || t('searchAll')}
          data-sign="conversationSearch"
          expanded={searchExpanded}
          onExpandedChange={setSearchExpanded}
        />
      </div>
      <div className="flex-none" data-sign="conversationFilter">
        <SingleFilter
          data={filters}
          value={readStatusFilter}
          visibleCount={searchExpanded ? 1 : 2}
          onSelect={(status: any) => {
            updateReadStatusFilter(status);
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
