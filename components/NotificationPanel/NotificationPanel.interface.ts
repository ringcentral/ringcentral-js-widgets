import type { DOMAttributes, FunctionComponent } from 'react';
import type React from 'react';

import type { RcSnackbarContentProps } from '@ringcentral/juno';

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

export type NotificationPanelProps = {
  messages: NotificationMessage[];
  exitAnimation?: string;
  entranceAnimation?: string;

  backdropEntranceAnimation?: string;
  backdropExitAnimation?: string;

  className?: string;
  currentLocale: string;

  brand: string;
} & Omit<NotificationItemProps, 'data'>;
