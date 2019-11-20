import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.scss';
import RemoveButton from '../RemoveButton';
import i18n from '../RecipientsInput/i18n';

const PhoneNumberInput = forwardRef(function PhoneNumberInput(
  {
    currentLocale,
    placeholder = i18n.getString('enterNameOrNumber', currentLocale),
    value,
    onChange,
    onClear,
    onFocus,
    isFocused,
  },
  ref,
) {
  const inputEl = useRef(null);
  useImperativeHandle(ref, () => ({
    focus() {
      // Ensure focus is called in the next event cycle
      // This avoids any event handler in the same cycle messing up the focus
      setImmediate(() => {
        if (inputEl.current) {
          inputEl.current.focus();
        }
      });
    },
    blur() {
      if (inputEl.current) {
        inputEl.current.blur();
      }
    },
  }));
  return (
    <div className={styles.inputWrapper}>
      <div
        className={classnames(
          styles.inputField,
          isFocused && 'Mui-focused',
          'MuiInput-underline',
        )}
      >
        <input
          data-sign="recipientsInput"
          ref={inputEl}
          name="receiver"
          value={value}
          onChange={({ currentTarget: { value } }) => onChange(value)}
          className={styles.numberInput}
          maxLength={30}
          onFocus={onFocus}
          placeholder={placeholder}
          autoComplete="off"
        />
      </div>
      <RemoveButton
        className={styles.removeButton}
        onClick={onClear}
        visibility={value.length > 0}
      />
    </div>
  );
});

PhoneNumberInput.propTypes = {
  placeholder: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  isFocused: PropTypes.bool,
};

PhoneNumberInput.defaultProps = {
  placeholder: undefined,
  onChange: undefined,
  onClear: undefined,
  onFocus: undefined,
  isFocused: false,
};

export default PhoneNumberInput;
