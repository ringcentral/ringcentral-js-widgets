import React from 'react';
import PropsTypes from 'prop-types';
import LinkLine from '../LinkLine';
import Switch from '../Switch';
import Line from '../Line';

function List({ type }) {
  console.log(type);
  if (type === 'L01') {
    return (<LinkLine>Label</LinkLine>);
  } else if (type === 'L02') {
    return (<Line icon={Switch}>Label</Line>);
  }
}

List.defaultProps = {
  type: 'L01'
};
List.PropsTypes = {
  type: PropsTypes.string
};
export default List;
