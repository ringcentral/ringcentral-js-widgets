import clsx from 'clsx';
import React from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import TextInput from '../TextInput';

import i18n from './i18n';
import styles from './styles.scss';

type DialTextInputProps = {
  className?: string;
  invalid?: boolean;
  value?: string;
  onChangeEvent?: (...args: any[]) => any;
  onDelete?: (...args: any[]) => any;
  autoFocus?: boolean;
};
const DialTextInput: React.FC<DialTextInputProps> = ({
  className,
  invalid,
  value,
  onChangeEvent,
  onDelete,
  autoFocus,
}) => {
  const deleteDisplay =
    value === '' ? { display: 'none' } : { display: 'block' };
  return (
    <div
      className={clsx(styles.dialInput, className, invalid && styles.invalid)}
    >
      <span className={clsx(styles.to)}>{i18n.getString('to')}</span>
      <TextInput
        placeholder={i18n.getString('enterNameOrPhoneNumber')}
        className={styles.dial_Input}
        value={value}
        onChange={onChangeEvent}
        autoFocus={autoFocus}
      />
      <span
        style={deleteDisplay}
        className={clsx(styles.delete, dynamicsFont.clear)}
        onClick={onDelete}
      />
    </div>
  );
};

export default DialTextInput;
