import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Column } from 'react-virtualized';
import { reduce, find, findIndex } from 'ramda';
import ContactItem from '../ContactItem';
import styles from './styles.scss';
import i18n from './i18n';

const CAPTION_HEIGHT = 20;
const ROW_HEIGHT = 50;

function NoContacts({ currentLocale }) {
  return (
    <p className={styles.noContacts}>
      {i18n.getString('noContacts', currentLocale)}
    </p>
  );
}
NoContacts.propTypes = {
  currentLocale: PropTypes.string.isRequired,
};

export default class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = ContactList.getDerivedStateFromProps(props);
    this.list = React.createRef();
  }

  static getDerivedStateFromProps(props, state = { scrollTop: 0, currentCaption: '' }) {
    if (props.contactGroups !== state.lastContactGroups) {
      return {
        ...reduce(
          (nextState, group) => {
            nextState.captions.push(group.caption);

            // skip the caption row for the first group
            const rowOffset = nextState.groups.length !== 0 ?
              1 :
              0;
            if (rowOffset) {
              nextState.captionRows[nextState.count] = group.caption;
            }
            nextState.groups.push({
              ...group,
              startIndex: nextState.count + rowOffset,
            });
            nextState.count += group.contacts.length + rowOffset; // with caption row
            return nextState;
          },
          {
            ...state,
            groups: [],
            captions: [],
            captionRows: {},
            count: 0,
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
      if (this.list && this.list.current && this.list.current.recomputeRowHeights) {
        this.list.current.recomputeRowHeights(0);
      }
    }
  }
  calculateRowHeight = ({ index }) => {
    if (this.state.captionRows[index]) {
      return CAPTION_HEIGHT;
    }
    return ROW_HEIGHT;
  }
  findGroup = ({ index }) => find(
    item => (
      index >= item.startIndex &&
      index < item.startIndex + item.contacts.length
    ),
    this.state.groups,
  )
  rowGetter = ({ index }) => {
    if (this.state.captionRows[index]) {
      return {
        caption: this.state.captionRows[index],
      };
    }
    const group = this.findGroup({ index });
    return group.contacts[index - group.startIndex];
  }
  onScroll = ({ scrollTop }) => {
    if (scrollTop !== this.state.scrollTop) {
      this.setState({
        scrollTop,
      });
    }
  }
  resetScrollTop() {
    this.setState({
      scrollTop: 0,
    });
  }
  cellRenderer = ({
    rowData,
  }) => {
    if (rowData.caption) {
      return (
        <div
          className={styles.groupCaption}
        >
          {rowData.caption}
        </div>
      );
    }
    const {
      getAvatarUrl,
      getPresence,
      onItemSelect,
      sourceNodeRenderer,
    } = this.props;
    return (
      <div
        key={`${rowData.type}-${rowData.id}`}
      >
        <ContactItem
          contact={rowData}
          getAvatarUrl={getAvatarUrl}
          getPresence={getPresence}
          onSelect={onItemSelect}
          sourceNodeRenderer={sourceNodeRenderer}
        />
      </div>
    );
  }
  onRowsRendered = ({ startIndex }) => {
    // update header with the correct caption
    if (this.state.captionRows[startIndex]) {
      const groupIndex = findIndex(
        item => item === this.state.captionRows[startIndex],
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
  }
  headerRenderer = () => (
    <div
      className={styles.groupCaption}
    >
      {this.state.currentCaption}
    </div>
  )
  renderList() {
    // use table instead of list to allow caption header
    return (
      <Table
        ref={this.list}
        headerHeight={CAPTION_HEIGHT}
        width={this.props.width}
        height={this.props.height}
        rowCount={this.state.count}
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
    const {
      currentLocale,
      contactGroups,
      width,
      height,
    } = this.props;
    let content = null;
    if (width !== 0 && height !== 0) {
      content = contactGroups.length ?
        this.renderList() :
        (
          <NoContacts
            currentLocale={currentLocale}
          />
        );
    }
    return (
      <div
        className={styles.root}
      >
        {content}
      </div>
    );
  }
}

ContactList.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  contactGroups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    contacts: PropTypes.arrayOf(ContactItem.propTypes.contact).isRequired,
  })).isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  getPresence: PropTypes.func.isRequired,
  onItemSelect: PropTypes.func,
  sourceNodeRenderer: PropTypes.func,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

ContactList.defaultProps = {
  onItemSelect: undefined,
  sourceNodeRenderer: undefined
};
