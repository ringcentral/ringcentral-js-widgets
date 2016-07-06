import React from 'react';
import styles from './list.css';

import classNames from 'classnames';

const ListItem = (props) => (
  <div
    className={
      classNames(
        styles.listItem,
        props.className,
        { [styles.clickable]: props.clickable }
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
