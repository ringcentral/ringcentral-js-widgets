import React from 'react';

import { dropdown } from './Dropdown.css';
import DropdownItem from '../DropdownItem/DropdownItem.react';

const Dropdown = (props) => (
  <ul className={dropdown}>
    {props.items.map((item, index) => (
      <DropdownItem
        {...item}
        onClick={props.onClick}
        key={index}
      />
    ))}
  </ul>
);

Dropdown.propTypes = {
  onClick: React.PropTypes.func,
  items: React.PropTypes.array,
};

Dropdown.defaultProps = {
  items: [],
};

export default Dropdown;
