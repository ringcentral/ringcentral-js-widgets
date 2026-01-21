import type { ClientTransport, ServerTransport } from 'reactant-share';
import {
  action,
  getRef,
  injectable,
  optional,
  PortDetector,
  state,
  useLock,
} from 'reactant-share';
import {
  BehaviorSubject,
  EMPTY,
  filter,
  Observable,
  ReplaySubject,
  take,
  tap,
} from 'rxjs';

import {
  mainClient,
  mainTabClientChange,
  mainTabClientDelegate,
  mainTabClientReload,
  PortType,
} from '../constant';
import { applyMethod } from '../lib/applyMethod';
import { delegate } from '../lib/decorators/delegate';
import { handleAllPortsOnServer } from '../lib/decorators/parallel';
import { handleParallelClientsOnServer } from '../lib/decorators/parallelClients';
import { handleMainClientOnServer } from '../lib/handleMainClient';

type ClientToServer = {
  [mainTabClientChange](options: { clientId: string }): Promise<void>;
};

type ServerToClient = {
  [mainTabClientReload]: () => Promise<void>;
  [mainTabClientDelegate](options: {
    module: string;
    method: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): Promise<any>;
};

type MainTabCallbacks = (
  transport: ClientTransport<{ emit: ClientToServer; listen: ServerToClient }>,
) => void;

type ChangeMainTabCallbacks = (
  transport: ServerTransport<{ listen: ClientToServer; emit: ServerToClient }>,
) => void;

export interface PortManagerOptions {
  /**
   * Disable auto picking main tab client
   */
  disableAutoPickMainTab?: boolean;
}

@injectable({
  name: 'PortManager',
})
export class PortManager {
  /**
   * sync state with main client
   */
  portType$ = new BehaviorSubject<PortType | null>(null);

  /**
   * emit when main tab change, only work in shared mode of server port
   */
  onMainTabChange$ = this.shared
    ? new Observable((subscriber) => {
        this.onMainTabChange(() => {
          subscriber.next(true);
        });
      })
    : EMPTY;

  get portType() {
    return this.portType$.value;
  }

  onServer = this.portDetector.onServer;

  onClient = this.portDetector.onClient;

  mainTabSyncStore = !this.shared;

  private resolveMainTabClient?: () => void;

  /**
   * Parallel load main client and server, it ensures that waiting for main client in server
   */
  promiseMainTabClient: Promise<void>;

  checkMainTabMapping = new Map<object, () => boolean>();

  customClientDelegateNameMapping = new Map<object, string>();

  public initMainClient$ = new ReplaySubject<boolean>();

  constructor(
    public portDetector: PortDetector,
    @optional('Prefix') protected prefix?: string,
    @optional('PortManagerOptions')
    protected portManagerOptions?: PortManagerOptions,
  ) {
    const _handleMainClientOnServer = handleMainClientOnServer(this);
    this.portDetector.serverHooks.mainClient = (options) =>
      _handleMainClientOnServer(options);
    const _handleParallelClientsOnServer = handleParallelClientsOnServer(this);
    this.portDetector.serverHooks.clients = (options) =>
      _handleParallelClientsOnServer(options);
    const _handleAllPortsOnServer = handleAllPortsOnServer(this.portDetector);
    this.portDetector.serverHooks.all = (options) =>
      _handleAllPortsOnServer(options);
    this.promiseMainTabClient = new Promise((resolve) => {
      this.resolveMainTabClient = resolve;
    });
    this.onClient(
      (
        transport: ClientTransport<{
          emit: ClientToServer;
          listen: ServerToClient;
        }>,
      ) => {
        transport.listen(mainTabClientReload, async () => {
          globalThis.location.reload();
        });
        this.portType$.next(PortType.Client);
        // non-main tab will sync full state
        this.mainTabSyncStore = true;
        if (!this.isWorkerMode) return;

        const initMainClient = () => {
          const sharedWorkerUrl = globalThis.__rc_shared_worker__?.url ?? '';
          const lockName = `${mainClient}-${this.prefix ?? ''}-${
            this.portDetector.name
          }-${sharedWorkerUrl}`;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          return useLock(lockName, async () => {
            this.mainTabSyncStore = false;
            this.portType$.next(PortType.MainClient);
            transport.listen(mainTabClientDelegate, async (options) => {
              const module = getRef(this).modules![options.module];
              const result = await applyMethod(module, options);
              return result;
            });
            for (const callback of this.mainTabCallbacks) {
              try {
                callback(transport);
              } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
              }
            }
            transport.emit(
              { name: mainTabClientChange, respond: false },
              { clientId: this.clientId! },
            );
            return new Promise(() => {
              // never end promise for all this client hold this lock and never release it
              // until that client be closed or refreshed
            });
          });
        };
        if (!this.portManagerOptions?.disableAutoPickMainTab) {
          return initMainClient();
        } else {
          this.initMainClient$
            .pipe(
              filter(Boolean),
              take(1),
              tap(() => initMainClient()),
            )
            .subscribe();
        }
      },
    );

    this.onServer(
      (
        transport: ServerTransport<{
          listen: ClientToServer;
          emit: ServerToClient;
        }>,
      ) => {
        this.portType$.next(PortType.Server);
        if (!this.isWorkerMode) {
          // workaround: in safari, main tab will close and other tabs will reload
          globalThis.window.addEventListener('pagehide', () => {
            transport.emit(mainTabClientReload);
          });
          for (const callback of this.mainTabCallbacks) {
            try {
              callback(transport);
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error(e);
            }
          }
          return;
        }
        return transport.listen(mainTabClientChange, async ({ clientId }) => {
          const oldClient = this.mainClientId;
          this.mainClientId = clientId;
          this.resolveMainTabClient?.();
          if (oldClient) {
            for (const callback of this.changeClientCallbacks) {
              try {
                callback(transport);
              } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
              }
            }
          }
        });
      },
    );

    this.onMainTab(() => {
      if (this.isWorkerMode) {
        this.setAsMainClient();
      }
    });

    if (globalThis.document && this.shared) {
      this._bindVisibilityListener();
      this._bindUnloadListener();
    }

    this.onClient(() => {
      // only set active tab id when the client is visible
      this._setAsVisibleTab();
    });

    this.onServer(() => {
      // trigger visibility check event when the server port is created
      this.checkVisibleTabInAllClient();
    });
  }

  get isWorkerMode() {
    return this.portDetector.isWorkerMode;
  }

  get shared() {
    return this.portDetector.shared;
  }

  setAsMainClient() {
    this.portDetector.allowDisableSync = () => false;
    this.portDetector.syncFullState({ forceSync: false });
  }

  get isServer() {
    return this.portDetector.isServer;
  }

  get isClient() {
    return this.portDetector.isClient;
  }

  get isMainTab() {
    return this.isWorkerMode
      ? this.portType === PortType.MainClient
      : this.portType === PortType.Server;
  }

  mainClientId: string | null = null;

  private changeClientCallbacks = new Set<MainTabCallbacks>();

  /**
   * It will be triggered on the server port if the main client is changed to another one.
   */
  onMainTabChange = (callback: ChangeMainTabCallbacks) => {
    if (!this.portDetector.isServer) {
      throw new Error('Only server can listen on main client change');
    }
    this.changeClientCallbacks.add(callback);
    return () => {
      this.changeClientCallbacks.delete(callback);
    };
  };

  private mainTabCallbacks = new Set<MainTabCallbacks>();

  /**
   * It will be triggered if the current client is the main client.
   */
  onMainTab = (callback: MainTabCallbacks) => {
    this.mainTabCallbacks.add(callback);
    return () => {
      this.mainTabCallbacks.delete(callback);
    };
  };

  /**
   * the active tab id means the user latest interacted tab
   *
   * ! this value possible be null, because the user may not interact with any tab
   * ! if the active tab be close and user not open another tab again, the active tab id will be null
   */
  @state
  activeTabId: string | null = null;

  @action
  private _setActiveTabId(tabId: string | null) {
    this.activeTabId = tabId;
  }

  @delegate('server')
  async setActiveTabId(tabId: string | null) {
    this._setActiveTabId(tabId);
  }

  /**
   * The active non-main tab id means the user latest interacted non-main tab
   */
  @state
  activeNonMainTabId: string | null = null;

  @action
  private _setActiveNonMainTabId(tabId: string | null) {
    this.activeNonMainTabId = tabId;
  }

  @delegate('server')
  async setActiveNonMainTabId(tabId: string | null) {
    this._setActiveNonMainTabId(tabId);
  }

  private _bindVisibilityListener() {
    globalThis.document.addEventListener(
      'visibilitychange',
      this._setAsVisibleTab,
    );
    globalThis.window.addEventListener('focus', this._setAsVisibleTab);
  }

  private _bindUnloadListener() {
    globalThis.window.addEventListener('pagehide', () => {
      if (this.isActiveTab) {
        this.setActiveTabId(null);
      }
    });
  }

  private _setAsVisibleTab = () => {
    // avoid setting activeTabId repeatedly which may result in forced rendering
    if (!document.hidden && !this.isActiveTab) {
      this.setActiveTabId(this.clientId!);
    }

    if (!document.hidden && !this.isActiveNonMainTab && !this.isMainTab) {
      this.setActiveNonMainTabId(this.clientId!);
    }
  };

  @delegate('clients')
  async checkVisibleTabInAllClient() {
    this._setAsVisibleTab();
  }

  get isActiveTab() {
    return this.activeTabId === this.clientId;
  }

  get isActiveNonMainTab() {
    return this.activeNonMainTabId === this.clientId;
  }

  get clientId() {
    return this.portDetector.clientId;
  }

  get transports() {
    return this.portDetector.transports;
  }

  get transport() {
    return this.portDetector.transport;
  }
}
