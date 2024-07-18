import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

import styles from './styles.scss';

export interface MessageProps {
  level: string;
  message: React.ReactNode;
  onDismiss: (...args: any[]) => any;
}
const Message: FunctionComponent<MessageProps> = ({
  message,
  level,
  onDismiss,
}) => {
  return (
    <div className={styles.alertHolder}>
      <div data-sign="alert" className={clsx(styles[level])}>
        {message}
        <div className={styles.dismiss} onClick={onDismiss} data-sign="dismiss">
          <i className={dynamicsFont.close} />
        </div>
      </div>
    </div>
  );
};
export default Message;
