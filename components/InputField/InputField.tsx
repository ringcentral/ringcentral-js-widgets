import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

type InputFieldProps = {
  label?: React.ReactNode;
  labelHint?: React.ReactNode;
  className?: string;
  dataSign?: string;
  noBorder?: boolean;
};
export const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <div
      data-sign={props.dataSign}
      className={clsx(styles.root, props.className)}
    >
      <div className={styles.label}>
        {props.label}
        <div className={styles.hint}>{props.labelHint}</div>
      </div>
      <div className={styles.inputHolder}>{props.children}</div>
    </div>
  );
};
