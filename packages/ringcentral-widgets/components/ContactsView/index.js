import { contains } from 'ramda';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'ringcentral-integration/lib/debounce';
import Panel from '../Panel';
import SearchInput from '../SearchInput';
import SpinnerOverlay from '../SpinnerOverlay';

import ContactList from '../ContactList';
import ContactItem from '../ContactItem';
import styles from './styles.scss';
import i18n from './i18n';
import AddContactIcon from '../../assets/images/ContactAdd.svg';
import RefreshContactIcon from '../../assets/images/RetryIcon.svg';
import RefreshingIcon from '../../assets/images/OvalLoading.svg';

import ContactSourceFilter from '../ContactSourceFilter';

function AddContact({
  className,
  onClick,
}) {
  return (
    <div
      className={className}
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

function RefreshContacts({
  className,
  onRefresh,
  refreshing,
  currentLocale
}) {
  let icon = null;
  let iconWrappClass = null;
  if (refreshing) {
    iconWrappClass = styles.refreshingIcon;
    icon = (
      <RefreshingIcon
        className={styles.iconNode}
        width={12}
        height={12}
      />
    )
  } else {
    iconWrappClass = styles.refreshIcon;
    icon = (
      <RefreshContactIcon
        className={styles.iconNode}
        width={12}
        height={12}
      />
    )
  }
  return (
    <div
      className={classnames(iconWrappClass, className)}
      onClick={onRefresh}
      title={i18n.getString('refresh', currentLocale)}
    >
      <div className={styles.iconContainer}>
        {icon}
      </div>
    </div>
  );
}
RefreshContacts.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
};
RefreshContacts.defaultProps = {
  className: undefined,
};

export default class ContactsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: props.searchString,
      unfold: false,
      contentHeight: 0,
      contentWidth: 0,
      refreshing: false,
    };
    this.contactList = React.createRef();
    this.contentWrapper = React.createRef();
    this.onUnfoldChange = (unfold) => {
      this.setState({
        unfold,
      });
    };
  }
  calculateContentSize = () => {
    if (
      this.contentWrapper &&
      this.contentWrapper.current &&
      this.contentWrapper.current.getBoundingClientRect
    ) {
      const rect = this.contentWrapper.current.getBoundingClientRect();
      return {
        contentHeight: rect.bottom - rect.top,
        contentWidth: rect.right - rect.left,
      };
    }
    return {
      contentHeight: 0,
      contentWidth: 0
    };
  }
  componentDidMount() {
    this._mounted = true;
    if (typeof this.props.onVisitPage === 'function') {
      this.props.onVisitPage();
    }
    this.search({
      searchSource: this.props.searchSource,
      searchString: this.state.searchString,
    });
    this.setState({
      ...this.calculateContentSize(),
    });
    window.addEventListener('resize', this.onResize);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.searchString !== this.props.searchString) {
      nextState.searchString = nextProps.searchString;
    }
    if (!contains(nextProps.searchSource, nextProps.contactSourceNames)) {
      this.search({
        searchSource: nextProps.contactSourceNames[0],
        searchString: this.state.searchString,
      });
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this._searchTimeoutId);
  }

  onSearchInputChange = ({ target: { value } }) => {
    this.setState({
      searchString: value,
    });
    this.search({
      searchString: value,
      delay: 100,
    });
  }

  onSourceSelect = (searchSource) => {
    if (
      this.contactList &&
      this.contactList.current &&
      this.contactList.current.resetScrollTop
    ) {
      this.contactList.current.resetScrollTop();
    }
    this.search({
      searchSource,
    });
  }
  onResize = debounce(() => {
    if (this._mounted) {
      this.setState({
        ...this.calculateContentSize(),
      });
    }
  }, 300)

  onRefresh = async () => {
    if (typeof this.props.onRefresh !== 'function') {
      return;
    }
    this.setState({ refreshing: true });
    await this.props.onRefresh();
    this.setState({ refreshing: false });
  }

  search({
    searchSource = this.props.searchSource,
    searchString = this.state.searchString,
    delay = 0,
  }) {
    if (this.props.onSearchContact) {
      if (this._searchTimeoutId) {
        clearTimeout(this._searchTimeoutId);
      }
      if (delay) {
        this._searchTimeoutId = setTimeout(
          () => this.props.onSearchContact({
            searchSource,
            searchString,
          }),
          delay,
        );
      } else {
        this.props.onSearchContact({
          searchSource,
          searchString,
        });
      }
    }
  }

  render() {
    const {
      currentLocale,
      contactGroups,
      contactSourceNames,
      searchSource,
      showSpinner,
      getAvatarUrl,
      getPresence,
      onItemSelect,
      contactSourceFilterRenderer: Filter,
      sourceNodeRenderer,
      onRefresh,
      children
    } = this.props;

    const showRefresh = typeof onRefresh === 'function';
    const refreshButton = showRefresh ? (
      <RefreshContacts
        className={styles.actionButton}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />
    ) : null;
    return (
      <div className={styles.root}>
        <div className={styles.actionBar}>
          <SearchInput
            dataSign="contactsSearchInput"
            className={classnames(styles.searchInput, showRefresh ? styles.withRefresh : '')}
            value={this.state.searchString || ''}
            onChange={this.onSearchInputChange}
            placeholder={i18n.getString('searchPlaceholder', currentLocale)}
          />
          {refreshButton}
          <Filter
            className={styles.actionButton}
            currentLocale={currentLocale}
            contactSourceNames={contactSourceNames}
            onSourceSelect={this.onSourceSelect}
            selectedSourceName={searchSource}
            unfold={this.state.unfold}
            onUnfoldChange={this.onUnfoldChange}
          />
        </div>
        <Panel
          className={styles.content}
        >
          <div
            className={styles.contentWrapper}
            ref={this.contentWrapper}
          >
            <ContactList
              ref={this.contactList}
              currentLocale={currentLocale}
              contactGroups={contactGroups}
              getAvatarUrl={getAvatarUrl}
              getPresence={getPresence}
              onItemSelect={onItemSelect}
              sourceNodeRenderer={sourceNodeRenderer}
              width={this.state.contentWidth}
              height={this.state.contentHeight}
            />
          </div>
        </Panel>
        {showSpinner ? (<SpinnerOverlay className={styles.spinner} />) : null}
        {children}
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
  searchString: PropTypes.string,
  onItemSelect: PropTypes.func,
  onSearchContact: PropTypes.func,
  contactSourceFilterRenderer: PropTypes.func,
  sourceNodeRenderer: PropTypes.func,
  onVisitPage: PropTypes.func,
  onRefresh: PropTypes.func,
  children: PropTypes.node,
};

ContactsView.defaultProps = {
  searchSource: undefined,
  searchString: undefined,
  onItemSelect: undefined,
  onSearchContact: undefined,
  contactSourceFilterRenderer: ContactSourceFilter,
  sourceNodeRenderer: undefined,
  onVisitPage: undefined,
  children: undefined,
  onRefresh: undefined,
};
