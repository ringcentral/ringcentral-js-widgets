import {
  action,
  globalStorage,
  RcModuleV2,
  state,
  watch,
} from '@ringcentral-integration/core';
import {
  loggerV2,
  toggleLogger,
} from '@ringcentral-integration/core/lib/logger/loggerV2';
import { StorageTransport } from '@ringcentral/mfe-logger';

import { Module } from '../../lib/di';
import { proxify } from '../../lib/proxy/proxify';

import type { Deps } from './BrowserLogger.interface';

@Module({
  name: 'BrowserLogger',
  deps: [
    'GlobalStorage',
    { dep: 'Prefix', optional: true },
    { dep: 'BrowserLoggerOptions', optional: true },
  ],
})
export class BrowserLogger extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
      storageKey: 'BrowserLogger',
      enableGlobalCache: true,
    });

    watch(
      this,
      () => [this.enabled, this.ready],
      () => {
        if (!this.ready) return;
        try {
          if (this.enabled) {
            this.logger.enable();
            this.logger.log('BrowserLogger enabled');
          } else {
            this.logger.disable();
          }
        } catch (e) {
          console.error(e);
        }
      },
      {
        multiple: true,
      },
    );
  }

  @globalStorage
  @state
  enabled = this._deps.browserLoggerOptions?.enabled ?? false;

  @action
  protected _enable() {
    this.enabled = true;
  }

  /**
   * enable logger
   */
  @proxify
  async enable() {
    await this.toggleLogger(true);
    this._enable();
  }

  @action
  protected _disable() {
    this.enabled = false;
  }

  /**
   * disable logger
   */
  @proxify
  async disable() {
    await this.toggleLogger(false);
    this._disable();
  }

  @proxify
  async toggleLogger(enabled: boolean) {
    toggleLogger(enabled);
  }

  @state
  downloading = false;

  @action
  protected _setDownloading(val: boolean) {
    this.downloading = val;
  }

  /**
   * set downloading
   */
  @proxify
  async setDownloading(val: boolean) {
    this._setDownloading(val);
  }

  get logger() {
    return this._deps.browserLoggerOptions?.logger ?? loggerV2;
  }

  @proxify
  async saveLog() {
    await this.setDownloading(true);
    try {
      if (this.storageTransport) {
        const name = this._deps.prefix;
        await this.storageTransport.downloadLogs({ name });
      } else {
        throw new Error('StorageTransport not found');
      }
    } finally {
      await this.setDownloading(false);
    }
  }

  protected get storageTransport() {
    return this.logger.transports.find(
      (transport) => transport instanceof StorageTransport,
    ) as StorageTransport | void;
  }
}
