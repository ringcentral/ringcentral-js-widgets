import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type InputFieldProps = {
  label?: React.ReactNode;
  labelHint?: React.ReactNode;
  className?: string;
  dataSign?: string;
};
const InputField: React.SFC<InputFieldProps> = (props) => {
  return (
    <div
      data-sign={props.dataSign}
      className={classnames(styles.root, props.className)}
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
  children: undefined,
  label: undefined,
  labelHint: undefined,
  className: undefined,
  dataSign: undefined,
};
export default InputField;
