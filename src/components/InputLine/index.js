import React, { PropTypes } from 'react';
import styles from './styles.scss';
import Line from '../Line';


function InputLine(props) {
  return (
    <Line
      className={props.className}
      onClick={props.onClick}
      noBorder={props.noBorder}
    >
      <div className={styles.label}>
        {props.label}
      </div>
      <div className={styles.inputHolder}>
        {props.children}
      </div>
    </Line>
  );
}

InputLine.propTypes = {
  children: PropTypes.node,
  label: PropTypes.node,
  input: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  noBorder: PropTypes.bool,
};

export default InputLine;
