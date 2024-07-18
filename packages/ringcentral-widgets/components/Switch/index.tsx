import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

type SwitchProps = {
  checked?: boolean;
  disable?: boolean;
  title?: string;
  onChange?: (...args: any[]) => any;
  dataSign?: string;
  className?: string;
};
const Switch: React.FC<SwitchProps> = (props) => {
  const onChange = props.onChange
    ? // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      (e: any) => !props.disable && props.onChange(e.currentTarget.checked)
    : undefined;
  return (
    <label
      title={props.title}
      data-sign={props.dataSign}
      className={clsx(
        styles.switch,
        props.className,
        props.disable && styles.disable,
      )}
      htmlFor={props.dataSign}
    >
      <input
        id={props.dataSign}
        data-sign="switch"
        type="checkbox"
        role="switch"
        disabled={props.disable}
        aria-label={props.dataSign}
        checked={props.checked}
        onChange={onChange}
      />
      <div className={styles.slider} />
    </label>
  );
};
Switch.defaultProps = {
  checked: false,
  disable: false,
  onChange: undefined,
  title: undefined,
  dataSign: undefined,
  className: undefined,
};
export default Switch;
