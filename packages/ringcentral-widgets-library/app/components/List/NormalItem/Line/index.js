import React from 'react';
import PropsTypes from 'prop-types';
import LinkLine from '../../../../elements/LinkLine';


function LineItem({
  label,
  onClick
}) {
  return (<LinkLine onClick={onClick}>{label}</LinkLine>);
}

LineItem.propTypes = {
  label: PropsTypes.string,
  onClick: PropsTypes.func,
};

LineItem.defaultProps = {
  label: '',
  onClick() { }
};

export default LineItem;
