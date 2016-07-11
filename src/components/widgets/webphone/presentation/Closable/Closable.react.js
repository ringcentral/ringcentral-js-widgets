import React from 'react';
import styles from '../index.css';

const Closable = (props) => (
  <div className={props.className}>
    <button className={styles.cancelButton} onClick={props.onClose}>Cancel</button>
    {props.children}
  </div>
);

Closable.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  onClose: React.PropTypes.func,
};

export default Closable;
