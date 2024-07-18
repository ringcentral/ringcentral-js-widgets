import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';
import clsx from 'clsx';
import React from 'react';

import NewComposeText from '../../../../assets/images/NewComposeText.svg';
import NewComposeTextHover from '../../../../assets/images/NewComposeTextHover.svg';
import { SearchInput } from '../../../SearchInput';
import i18n from '../../i18n';

import styles from './styles.scss';

type SearchProps = {
  composeTextPermission?: boolean;
  typeFilter?: string;
  onSearchInputChange?: (...args: any[]) => any;
  searchInput?: string;
  currentLocale: string;
  disableLinks?: boolean;
  goToComposeText: (...args: any[]) => any;
  renderSearchTip?: (...args: any[]) => any;
};

const Search: React.FC<SearchProps> = ({
  composeTextPermission,
  typeFilter,
  onSearchInputChange,
  searchInput,
  currentLocale,
  disableLinks,
  goToComposeText,
  renderSearchTip,
}) => {
  if (!onSearchInputChange) {
    return null;
  }
  const showTextIcon =
    composeTextPermission &&
    (typeFilter === messageTypes.all || typeFilter === messageTypes.text);
  return (
    <div
      className={clsx(
        styles.searchContainer,
        showTextIcon ? null : styles.withoutTextIcon,
      )}
    >
      <SearchInput
        dataSign="conversationSearch"
        className={styles.searchInput}
        // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
        value={searchInput}
        onChange={onSearchInputChange}
        placeholder={i18n.getString('search', currentLocale)}
        disabled={disableLinks}
      />
      <span
        title={i18n.getString('composeText', currentLocale)}
        data-sign="ComposeText"
        className={styles.textIcon}
        onClick={goToComposeText}
      >
        <NewComposeTextHover
          className={styles.hoverTextSVGIcon}
          width={20}
          height={21}
        />
        <NewComposeText className={styles.textSVGIcon} width={20} height={21} />
      </span>
      {renderSearchTip && renderSearchTip()}
    </div>
  );
};
Search.defaultProps = {
  composeTextPermission: true,
  typeFilter: messageTypes.all,
  onSearchInputChange: undefined,
  searchInput: '',
  disableLinks: false,
  renderSearchTip: undefined,
};
export default Search;
