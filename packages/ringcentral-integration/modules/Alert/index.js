import uuid from 'uuid';
import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import moduleStatuses from '../../enums/moduleStatuses';
import actionTypes from './actionTypes';
import alertLevels from './alertLevels';
import getAlertReducer from './getAlertReducer';
import proxify from '../../lib/proxy/proxify';

/**
 * @class
 * @description Alert messages managing module.
 */
@Module({
  deps: [{ dep: 'AlertOptions', optional: true }]
})
export default class Alert extends RcModule {
  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Number} params.ttl - Default time-to-live for alert messages.
   */
  constructor({
    ttl = 5000,
    ...options
  }) {
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
      .filter(item => item.ttl > 0 && now - item.timestamp > item.ttl)
      .map(item => item.id);
    if (ids.length) {
      this.dismiss(ids);
    }
  }

  /**
   * @function
   * @description Add alert message to the state.
   * @param {String} options.message
   * @param {Any} options.payload
   * @param {alertLevels} options.level
   * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
   */
  @proxify
  async alert({
    message,
    payload,
    level = alertLevels.info,
    ttl = this._ttl,
    allowDuplicates = true,
  }) {
    this.store.dispatch({
      type: this.actionTypes.alert,
      message,
      payload,
      level,
      ttl,
      allowDuplicates,
      id: uuid.v4(),
      timestamp: Date.now(),
    });
    if (ttl > 0) {
      setTimeout(this._autoDismiss, ttl + 10);
    }
  }
  /**
   * @function
   * @description Add alert message of alertLevel "danger" to the state.
   * @param {String} options.message
   * @param {Any} options.payload
   * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
   */
  danger(options) {
    this.alert({
      ...options,
      level: alertLevels.danger,
    });
  }
  /**
   * @function
   * @description Add alert message of alertLevel "warning" to the state.
   * @param {String} options.message
   * @param {Any} options.payload
   * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
   */
  warning(options) {
    this.alert({
      ...options,
      level: alertLevels.warning,
    });
  }
  /**
   * @function
   * @description Add alert message of alertLevel "info" to the state.
   * @param {String} options.message
   * @param {Any} options.payload
   * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
   */
  info(options) {
    this.alert({
      ...options,
      level: alertLevels.info,
    });
  }
  /**
   * @function
   * @description Add alert message of alertLevel "success" to the state.
   * @param {String} options.message
   * @param {Any} options.payload
   * @param {Number} options.ttl - optional, set ttl to 0 to disable auto dismiss
   */
  success(options) {
    this.alert({
      ...options,
      level: alertLevels.success,
    });
  }
  /**
   * @function
   * @description Dismiss the message from the state.
   * @param {Array<String>|String} ids - The id, or array of ids to be dismissed.
   */
  @proxify
  async dismiss(ids) {
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
  async dismissAll() {
    this.store.dispatch({
      type: this.actionTypes.dismissAll,
    });
  }
}
