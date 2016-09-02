import React from 'react';
import prefix from '../../../utils/style';

const { list } = prefix(['list'], 'List');

const List = (props) => (
  <div className={list}>
    {props.children}
  </div>
);

List.propTypes = {
  children: React.PropTypes.node,
};

export default List;
