import React from 'react';
import PropsTypes from 'prop-types';
import LinkLine from '../LinkLine';
import Switch from '../Switch';
import Line from '../Line';
import IconLine from '../IconLine';

function List({ type, switchProps }) {
  console.log(type);
  if (type === 'L101' && !switchProps) {
    return (<LinkLine>Label</LinkLine>);
  } else if (type === 'L101' && switchProps) {
    return (<IconLine icon={<Switch {...switchProps} />}>Label</IconLine>);
  }
}

List.defaultProps = {
  type: 'L101'
};
List.PropsTypes = {
  type: PropsTypes.string
};
export default List;
