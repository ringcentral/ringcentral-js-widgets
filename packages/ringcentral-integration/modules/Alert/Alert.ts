import { DOMAttributes } from 'react';
import * as uuid from 'uuid';

import moduleStatuses from '../../enums/moduleStatuses';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import RcModule from '../../lib/RcModule';
import actionTypes from './actionTypes';
import alertLevels, { AlertLevelType } from './alertLevels';
import getAlertReducer from './getAlertReducer';

export interface AlertModel {
  message: string;
  payload?: any;
  ttl?: number;
  allowDuplicates?: boolean;
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

export type AlertLevel = {
  level?: AlertLevelType;
};

/**
 * @class
 * @description Alert messages managing module.
 */
@Module({
  deps: [{ dep: 'AlertOptions', optional: true }],
})
export default class Alert extends RcModule<
  Record<string, any>,
  typeof actionTypes
> {
  // TODO: add state interface
  private _ttl: number;
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Number} params.ttl - Default time-to-live for alert messages.
   */
  constructor({ ttl = 5000, ...options }) {
    super({
      ...options,
    });
    this._reducer = getAlertReducer(this.actionTypes);
    this._ttl = ttl;
  }

  get _actionTypes() {
    return actionTypes;
  }

  _onStateChange() {
    /* do nothing */
  }

  // this module has no dependency, and is always ready
  // eslint-disable-next-line class-methods-use-this
  get status() {
    return moduleStatuses.ready;
  }

  // eslint-disable-next-line class-methods-use-this
  get ready() {
    return true;
  }

  get messages() {
    return this.state.messages;
  }

  /**
   * @function
   * @description Scans the messages for expired ones and dismiss them.
   */
  _autoDismiss = () => {
    const now = Date.now();
    const ids = this.state.messages
      .filter((item) => item.ttl > 0 && now - item.timestamp > item.ttl)
      .map((item) => item.id);
    if (ids.length) {
      this.dismiss(ids);
    }
  };

  /**
   * @function
   * @description Add alert message to the state.
   * @param {String} options.message
   * @param {Any} options.payload
   * @param {alertLevels} options.level
   * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
   */
  @proxify
  alert({
    message,
    payload,
    level = alertLevels.info as AlertLevelType,
    ttl = this._ttl,
    allowDuplicates = true,
    loading = false,
    backdrop = false,
    classes,
    onBackdropClick,
    action,
  }: AlertModel & AlertLevel) {
    const id = uuid.v4();
    this.store.dispatch({
      type: this.actionTypes.alert,
      message,
      payload,
      level,
      // when loading the ttl will be zero, make this never dismiss
      ttl: loading ? 0 : ttl,
      allowDuplicates,
      backdrop,
      classes,
      onBackdropClick,
      id,
      timestamp: Date.now(),
      loading,
      action,
    });
    if (ttl > 0) {
      setTimeout(this._autoDismiss, ttl + 10);
    }
    return id;
  }

  /**
   * @function
   * @description Add alert message of alertLevel "danger" to the state.
   * @param {String} options.message
   * @param {Any} options.payload
   * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
   */
  danger(options: AlertModel) {
    return this.alert({
      ...options,
      level: alertLevels.danger as AlertLevelType,
    });
  }

  /**
   * @function
   * @description Add alert message of alertLevel "warning" to the state.
   * @param {String} options.message
   * @param {Any} options.payload
   * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
   */
  warning(options: AlertModel) {
    return this.alert({
      ...options,
      level: alertLevels.warning as AlertLevelType,
    });
  }

  /**
   * @function
   * @description Add alert message of alertLevel "info" to the state.
   * @param {String} options.message
   * @param {Any} options.payload
   * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
   */
  info(options: AlertModel) {
    return this.alert({
      ...options,
      level: alertLevels.info as AlertLevelType,
    });
  }

  /**
   * @function
   * @description Add alert message of alertLevel "success" to the state.
   * @param {String} options.message
   * @param {Any} options.payload
   * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
   */
  success(options: AlertModel) {
    return this.alert({
      ...options,
      level: alertLevels.success as AlertLevelType,
    });
  }

  /**
   * @function
   * @description Update the message with given id.
   * @param {Array<String>|String} id - The message id of you want to update.
   * @param options - update options.
   */
  update(
    id: string,
    options: Partial<Pick<AlertModel, 'message' | 'loading' | 'action'>>,
  ) {
    this.store.dispatch({
      type: this.actionTypes.update,
      ...options,
      id,
    });
  }

  /**
   * @function
   * @description Dismiss the message from the state.
   * @param {Array<String>|String} ids - The id, or array of ids to be dismissed.
   */
  @proxify
  dismiss(ids: string | string[]) {
    this.store.dispatch({
      type: this.actionTypes.dismiss,
      ids: [].concat(ids),
    });
  }

  /**
   * @function
   * @description Dismiss all messages.
   */
  @proxify
  dismissAll() {
    this.store.dispatch({
      type: this.actionTypes.dismissAll,
    });
  }
}
