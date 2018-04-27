import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import '../../assets/DynamicsFont/DynamicsFont.scss'; // import font face

export default function Select({
  className,
  value,
  onChange,
  disabled,
  options,
  valueFunction,
  renderFunction,
  paddingLeft,
}) {
  return (
    <div
      className={classnames(
        styles.root,
        className)}>
      <select
        className={styles.select}
        disabled={disabled}
        value={value}
        style={{
          paddingLeft,
        }}
        onChange={onChange} >
        {
          options.map((option, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <option key={idx} value={valueFunction(option, idx)}>
              {renderFunction(option, idx)}
            </option>
          ))
        }
      </select>
    </div>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  paddingLeft: PropTypes.number,
  valueFunction: PropTypes.func,
  renderFunction: PropTypes.func,
};

Select.defaultProps = {
  className: undefined,
  value: undefined,
  onChange: undefined,
  disabled: false,
  paddingLeft: 10,
  valueFunction: option => option,
  renderFunction: option => option,
};
