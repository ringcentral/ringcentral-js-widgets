import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import messageTypes from '@ringcentral-integration/commons/enums/messageTypes';

import { SearchInput } from '../../../SearchInput';
import NewComposeText from '../../../../assets/images/NewComposeText.svg';
import NewComposeTextHover from '../../../../assets/images/NewComposeTextHover.svg';

import i18n from '../../i18n';
import styles from './styles.scss';

export default function Search({
  composeTextPermission,
  typeFilter,
  onSearchInputChange,
  searchInput,
  currentLocale,
  disableLinks,
  goToComposeText,
  renderSearchTip,
}) {
  if (!onSearchInputChange) {
    return null;
  }
  const showTextIcon =
    composeTextPermission &&
    (typeFilter === messageTypes.all || typeFilter === messageTypes.text);
  return (
    <div
      className={classnames(
        styles.searchContainer,
        showTextIcon ? null : styles.withoutTextIcon,
      )}
    >
      <SearchInput
        className={styles.searchInput}
        value={searchInput}
        onChange={onSearchInputChange}
        placeholder={i18n.getString('search', currentLocale)}
        disabled={disableLinks}
      />
      <span
        title={i18n.getString('composeText', currentLocale)}
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
}

Search.propTypes = {
  composeTextPermission: PropTypes.bool,
  typeFilter: PropTypes.string,
  onSearchInputChange: PropTypes.func,
  searchInput: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  disableLinks: PropTypes.bool,
  goToComposeText: PropTypes.func.isRequired,
  renderSearchTip: PropTypes.func,
};

Search.defaultProps = {
  composeTextPermission: true,
  typeFilter: messageTypes.all,
  onSearchInputChange: undefined,
  searchInput: '',
  disableLinks: false,
  renderSearchTip: undefined,
};
