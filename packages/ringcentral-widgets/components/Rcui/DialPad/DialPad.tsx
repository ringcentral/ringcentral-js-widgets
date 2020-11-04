import { RcDialPad } from '@ringcentral/juno';
import RcDialerPadSounds from '@ringcentral/juno/RcDialerPadSounds.json';
import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import styles from './styles.scss';

type DialPadProps = {
  className?: string;
  dataSign?: string;
  onChange?(value: string): any;
} & Pick<RcDialPad['props'], 'shouldHandleKeyboardEvts'>;

export const DialPad: FunctionComponent<DialPadProps> = ({
  className,
  dataSign,
  onChange,
  shouldHandleKeyboardEvts,
}) => {
  const dialEffect = (e: string) => {
    return onChange && onChange(e);
  };

  return (
    <div
      data-sign={`${dataSign || ''}DialPad`}
      className={classnames(styles.root, className)}
    >
      <RcDialPad
        mouseEffect={dialEffect}
        classes={{
          root: styles.dialPadRoot,
          icon: styles.dialPadIcon,
        }}
        shouldHandleKeyboardEvts={shouldHandleKeyboardEvts}
        sounds={RcDialerPadSounds}
      />
    </div>
  );
};
