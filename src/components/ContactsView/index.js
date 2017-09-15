import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Panel from '../Panel';
import SearchInput from '../SearchInput';
import SpinnerOverlay from '../SpinnerOverlay';

import ContactSourceFilter from '../ContactSourceFilter';
import ContactList from '../ContactList';
import ContactItem from '../ContactItem';
import styles from './styles.scss';
import i18n from './i18n';
import AddContactIcon from '../../assets/images/ContactAdd.svg';

function AddContact({
  className,
  onClick,
 }) {
  return (
    <div
      className={classnames(styles.addContact, className)}
      onClick={onClick}
    >
      <div className={styles.iconContainer}>
        <AddContactIcon
          className={styles.iconNode}
        />
      </div>
    </div>
  );
}
AddContact.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
AddContact.defaultProps = {
  className: undefined,
};

export default class ContactsView extends Component {
  constructor(props) {
    super(props);
    this.doSearchByText = this.doSearchByText.bind(this);
    this.doSearchBySource = this.doSearchBySource.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
  }

  componentDidMount() {
    this._applySearch({
      searchSource: this.props.searchSource,
      searchText: this.props.searchText,
      pageNumber: 1,
    });
  }

  doSearchByText(ev) {
    const searchText = ev.target.value;
    this._applySearch({
      searchSource: this.props.searchSource,
      searchText,
      pageNumber: 1,
    });
  }

  doSearchBySource(searchSource) {
    this._applySearch({
      searchSource,
      searchText: this.props.searchText,
      pageNumber: 1,
    });
  }

  loadNextPage(pageNumber) {
    this._applySearch({
      searchSource: this.props.searchSource,
      searchText: this.props.searchText,
      pageNumber,
    });
  }

  _applySearch(args) {
    const func = this.props.onSearchContact;
    if (func) { func(args); }
  }

  render() {
    const {
      currentLocale,
      contactGroups,
      contactSourceNames,
      searchSource,
      searchText,
      showSpinner,
      getAvatarUrl,
      getPresence,
      currentPage,
      onItemSelect,
    } = this.props;

    const content = showSpinner ?
      <SpinnerOverlay /> :
      (
        <ContactList
          currentLocale={currentLocale}
          contactGroups={contactGroups}
          getAvatarUrl={getAvatarUrl}
          getPresence={getPresence}
          currentPage={currentPage}
          onNextPage={this.loadNextPage}
          onItemSelect={onItemSelect}
        />
      );

    return (
      <div className={styles.root}>
        <div className={styles.actionBar}>
          <SearchInput
            className={styles.searchInput}
            value={searchText || ''}
            onChange={this.doSearchByText}
            placeholder={i18n.getString('searchPlaceholder', currentLocale)}
          />
          <AddContact
            className={styles.actionButton}
            onClick={() => { }}
          />
          <ContactSourceFilter
            className={styles.actionButton}
            currentLocale={currentLocale}
            onSourceSelect={this.doSearchBySource}
            selectedSourceName={searchSource}
            contactSourceNames={contactSourceNames}
          />
        </div>
        <Panel className={styles.content}>
          {content}
        </Panel>
      </div>
    );
  }
}

ContactsView.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  contactGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(ContactItem.propTypes.contact).isRequired,
  })).isRequired,
  contactSourceNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool.isRequired,
  searchSource: PropTypes.string,
  searchText: PropTypes.string,
  currentPage: PropTypes.number,
  onItemSelect: PropTypes.func,
  onSearchContact: PropTypes.func,
};

ContactsView.defaultProps = {
  searchSource: undefined,
  searchText: undefined,
  currentPage: undefined,
  onItemSelect: undefined,
  onSearchContact: undefined,
};
