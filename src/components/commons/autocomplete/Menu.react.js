import React from 'react';

const Menu = (props) => (
  <div>
    {props.candidates.map((val, index) => (
      <div key={index}>
        {val}
      </div>
    ))}
  </div>
);

Menu.propTypes = {
  candidates: React.PropTypes.array,
};

export default Menu;
