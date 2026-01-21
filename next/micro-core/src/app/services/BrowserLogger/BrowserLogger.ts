import {
  checkLoggerEnabled,
  DEFAULT_LOGGER_ENABLED,
  loggerV2,
  toggleLogger,
} from '@ringcentral-integration/core/lib/logger/loggerV2';
import type { TrackPropsService } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  createTransport,
  delegate,
  dynamic,
  globalStorage,
  injectable,
  optional,
  PortManager,
  RcModule,
  state,
  StoragePlugin,
  takeUntilAppDestroy,
  watch,
} from '@ringcentral-integration/next-core';
import {
  LogTypes,
  type SerializedMessage,
  StorageTransport,
} from '@ringcentral/mfe-logger';
import type { SharedWorkerClientTransport } from 'data-transport';
import { finalize, NEVER } from 'rxjs';

import { UAParsedInfo } from '../UAParsedInfo';

import type { BrowserLoggerOptions } from './BrowserLogger.interface';

checkLoggerEnabled(DEFAULT_LOGGER_ENABLED);

@injectable({
  name: 'BrowserLogger',
})
export class BrowserLogger extends RcModule {
  private transport?: SharedWorkerClientTransport;

  constructor(
    private _storage: StoragePlugin,
    private _uAParsedInfo: UAParsedInfo,
    private _portManager: PortManager,
    @optional('BrowserLoggerOptions')
    private _browserLoggerOptions?: BrowserLoggerOptions,
  ) {
    super();
    this._storage.enable(this);

    if (
      this._portManager.shared &&
      this._portManager.isWorkerMode &&
      this._browserLoggerOptions?.worker
    ) {
      this._portManager.onMainTab(() => {
        this.transport = createTransport('SharedWorkerClient', {
          worker: this._browserLoggerOptions!.worker!,
          prefix: 'logger',
        });
        this.transport.onConnect(() => {
          this.logger.log('[BrowserLogger] SharedWorkerClient - connected');
        });
        this.logger.log('storageTransport:', !!this.storageTransport);
        this.transport.listen('syncLog', (data: SerializedMessage) => {
          this.storageTransport?.write(data);
        });
      });
    }

    watch(
      this,
      () => [this.enabled, this.ready],
      async () => {
        if (!this.ready) return;
        if (this.enabled) {
          this.logger.enable();
          this.logger.log('[BrowserLogger] enabled');
          this.logger.log(
            `[BrowserLogger] isServer:${this._portManager.isServer}`,
          );

          // wait info get initialized
          await this._uAParsedInfo.getClientOsInfo();
          this.logger.log('[Init Info]', await this.initInfo());
        } else {
          this.logger.disable();
        }
      },
      {
        multiple: true,
      },
    );

    // in test env, we need to clear the logs after each test
    if (process.env.NODE_ENV === 'test') {
      NEVER.pipe(
        finalize(() => {
          (this.storageTransport as any)._data.messages.length = 0;
        }),
        takeUntilAppDestroy,
      ).subscribe();
    }
  }

  @dynamic('TrackPropsService')
  protected _trackPropsService?: TrackPropsService;

  async initInfo() {
    const { window, document } = globalThis;
    if (!document) {
      return {};
    }

    const uaResult = this._uAParsedInfo.userAgentResult;

    const initInfo = {
      ...((await this._trackPropsService?.getTrackProps()) ?? {}),
      timestamp: new Date().toISOString(),
      ...uaResult,
      device: {
        ...uaResult?.device,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        viewportWidth: document.documentElement.clientWidth,
        viewportHeight: document.documentElement.clientHeight,
      },
    };
    return initInfo;
  }

  @globalStorage
  @state
  private _enabled =
    this._browserLoggerOptions?.enabled ?? DEFAULT_LOGGER_ENABLED;

  get enabled() {
    return this._enabled;
  }

  @action
  private _enable() {
    this._enabled = true;
  }

  /**
   * enable logger
   */
  @delegate('server')
  async enable() {
    await this.toggleLogger(true);
    this._enable();
  }

  @action
  private _disable() {
    this._enabled = false;
  }

  /**
   * disable logger
   */
  @delegate('server')
  async disable() {
    await this.toggleLogger(false);
    this._disable();
  }

  @delegate('mainClient')
  async toggleLogger(enabled: boolean) {
    toggleLogger(enabled);
  }

  @state
  downloading = false;

  @action
  private _setDownloading(val: boolean) {
    this.downloading = val;
  }

  /**
   * set downloading
   */
  @delegate('server')
  async setDownloading(val: boolean) {
    this._setDownloading(val);
  }

  override logger = this._browserLoggerOptions?.logger ?? loggerV2;

  /**
   * save log to local
   */

  async saveLog() {
    if (this.downloading) return;
    await this.setDownloading(true);
    try {
      if (this.storageTransport) {
        const { name } = this._portManager.portDetector.sharedAppOptions;
        await this.storageTransport.downloadLogs({ name });
      } else {
        throw new Error('StorageTransport not found');
      }
    } finally {
      await this.setDownloading(false);
    }
  }

  get storageTransport() {
    return this.logger.transports?.find(
      (transport) => transport.type === 'storage',
    ) as StorageTransport | void;
  }

  private _log(type: LogTypes, ...args: any[]) {
    if (this.enabled) {
      try {
        this.logger[type](...args);
      } catch (e) {
        // TODO: error handling when logger is not working
      }
    }
  }

  log(...args: any[]) {
    this._log('info', ...args);
  }
}
