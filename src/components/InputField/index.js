import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';


function InputField(props) {
  return (
    <div className={classnames(styles.root, props.className)}>
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
InputField.defaultProps = {
  children: undefined,
  label: undefined,
  className: undefined,
};

export default InputField;
