import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';

export default function Select({
  className,
  value,
  onChange,
  disabled,
  options,
  valueFunction,
  renderFunction,
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
  options: PropTypes.array.isRequired,
  valueFunction: PropTypes.func,
  renderFunction: PropTypes.func,
};

Select.defaultProps = {
  className: undefined,
  value: undefined,
  onChange: undefined,
  disabled: false,
  valueFunction: option => option,
  renderFunction: option => option,
};
