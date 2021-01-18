import * as uuid from 'uuid';
import {
  action,
  RcModuleV2,
  state,
  globalStorage,
} from '@ringcentral-integration/core';
import { Module } from '../../lib/di';
import proxify from '../../lib/proxy/proxify';
import { alertLevels, AlertLevelType } from './alertLevels';
import {
  AlertLevel,
  AlertItem,
  Options,
  Deps,
  AllowDuplicates,
} from './Alert.interface';

@Module({
  name: 'Alert',
  deps: ['GlobalStorage', { dep: 'AlertOptions', optional: true }],
})
export class Alert extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps: {
        ...deps,
        alertOptions: {
          ...deps.alertOptions,
          ttl: deps.alertOptions?.ttl ?? 5000,
        },
      },
      enableGlobalCache: deps.alertOptions?.enableTabSync ?? false,
      storageKey: 'alert',
    });
  }

  @globalStorage
  @state
  messages: AlertItem[] = [];

  @action
  protected _alert({ allowDuplicates, ...item }: AlertItem & AllowDuplicates) {
    if (
      !allowDuplicates &&
      this.messages.find(
        ({ message, level }) =>
          item.message === message && item.level === level,
      )
    ) {
      return;
    }
    this.messages.push(item);
  }

  onInit() {
    if (this._deps.alertOptions?.enableTabSync) {
      this.messages.forEach(({ ttl }) => {
        setTimeout(this._autoDismiss, ttl + 10);
      });
    }
  }

  /**
   * Scans the messages for expired ones and dismiss them.
   */
  _autoDismiss = () => {
    const now = Date.now();
    const ids = this.messages
      .filter((item) => item.ttl > 0 && now - item.timestamp > item.ttl)
      .map((item) => item.id);
    if (ids.length) {
      this.dismiss(ids);
    }
  };

  /**
   * Add alert message to the state.
   */
  @proxify
  alert({
    message,
    payload,
    level = alertLevels.info as AlertLevelType,
    ttl = this._deps.alertOptions.ttl,
    allowDuplicates = true,
    loading = false,
    backdrop = false,
    classes,
    onBackdropClick,
    action = this._deps.alertOptions?.action,
  }: Options & AlertLevel) {
    const id = uuid.v4();
    this._alert({
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
   * Add alert message of alertLevel "danger" to the state.
   */
  danger(options: Options) {
    return this.alert({
      ...options,
      level: alertLevels.danger,
    });
  }

  /**
   * Add alert message of alertLevel "warning" to the state.
   */
  warning(options: Options) {
    return this.alert({
      ...options,
      level: alertLevels.warning,
    });
  }

  /**
   * Add alert message of alertLevel "info" to the state.
   */
  info(options: Options) {
    return this.alert({
      ...options,
      level: alertLevels.info,
    });
  }

  /**
   * Add alert message of alertLevel "success" to the state.
   */
  success(options: Options) {
    return this.alert({
      ...options,
      level: alertLevels.success,
    });
  }

  /**
   * Update the message with given id.
   */
  @action
  update(
    id: string,
    options: Partial<Pick<AlertItem, 'message' | 'loading' | 'action'>>,
  ) {
    const message = this.messages.find((item) => item.id === id);
    if (message) {
      Object.assign(message, options);
    }
  }

  /**
   * Dismiss the messages/message
   */
  @proxify
  @action
  dismiss(ids: string | string[]) {
    const _ids = [].concat(ids);
    this.messages = this.messages.filter(
      (item) => _ids.indexOf(item.id) === -1,
    );
  }

  /**
   * Dismiss all messages.
   */
  @proxify
  @action
  dismissAll() {
    this.messages = [];
  }
}
