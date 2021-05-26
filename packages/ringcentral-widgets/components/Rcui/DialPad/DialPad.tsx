import { RcDialPad, RcDialPadProps } from '@ringcentral/juno';
import RcDialerPadSounds from '@ringcentral/juno/RcDialerPadSounds.json';
import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import styles from './styles.scss';

type DialPadProps = {
  dataSign?: string;
} & RcDialPadProps;

export const DialPad: FunctionComponent<DialPadProps> = ({
  className,
  dataSign,
  onChange,
  ...rest
}) => {
  const handleChange = (e: string) => {
    return onChange && onChange(e);
  };

  return (
    <RcDialPad
      data-sign={`${dataSign || ''}DialPad`}
      className={classnames(styles.root, className)}
      onChange={handleChange}
      sounds={RcDialerPadSounds}
      {...rest}
    />
  );
};
