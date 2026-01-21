/* eslint-disable no-console */
import { getHostPath } from '@ringcentral-integration/utils';
import {
  action,
  createBroadcastTransport,
  injectable,
  type ISharedAppOptions,
  optional,
  SharedAppOptions,
  state,
  type Transport,
  getRef,
  watch,
  ILastActionData,
} from 'reactant-share';
import { Subject, take, tap } from 'rxjs';

import {
  disableRcSharedWorkerKey,
  disableRcSharedWorkerLoggerKey,
} from '../constant';
import { delegate } from '../lib/decorators/delegate';
import { getLocalMfeMeta } from '../lib/getMfeMetaLocal';
import { logger } from '../lib/logger';

import { PortManager } from './PortManager';
import { takeUntilAppDestroy } from './destroy';

type InitializeCallbacks = () => void | Promise<void>;

type BeforeInitCallbacks = (target: any) => void | Promise<void>;

type BroadcastEvents = {
  emit: { reload: (url: string, version?: string) => void };
  listen: { reload: (url: string, version?: string) => void };
};

export const installedUpdate$ = new Subject<boolean>();

export interface InitiatorOptions {
  /**
   * enable redirect to upgrade page when a new host is found with different shared worker url
   */
  enableNewHostDetection?: boolean;
  /**
   * get current locale
   */
  getCurrentLocale?: () => string;
  /**
   * base path for the application (e.g. '/integration/scheduling-tool/prod/rc/')
   * When provided, takes priority over getHostPath
   */
  basePath?: string;
}

@injectable({
  name: 'Initiator',
})
export class Initiator {
  /**
   * reload promise for reload all tabs
   */
  reloadPromise: Promise<void> | null = null;

  /**
   * making this a class variable purely for testing purposes, so that we can emit the reload event
   * in the browser
   * https://test_it_domain/test-cases/RCI-6755
   *
   * app.modules.Initiator.transport.emit('reload', receiveWorkerUrl, version);
   */
  private transport?: Transport<BroadcastEvents>;

  constructor(
    private _portManager: PortManager,
    @optional(SharedAppOptions) private _sharedAppOptions?: ISharedAppOptions,
    @optional('Prefix') private _prefix?: string,
    @optional('Version') private _version?: string,
    @optional('BuildEnv') private _buildEnv?: string,
    @optional('InitiatorOptions') private _initiatorOptions?: InitiatorOptions,
  ) {
    if (this._portManager.shared) {
      this._portManager.onServer(() => {
        this.initialize();
      });
      this._portManager.onClient(() => {
        if (this._portManager.isWorkerMode) {
          // Priority: basePath > default getHostPath()
          const hostUrl = this._initiatorOptions?.basePath
            ? `${globalThis.location?.origin || ''}${this.basePath}`
            : getHostPath();
          const currWorkerUrl = hostUrl + globalThis.__rc_shared_worker__?.url;

          logger.log(
            '[Initiator] worker mode, check should reload to get latest shared worker',
            {
              fullPrefix: this.prefix,
              prefix: this._prefix,
              portName: this._sharedAppOptions!.portName,
              name: this._sharedAppOptions!.name,
              currWorkerUrl,
            },
          );

          const transport: Transport<BroadcastEvents> =
            createBroadcastTransport(this.prefix);
          this.transport = transport;
          // When an old tab has an old shared worker running,
          // the new shared worker will broadcast and cause all tabs of the old shared worker to auto-refresh,
          // in order to share the new shared worker.
          transport.listen('reload', async (receiveWorkerUrl, version) => {
            // when the receiveUrl is not same current host, that not in same app version, should need some action
            if (
              this._initiatorOptions?.enableNewHostDetection &&
              !receiveWorkerUrl.includes(hostUrl)
            ) {
              const data = {
                hostUrl,
                receiveWorkerUrl,
                currWorkerUrl,
              };
              logger.log(
                '[Initiator] app not run in same host, ignore reload event',
                data,
              );

              const locale = this._initiatorOptions?.getCurrentLocale?.();
              // redirect to upgrade page, to prevent use old version app of worker
              location.href = `${hostUrl}upgrade.html?locale=${locale}`;
              return;
            }

            if (
              receiveWorkerUrl !== currWorkerUrl ||
              (version && version !== this._version)
            ) {
              await this.reloadPromise;
              logger.log(
                '[Initiator] app need reload to apply latest shared worker',
                {
                  receiveUrl: receiveWorkerUrl,
                  currentWorkerUrl: currWorkerUrl,
                  currentVersion: this._version,
                  receiveVersion: version,
                },
              );

              globalThis.location?.reload();
            }
          });
          transport.emit(
            { name: 'reload', respond: false },
            currWorkerUrl,
            this._version,
          );
          this.checkMfeInfo();
        }
      });

      if (globalThis.localStorage?.getItem(disableRcSharedWorkerLoggerKey)) {
        watch(
          this,
          () => this._portManager.portDetector.lastAction.action,
          (action) => {
            this.lastActions.unshift(action);
            this.lastActions.length = 100;
          },
        );
      }
    } else {
      // wait for module is created
      Promise.resolve().then(() => {
        this.initialize();
      });
    }
  }

  private lastActions: ILastActionData[] = [];

  async checkMfeInfo() {
    if (Object.keys(this.localMfeInfo ?? {}).length === 0) return;
    installedUpdate$
      .pipe(
        take(1),
        tap(async (isInstalled) => {
          if (isInstalled) {
            await this._portManager.portDetector.syncFullStatePromise;
            this.getServerLocalMfeInfo().then((localMfeInfo = {}) => {
              Object.keys(localMfeInfo).forEach((name) => {
                if (this.localMfeInfo[name] !== localMfeInfo[name]) {
                  // ensure all clients reload to get latest version
                  this.reloadAllClients();
                }
              });
            });
          }
        }),
        takeUntilAppDestroy,
      )
      .subscribe();
  }

  get prefix() {
    return `${this._sharedAppOptions!.name}${
      this._buildEnv ? `-${this._buildEnv}` : ''
    }${this._prefix ? `-${this._prefix}` : ''}`;
  }

  get basePath() {
    return this._initiatorOptions?.basePath || '/';
  }

  private beforeInitCallbacks = new Set<BeforeInitCallbacks>();

  /**
   * beforeInit for all RC modules
   */
  beforeInit(callback: BeforeInitCallbacks) {
    this.beforeInitCallbacks.add(callback);
    return () => {
      this.beforeInitCallbacks.delete(callback);
    };
  }

  beforeInitialize(targe: any) {
    for (const callback of this.beforeInitCallbacks) {
      try {
        callback(targe);
      } catch (e) {
        console.error(e);
      }
    }
  }

  private onInitializeCallbacks = new Set<InitializeCallbacks>();

  /**
   * callback for initialize
   */
  onInitialize(callback: InitializeCallbacks) {
    if (this.initialized) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          'Initiator is already initialized, ignore onInitialize callback',
        );
      }
      return () => {};
    }
    this.onInitializeCallbacks.add(callback);
    return () => {
      this.onInitializeCallbacks.delete(callback);
    };
  }

  protected async initialize() {
    for (const callback of this.onInitializeCallbacks) {
      try {
        await callback();
      } catch (e) {
        console.error(e);
      }
    }
    // wait for the store is initialized
    await Promise.resolve();
    const { store } = getRef(this);
    // Make sure the store is initialized before the module is initialized
    if (!this.initialized && store) {
      // Workaround about support asynchronous externals.localStorage API on RC SDK
      // Follow this ticket: https://github.com/ringcentral/ringcentral-js/issues/187
      // Init dispatch for trigger all stores subscriptions
      this.initModules();
    }
  }

  @state
  initialized = false;

  @action
  initModules() {
    this.initialized = true;
  }

  get shouldActivate() {
    return (
      (this._portManager.isServer || !this._portManager.shared) &&
      this.initialized
    );
  }

  localMfeInfo = getLocalMfeMeta({
    onlyVersion: true,
  });

  @delegate('server')
  async getServerLocalMfeInfo() {
    return this.localMfeInfo;
  }

  @delegate('clients')
  async reloadAllClients() {
    globalThis.location?.reload();
  }

  /**
   * disable shared worker
   * !!! this method should be called in webpage dev console for debugging
   */
  private disableSharedWorker() {
    globalThis.localStorage?.setItem(disableRcSharedWorkerKey, 'true');
  }

  /**
   * enable shared worker
   * !!! this method should be called in webpage dev console for debugging
   */
  private enableSharedWorker() {
    globalThis.localStorage?.removeItem(disableRcSharedWorkerKey);
  }

  /**
   * enable shared worker logger
   * !!! this method should be called in webpage dev console for debugging
   */
  private enableSharedWorkerLogger() {
    globalThis.localStorage?.setItem(disableRcSharedWorkerLoggerKey, 'true');
  }

  /**
   * disable shared worker logger
   * !!! this method should be called in webpage dev console for debugging
   */
  private disableSharedWorkerLogger() {
    globalThis.localStorage?.removeItem(disableRcSharedWorkerLoggerKey);
  }
}
