import React, { ReactNode } from 'react';
import classnames from 'classnames';

import styles from './styles.scss';
import { AlertType } from './types';

interface AlertProps {
  children: ReactNode;
  type: AlertType;
  className?: string;
  dataSign?: string;
}

export const Alert: React.FunctionComponent = (props: AlertProps) => {
  const { children, type, className, dataSign } = props;
  return (
    <div
      data-sign={dataSign}
      className={classnames(styles.container, className, {
        [styles.error]: type === AlertType.ERROR,
        [styles.info]: type === AlertType.INFO,
      })}
    >
      {children}
    </div>
  );
};

Alert.defaultProps = {
  className: '',
  dataSign: '',
};
