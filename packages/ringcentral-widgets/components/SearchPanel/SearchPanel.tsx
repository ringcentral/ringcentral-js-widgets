import { RcIcon, RcTextField } from '@ringcentral/juno';
import { Search } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { useContext, useState } from 'react';

import { SelectListContext } from '../../contexts';

import type { SearchResultProps } from './SearchResult';
import { SearchResult } from './SearchResult';
import i18n from './i18n';
import styles from './styles.scss';

interface SearchPanelClasses {
  root?: string;
  searchInput?: string;
  searchResults?: string;
  placeholder?: string;
  searchResult?: SearchResultProps['classes'];
}

export type SearchPanelProps = {
  placeholder?: string;
  classes?: SearchPanelClasses;
  searchOption(option: object, filter: string): boolean;
  renderList?(): React.ReactNode;
} & Omit<SearchResultProps, 'classes' | 'filter' | 'filteredOptions'>;

export const SearchPanel: FunctionComponent<SearchPanelProps> = ({
  placeholder,
  options,
  searchOption,
  currentLocale,
  renderListItem,
  renderList,
  classes = {},
}) => {
  const [filter, setFilter] = useState('');
  const { scrollElmRef } = useContext(SelectListContext);

  const filteredOptions = filter
    ? options.filter((option) => searchOption(option, filter))
    : options;
  return (
    <div className={clsx(styles.root, classes.root)}>
      <div className={clsx(styles.searchInput, classes.searchInput)}>
        {!filter && ( // IE polyfill
          <span className={clsx(styles.placeholder, classes.placeholder)}>
            {placeholder || i18n.getString('search', currentLocale)}
          </span>
        )}
        <RcTextField
          size="small"
          fullWidth
          variant="outline"
          radius="round"
          value={filter}
          InputProps={{
            startAdornment: (
              <RcIcon symbol={Search} size="small" color="neutral.f04" />
            ),
          }}
          data-sign="searchBar"
          onChange={(
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => {
            if (event.target) {
              setFilter(event.target.value || '');
            }
          }}
        />
      </div>
      <div
        className={clsx(styles.searchResults, classes.searchResults)}
        ref={scrollElmRef}
      >
        {renderList ? (
          renderList()
        ) : (
          <SearchResult
            options={options}
            filteredOptions={filteredOptions}
            filter={filter}
            currentLocale={currentLocale}
            renderListItem={renderListItem}
            classes={classes.searchResult}
          />
        )}
      </div>
    </div>
  );
};
