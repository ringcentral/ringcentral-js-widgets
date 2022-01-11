import React, { FunctionComponent, useState } from 'react';

import classnames from 'classnames';

import { useIsMounted } from '../../react-hooks/useIsMounted';
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
  disabled,
  children,
  tooltip,
  dataSign,
  onClick,
  tabIndex,
}) => {
  const isMounted = useIsMounted();
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
      tabIndex={tabIndex}
      onClick={async (e) => {
        if (typeof onClick === 'function' && !disableButton) {
          setIsWaiting(true);
          await onClick(e);
          if (isMounted.current) {
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

Button.defaultProps = {
  tabIndex: 0,
  disabled: false,
};
