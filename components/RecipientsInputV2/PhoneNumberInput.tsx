import clsx from 'clsx';
import type { ReactNode } from 'react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

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
            // @ts-expect-error TS(2339): Property 'focus' does not exist on type 'never'.
            inputEl.current.focus();
          }
        }, 0);
      },
      blur() {
        if (inputEl.current) {
          // @ts-expect-error TS(2339): Property 'blur' does not exist on type 'never'.
          inputEl.current.blur();
        }
      },
    }));
    return (
      <div className={styles.inputWrapper}>
        <div
          className={clsx(
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
            // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
            onChange={({ currentTarget: { value } }) => onChange(value)}
            onPaste={(ev) => {
              console.log(ev);
            }}
            className={styles.numberInput}
            maxLength={30}
            onFocus={onFocus}
            // @ts-expect-error TS(2322): Type '{} | null' is not assignable to type 'string... Remove this comment to see the full error message
            placeholder={placeholder}
            autoComplete="off"
          />
        </div>
        <RemoveButton
          className={styles.removeButton}
          // @ts-expect-error TS(2322): Type '(() => void) | undefined' is not assignable ... Remove this comment to see the full error message
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
