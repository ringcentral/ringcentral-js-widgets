import React from 'react';

import DropdownItem from '../DropdownItem/DropdownItem.react';

import prefix from '../../../utils/style';

const { dropdown } = prefix(['dropdown'], 'Dropdown');

const Dropdown = (props) => (
  <ul className={dropdown}>
    {props.items.map((item, index) => (
      <DropdownItem
        {...item}
        item={item}
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
