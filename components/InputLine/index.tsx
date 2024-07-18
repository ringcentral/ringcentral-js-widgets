import React from 'react';

import Line from '../Line';

import styles from './styles.scss';

type InputLineProps = {
  label?: React.ReactNode;
  input?: React.ReactNode;
  className?: string;
  onClick?: (...args: any[]) => any;
  noBorder?: boolean;
};
const InputLine: React.FC<InputLineProps> = (props) => {
  return (
    <Line
      className={props.className}
      onClick={props.onClick}
      noBorder={props.noBorder}
    >
      <div className={styles.label}>{props.label}</div>
      <div className={styles.inputHolder}>{props.children}</div>
    </Line>
  );
};
export default InputLine;
