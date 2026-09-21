import type { TrackPropsService } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  action,
  checkLoggerEnabled,
  createTransport,
  DEFAULT_LOGGER_ENABLED,
  delegate,
  dynamic,
  globalStorage,
  injectable,
  logger,
  logParamsWithSanitizationPolicy,
  optional,
  PortManager,
  pushPiiDeviceKeyToWorker,
  RcModule,
  state,
  StoragePlugin,
  takeUntilAppDestroy,
  toggleLogger,
  watch,
} from '@ringcentral-integration/next-core';
import { downloadFile } from '@ringcentral-integration/utils';
import {
  type LogTypes,
  type SerializedMessage,
  StorageTransport,
} from '@ringcentral/mfe-logger';
import type { SharedWorkerClientTransport } from 'data-transport';
import type JSZip from 'jszip';
import { finalize, NEVER } from 'rxjs';

import { UAParsedInfo } from '../UAParsedInfo';

import type {
  BrowserLoggerOptions,
  CollectSanitizedLogsOptions,
  ExtraLogFile,
  SanitizedLogArchive,
} from './BrowserLogger.interface';
import {
  captureTrustedBrowserLogEntries,
  sanitizeLogZip,
} from './sanitizeLogZip';

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
        const transport = createTransport('SharedWorkerClient', {
          worker: this._browserLoggerOptions!.worker!,
          prefix: 'logger',
        });
        this.transport = transport;
        transport.onConnect(() => {
          // Align worker HMAC key with this tab's persistent installation key.
          pushPiiDeviceKeyToWorker(transport);
          this.logger.log('[BrowserLogger] SharedWorkerClient - connected');
        });
        this.logger.log('storageTransport:', !!this.storageTransport);
        transport.listen('syncLog', (data: SerializedMessage) => {
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

  override logger = this._browserLoggerOptions?.logger ?? logger;

  private async _addAdditionalLogs(zip: JSZip, scope?: string[]) {
    const additionalLogProvider =
      this._browserLoggerOptions?.additionalLogProvider;
    if (!additionalLogProvider) return;

    try {
      await additionalLogProvider.addAdditionalLogs(zip, scope);
    } catch (error) {
      this.logger.warn('Failed to add additional logs:', error);
    }
  }

  private async _addAdditionalLogsWithoutSanitize(
    zip: JSZip,
    scope?: string[],
  ) {
    const additionalLogProvider =
      this._browserLoggerOptions?.additionalLogProvider;
    if (!additionalLogProvider) return;

    try {
      await additionalLogProvider.addAdditionalLogsWithoutSanitize(zip, scope);
    } catch (error) {
      this.logger.warn('Failed to add additional logs:', error);
    }
  }

  private _addExtraFiles(
    zip: JSZip,
    logName: string,
    extraFiles: ExtraLogFile[] = [],
  ) {
    if (extraFiles.length === 0) return;

    const attachmentsFolder = zip.folder(`${logName}/attachments`);
    if (!attachmentsFolder) {
      this.logger.error('Attachments folder not found');
      return;
    }

    for (const { name, base64Url } of extraFiles) {
      const base64Data = base64Url.split(',')[1];
      attachmentsFolder.file(name, base64Data, { base64: true });
    }
  }

  /**
   * Build a sanitized log archive, including additional provider files and
   * extra attachments. Used by both local download and CPR submission.
   */
  protected async buildSanitizedLogArchive(
    storageTransport: StorageTransport,
    options: CollectSanitizedLogsOptions = {},
  ): Promise<SanitizedLogArchive | undefined> {
    try {
      const { name } = this._portManager.portDetector.sharedAppOptions;
      await storageTransport.saveDB();
      const data = await storageTransport.queryLogs({ name });

      if (!data) return;

      const trustedBrowserLogEntries = captureTrustedBrowserLogEntries(
        data.zip,
        data.name,
      );

      this._addExtraFiles(data.zip, data.name, options.extraFiles);
      await this._addAdditionalLogs(data.zip, options.scope);
      await sanitizeLogZip(data.zip, { trustedBrowserLogEntries });

      await this._addAdditionalLogsWithoutSanitize(data.zip, options.scope);
      const content = await storageTransport.zipLogs(data.zip);

      return {
        content,
        name: data.name,
      };
    } catch (error) {
      this.logger.error('Error retrieving logs:', error);
      return;
    }
  }

  /**
   * Collect sanitized logs without downloading. Used by CPR and other callers
   * that need the archive blob.
   */
  async collectSanitizedLogs(options?: CollectSanitizedLogsOptions) {
    if (!this.storageTransport) {
      this.logger.error('StorageTransport not found');
      return;
    }

    return this.buildSanitizedLogArchive(this.storageTransport, options);
  }

  /**
   * save log to local
   */
  protected async downloadSanitizedLogs(
    storageTransport: StorageTransport,
    options?: CollectSanitizedLogsOptions,
  ) {
    const archive = await this.buildSanitizedLogArchive(
      storageTransport,
      options,
    );

    if (archive) {
      const blobUrl = URL.createObjectURL(archive.content);

      downloadFile(blobUrl, `${archive.name}.zip`);

      // Revoke blob URL after 100ms to prevent memory leaks once download starts
      setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 100);
    }
  }

  async saveLog() {
    if (this.downloading) return;
    await this.setDownloading(true);
    try {
      if (this.storageTransport) {
        await this.downloadSanitizedLogs(this.storageTransport);
      } else {
        throw new Error('StorageTransport not found');
      }
    } finally {
      await this.setDownloading(false);
    }
  }

  get storageTransport() {
    const transports = this.logger.transports ?? [];
    return transports.find(
      (transport) =>
        transport.type === 'storage' &&
        typeof (transport as StorageTransport).queryLogs === 'function',
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

  /** Logs parameters with a registered, path-scoped sanitization policy. */
  logWithSanitizationPolicy(policyId: string, ...args: any[]) {
    this._log('info', logParamsWithSanitizationPolicy(policyId, args));
  }
}
