import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { find, findIndex, reduce } from 'ramda';
import { Column, Table } from 'react-virtualized';

import { ContactItem } from '../ContactItem';
import i18n from './i18n';
import styles from './styles.scss';

const CAPTION_HEIGHT = 20;
const ROW_HEIGHT = 50;

// @ts-expect-error
const Placeholder = ({ message }) => {
  return <p className={styles.placeholder}>{message}</p>;
};
Placeholder.propTypes = {
  message: PropTypes.string.isRequired,
};

class ContactList extends Component {
  // @ts-expect-error
  constructor(props) {
    super(props);
    this.state = ContactList.getDerivedStateFromProps(props);
    // @ts-expect-error
    this.list = React.createRef();
  }

  static getDerivedStateFromProps(
    // @ts-expect-error
    props,
    state = { scrollTop: 0, currentCaption: '' },
  ) {
    // @ts-expect-error
    if (props.contactGroups !== state.lastContactGroups) {
      return {
        ...reduce(
          (nextState, group) => {
            // @ts-expect-error
            nextState.captions.push(group.caption);

            // skip the caption row for the first group
            const rowOffset = nextState.groups.length !== 0 ? 1 : 0;
            if (rowOffset) {
              // @ts-expect-error
              nextState.captionRows[nextState.rowCount] = group.caption;
            }
            nextState.groups.push({
              // @ts-expect-error
              ...group,
              // @ts-expect-error
              startIndex: nextState.rowCount + rowOffset,
            });
            // @ts-expect-error
            nextState.rowCount += group.contacts.length + rowOffset; // with caption row
            // @ts-expect-error
            nextState.contactCount += group.contacts.length;
            return nextState;
          },
          {
            ...state,
            groups: [],
            captions: [],
            captionRows: {},
            rowCount: 0,
            contactCount: 0,
          },
          props.contactGroups,
        ),
        lastContactGroups: props.contactGroups,
      };
    }
    return state;
  }

  // @ts-expect-error
  componentDidUpdate(prevProps) {
    // @ts-expect-error
    if (this.state.lastContactGroups !== prevProps.contactGroups) {
      if (
        // @ts-expect-error
        this.list &&
        // @ts-expect-error
        this.list.current &&
        // @ts-expect-error
        this.list.current.recomputeRowHeights
      ) {
        // @ts-expect-error
        this.list.current.recomputeRowHeights(0);
      }
    }
  }

  // @ts-expect-error
  isBottomNoticeRow(rowIndex) {
    // @ts-expect-error
    return this.props.bottomNotice && rowIndex === this.state.rowCount;
  }

  // @ts-expect-error
  calculateRowHeight = ({ index }) => {
    if (this.isBottomNoticeRow(index)) {
      // @ts-expect-error
      return this.props.bottomNoticeHeight;
    }
    // @ts-expect-error
    if (this.state.captionRows[index]) {
      return CAPTION_HEIGHT;
    }
    return ROW_HEIGHT;
  };

  // @ts-expect-error
  findGroup = ({ index }) =>
    find(
      (item) =>
        // @ts-expect-error
        index >= item.startIndex &&
        // @ts-expect-error
        index < item.startIndex + item.contacts.length,
      // @ts-expect-error
      this.state.groups,
    );

  // @ts-expect-error
  rowGetter = ({ index }) => {
    if (this.isBottomNoticeRow(index)) {
      return {
        bottomNoticeRow: true,
      };
    }
    // @ts-expect-error
    if (this.state.captionRows[index]) {
      return {
        // @ts-expect-error
        caption: this.state.captionRows[index],
      };
    }
    const group = this.findGroup({ index });
    // @ts-expect-error
    return group.contacts[index - group.startIndex];
  };

  // @ts-expect-error
  onScroll = ({ scrollTop }) => {
    // @ts-expect-error
    if (scrollTop !== this.state.scrollTop) {
      this.setState({
        scrollTop,
      });
    }
  };

  resetScrollTop() {
    this.setState({
      scrollTop: 0,
    });
  }
  // @ts-expect-error

  cellRenderer = ({ rowData }) => {
    if (rowData.bottomNoticeRow) {
      // @ts-expect-error
      const { bottomNotice: BottomNotice } = this.props;
      return BottomNotice ? <BottomNotice /> : <span />;
    }
    if (rowData.caption) {
      return <div className={styles.groupCaption}>{rowData.caption}</div>;
    }
    const {
      // @ts-expect-error
      currentLocale,
      // @ts-expect-error
      getAvatarUrl,
      // @ts-expect-error
      getPresence,
      // @ts-expect-error
      onItemSelect,
      // @ts-expect-error
      sourceNodeRenderer,
      // @ts-expect-error
      currentSiteCode,
      // @ts-expect-error
      isMultipleSiteEnabled,
    } = this.props;
    return (
      <div key={`${rowData.type}-${rowData.id}`}>
        <ContactItem
          currentLocale={currentLocale}
          currentSiteCode={currentSiteCode}
          isMultipleSiteEnabled={isMultipleSiteEnabled}
          contact={rowData}
          getAvatarUrl={getAvatarUrl}
          getPresence={getPresence}
          onSelect={onItemSelect}
          sourceNodeRenderer={sourceNodeRenderer}
        />
      </div>
    );
  };

  // @ts-expect-error
  onRowsRendered = ({ startIndex }) => {
    if (this.isBottomNoticeRow(startIndex)) {
      return;
    }
    // update header with the correct caption

    // @ts-expect-error
    if (this.state.captionRows[startIndex]) {
      const groupIndex = findIndex(
        // @ts-expect-error
        (item) => item === this.state.captionRows[startIndex],

        // @ts-expect-error
        this.state.captions,
      );
      // @ts-expect-error
      const previousCaption = this.state.captions[groupIndex - 1];
      // @ts-expect-error
      if (previousCaption !== this.state.currentCaption) {
        this.setState({
          currentCaption: previousCaption,
        });
      }
    } else {
      const group = this.findGroup({ index: startIndex });
      // @ts-expect-error
      if (group.caption !== this.state.currentCaption) {
        this.setState({
          // @ts-expect-error
          currentCaption: group.caption,
        });
      }
    }
  };

  headerRenderer = () => (
    <div className={styles.groupCaption} data-sign="currentCaption">
      {
        // @ts-expect-error
        this.state.currentCaption
      }
    </div>
  );

  renderList() {
    // use table instead of list to allow caption header
    return (
      <Table
        // @ts-expect-error
        ref={this.list}
        headerHeight={CAPTION_HEIGHT}
        // @ts-expect-error
        width={this.props.width}
        // @ts-expect-error
        height={this.props.height}
        // @ts-expect-error
        rowCount={this.state.rowCount + (this.props.bottomNotice ? 1 : 0)}
        rowHeight={this.calculateRowHeight}
        rowGetter={this.rowGetter}
        onRowsRendered={this.onRowsRendered}
        onScroll={this.onScroll}
        // @ts-expect-error
        scrollTop={this.state.scrollTop}
      >
        <Column
          dataKey="caption"
          disableSort
          flexGrow={1}
          // @ts-expect-error
          width={this.props.width}
          cellRenderer={this.cellRenderer}
          headerRenderer={this.headerRenderer}
        />
      </Table>
    );
  }

  // @ts-expect-error
  render() {
    // @ts-expect-error
    const { currentLocale, contactGroups, isSearching, width, height } =
      this.props;
    let content = null;
    if (width !== 0 && height !== 0) {
      if (contactGroups.length) {
        content = this.renderList();
      } else if (isSearching) {
        content = (
          <Placeholder message={i18n.getString('onSearching', currentLocale)} />
        );
      } else {
        content = (
          <Placeholder message={i18n.getString('noContacts', currentLocale)} />
        );
      }
    }
    return (
      <div
        className={styles.root}
        data-sign="contactList"
        // @ts-expect-error
        data-contact-count={this.state.contactCount}
      >
        {content}
      </div>
    );
  }
}

// @ts-expect-error
ContactList.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  contactGroups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      contacts: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          type: PropTypes.string,
          name: PropTypes.string,
          extensionNumber: PropTypes.string,
          email: PropTypes.string,
          profileImageUrl: PropTypes.string,
          presence: PropTypes.object,
          contactStatus: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  currentSiteCode: PropTypes.string,
  isMultipleSiteEnabled: PropTypes.bool,
  getPresence: PropTypes.func.isRequired,
  onItemSelect: PropTypes.func,
  sourceNodeRenderer: PropTypes.func,
  isSearching: PropTypes.bool,
  bottomNotice: PropTypes.func,
  bottomNoticeHeight: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

// @ts-expect-error
ContactList.defaultProps = {
  onItemSelect: undefined,
  sourceNodeRenderer: undefined,
  isSearching: false,
  bottomNotice: undefined,
  bottomNoticeHeight: 0,
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
};

export default ContactList;
