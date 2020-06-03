import { RcSwitch } from '@ringcentral-integration/rcui';
import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import styles from './style.scss';

interface ToggleButtonTypes {
  label: string;
  checked: boolean;
  onChange: (e: any) => any;
  classes?: {
    root?: string;
  };
}

export const ToggleButton: FunctionComponent<ToggleButtonTypes> = ({
  label,
  checked,
  onChange,
  classes = {},
}) => {
  return (
    <div className={classNames(styles.container, classes.root)}>
      <span className={styles.label}>{label}</span>
      <RcSwitch color="primary" checked={checked} onChange={onChange} />
    </div>
  );
};
