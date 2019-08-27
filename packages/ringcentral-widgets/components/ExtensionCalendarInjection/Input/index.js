import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import { ThemeConsumer } from '../commons/themeContext';

function Input({
  theme, dataSign, onChange, value, disabled, errorMessage, isError, className, placeholder
}) {
  if (disabled) {
    return (
      <div
        className={classnames(styles.disabled, className, {
          [styles.isOld]: theme.isOldUI,
        })}
      >
        {value || placeholder}
      </div>
    );
  }

  return (
    <div
      className={classnames(className, {
        [styles.error]: isError,
        [styles.isOld]: theme.isOldUI,
      })}
    >
      <input
        placeholder={placeholder}
        type="text"
        className={classnames(styles.textField, theme.UI && styles[theme.UI])}
        value={value}
        onChange={onChange}
        data-sign={dataSign}
      />
      {isError && <div className={styles.message}>{errorMessage}</div>}
    </div>
  );
}

Input.propTypes = {
  isError: PropTypes.bool,
  disabled: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  dataSign: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  isError: false,
  disabled: false,
  onChange: null,
  value: null,
  dataSign: '',
  className: '',
  errorMessage: '',
  placeholder: '',
};

export default ThemeConsumer(Input);
