import React from 'react';

const Ratio = (props) => {
  const style = {
    fontSize: `${props.size}em`,
  };
  return (
    <div style={style}>
      {props.children}
    </div>
  );
};

Ratio.propTypes = {
  children: React.PropTypes.element,
  size: React.PropTypes.number,
};

export default Ratio;
