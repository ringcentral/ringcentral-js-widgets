import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';


function Switch(props) {
  const onChange = props.onChange ?
    e => !props.disable && props.onChange(e.currentTarget.checked) :
    undefined;
  return (
    <label
      title={props.title}
      className={classnames(styles.switch, props.disable && styles.disable)}
    >
      <input
        type="checkbox"
        checked={props.checked}
        onChange={onChange} />
      <div className={classnames(styles.slider, props.className)} />
    </label>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool,
  disable: PropTypes.bool,
  title: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
Switch.defaultProps = {
  checked: false,
  disable: false,
  onChange: undefined,
  title: undefined,
  className: '',
};
export default Switch;
