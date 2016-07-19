import React from 'react';

import { dropdown } from './Dropdown.css';
import DropdownItem from '../DropdownItem/DropdownItem.react';

const Dropdown = (props) => (
  <ul className={dropdown}>
    {props.items.map((item, index) => (
      <DropdownItem
        key={index}
        country={item.country}
        value={item.value}
        type={item.type}
      />
    ))}
  </ul>
);

Dropdown.propTypes = {
  items: React.PropTypes.array,
};

Dropdown.defaultProps = {
  items: [],
};

export default Dropdown;
