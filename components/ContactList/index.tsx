import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { find, findIndex, reduce } from 'ramda';
import { Column, Table } from 'react-virtualized';

import ContactItem from '../ContactItem';
import i18n from './i18n';
import styles from './styles.scss';

const CAPTION_HEIGHT = 20;
const ROW_HEIGHT = 50;

const Placeholder = ({ message }) => {
  return <p className={styles.placeholder}>{message}</p>;
};
Placeholder.propTypes = {
  message: PropTypes.string.isRequired,
};

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = ContactList.getDerivedStateFromProps(props);
    this.list = React.createRef();
  }

  static getDerivedStateFromProps(
    props,
    state = { scrollTop: 0, currentCaption: '' },
  ) {
    if (props.contactGroups !== state.lastContactGroups) {
      return {
        ...reduce(
          (nextState, group) => {
            nextState.captions.push(group.caption);

            // skip the caption row for the first group
            const rowOffset = nextState.groups.length !== 0 ? 1 : 0;
            if (rowOffset) {
              nextState.captionRows[nextState.rowCount] = group.caption;
            }
            nextState.groups.push({
              ...group,
              startIndex: nextState.rowCount + rowOffset,
            });
            nextState.rowCount += group.contacts.length + rowOffset; // with caption row
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

  componentDidUpdate(prevProps) {
    if (this.state.lastContactGroups !== prevProps.contactGroups) {
      if (
        this.list &&
        this.list.current &&
        this.list.current.recomputeRowHeights
      ) {
        this.list.current.recomputeRowHeights(0);
      }
    }
  }

  isBottomNoticeRow(rowIndex) {
    return this.props.bottomNotice && rowIndex === this.state.rowCount;
  }

  calculateRowHeight = ({ index }) => {
    if (this.isBottomNoticeRow(index)) {
      return this.props.bottomNoticeHeight;
    }
    if (this.state.captionRows[index]) {
      return CAPTION_HEIGHT;
    }
    return ROW_HEIGHT;
  };

  findGroup = ({ index }) =>
    find(
      (item) =>
        index >= item.startIndex &&
        index < item.startIndex + item.contacts.length,
      this.state.groups,
    );

  rowGetter = ({ index }) => {
    if (this.isBottomNoticeRow(index)) {
      return {
        bottomNoticeRow: true,
      };
    }
    if (this.state.captionRows[index]) {
      return {
        caption: this.state.captionRows[index],
      };
    }
    const group = this.findGroup({ index });
    return group.contacts[index - group.startIndex];
  };

  onScroll = ({ scrollTop }) => {
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

  cellRenderer = ({ rowData }) => {
    if (rowData.bottomNoticeRow) {
      const { bottomNotice: BottomNotice } = this.props;
      return BottomNotice ? <BottomNotice /> : <span />;
    }
    if (rowData.caption) {
      return <div className={styles.groupCaption}>{rowData.caption}</div>;
    }
    const {
      currentLocale,
      getAvatarUrl,
      getPresence,
      onItemSelect,
      sourceNodeRenderer,
      currentSiteCode,
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

  onRowsRendered = ({ startIndex }) => {
    if (this.isBottomNoticeRow(startIndex)) {
      return;
    }
    // update header with the correct caption
    if (this.state.captionRows[startIndex]) {
      const groupIndex = findIndex(
        (item) => item === this.state.captionRows[startIndex],
        this.state.captions,
      );
      const previousCaption = this.state.captions[groupIndex - 1];
      if (previousCaption !== this.state.currentCaption) {
        this.setState({
          currentCaption: previousCaption,
        });
      }
    } else {
      const group = this.findGroup({ index: startIndex });
      if (group.caption !== this.state.currentCaption) {
        this.setState({
          currentCaption: group.caption,
        });
      }
    }
  };

  headerRenderer = () => (
    <div className={styles.groupCaption}>{this.state.currentCaption}</div>
  );

  renderList() {
    // use table instead of list to allow caption header
    return (
      <Table
        ref={this.list}
        headerHeight={CAPTION_HEIGHT}
        width={this.props.width}
        height={this.props.height}
        rowCount={this.state.rowCount + (this.props.bottomNotice ? 1 : 0)}
        rowHeight={this.calculateRowHeight}
        rowGetter={this.rowGetter}
        onRowsRendered={this.onRowsRendered}
        onScroll={this.onScroll}
        scrollTop={this.state.scrollTop}
      >
        <Column
          dataKey="caption"
          disableSort
          flexGrow={1}
          width={this.props.width}
          cellRenderer={this.cellRenderer}
          headerRenderer={this.headerRenderer}
        />
      </Table>
    );
  }

  render() {
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
        data-contact-count={this.state.contactCount}
      >
        {content}
      </div>
    );
  }
}

ContactList.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  contactGroups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      caption: PropTypes.string.isRequired,
      contacts: PropTypes.arrayOf(ContactItem.propTypes.contact).isRequired,
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
