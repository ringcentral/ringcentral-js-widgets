import {
  RcSnackbarAction,
  RcSnackbarContent,
  RcSnackbarContentType,
} from '@ringcentral-integration/rcui';
import classNames from 'classnames';
import React, { FunctionComponent, memo } from 'react';

import styles from './styles.scss';

function getLevelType(level: NotificationMessage['level']) {
  let type: RcSnackbarContentType;
  switch (level) {
    case 'warning':
      // the error is yellow
      type = 'error';
      break;
    case 'danger':
      // the warn is red
      type = 'warn';
      break;
    default:
      type = level;
  }
  return type;
}

export interface NotificationMessage {
  id: string;
  message: string;
  level: 'info' | 'success' | 'warning' | 'danger';
  payload: any;
  ttl: number;
  timestamp: number;
  animation?: string;
  loading: boolean;
  action?: React.ReactNode;
}

export interface NotificationItemProps {
  message: NotificationMessage;
  animation?: string;
  currentLocale: string;
  brand: string;
  dismiss: (id: string) => void;
  getRenderer(type: NotificationMessage): FunctionComponent<any>;
  duration?: number;
}

export const NotificationItem: FunctionComponent<NotificationItemProps> = memo(
  ({
    message,
    currentLocale,
    brand,
    dismiss,
    getRenderer,
    animation,
    duration,
  }) => {
    const Message = getRenderer(message);
    const second = duration / 1000;
    const { id, level, loading, action } = message;

    const type: RcSnackbarContentType = getLevelType(level);

    return (
      <div
        className={classNames(animation, styles.message, 'animated')}
        style={{
          animationDuration: `${second}s`,
        }}
      >
        <RcSnackbarContent
          type={type}
          size="small"
          fullWidth
          loading={loading}
          classes={{
            root: styles.snackbar,
          }}
          message={
            <Message
              message={message}
              currentLocale={currentLocale}
              brand={brand}
            />
          }
          action={
            action ?? (
              <RcSnackbarAction
                variant="icon"
                icon="close"
                size="small"
                onClick={() => {
                  dismiss(id);
                }}
              />
            )
          }
        />
      </div>
    );
  },
);

NotificationItem.defaultProps = {
  duration: 500,
};
