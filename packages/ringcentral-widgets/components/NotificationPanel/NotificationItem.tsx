import {
  RcSnackbarAction,
  RcSnackbarContent,
  RcSnackbarContentType,
} from '@ringcentral-integration/rcui';
import closeSvg from '@ringcentral-integration/rcui/icons/icon-close.svg';
import classNames from 'classnames';
import React, { DOMAttributes, FunctionComponent, memo, useMemo } from 'react';

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
  /**
   * snackbar animation
   */
  animation?: string;
  /**
   * has backdrop behind whole window
   */
  backdrop?: boolean;
  /**
   * backdrop animation
   */
  backdropAnimation?: string;
  /**
   * classes for whole component
   */
  classes?: {
    backdrop?: string;
  };
  /** emit event when backdrop to be click */
  onBackdropClick?: DOMAttributes<HTMLDivElement>['onClick'];
  /**
   * loading state
   */
  loading: boolean;
  /**
   * right action area
   */
  action?: React.ReactNode;
}

export type NotificationItemProps = {
  data: NotificationMessage;
  currentLocale: string;
  brand: string;
  dismiss: (id: string) => void;
  getRenderer(type: NotificationMessage): FunctionComponent<any>;
  duration?: number;
} & Pick<NotificationMessage, 'animation' | 'backdropAnimation' | 'classes'>;

export const NotificationItem: FunctionComponent<NotificationItemProps> = memo(
  ({
    data,
    currentLocale,
    brand,
    dismiss,
    getRenderer,
    duration,
    animation: defaultAnimation,
    backdropAnimation: defaultBackdropAnimation,
    classes: defaultClasses,
  }) => {
    const Message = getRenderer(data);
    const second = duration / 1000;
    const {
      id,
      level,
      classes = {},
      loading,
      action,
      animation = defaultAnimation,
      backdropAnimation = defaultBackdropAnimation,
      backdrop,
      onBackdropClick,
    } = data;

    const type: RcSnackbarContentType = getLevelType(level);

    const animationStyle = useMemo(
      () => ({
        animationDuration: `${second}s`,
      }),
      [second],
    );

    return (
      <div className={styles.container}>
        {backdrop && (
          <div
            className={classNames(
              styles.backdrop,
              defaultClasses.backdrop,
              classes.backdrop,
              'animated',
              backdropAnimation,
            )}
            style={animationStyle}
            onClick={onBackdropClick}
          />
        )}
        <RcSnackbarContent
          type={type}
          size="small"
          fullWidth
          loading={loading}
          classes={{
            root: classNames('animated', styles.snackbar, animation),
          }}
          style={animationStyle}
          messageAlign="left"
          message={
            <Message
              message={data}
              currentLocale={currentLocale}
              brand={brand}
            />
          }
          action={
            action ?? (
              <RcSnackbarAction
                variant="icon"
                symbol={closeSvg}
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
  classes: {},
};
