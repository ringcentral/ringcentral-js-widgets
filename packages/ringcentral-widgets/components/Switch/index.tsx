import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type SwitchProps = {
  checked?: boolean;
  disable?: boolean;
  title?: string;
  onChange?: (...args: any[]) => any;
  dataSign?: string;
  className?: string;
};
const Switch: React.SFC<SwitchProps> = (props) => {
  const onChange = props.onChange
    ? (e) => !props.disable && props.onChange(e.currentTarget.checked)
    : undefined;
  return (
    <label
      title={props.title}
      data-sign={props.dataSign}
      className={classnames(
        styles.switch,
        props.className,
        props.disable && styles.disable,
      )}
    >
      <input
        data-sign="switch"
        type="checkbox"
        role="switch"
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
