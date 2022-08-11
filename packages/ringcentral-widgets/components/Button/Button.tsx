import React, { FunctionComponent, useState } from 'react';

import classnames from 'classnames';

import { useMountState } from '@ringcentral/juno';

import styles from './styles.scss';

export interface ButtonProps {
  className?: string;
  tooltip?: string;
  disabled?: boolean;
  onClick?(e?: React.MouseEvent): void | Promise<any>;
  dataSign?: string;
  tabIndex?: number;
}

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  children,
  tooltip,
  dataSign,
  onClick,
  tabIndex = 0,
  disabled = false,
}) => {
  const isMountedRef = useMountState();
  const [isWaiting, setIsWaiting] = useState(false);
  const disableButton = disabled || isWaiting;
  return (
    <div
      data-sign={dataSign}
      className={classnames(
        styles.root,
        disableButton && styles.disabled,
        className,
      )}
      role="button"
      aria-disabled={disableButton}
      tabIndex={tabIndex}
      onClick={async (e) => {
        if (typeof onClick === 'function' && !disableButton) {
          setIsWaiting(true);
          await onClick(e);
          if (isMountedRef.current) {
            setIsWaiting(false);
          }
        }
      }}
      title={tooltip}
    >
      {children}
    </div>
  );
};
