import type { FunctionComponent } from 'react';
import React from 'react';

import classnames from 'classnames';

import type { RcDialPadProps } from '@ringcentral/juno';
import { RcDialerPadSounds, RcDialPad } from '@ringcentral/juno';

import styles from './styles.scss';

type DialPadProps = {
  dataSign?: string;
} & RcDialPadProps;

/** @deprecated use juno RcDialPad directly */
export const DialPad: FunctionComponent<DialPadProps> = ({
  className,
  dataSign,
  onChange,
  ...rest
}) => {
  const handleChange = (e: string) => {
    // @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
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
