import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import type {
  CallButtonsProps,
  HangUpButtonProps,
  HoldCallButtonProps,
  MuteCallButtonProps,
  TransferCallButtonProps,
} from './components';
import {
  HangUpButton,
  HoldCallButton,
  MuteCallButton,
  TransferCallButton,
} from './components';
import styles from './styles.scss';

export type SmallCallControlProps = CallButtonsProps &
  HangUpButtonProps &
  HoldCallButtonProps &
  MuteCallButtonProps &
  TransferCallButtonProps & {
    classes?: {
      root?: string;
    };
  };

export const SmallCallControl: FunctionComponent<SmallCallControlProps> = ({
  classes,
  children,
  ...rest
}) => {
  return (
    <div
      className={clsx(styles.root, classes?.root)}
      data-sign="smallCallControl"
    >
      {children || (
        <>
          <MuteCallButton {...rest} />
          <TransferCallButton {...rest} />
          <HoldCallButton {...rest} />
          <HangUpButton {...rest} />
        </>
      )}
    </div>
  );
};
