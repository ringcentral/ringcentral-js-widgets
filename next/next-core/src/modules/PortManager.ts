import { action, getRef, injectable, optional, state, watch } from 'reactant';
import type { ClientTransport, ServerTransport } from 'reactant-share';
import { fork, PortDetector, useLock } from 'reactant-share';
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
import { reloadRuntimeLocation } from '../lib/browserLocation';
import { delegate } from '../lib/decorators/delegate';
import { executeRoleMethod } from '../lib/decorators/delegateRole';
import { handleAllPortsOnServer } from '../lib/decorators/parallel';
import { handleParallelClientsOnServer } from '../lib/decorators/parallelClients';
import { handleMainClientOnServer } from '../lib/handleMainClient';
import {
  roleDeadline,
  RoleAggregateError,
  RoleDefinitionMismatchError,
  RoleFencedError,
  RoleInvocationTimeoutError,
  RoleNotRegisteredError,
  RoleReleaseRejectedError,
  RoleSourceNotOwnerError,
  RoleUnavailableError,
  systemRoles,
  unwrapRoleResult,
} from '../lib/roleDelegation';
import type {
  InvokeRoleOptions,
  RoleDefinition,
  RoleError,
  RoleId,
  RoleInvocationResult,
  RoleLifecycle,
  RoleResult,
  RoleRegistrationResult,
  RoleState,
  RoleStateStreams,
} from '../lib/roleDelegation';

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

type SystemRoleMembership = 'server' | 'clients' | 'elected' | 'all';

type SystemRolePolicy = {
  readonly definition: RoleDefinition;
  readonly membership: SystemRoleMembership;
  readonly mutable: boolean;
  readonly claimable: boolean;
  readonly allowsEmpty: boolean;
};

const systemRolePolicies = new Map<RoleId, SystemRolePolicy>([
  [
    systemRoles.server.role,
    {
      definition: systemRoles.server,
      membership: 'server',
      mutable: false,
      claimable: false,
      allowsEmpty: false,
    },
  ],
  [
    systemRoles.connectedClients.role,
    {
      definition: systemRoles.connectedClients,
      membership: 'clients',
      mutable: false,
      claimable: false,
      allowsEmpty: true,
    },
  ],
  [
    systemRoles.electedClient.role,
    {
      definition: systemRoles.electedClient,
      membership: 'elected',
      mutable: true,
      claimable: true,
      allowsEmpty: false,
    },
  ],
  [
    systemRoles.all.role,
    {
      definition: systemRoles.all,
      membership: 'all',
      mutable: false,
      claimable: false,
      allowsEmpty: false,
    },
  ],
]);

const serverRoleOwner = '__SERVER__';

type RoleControlMethod =
  | 'register'
  | 'registerSystemClient'
  | 'claim'
  | 'release'
  | 'invoke';

const confirmedRoleControlErrors = new WeakSet<Error>();

const delegateRoleControl = async <T>(
  target: object,
  method: RoleControlMethod,
  args: unknown[],
): Promise<T> => {
  const result = (await delegate(
    target as never,
    '_handleRoleControl' as never,
    [method, args] as never,
  )) as RoleResult<T> | undefined;
  try {
    return unwrapRoleResult(result);
  } catch (error) {
    if (result && !result.ok && error instanceof Error) {
      confirmedRoleControlErrors.add(error);
    }
    throw error;
  }
};

type ServerRole = {
  definition: RoleDefinition;
  candidates: Set<string>;
  mismatchedCandidates: Set<string>;
  owners: Set<string>;
  revision: number;
};

type LocalRole = {
  readonly definition: RoleDefinition;
  readonly lifecycle: RoleLifecycle;
  registrationUncertain: boolean;
};

type RoleRevisionSyncFailure = {
  clientId: string;
  error: unknown;
};

type RoleInvocationRequest = {
  role: RoleId;
  module: string;
  method: string;
  args: unknown[];
  revision: number;
};

@injectable({
  name: 'PortManager',
})
export class PortManager {
  private localRoles = new Map<RoleId, LocalRole>();

  private localRoleRevisions = new Map<RoleId, number>();

  private serverRoles = new Map<RoleId, ServerRole>();

  private systemClientIds = new Set<string>();

  private previousLocalClientId?: string;

  private roleOperationQueues = new Map<RoleId, Promise<void>>();

  private transitioningRoles = new Set<RoleId>();

  private roleStateSubjects = new Map<RoleId, BehaviorSubject<RoleState>>();

  private roleTransitionSubjects = new Map<
    RoleId,
    BehaviorSubject<RoleState>
  >();

  @state
  private roleSnapshots: RoleState[] = [];

  private localRoleSnapshots: RoleState[] = [];

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

  readonly systemRolesReady: Promise<void>;

  constructor(
    public portDetector: PortDetector,
    @optional('Prefix') protected prefix?: string,
    @optional('PortManagerOptions')
    protected portManagerOptions?: PortManagerOptions,
  ) {
    let resolveSystemRoles!: () => void;
    let rejectSystemRoles!: (error: unknown) => void;
    this.systemRolesReady = new Promise<void>((resolve, reject) => {
      resolveSystemRoles = resolve;
      rejectSystemRoles = reject;
    });
    void this.systemRolesReady.catch(() => undefined);
    watch(
      this,
      () => this.roleSnapshots,
      (snapshots) => {
        for (const snapshot of snapshots) {
          this._notifyRoleSnapshot(snapshot);
        }
      },
    );
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
          reloadRuntimeLocation();
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

    this.portDetector.onClientDestroy((clientId) => {
      const portManager = getRef(this).container?.got(PortManager) ?? this;
      if (portManager.mainClientId === clientId) {
        portManager.mainClientId = null;
      }
      portManager.systemClientIds.delete(clientId);
      portManager._publishDerivedSystemRoleStates();
      for (const [role, record] of portManager.serverRoles) {
        void portManager._enqueueRoleOperation(role, async () => {
          record.candidates.delete(clientId);
          record.mismatchedCandidates.delete(clientId);
          if (!record.owners.delete(clientId)) return;
          record.revision += 1;
          portManager._removeUnsyncedOwners(
            record,
            await portManager._syncRoleRevisions(role, record),
          );
          portManager._publishRoleState(role, record);
          if (record.definition.autoElect) {
            await portManager._electRole(role, record);
          }
        });
      }
    });

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

    const initializeSystemRoles = () => {
      const portManager = getRef(this).container?.got(PortManager) ?? this;
      void portManager
        ._initializeSystemRoles()
        .then(resolveSystemRoles, rejectSystemRoles);
    };
    const scheduleSystemRoleInitialization = () => {
      void Promise.resolve().then(initializeSystemRoles);
    };
    this.onClient(() => {
      this.previousLocalClientId = this.clientId ?? undefined;
      scheduleSystemRoleInitialization();
    });
    this.onServer(scheduleSystemRoleInitialization);
    if (!this.shared) scheduleSystemRoleInitialization();
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

  /** Register lifecycle callbacks locally before claiming a domain role. */
  async registerRole(
    definition: RoleDefinition,
    lifecycle: RoleLifecycle = {},
  ): Promise<RoleRegistrationResult> {
    this._validateRoleDefinition(definition);
    this._validateDomainRole(definition.role);
    let localRole = this.localRoles.get(definition.role);
    if (
      localRole &&
      (!localRole.registrationUncertain ||
        !this._definitionsMatch(localRole.definition, definition))
    ) {
      throw new Error(
        `Role '${definition.role}' is already registered locally.`,
      );
    }
    if (localRole) {
      localRole.registrationUncertain = false;
    } else {
      localRole = { definition, lifecycle, registrationUncertain: false };
      this.localRoles.set(definition.role, localRole);
    }
    try {
      let result: RoleRegistrationResult;
      if (this.isClient) {
        result = await delegateRoleControl<RoleRegistrationResult>(
          this,
          'register',
          [definition, this.clientId!],
        );
      } else {
        result = await this._registerRole(definition, serverRoleOwner);
      }
      return result;
    } catch (error) {
      if (error instanceof RoleDefinitionMismatchError) {
        localRole.registrationUncertain = false;
      } else if (
        error instanceof Error &&
        confirmedRoleControlErrors.has(error)
      ) {
        this.localRoles.delete(definition.role);
      } else {
        localRole.registrationUncertain = true;
      }
      throw error;
    }
  }

  /** Claim a locally available role. Repeating a claim is a no-op. */
  async claimRole(role: RoleId): Promise<RoleRegistrationResult> {
    if (systemRolePolicies.has(role)) await this.systemRolesReady;
    const systemPolicy = systemRolePolicies.get(role);
    if (!this.localRoles.has(role) && !systemPolicy?.claimable) {
      throw new RoleNotRegisteredError(role);
    }
    if (this.isClient)
      return delegateRoleControl<RoleRegistrationResult>(this, 'claim', [
        role,
        this.clientId!,
      ]);
    return this._claimRole(role, serverRoleOwner);
  }

  /** Release a locally owned domain role. Repeating a release is a no-op. */
  async releaseRole(role: RoleId): Promise<RoleRegistrationResult> {
    if (!this.localRoles.has(role)) throw new RoleNotRegisteredError(role);
    if (this.isClient)
      return delegateRoleControl<RoleRegistrationResult>(this, 'release', [
        role,
        this.clientId!,
      ]);
    return this._releaseRole(role, serverRoleOwner);
  }

  /** Observe stable ownership snapshots for one role. */
  getRoleStateStreams(role: RoleId): RoleStateStreams {
    return {
      roleState$: this._getRoleStateSubject(role),
      roleTransition$: this._getRoleTransitionSubject(role),
    };
  }

  async _handleRoleControl(
    method: RoleControlMethod,
    args: unknown[],
  ): Promise<RoleResult<unknown>> {
    try {
      switch (method) {
        case 'register': {
          const [definition, clientId] = args as [RoleDefinition, string];
          return {
            ok: true,
            value: await this._registerRole(definition, clientId),
          };
        }
        case 'registerSystemClient': {
          const [clientId] = args as [string];
          return {
            ok: true,
            value: await this._registerSystemClient(clientId),
          };
        }
        case 'claim': {
          const [role, clientId] = args as [RoleId, string];
          return { ok: true, value: await this._claimRole(role, clientId) };
        }
        case 'release': {
          const [role, clientId] = args as [RoleId, string];
          return { ok: true, value: await this._releaseRole(role, clientId) };
        }
        case 'invoke': {
          const [
            role,
            module,
            methodName,
            methodArgs,
            options,
            sourceClientId,
          ] = args as [
            RoleId,
            string,
            string,
            unknown[],
            InvokeRoleOptions,
            string,
          ];
          return {
            ok: true,
            value: await this.invokeRole(
              role,
              module,
              methodName,
              methodArgs,
              options,
              sourceClientId,
            ),
          };
        }
      }
    } catch (error) {
      return { ok: false, error: this._serializeRoleError(error) };
    }
  }

  async invokeRole(
    role: RoleId,
    module: string,
    method: string,
    args: unknown[],
    options: InvokeRoleOptions = {},
    sourceClientId?: string,
  ): Promise<unknown> {
    await this.systemRolesReady;
    if (this.isClient) {
      return delegateRoleControl<unknown>(this, 'invoke', [
        role,
        module,
        method,
        args,
        options,
        this.clientId!,
      ]);
    }
    if (this.transitioningRoles.has(role)) {
      throw new RoleUnavailableError(role);
    }
    const ownerIds = await this._resolveRoleOwners(role);
    if (!ownerIds.length && !systemRolePolicies.get(role)?.allowsEmpty) {
      throw new RoleUnavailableError(role);
    }
    if (options.collectResults && options.completion === 'local') {
      throw new Error("collectResults requires completion: 'all'.");
    }
    if (
      options.completion === 'local' &&
      !ownerIds.includes(sourceClientId ?? serverRoleOwner)
    ) {
      throw new RoleSourceNotOwnerError(role);
    }
    const moduleInstance = getRef(this).modules?.[module];
    if (!moduleInstance)
      throw new Error(`Module '${module}' is not registered.`);
    const deadline = Date.now() + roleDeadline;
    const revision = this._getRoleRevision(role);
    const invokeOwner = async (clientId: string) => {
      const value =
        clientId === serverRoleOwner
          ? this._executeRoleMethod(moduleInstance, method, args, {
              role,
              revision,
            })
          : fork(
              this,
              '_executeRoleInvocationResult' as never,
              [
                {
                  role,
                  module,
                  method,
                  args,
                  revision,
                },
              ] as never,
              {
                clientIds: [clientId],
              },
            );
      const result = await this._withDeadline(
        Promise.resolve(value),
        role,
        deadline,
      );
      return clientId === serverRoleOwner
        ? result
        : unwrapRoleResult(result as RoleResult<unknown> | undefined);
    };
    if (options.completion === 'local') {
      const sourceOwnerId = sourceClientId ?? serverRoleOwner;
      const sourceInvocation = invokeOwner(sourceOwnerId);
      ownerIds.forEach((clientId) => {
        if (clientId === sourceOwnerId) return;
        void invokeOwner(clientId).catch((error) => {
          console.error('[PortManager] role peer invocation failed', {
            role,
            clientId,
            error,
          });
        });
      });
      return sourceInvocation;
    }
    if (options.firstFailure && !options.collectResults) {
      await Promise.all(ownerIds.map(invokeOwner));
      return;
    }
    const results = await Promise.all(
      ownerIds.map(async (clientId): Promise<RoleInvocationResult> => {
        try {
          return {
            clientId,
            status: 'fulfilled',
            value: await invokeOwner(clientId),
          };
        } catch (reason) {
          return { clientId, status: 'rejected', reason };
        }
      }),
    );
    const errors = results
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason);
    if (errors.length) {
      if (
        ownerIds.length === 1 &&
        errors[0] instanceof RoleInvocationTimeoutError
      ) {
        throw errors[0];
      }
      throw new RoleAggregateError(errors, results);
    }
    return options.collectResults ? results : undefined;
  }

  async _registerRole(
    definition: RoleDefinition,
    clientId: string,
  ): Promise<RoleRegistrationResult> {
    this._validateRoleDefinition(definition);
    return this._enqueueRoleOperation(definition.role, () =>
      this._registerRoleUnsafe(definition, clientId),
    );
  }

  private async _registerRoleUnsafe(
    definition: RoleDefinition,
    clientId: string,
  ): Promise<RoleRegistrationResult> {
    this._validateRoleDefinition(definition);
    const { role } = definition;
    this._validateDomainRole(role);
    const record = this.serverRoles.get(role);
    if (record && !this._definitionsMatch(record.definition, definition)) {
      record.candidates.delete(clientId);
      record.mismatchedCandidates.add(clientId);
      let port: 'server' | 'client' | 'local' = 'local';
      if (this.isServer) {
        port = 'server';
      } else if (this.isClient) {
        port = 'client';
      }
      // eslint-disable-next-line no-console
      console.error('[PortManager] role definition mismatch', {
        role,
        acceptedDefinition: record.definition,
        receivedDefinition: definition,
        participantId: clientId,
        topology: {
          type: this.portDetector.sharedAppOptions.type,
          port,
        },
      });
      const wasOwner = record.owners.delete(clientId);
      if (wasOwner) {
        record.revision += 1;
        this._removeUnsyncedOwners(
          record,
          await this._syncRoleRevisions(role, record),
        );
        this._publishRoleState(role, record);
        if (record.definition.autoElect) {
          await this._electRole(role, record, new Set([clientId]));
        }
      }
      throw new RoleDefinitionMismatchError(role);
    }
    const next = record ?? {
      definition,
      candidates: new Set<string>(),
      mismatchedCandidates: new Set<string>(),
      owners: new Set<string>(),
      revision: 0,
    };
    next.candidates.add(clientId);
    this.serverRoles.set(role, next);
    if (definition.autoElect && !next.owners.size) {
      await this._electRole(role, next);
    }
    return this._roleResult(role, next);
  }

  private async _initializeSystemRoles() {
    if (this.isClient) {
      await delegateRoleControl<void>(this, 'registerSystemClient', [
        this.clientId!,
      ]);
      return;
    }
    this._restoreSystemClientsFromSnapshot();
    if (
      this.portDetector.sharedAppOptions.type === 'SharedTab' &&
      this.previousLocalClientId
    ) {
      this.systemClientIds.delete(this.previousLocalClientId);
    }
    this._publishDerivedSystemRoleStates();
    if (this.isWorkerMode) return;
    await this._ensureLocalElectedClient();
  }

  private async _registerSystemClient(clientId: string): Promise<void> {
    this.systemClientIds.add(clientId);
    this._publishDerivedSystemRoleStates();
    if (!this.isWorkerMode) return;
    await this._enqueueRoleOperation(
      systemRoles.electedClient.role,
      async () => {
        const record = this._getElectedClientRole();
        record.candidates.add(clientId);
        if (!record.owners.size) {
          await this._electRole(systemRoles.electedClient.role, record);
        }
      },
    );
  }

  private _getElectedClientRole(): ServerRole {
    const role = systemRoles.electedClient.role;
    const snapshot = this._getRoleSnapshot(role);
    const record = this.serverRoles.get(role) ?? {
      definition: systemRoles.electedClient,
      candidates: new Set<string>(),
      mismatchedCandidates: new Set<string>(),
      owners: new Set(
        snapshot?.phase === 'owned'
          ? snapshot.owners.map(({ clientId }) => clientId)
          : [],
      ),
      revision: snapshot?.revision ?? 0,
    };
    this.serverRoles.set(role, record);
    return record;
  }

  private async _ensureLocalElectedClient() {
    const role = systemRoles.electedClient.role;
    await this._enqueueRoleOperation(role, async () => {
      const record = this._getElectedClientRole();
      if (
        this.portDetector.sharedAppOptions.type === 'SharedTab' &&
        this.previousLocalClientId
      ) {
        record.candidates.delete(this.previousLocalClientId);
        record.owners.clear();
        this.localRoleRevisions.delete(role);
      }
      record.candidates.add(serverRoleOwner);
      if (!record.owners.has(serverRoleOwner)) {
        await this._claimRoleUnsafe(role, serverRoleOwner);
      } else {
        this.localRoleRevisions.set(role, record.revision);
        this._publishRoleState(role, record);
      }
      this.previousLocalClientId = undefined;
    });
  }

  async _claimRole(
    role: RoleId,
    clientId: string,
  ): Promise<RoleRegistrationResult> {
    return this._enqueueRoleOperation(role, async () => {
      try {
        return await this._claimRoleUnsafe(role, clientId);
      } catch (error) {
        const record = this.serverRoles.get(role);
        if (
          record?.definition.autoElect &&
          !record.definition.allowMultiple &&
          record.candidates.has(clientId) &&
          !record.owners.size &&
          !this._isRoleReleaseRejected(error)
        ) {
          await this._electRole(role, record, new Set([clientId]));
        }
        throw error;
      }
    });
  }

  private async _claimRoleUnsafe(
    role: RoleId,
    clientId: string,
  ): Promise<RoleRegistrationResult> {
    const record = this.serverRoles.get(role);
    if (!record) throw new RoleNotRegisteredError(role);
    if (record.mismatchedCandidates.has(clientId)) {
      throw new RoleDefinitionMismatchError(role);
    }
    if (!record.candidates.has(clientId)) {
      throw new RoleNotRegisteredError(role);
    }
    if (record.owners.has(clientId)) return this._roleResult(role, record);
    if (!record.definition.allowMultiple && record.owners.size) {
      const previousOwner = [...record.owners][0];
      this.transitioningRoles.add(role);
      this._publishTransition(role, record, 'draining', [clientId]);
      try {
        await this._runRoleLifecycle(
          previousOwner,
          role,
          'release',
          record.revision + 1,
        );
      } catch (error) {
        if (this._isRoleReleaseRejected(error)) {
          this.transitioningRoles.delete(role);
          this._publishRoleState(role, record);
          throw new RoleReleaseRejectedError(role);
        }
      }
      record.owners.clear();
    }
    this.transitioningRoles.add(role);
    this._publishTransition(role, record, 'acquiring', [clientId]);
    try {
      await this._runRoleLifecycle(
        clientId,
        role,
        'acquire',
        record.revision + 1,
      );
    } catch (error) {
      if (!record.definition.allowMultiple) {
        record.owners.clear();
        record.revision += 1;
      }
      this.transitioningRoles.delete(role);
      this._publishRoleState(role, record);
      throw error;
    }
    record.owners.add(clientId);
    record.revision += 1;
    const syncFailures = await this._syncRoleRevisions(role, record);
    this._removeUnsyncedOwners(record, syncFailures);
    this.transitioningRoles.delete(role);
    this._publishRoleState(role, record);
    const claimantFailure = syncFailures.find(
      (failure) => failure.clientId === clientId,
    );
    if (claimantFailure) throw claimantFailure.error;
    return this._roleResult(role, record);
  }

  async _releaseRole(
    role: RoleId,
    clientId: string,
  ): Promise<RoleRegistrationResult> {
    return this._enqueueRoleOperation(role, () =>
      this._releaseRoleUnsafe(role, clientId),
    );
  }

  private async _releaseRoleUnsafe(
    role: RoleId,
    clientId: string,
  ): Promise<RoleRegistrationResult> {
    const record = this.serverRoles.get(role);
    if (!record || !record.owners.has(clientId))
      return this._roleResult(role, record);
    this.transitioningRoles.add(role);
    this._publishTransition(role, record, 'draining', []);
    try {
      await this._runRoleLifecycle(
        clientId,
        role,
        'release',
        record.revision + 1,
      );
    } catch (error) {
      this.transitioningRoles.delete(role);
      this._publishRoleState(role, record);
      throw error;
    }
    record.owners.delete(clientId);
    record.revision += 1;
    this._removeUnsyncedOwners(
      record,
      await this._syncRoleRevisions(role, record),
    );
    this.transitioningRoles.delete(role);
    this._publishRoleState(role, record);
    return this._roleResult(role, record);
  }

  private async _electRole(
    role: RoleId,
    record: ServerRole,
    excludedClientIds = new Set<string>(),
  ) {
    for (const clientId of record.candidates) {
      if (excludedClientIds.has(clientId)) continue;
      try {
        await this._claimRoleUnsafe(role, clientId);
        return;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('[PortManager] role auto-election failed', {
          role,
          clientId,
          revision: record.revision + 1,
          error,
        });
      }
    }
  }

  private _isRoleReleaseRejected(error: unknown) {
    return (
      error instanceof RoleReleaseRejectedError ||
      (typeof error === 'object' &&
        error !== null &&
        'name' in error &&
        error.name === 'RoleReleaseRejectedError')
    );
  }

  private _serializeRoleError(error: unknown): RoleError {
    if (error instanceof RoleAggregateError) {
      return {
        name: error.name,
        message: error.message,
        errors: error.errors.map((item) => this._serializeRoleError(item)),
        results: error.results.map(({ reason, ...result }) =>
          reason === undefined
            ? result
            : { ...result, reason: this._serializeRoleError(reason) },
        ),
      } satisfies RoleError;
    }
    if (error instanceof Error) {
      return { name: error.name, message: error.message };
    }
    return { name: 'Error', message: String(error) };
  }

  private async _runRoleLifecycle(
    clientId: string,
    role: RoleId,
    phase: 'acquire' | 'release',
    revision: number,
  ) {
    const deadline = Date.now() + roleDeadline;
    if (clientId === serverRoleOwner) {
      const lifecycle = this.localRoles.get(role)?.lifecycle;
      const callback =
        phase === 'acquire' ? lifecycle?.onAcquire : lifecycle?.onRelease;
      if (!callback) {
        return this._runLocalRoleLifecycle(role, phase, revision, deadline);
      }
      return this._withDeadline(
        this._runLocalRoleLifecycle(role, phase, revision, deadline),
        role,
        deadline,
      );
    }
    const result = await this._withDeadline(
      Promise.resolve(
        fork(
          this,
          '_runLocalRoleLifecycleResult' as never,
          [role, phase, revision, deadline] as never,
          { clientIds: [clientId] },
        ),
      ),
      role,
      deadline,
    );
    return unwrapRoleResult(result as RoleResult<void> | undefined);
  }

  async _runLocalRoleLifecycleResult(
    role: RoleId,
    phase: 'acquire' | 'release',
    revision: number,
    deadline: number,
  ): Promise<RoleResult<void>> {
    try {
      await this._runLocalRoleLifecycle(role, phase, revision, deadline);
      return { ok: true, value: undefined };
    } catch (error) {
      return { ok: false, error: this._serializeRoleError(error) };
    }
  }

  async _executeRoleInvocationResult(
    request: RoleInvocationRequest,
  ): Promise<RoleResult<unknown>> {
    try {
      const module = getRef(this).modules?.[request.module];
      if (!module) {
        throw new Error(`Module '${request.module}' is not registered.`);
      }
      return {
        ok: true,
        value: await this._executeRoleMethod(
          module,
          request.method,
          request.args,
          {
            role: request.role,
            revision: request.revision,
          },
        ),
      };
    } catch (error) {
      return { ok: false, error: this._serializeRoleError(error) };
    }
  }

  async _setLocalRoleRevisionResult(
    role: RoleId,
    revision: number,
  ): Promise<RoleResult<void>> {
    this.localRoleRevisions.set(role, revision);
    return { ok: true, value: undefined };
  }

  private async _syncRoleRevisions(
    role: RoleId,
    record: ServerRole,
  ): Promise<RoleRevisionSyncFailure[]> {
    const deadline = Date.now() + roleDeadline;
    const results = await Promise.all(
      [...record.owners].map(async (clientId) => {
        if (clientId === serverRoleOwner) {
          this.localRoleRevisions.set(role, record.revision);
          return undefined;
        }
        try {
          const result = await this._withDeadline(
            Promise.resolve(
              fork(
                this,
                '_setLocalRoleRevisionResult' as never,
                [role, record.revision] as never,
                { clientIds: [clientId] },
              ),
            ),
            role,
            deadline,
          );
          unwrapRoleResult(result as RoleResult<void> | undefined);
          return undefined;
        } catch (error) {
          return { clientId, error };
        }
      }),
    );
    return results.filter(
      (result): result is RoleRevisionSyncFailure => result !== undefined,
    );
  }

  private _removeUnsyncedOwners(
    record: ServerRole,
    failures: RoleRevisionSyncFailure[],
  ) {
    for (const { clientId } of failures) record.owners.delete(clientId);
  }

  async _runLocalRoleLifecycle(
    role: RoleId,
    phase: 'acquire' | 'release',
    revision: number,
    deadline: number,
  ) {
    const callback =
      phase === 'acquire'
        ? this.localRoles.get(role)?.lifecycle.onAcquire
        : this.localRoles.get(role)?.lifecycle.onRelease;
    await callback?.({ deadline, revision });
    if (phase === 'acquire') {
      this.localRoleRevisions.set(role, revision);
    } else {
      this.localRoleRevisions.delete(role);
    }
  }

  isRoleInvocationCurrent(role: RoleId, revision: number) {
    const systemPolicy = systemRolePolicies.get(role);
    return (
      this.localRoleRevisions.get(role) === revision ||
      (systemPolicy !== undefined && !systemPolicy.mutable && revision === 0)
    );
  }

  private async _resolveRoleOwners(role: RoleId): Promise<string[]> {
    const membership = systemRolePolicies.get(role)?.membership;
    switch (membership) {
      case 'server':
        return [serverRoleOwner];
      case 'clients':
        return [...this.systemClientIds];
      case 'all':
        return [serverRoleOwner, ...this.systemClientIds];
      case 'elected':
        return [...(this.serverRoles.get(role)?.owners ?? [])];
      default:
        return [...(this.serverRoles.get(role)?.owners ?? [])];
    }
  }

  private _getRoleRevision(role: RoleId) {
    const systemPolicy = systemRolePolicies.get(role);
    if (systemPolicy && !systemPolicy.mutable) return 0;
    return this.serverRoles.get(role)?.revision ?? 0;
  }

  private _executeRoleMethod(
    module: object,
    method: string,
    args: unknown[],
    invocation: { readonly role: RoleId; readonly revision: number },
  ) {
    if (!this.isRoleInvocationCurrent(invocation.role, invocation.revision)) {
      throw new RoleFencedError(invocation.role);
    }
    return executeRoleMethod(module, method, args);
  }

  private _roleResult(
    role: RoleId,
    record?: ServerRole,
  ): RoleRegistrationResult {
    return {
      role,
      revision: record?.revision ?? 0,
      owners: [...(record?.owners ?? [])].map((clientId) => ({ clientId })),
    };
  }

  private _validateDomainRole(role: RoleId) {
    if (systemRolePolicies.has(role) || role === 'mainClient')
      throw new Error(`Role '${role}' is reserved.`);
  }

  private _validateRoleDefinition(definition: RoleDefinition) {
    if (
      typeof definition !== 'object' ||
      definition === null ||
      typeof definition.role !== 'string' ||
      !definition.role ||
      typeof definition.allowMultiple !== 'boolean' ||
      typeof definition.autoElect !== 'boolean' ||
      (definition.allowMultiple && definition.autoElect)
    ) {
      throw new Error('Invalid role definition.');
    }
  }

  private _definitionsMatch(
    left: RoleDefinition,
    right: RoleDefinition,
  ): boolean {
    return (
      left.role === right.role &&
      left.allowMultiple === right.allowMultiple &&
      left.autoElect === right.autoElect
    );
  }

  private _restoreSystemClientsFromSnapshot() {
    if (this.systemClientIds.size) return;
    const snapshot = this._getRoleSnapshot(systemRoles.connectedClients.role);
    if (snapshot?.phase !== 'owned') return;
    for (const { clientId } of snapshot.owners) {
      this.systemClientIds.add(clientId);
    }
  }

  private _publishDerivedSystemRoleStates() {
    const clients = [...this.systemClientIds].map((clientId) => ({ clientId }));
    this._setRoleSnapshot({
      phase: 'owned',
      role: systemRoles.server.role,
      revision: 0,
      owners: [{ clientId: serverRoleOwner }],
    });
    this._setRoleSnapshot({
      phase: 'owned',
      role: systemRoles.connectedClients.role,
      revision: 0,
      owners: clients,
    });
    this._setRoleSnapshot({
      phase: 'owned',
      role: systemRoles.all.role,
      revision: 0,
      owners: [{ clientId: serverRoleOwner }, ...clients],
    });
  }

  private _getRoleStateSubject(role: RoleId) {
    let subject = this.roleStateSubjects.get(role);
    if (!subject) {
      const snapshot = this._getRoleSnapshot(role);
      subject = new BehaviorSubject<RoleState>(
        snapshot?.phase === 'owned' || snapshot?.phase === 'unavailable'
          ? snapshot
          : this._unavailableRoleState(role),
      );
      this.roleStateSubjects.set(role, subject);
    }
    return subject;
  }

  private _getRoleTransitionSubject(role: RoleId) {
    let subject = this.roleTransitionSubjects.get(role);
    if (!subject) {
      subject = new BehaviorSubject<RoleState>(
        this._getRoleSnapshot(role) ?? this._unavailableRoleState(role),
      );
      this.roleTransitionSubjects.set(role, subject);
    }
    return subject;
  }

  private _unavailableRoleState(role: RoleId): RoleState {
    return { phase: 'unavailable', role, revision: 0, owners: [] };
  }

  private _getRoleSnapshot(role: RoleId) {
    return (this.shared ? this.roleSnapshots : this.localRoleSnapshots).find(
      (snapshot) => snapshot.role === role,
    );
  }

  private _setRoleSnapshot(state: RoleState) {
    if (this.shared) {
      this._setSharedRoleSnapshot(state);
      return;
    }
    const index = this.localRoleSnapshots.findIndex(
      ({ role }) => role === state.role,
    );
    if (index === -1) {
      this.localRoleSnapshots.push(state);
    } else {
      this.localRoleSnapshots[index] = state;
    }
    this._notifyRoleSnapshot(state);
  }

  @action
  private _setSharedRoleSnapshot(state: RoleState) {
    const current = this.roleSnapshots.find(({ role }) => role === state.role);
    if (current && JSON.stringify(current) === JSON.stringify(state)) return;

    // Role membership is one topology snapshot. Replacing it atomically avoids
    // owner-index patches that cannot be applied to a structurally stale client.
    this.roleSnapshots = current
      ? this.roleSnapshots.map((snapshot) =>
          snapshot.role === state.role ? state : snapshot,
        )
      : [...this.roleSnapshots, state];
  }

  private _notifyRoleSnapshot(snapshot: RoleState) {
    const { role } = snapshot;
    const transitionSubject = this.roleTransitionSubjects.get(role);
    if (
      transitionSubject &&
      JSON.stringify(transitionSubject.value) !== JSON.stringify(snapshot)
    ) {
      transitionSubject.next(snapshot);
    }
    const stateSubject = this.roleStateSubjects.get(role);
    if (
      stateSubject &&
      (snapshot.phase === 'owned' || snapshot.phase === 'unavailable') &&
      JSON.stringify(stateSubject.value) !== JSON.stringify(snapshot)
    ) {
      stateSubject.next(snapshot);
    }
  }

  private _publishTransition(
    role: RoleId,
    record: ServerRole,
    phase: 'acquiring' | 'draining',
    pendingOwnerIds: string[],
  ) {
    const state = {
      phase,
      role,
      revision: record.revision,
      owners:
        phase === 'acquiring'
          ? []
          : [...record.owners].map((clientId) => ({ clientId })),
      pendingOwnerIds,
    } as RoleState;
    this._setRoleSnapshot(state);
  }

  private _publishRoleState(role: RoleId, record: ServerRole) {
    const state: RoleState = record.owners.size
      ? {
          phase: 'owned',
          role,
          revision: record.revision,
          owners: [...record.owners].map((clientId) => ({ clientId })),
        }
      : { phase: 'unavailable', role, revision: record.revision, owners: [] };
    this._setRoleSnapshot(state);
  }

  private async _enqueueRoleOperation<T>(
    role: RoleId,
    operation: () => Promise<T>,
  ): Promise<T> {
    const previous = this.roleOperationQueues.get(role) ?? Promise.resolve();
    let resolveCurrent!: () => void;
    const current = new Promise<void>((resolve) => {
      resolveCurrent = resolve;
    });
    const queue = previous.then(() => current);
    this.roleOperationQueues.set(role, queue);
    await previous;
    try {
      return await operation();
    } finally {
      resolveCurrent();
      if (this.roleOperationQueues.get(role) === queue) {
        this.roleOperationQueues.delete(role);
      }
    }
  }

  private _withDeadline<T>(
    promise: Promise<T>,
    role: RoleId,
    deadline: number,
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new RoleInvocationTimeoutError(role)),
        Math.max(0, deadline - Date.now()),
      );
      promise.then(
        (value) => {
          clearTimeout(timeout);
          resolve(value);
        },
        (error) => {
          clearTimeout(timeout);
          reject(error);
        },
      );
    });
  }
}
