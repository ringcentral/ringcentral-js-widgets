import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';


function Switch(props) {
  const onChange = props.onChange ?
    e => props.onChange(e.currentTarget.checked) :
    undefined;
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={onChange} />
      <div className={styles.slider} />
    </label>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
Switch.defaultProps = {
  checked: false,
  onChange: undefined,
};
export default Switch;
