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
const InputField: React.FC<InputFieldProps> = (props) => {
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
InputField.defaultProps = {
  // @ts-expect-error TS(2322): Type '{ children: undefined; label: undefined; lab... Remove this comment to see the full error message
  children: undefined,
  label: undefined,
  labelHint: undefined,
  className: undefined,
  dataSign: undefined,
};
export default InputField;
