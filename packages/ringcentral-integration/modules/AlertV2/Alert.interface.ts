import { DOMAttributes } from 'react';
import GlobalStorage from '../GlobalStorage';
import { AlertLevelType } from './alertLevels';

export interface Deps {
  globalStorage: GlobalStorage;
  alertOptions?: AlertOptions;
}

export interface AlertOptions {
  // TODO: fix state serialization issue and handle the ttl timeout when tab sync up.
  /**
   * Set default ttl for auto dismiss alert.
   * When enable tab sync, other tabs will not handle the ttl timeout.
   */
  ttl?: number;
  /**
   * enable tab sync for alert
   */
  enableTabSync?: boolean;
}

export type AlertLevel = {};

export interface AlertItem {
  /**
   * alert uuid
   */
  id: string;
  /**
   * alert text information
   */
  message: string;
  /**
   * payload for alert
   */
  payload?: any;
  /**
   * timestamp for alert
   */
  timestamp: number;
  /**
   * level type for alert
   */
  level: AlertLevelType;
  /**
   * set ttl for auto dismiss alert
   */
  ttl: number;
  /**
   * show loading with new notification
   */
  loading?: boolean;
  /**
   * action template(right area) with new notification
   */
  action?: React.ReactNode;
  /**
   * backdrop with page, default is false
   */
  backdrop?: boolean;
  /**
   * classes for that alert
   */
  classes?: {
    backdrop?: string;
  };
  /**
   * emit event when backdrop to be click
   */
  onBackdropClick?: DOMAttributes<HTMLDivElement>['onClick'];
}

export interface AllowDuplicates {
  /**
   * allow duplicate alert
   */
  allowDuplicates?: boolean;
}

export type Options = Pick<AlertItem, 'message'> &
  Pick<Partial<AlertItem>, Exclude<keyof AlertItem, 'message'>> &
  AllowDuplicates;
