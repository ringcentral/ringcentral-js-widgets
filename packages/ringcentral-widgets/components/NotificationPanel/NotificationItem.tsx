import {
  combineProps,
  RcSnackbarAction,
  RcSnackbarContent,
  RcSnackbarContentProps,
  RcSnackbarContentType,
} from '@ringcentral/juno';
import closeSvg from '@ringcentral/juno/icons/icon-close.svg';
import classNames from 'classnames';
import React, { DOMAttributes, FunctionComponent, memo, useMemo } from 'react';

import styles from './styles.scss';

function getLevelType(level: NotificationMessage['level']) {
  let type: RcSnackbarContentType;
  switch (level) {
    case 'warning':
      type = 'warn';
      break;
    case 'danger':
      type = 'error';
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
    snackbar?: RcSnackbarContentProps['classes'];
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
} & Pick<NotificationMessage, 'animation' | 'backdropAnimation' | 'classes'> &
  Pick<RcSnackbarContentProps, 'size' | 'messageAlign' | 'fullWidth'>;

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
    classes: { snackbar: snackbarClass, backdrop: backdropClass },
    size,
    messageAlign,
    fullWidth,
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
              backdropClass,
              classes.backdrop,
              'animated',
              backdropAnimation,
            )}
            style={animationStyle}
            onClick={onBackdropClick}
          />
        )}
        <RcSnackbarContent
          data-sign="notification"
          data-sign-type={type}
          type={type}
          size={size}
          fullWidth={fullWidth}
          loading={loading}
          classes={combineProps(
            {
              root: classNames('animated', styles.snackbar, animation),
            },
            snackbarClass,
          )}
          style={animationStyle}
          messageAlign={messageAlign}
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
  size: 'small',
  messageAlign: 'left',
  fullWidth: true,
};
