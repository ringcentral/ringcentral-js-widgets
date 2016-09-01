import React from 'react';

import prefix from '../../../utils/style';

import classNames from 'classnames';

const { listItem, clickable } = prefix(['listItem', 'clickable'], 'ListItem');

const ListItem = (props) => (
  <div
    className={
      classNames(
        listItem,
        props.className,
        { [clickable]: props.clickable }
      )}
    onClick={props.onClick}
  >
    {props.children}
  </div>
);

ListItem.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func,
  clickable: React.PropTypes.bool,
  className: React.PropTypes.string,
};

export default ListItem;
