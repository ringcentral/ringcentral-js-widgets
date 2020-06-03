import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import {
  HandUpButton,
  HoldCallButton,
  MuteCallButton,
  TransferCallButton,
  CallButtonsProps,
  HandUpButtonProps,
  HoldCallButtonProps,
  MuteCallButtonProps,
  TransferCallButtonProps,
} from './components';
import styles from './styles.scss';

export type SmallCallControlProps = CallButtonsProps &
  HandUpButtonProps &
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
    <div className={classNames(styles.root, classes?.root)}>
      {children || (
        <>
          <MuteCallButton {...rest} />
          <TransferCallButton {...rest} />
          <HoldCallButton {...rest} />
          <HandUpButton {...rest} />
        </>
      )}
    </div>
  );
};

SmallCallControl.defaultProps = {
  ...MuteCallButton.defaultProps,
  ...HoldCallButton.defaultProps,
  ...TransferCallButton.defaultProps,
  ...HandUpButton.defaultProps,
};
