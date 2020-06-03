import React, { FunctionComponent, useState } from 'react';
import { DialPad } from 'ringcentral-widgets/components/Rcui/DialPad';
import {
  RecipientsInput,
  RecipientsInputProps,
} from 'ringcentral-widgets/components/Rcui/RecipientsInput';

import styles from './styles.scss';

export type DialerProps = {
  value: string;
  setValue: (value: string) => void;
} & Pick<RecipientsInputProps, 'placeholder'>;

export const Dialer: FunctionComponent<DialerProps> = ({
  value,
  setValue,
  children,
  placeholder,
}) => {
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <div className={styles.dialerWrapper}>
      <div className={styles.recipient}>
        <RecipientsInput
          value={value}
          className={styles.recipientInput}
          onChange={(value) => setValue(value)}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onDelete={() => {
            if (value?.length) {
              setValue(value.substring(0, value.length - 1));
            }
          }}
          onClear={() => setValue('')}
          placeholder={placeholder}
        />
      </div>
      <div className={styles.dialerPad}>
        <DialPad
          onChange={(addValue) => setValue(`${value}${addValue}`)}
          shouldHandleKeyboardEvts={inputFocus}
        />
      </div>
      {children}
    </div>
  );
};
