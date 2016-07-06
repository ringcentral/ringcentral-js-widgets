import React from 'react';
import styles from './list.css';

const List = (props) => (
  <div className={styles.list}>
    {props.children}
  </div>
);

List.propTypes = {
  children: React.PropTypes.node,
};

export default List;
