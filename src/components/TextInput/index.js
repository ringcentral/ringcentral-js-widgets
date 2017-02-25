import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';


function TextInput({
  className,
  invalid,
  onChange,
  placeholder,
  disabled,
  readOnly,
  pattern,
  name,
  maxLength,
  value,
  defaultValue,
  onKeyDown,
}) {
  return (
    <div
      className={classnames(
        styles.root,
        className,
        invalid && styles.invalid,
      )}>
      <input
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        pattern={pattern}
        maxLength={maxLength}
        name={name}
        value={value || ''}
        defaultValue={defaultValue}
        className={styles.input}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
TextInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  pattern: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  invalid: PropTypes.bool,
  onKeyDown: PropTypes.func,
};
TextInput.defaultProps = {
  className: undefined,
  onChange: undefined,
  placeholder: undefined,
  disabled: false,
  readOnly: false,
  pattern: undefined,
  maxLength: undefined,
  name: undefined,
  value: undefined,
  defaultValue: undefined,
  invalid: false,
  onKeyDown: undefined,
};

export default TextInput;
