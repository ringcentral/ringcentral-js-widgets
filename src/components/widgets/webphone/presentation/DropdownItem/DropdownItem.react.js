import React from 'react';

import { dropdownItem } from './DropdownItem.css';

const DropdownItem = (props) => (
  <li
    className={dropdownItem}
    onClick={() => props.onClick(props.left, props.mid, props.right)}
  >
    <div>{props.left}</div>
    <div>{props.mid}</div>
    <div>{props.right}</div>
  </li>
);

DropdownItem.propTypes = {
  onClick: React.PropTypes.func,
  left: React.PropTypes.string,
  mid: React.PropTypes.string,
  right: React.PropTypes.string,
};

export default DropdownItem;
