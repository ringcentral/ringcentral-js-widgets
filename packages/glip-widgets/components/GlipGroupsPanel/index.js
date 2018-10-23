import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import SearchInput from 'ringcentral-widgets/components/SearchInput';
import SpinnerOverlay from 'ringcentral-widgets/components/SpinnerOverlay';
import debounce from 'ringcentral-integration/lib/debounce';

import GlipGroupList from '../GlipGroupList';
import GlipTeamCreationModal from '../GlipTeamCreation';

import styles from './styles.scss';

export default class GlipGroupsPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchString: props.searchFilter,
      showTeamCreationModal: false,
      contentHeight: 0,
      contentWidth: 0,
    };
    this.updateSeachString = (e) => {
      const searchString = e.target.value;
      this.setState({
        searchString,
      });
      this.props.updateSearchFilter(searchString);
    };
    this.toggleShowTeamCreationModal = () => {
      this.setState((preState) => ({
        showTeamCreationModal: !preState.showTeamCreationModal,
      }));
    };
    this._contentWrapper = React.createRef();
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
    this._calculateContentSize();
    window.addEventListener('resize', this._onResize);
  }

  componentWillUnmount() {
    this._mounted = false;
    window.removeEventListener('resize', this._onResize);
  }

  _onResize = debounce(() => {
    if (this._mounted) {
      this._calculateContentSize();
    }
  }, 300);

  _calculateContentSize() {
    if (
      this._contentWrapper &&
      this._contentWrapper.current &&
      this._contentWrapper.current.getBoundingClientRect
    ) {
      const rect = this._contentWrapper.current.getBoundingClientRect();
      this.setState({
        contentHeight: rect.bottom - rect.top,
        contentWidth: rect.right - rect.left,
      });
      return;
    }
    this.setState({
      contentHeight: 0,
      contentWidth: 0,
    });
  }

  render() {
    const {
      groups,
      className,
      currentGroupId,
      showSpinner,
      currentPage,
      onNextPage,
      onSelectGroup,
      filteredContacts,
      updateContactSearchFilter,
      contactSearchFilter,
    } = this.props;
    const spinner = showSpinner ? <SpinnerOverlay /> : null;
    // TODO: update searching with i18n
    return (
      <div className={classnames(styles.root, className)}>
        <div className={styles.header}>
          <SearchInput
            className={styles.searchInput}
            value={this.state.searchString}
            onChange={this.updateSeachString}
            placeholder="Searching"
          />
          <div
            className={styles.addTeam}
            onClick={this.toggleShowTeamCreationModal}
          >
            +
          </div>
        </div>
        <div className={styles.content} ref={this._contentWrapper}>
          <GlipGroupList
            groups={groups}
            onSelectGroup={onSelectGroup}
            currentGroupId={currentGroupId}
            onNextPage={onNextPage}
            currentPage={currentPage}
            width={this.state.contentWidth}
            height={this.state.contentHeight}
          />
        </div>
        <GlipTeamCreationModal
          filteredContacts={filteredContacts}
          updateFilter={updateContactSearchFilter}
          searchFilter={contactSearchFilter}
          closeModal={this.toggleShowTeamCreationModal}
          createTeam={this.props.createTeam}
          show={this.state.showTeamCreationModal}
        />
        {spinner}
      </div>
    );
  }
}

GlipGroupsPanel.propTypes = {
  groups: PropTypes.array,
  className: PropTypes.string,
  searchFilter: PropTypes.string,
  currentGroupId: PropTypes.string,
  onSelectGroup: PropTypes.func.isRequired,
  updateSearchFilter: PropTypes.func.isRequired,
  showSpinner: PropTypes.bool,
  currentPage: PropTypes.number,
  onNextPage: PropTypes.func,
  createTeam: PropTypes.func.isRequired,
  filteredContacts: PropTypes.array,
  updateContactSearchFilter: PropTypes.func.isRequired,
  contactSearchFilter: PropTypes.string,
};

GlipGroupsPanel.defaultProps = {
  groups: [],
  className: undefined,
  searchFilter: '',
  currentGroupId: undefined,
  showSpinner: false,
  currentPage: 1,
  onNextPage: undefined,
  filteredContacts: [],
  contactSearchFilter: '',
};
