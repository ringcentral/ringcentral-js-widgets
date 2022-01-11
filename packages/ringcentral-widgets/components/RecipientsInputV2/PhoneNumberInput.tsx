import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';

import classnames from 'classnames';

import i18n from '../RecipientsInput/i18n';
import { RemoveButton } from '../RemoveButton';
import styles from './styles.scss';

export interface PhoneNumberInputHandles {
  focus: () => void;
  blur: () => void;
}

export interface PhoneNumberInputProps {
  currentLocale: string;
  placeholder?: ReactNode;
  value: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onFocus?: () => void;
  isFocused?: boolean;
}

export const PhoneNumberInput = forwardRef<
  PhoneNumberInputHandles,
  PhoneNumberInputProps
>(
  (
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
  ) => {
    const inputEl = useRef(null);
    useImperativeHandle(ref, () => ({
      focus() {
        // Ensure focus is called in the next event cycle
        // This avoids any event handler in the same cycle messing up the focus
        setTimeout(() => {
          if (inputEl.current) {
            inputEl.current.focus();
          }
        }, 0);
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
            onPaste={(ev) => {
              console.log(ev);
            }}
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
  },
);

PhoneNumberInput.defaultProps = {
  isFocused: false,
};
