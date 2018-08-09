import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { List } from 'react-virtualized';

import styles from './styles.scss';

import GlipGroupItem from '../GlipGroupItem';

export default class GlipGroupList extends PureComponent {
  constructor(props) {
    super(props);
    this._rowHeight = 75;
    this._list = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.groups !== prevProps.groups ||
      this.props.currentGroupId !== prevProps.currentGroupId
    ) {
      if (this._list && this._list.current) {
        this._list.current.forceUpdateGrid();
      }
    }
  }

  _rowRenderer = ({
    index,
    key,
    style,
  }) => {
    const group = this.props.groups[index];
    return (
      <div
        key={key}
        style={style}
      >
        <GlipGroupItem
          group={group}
          active={group.id === this.props.currentGroupId}
          onSelectGroup={() => { this.props.onSelectGroup(group.id); }}
          className={styles.item}
        />
      </div>
    );
  }

  render() {
    const {
      groups,
      width,
      height,
      className,
    } = this.props;
    return (
      <List
        ref={this._list}
        className={className}
        width={width}
        height={height}
        rowCount={groups.length}
        rowHeight={75}
        rowRenderer={this._rowRenderer}
      />
    );
  }
}

GlipGroupList.propTypes = {
  className: PropTypes.string,
  groups: PropTypes.array,
  onSelectGroup: PropTypes.func.isRequired,
  currentGroupId: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

GlipGroupList.defaultProps = {
  className: undefined,
  groups: [],
  currentGroupId: undefined,
};
