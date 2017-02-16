import React, { PropTypes } from 'react';
import styles from './styles.scss';
import Line from '../Line';


function InputField(props) {
  return (
    <div className={props.className}>
      <div className={styles.label}>
        {props.label}
      </div>
      <div className={styles.inputHolder}>
        {props.children}
      </div>
    </div>
  );
}

InputField.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  className: PropTypes.string,
};

export default InputField;
