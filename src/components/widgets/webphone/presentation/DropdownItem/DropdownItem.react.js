import React from 'react';

import { dropdownItem, left, mid, right } from './DropdownItem.css';

const DropdownItem = (props) => (
  <li
    className={dropdownItem}
    onClick={() => props.onClick(props.left, props.mid, props.right)}
  >
    <div className={left}>{props.left}</div>
    <div className={mid}>{props.mid}</div>
    <div className={right}>{props.right}</div>
  </li>
);

DropdownItem.propTypes = {
  onClick: React.PropTypes.func,
  left: React.PropTypes.string,
  mid: React.PropTypes.string,
  right: React.PropTypes.string,
};

export default DropdownItem;
