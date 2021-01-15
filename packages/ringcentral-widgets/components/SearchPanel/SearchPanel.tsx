import searchSvg from '@ringcentral/juno/icon/Search';
import React, { useState, FunctionComponent, useContext } from 'react';
import { RcOutlineTextField } from '@ringcentral/juno';
import classNames from 'classnames';
import { SearchResult, SearchResultProps } from './SearchResult';
import { SelectListContext } from '../../contexts';

import styles from './styles.scss';
import i18n from './i18n';

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
  classes,
}) => {
  const [filter, setFilter] = useState(null);
  const { scrollElmRef } = useContext(SelectListContext);

  const filteredOptions = filter
    ? options.filter((option) => searchOption(option, filter))
    : options;
  return (
    <div className={classNames(styles.root, classes.root)}>
      <div className={classNames(styles.searchInput, classes.searchInput)}>
        {!filter && ( // IE polyfill
          <span className={classNames(styles.placeholder, classes.placeholder)}>
            {placeholder || i18n.getString('search', currentLocale)}
          </span>
        )}
        <RcOutlineTextField
          size="small"
          radiusType="circle"
          iconPosition="left"
          symbol={searchSvg}
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
        className={classNames(styles.searchResults, classes.searchResults)}
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

SearchPanel.defaultProps = {
  classes: {},
};
