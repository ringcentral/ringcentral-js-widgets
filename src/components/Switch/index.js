import React, { PropTypes } from 'react';
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

export default Switch;
