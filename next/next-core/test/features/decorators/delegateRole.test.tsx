import {
  removeClientIdToServerName,
  syncClientIdToServerName,
} from 'reactant-share';

import {
  createSharedApp,
  delegateRole,
  injectable,
  invokeRole,
  mockPairTransports,
  PortManager,
  RcModule,
  RcViewModule,
  RoleReleaseRejectedError,
  RoleFencedError,
  RoleAggregateError,
  RoleDefinitionMismatchError,
  RoleInvocationTimeoutError,
  RoleUnavailableError,
  roleInvocationMarker,
  systemRoles,
} from '../../..';
import type { RoleDefinition, RoleId } from '../../..';
import { executeRoleMethod } from '../../../src/lib/decorators/delegateRole';
import { createMockLock } from '../../lib/mockLock';

const singletonRole = (role: RoleId): RoleDefinition => ({
  role,
  allowMultiple: false,
  autoElect: false,
});

const autoRole = (role: RoleId): RoleDefinition => ({
  role,
  allowMultiple: false,
  autoElect: true,
});

const multiRole = (role: RoleId): RoleDefinition => ({
  role,
  allowMultiple: true,
  autoElect: false,
});

const testOwnerRole = singletonRole('test.owner');

@injectable({ name: 'RoleCounter' })
class RoleCounter extends RcModule {
  calls = 0;

  systemCalls = 0;

  beforeIncrement?: () => Promise<void>;

  afterIncrement?: () => void;

  @delegateRole(testOwnerRole)
  async increment(value: number) {
    await this.beforeIncrement?.();
    this.calls += value;
    this.afterIncrement?.();
    return this.calls;
  }

  @delegateRole('test.owner')
  async failInvocation() {
    throw new Error('expected role failure');
  }

  @delegateRole(testOwnerRole)
  async neverCompletes() {
    return new Promise<void>(() => {
      // Keep the role invocation pending.
    });
  }

  @delegateRole(systemRoles.server)
  async invokeServer() {
    this.systemCalls += 1;
  }

  @delegateRole(systemRoles.connectedClients)
  async invokeConnectedClients() {
    this.systemCalls += 1;
  }

  @delegateRole(systemRoles.all)
  async invokeAll() {
    this.systemCalls += 1;
  }

  @delegateRole(systemRoles.electedClient)
  async invokeElectedClient() {
    this.systemCalls += 1;
  }
}

@injectable({ name: 'RoleAppView' })
class RoleAppView extends RcViewModule {
  constructor(
    public portManager: PortManager,
    public roleCounter: RoleCounter,
  ) {
    super();
  }

  component() {
    return null;
  }
}

class BaseRoleModule {
  @delegateRole('test.owner')
  async inheritedMethod() {
    return 'inherited';
  }
}

class DerivedRoleModule extends BaseRoleModule {}

describe('delegateRole', () => {
  it('registers a definition and lifecycle only once per instance', async () => {
    const app = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-duplicate-registration',
        type: 'Base',
      },
    });
    const onAcquire = jest.fn();

    try {
      await app.instance.portManager.registerRole(testOwnerRole, {
        onAcquire,
      });
      await expect(
        app.instance.portManager.registerRole(testOwnerRole),
      ).rejects.toThrow("Role 'test.owner' is already registered locally.");
      await app.instance.portManager.claimRole(testOwnerRole.role);
      expect(onAcquire).toHaveBeenCalledTimes(1);
    } finally {
      app.destroy();
    }
  });

  it('retries registration after coordinator acknowledgment fails', async () => {
    const transports = mockPairTransports();
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-registration-retry',
        type: 'Base',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-registration-retry',
        type: 'Base',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    jest
      .spyOn(server.instance.portManager, '_registerRole')
      .mockRejectedValueOnce(new Error('temporary coordinator failure'));

    try {
      await expect(
        client.instance.portManager.registerRole(testOwnerRole),
      ).rejects.toThrow('temporary coordinator failure');
      await expect(
        client.instance.portManager.registerRole(testOwnerRole),
      ).resolves.toMatchObject({ role: testOwnerRole.role });
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('preserves registration when the coordinator acknowledgment is lost', async () => {
    const transports = mockPairTransports();
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-registration-ack-loss',
        type: 'Base',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-registration-ack-loss',
        type: 'Base',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const onAcquire = jest.fn();
    const originalEmit = transports[1].emit.bind(transports[1]);
    jest
      .spyOn(transports[1], 'emit')
      .mockImplementationOnce(async (...args) => {
        await originalEmit(...args);
        throw new Error('registration acknowledgment lost');
      });

    try {
      await expect(
        client.instance.portManager.registerRole(testOwnerRole, { onAcquire }),
      ).rejects.toThrow('registration acknowledgment lost');
      await expect(
        client.instance.portManager.registerRole(testOwnerRole),
      ).resolves.toMatchObject({ role: testOwnerRole.role });
      await client.instance.portManager.claimRole(testOwnerRole.role);
      expect(onAcquire).toHaveBeenCalledTimes(1);
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('synchronizes roles named after object prototype properties', async () => {
    const transports = mockPairTransports();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-prototype-names',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-prototype-names',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;

    try {
      for (const role of ['constructor', 'toString', '__proto__']) {
        const states: string[] = [];
        const subscription = client.instance.portManager
          .getRoleStateStreams(role)
          .roleTransition$.subscribe((state) => states.push(state.phase));

        await client.instance.portManager.registerRole(singletonRole(role));
        await server.instance.portManager.registerRole(singletonRole(role));
        await server.instance.portManager.claimRole(role);

        expect(states).toEqual(expect.arrayContaining(['acquiring', 'owned']));
        subscription.unsubscribe();
      }
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('synchronizes role transitions to non-owner clients', async () => {
    const transports = mockPairTransports();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-observer',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-observer',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;
    const clientStates: string[] = [];
    const subscription = client.instance.portManager
      .getRoleStateStreams('test.owner')
      .roleTransition$.subscribe((state) => {
        clientStates.push(`${state.phase}:${state.owners.length}`);
      });

    try {
      await client.instance.portManager.registerRole(testOwnerRole);
      await server.instance.portManager.registerRole(testOwnerRole);
      await server.instance.portManager.claimRole('test.owner');

      expect(clientStates).toEqual(
        expect.arrayContaining(['acquiring:0', 'owned:1']),
      );
    } finally {
      subscription.unsubscribe();
      client.destroy();
      server.destroy();
    }
  });

  it('elects an electedClient owner during SharedWorker startup', async () => {
    const transports = mockPairTransports();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-elected-startup',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-elected-startup',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;
    const clientId = client.instance.portManager.clientId!;
    await Promise.all([
      server.instance.portManager.systemRolesReady,
      client.instance.portManager.systemRolesReady,
    ]);

    try {
      expect(
        server.instance.portManager.getRoleStateStreams('electedClient')
          .roleState$.value,
      ).toMatchObject({ phase: 'owned', owners: [{ clientId }] });
      expect(
        client.instance.portManager.getRoleStateStreams('electedClient')
          .roleState$.value,
      ).toMatchObject({ phase: 'owned', owners: [{ clientId }] });
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('owns electedClient in standalone Base mode', async () => {
    const app = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-elected-base',
        type: 'Base',
      },
    });
    await app.instance.portManager.systemRolesReady;

    try {
      expect(
        app.instance.portManager.getRoleStateStreams('electedClient').roleState$
          .value,
      ).toMatchObject({
        phase: 'owned',
        owners: [{ clientId: '__SERVER__' }],
      });
      await app.instance.roleCounter.invokeElectedClient();
      expect(app.instance.roleCounter.systemCalls).toBe(1);
      expect(
        app.instance.portManager.getRoleStateStreams(systemRoles.server.role)
          .roleState$.value,
      ).toMatchObject({
        phase: 'owned',
        revision: 0,
        owners: [{ clientId: '__SERVER__' }],
      });
      expect(
        app.instance.portManager.getRoleStateStreams(
          systemRoles.connectedClients.role,
        ).roleState$.value,
      ).toMatchObject({ phase: 'owned', revision: 0, owners: [] });
      expect(
        app.instance.portManager.getRoleStateStreams(systemRoles.all.role)
          .roleState$.value,
      ).toMatchObject({
        phase: 'owned',
        revision: 0,
        owners: [{ clientId: '__SERVER__' }],
      });
      await expect(
        invokeRole(app.instance.roleCounter, 'invokeConnectedClients', [], {
          role: systemRoles.connectedClients.role,
          collectResults: true,
        }),
      ).resolves.toEqual([]);
      expect(app.instance.roleCounter.systemCalls).toBe(1);
    } finally {
      app.destroy();
    }
  });

  it('emits standalone Base role transitions without mutating prior values', async () => {
    const app = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-base-transitions',
        type: 'Base',
      },
    });
    await app.instance.portManager.systemRolesReady;

    const { roleState$, roleTransition$ } =
      app.instance.portManager.getRoleStateStreams(testOwnerRole.role);
    const states: string[] = [];
    const transitions: string[] = [];
    const stateSubscription = roleState$.subscribe(({ phase }) =>
      states.push(phase),
    );
    const transitionSubscription = roleTransition$.subscribe(({ phase }) =>
      transitions.push(phase),
    );

    try {
      await app.instance.portManager.registerRole(testOwnerRole);
      await app.instance.portManager.claimRole(testOwnerRole.role);
      await app.instance.portManager.releaseRole(testOwnerRole.role);

      expect(states).toEqual(['unavailable', 'owned', 'unavailable']);
      expect(transitions).toEqual([
        'unavailable',
        'acquiring',
        'owned',
        'draining',
        'unavailable',
      ]);
    } finally {
      stateSubscription.unsubscribe();
      transitionSubscription.unsubscribe();
      app.destroy();
    }
  });

  it('routes to a claimed SharedWorker client and rejects after release', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;
    const stableStates: string[] = [];
    const transitionStates: string[] = [];
    const stableSubscription = server.instance.portManager
      .getRoleStateStreams('test.owner')
      .roleState$.subscribe((state) => stableStates.push(state.phase));
    const transitionSubscription = server.instance.portManager
      .getRoleStateStreams('test.owner')
      .roleTransition$.subscribe((state) => transitionStates.push(state.phase));

    try {
      await mockLock(client);
      const registration =
        await client.instance.portManager.registerRole(
          autoRole('test.owner'),
        );

      await expect(
        server.instance.roleCounter.increment(2),
      ).resolves.toBeUndefined();
      expect(client.instance.roleCounter.calls).toBe(2);
      await server.instance.roleCounter.invokeElectedClient();
      expect(client.instance.roleCounter.systemCalls).toBe(1);
      expect(stableStates).toEqual(['unavailable', 'owned']);
      expect(transitionStates).toContain('acquiring');

      await client.instance.portManager.releaseRole('test.owner');
      await expect(
        server.instance.roleCounter.increment(1),
      ).rejects.toBeInstanceOf(RoleUnavailableError);
      await expect(
        Reflect.apply(
          client.instance.roleCounter.increment,
          client.instance.roleCounter,
          [
            1,
            {
              marker: roleInvocationMarker,
              role: 'test.owner',
              revision: registration.revision,
            },
          ],
        ),
      ).rejects.toBeInstanceOf(RoleFencedError);
    } finally {
      stableSubscription.unsubscribe();
      transitionSubscription.unsubscribe();
      client.destroy();
      server.destroy();
    }
  });

  it('collects results from every multi-owner snapshot', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-multi',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-multi',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;

    try {
      await mockLock(client);
      await server.instance.portManager.registerRole(multiRole('test.owner'));
      await server.instance.portManager.claimRole('test.owner');
      await client.instance.portManager.registerRole(multiRole('test.owner'));
      await client.instance.portManager.claimRole('test.owner');

      await expect(
        invokeRole(client.instance.roleCounter, 'increment', [1], {
          role: 'test.owner',
          completion: 'local',
        }),
      ).resolves.toBe(1);
      expect(server.instance.roleCounter.calls).toBe(1);
      expect(client.instance.roleCounter.calls).toBe(1);

      await expect(
        invokeRole(server.instance.roleCounter, 'increment', [1], {
          role: 'test.owner',
          collectResults: true,
        }),
      ).resolves.toEqual([
        { clientId: '__SERVER__', status: 'fulfilled', value: 2 },
        expect.objectContaining({ status: 'fulfilled', value: 2 }),
      ]);
      await expect(
        invokeRole(server.instance.roleCounter, 'failInvocation', [], {
          role: 'test.owner',
          collectResults: true,
        }),
      ).rejects.toMatchObject({
        name: RoleAggregateError.name,
        results: [
          expect.objectContaining({ status: 'rejected' }),
          expect.objectContaining({ status: 'rejected' }),
        ],
      });
      await expect(
        invokeRole(server.instance.roleCounter, 'failInvocation', [], {
          role: 'test.owner',
          firstFailure: true,
        }),
      ).rejects.toThrow('expected role failure');
      const clientFailure = await client.instance.roleCounter
        .failInvocation()
        .catch((error) => error);
      expect(clientFailure).toBeInstanceOf(RoleAggregateError);
      expect((clientFailure as RoleAggregateError).errors).toEqual([
        expect.objectContaining({ message: 'expected role failure' }),
        expect.objectContaining({ message: 'expected role failure' }),
      ]);
      expect(clientFailure).toMatchObject({
        results: [
          expect.objectContaining({ status: 'rejected' }),
          expect.objectContaining({ status: 'rejected' }),
        ],
      });
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('dispatches peers without waiting for them under local completion', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-local-completion',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-local-completion',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;
    let releasePeer!: () => void;
    let notifyPeerFinished!: () => void;
    const peerBlocked = new Promise<void>((resolve) => {
      releasePeer = resolve;
    });
    const peerFinished = new Promise<void>((resolve) => {
      notifyPeerFinished = resolve;
    });

    try {
      await mockLock(client);
      await server.instance.portManager.registerRole(multiRole('test.owner'));
      await server.instance.portManager.claimRole('test.owner');
      await client.instance.portManager.registerRole(multiRole('test.owner'));
      await client.instance.portManager.claimRole('test.owner');
      server.instance.roleCounter.beforeIncrement = () => peerBlocked;
      server.instance.roleCounter.afterIncrement = notifyPeerFinished;

      await expect(
        invokeRole(client.instance.roleCounter, 'increment', [1], {
          role: 'test.owner',
          completion: 'local',
        }),
      ).resolves.toBe(1);
      expect(client.instance.roleCounter.calls).toBe(1);
      expect(server.instance.roleCounter.calls).toBe(0);

      releasePeer();
      await peerFinished;
      expect(server.instance.roleCounter.calls).toBe(1);

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      try {
        let notifyPeerAttempted!: () => void;
        const peerAttempted = new Promise<void>((resolve) => {
          notifyPeerAttempted = resolve;
        });
        server.instance.roleCounter.beforeIncrement = async () => {
          notifyPeerAttempted();
          throw new Error('expected peer failure');
        };

        await expect(
          invokeRole(client.instance.roleCounter, 'increment', [1], {
            role: 'test.owner',
            completion: 'local',
          }),
        ).resolves.toBe(2);
        await peerAttempted;
        expect(server.instance.roleCounter.calls).toBe(1);
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          '[PortManager] role peer invocation failed',
          expect.objectContaining({
            role: 'test.owner',
            clientId: '__SERVER__',
            error: expect.objectContaining({
              message: 'expected peer failure',
            }),
          }),
        );
      } finally {
        consoleErrorSpy.mockRestore();
      }
    } finally {
      releasePeer();
      client.destroy();
      server.destroy();
    }
  });

  it('revokes an owner that cannot acknowledge a multi-owner revision', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-revision-sync',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-revision-sync',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;

    try {
      await mockLock(client);
      await server.instance.portManager.registerRole(multiRole('test.owner'));
      await server.instance.portManager.claimRole('test.owner');
      await client.instance.portManager.registerRole(multiRole('test.owner'));
      const coordinator = server.instance.portManager as unknown as {
        _syncRoleRevisions: jest.Mock;
      };
      jest
        .spyOn(coordinator, '_syncRoleRevisions')
        .mockResolvedValue([
          { clientId: '__SERVER__', error: new Error('revision sync failed') },
        ]);

      await expect(
        client.instance.portManager.claimRole('test.owner'),
      ).resolves.toMatchObject({
        owners: [expect.objectContaining({ clientId: expect.any(String) })],
      });
      await server.instance.roleCounter.increment(1);
      expect(client.instance.roleCounter.calls).toBe(1);
      expect(
        server.instance.portManager.getRoleStateStreams('test.owner').roleState$
          .value,
      ).toMatchObject({
        phase: 'owned',
        owners: [expect.objectContaining({ clientId: expect.any(String) })],
      });
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('rejects and revokes a claimant that cannot acknowledge its revision', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-claimant-sync',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-claimant-sync',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;

    try {
      await mockLock(client);
      await server.instance.portManager.registerRole(multiRole('test.owner'));
      await server.instance.portManager.claimRole('test.owner');
      await client.instance.portManager.registerRole(multiRole('test.owner'));
      const clientId = client.instance.portManager.clientId!;
      const coordinator = server.instance.portManager as unknown as {
        _syncRoleRevisions: jest.Mock;
      };
      jest
        .spyOn(coordinator, '_syncRoleRevisions')
        .mockResolvedValue([
          { clientId, error: new Error('claimant revision sync failed') },
        ]);

      await expect(
        client.instance.portManager.claimRole('test.owner'),
      ).rejects.toThrow('claimant revision sync failed');
      expect(
        server.instance.portManager.getRoleStateStreams('test.owner').roleState$
          .value,
      ).toMatchObject({
        phase: 'owned',
        owners: [{ clientId: '__SERVER__' }],
      });
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('settles release cleanup when a surviving owner cannot synchronize', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-release-sync',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-release-sync',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;

    try {
      await mockLock(client);
      await server.instance.portManager.registerRole(multiRole('test.owner'));
      await server.instance.portManager.claimRole('test.owner');
      await client.instance.portManager.registerRole(multiRole('test.owner'));
      await client.instance.portManager.claimRole('test.owner');
      const clientId = client.instance.portManager.clientId!;
      const coordinator = server.instance.portManager as unknown as {
        _syncRoleRevisions: jest.Mock;
      };
      const syncSpy = jest
        .spyOn(coordinator, '_syncRoleRevisions')
        .mockResolvedValue([
          { clientId, error: new Error('survivor revision sync failed') },
        ]);

      await expect(
        server.instance.portManager.releaseRole('test.owner'),
      ).resolves.toMatchObject({ owners: [] });
      expect(
        server.instance.portManager.getRoleStateStreams('test.owner').roleState$
          .value,
      ).toMatchObject({ phase: 'unavailable', owners: [] });

      syncSpy.mockRestore();
      await expect(
        client.instance.portManager.claimRole('test.owner'),
      ).resolves.toMatchObject({
        owners: [{ clientId }],
      });
      await server.instance.roleCounter.increment(1);
      expect(client.instance.roleCounter.calls).toBe(1);
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('publishes disconnect cleanup when the survivor cannot synchronize', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-disconnect-sync',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-disconnect-sync',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;
    let clientDestroyed = false;

    try {
      await mockLock(client);
      await server.instance.portManager.registerRole(multiRole('test.owner'));
      await server.instance.portManager.claimRole('test.owner');
      await client.instance.portManager.registerRole(multiRole('test.owner'));
      await client.instance.portManager.claimRole('test.owner');
      const coordinator = server.instance.portManager as unknown as {
        _syncRoleRevisions: jest.Mock;
      };
      jest.spyOn(coordinator, '_syncRoleRevisions').mockResolvedValue([
        {
          clientId: '__SERVER__',
          error: new Error('survivor revision sync failed'),
        },
      ]);
      const unavailable = new Promise<void>((resolve) => {
        const subscription = server.instance.portManager
          .getRoleStateStreams('test.owner')
          .roleState$.subscribe((state) => {
            if (state.phase !== 'unavailable') return;
            subscription.unsubscribe();
            resolve();
          });
      });

      const clientId = client.instance.portManager.clientId!;
      expect(
        server.instance.portManager.getRoleStateStreams(
          systemRoles.connectedClients.role,
        ).roleState$.value,
      ).toMatchObject({ owners: [{ clientId }] });
      transports[1].emit(
        { name: syncClientIdToServerName, respond: false },
        clientId,
      );
      transports[1].emit(
        { name: removeClientIdToServerName, respond: false },
        clientId,
      );
      await unavailable;
      expect(
        server.instance.portManager.getRoleStateStreams('test.owner').roleState$
          .value,
      ).toMatchObject({ phase: 'unavailable', owners: [] });
      expect(
        server.instance.portManager.getRoleStateStreams(
          systemRoles.connectedClients.role,
        ).roleState$.value,
      ).toMatchObject({ phase: 'owned', revision: 0, owners: [] });
      expect(
        server.instance.portManager.getRoleStateStreams(systemRoles.all.role)
          .roleState$.value,
      ).toMatchObject({
        phase: 'owned',
        revision: 0,
        owners: [{ clientId: '__SERVER__' }],
      });
      client.destroy();
      clientDestroyed = true;
    } finally {
      if (!clientDestroyed) client.destroy();
      server.destroy();
    }
  });

  it('keeps a singleton owner when release rejects takeover', async () => {
    const transports = mockPairTransports();
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-takeover',
        type: 'Base',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-takeover',
        type: 'Base',
        port: 'client',
        transports: { client: transports[1] },
      },
    });

    try {
      await server.instance.portManager.registerRole(testOwnerRole, {
        onRelease: () => {
          throw new RoleReleaseRejectedError('test.owner');
        },
      });
      await server.instance.portManager.claimRole('test.owner');
      await client.instance.portManager.registerRole(testOwnerRole);

      await expect(
        client.instance.portManager.claimRole('test.owner'),
      ).rejects.toBeInstanceOf(RoleReleaseRejectedError);
      await expect(
        server.instance.roleCounter.increment(1),
      ).resolves.toBeUndefined();
      expect(server.instance.roleCounter.calls).toBe(1);
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('routes explicit Base system roles through its sticky server', async () => {
    const transports = mockPairTransports();
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-system',
        type: 'Base',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-system',
        type: 'Base',
        port: 'client',
        transports: { client: transports[1] },
      },
    });

    try {
      await server.instance.roleCounter.invokeServer();
      await server.instance.roleCounter.invokeConnectedClients();
      await server.instance.roleCounter.invokeAll();
      await server.instance.roleCounter.invokeElectedClient();
      await client.instance.roleCounter.invokeServer();
      await client.instance.roleCounter.invokeConnectedClients();
      await client.instance.roleCounter.invokeAll();
      await expect(
        client.instance.portManager.claimRole('electedClient'),
      ).rejects.toThrow();
      await server.instance.roleCounter.invokeElectedClient();

      expect(server.instance.roleCounter.systemCalls).toBe(6);
      expect(client.instance.roleCounter.systemCalls).toBe(4);
      expect(
        server.instance.portManager.getRoleStateStreams('electedClient')
          .roleState$.value,
      ).toMatchObject({
        phase: 'owned',
        owners: [{ clientId: '__SERVER__' }],
      });
      expect(
        server.instance.portManager.getRoleStateStreams(
          systemRoles.connectedClients.role,
        ).roleState$.value,
      ).toMatchObject({
        phase: 'owned',
        revision: 0,
        owners: [{ clientId: client.instance.portManager.clientId }],
      });
      expect(
        server.instance.portManager.getRoleStateStreams(systemRoles.all.role)
          .roleState$.value,
      ).toMatchObject({
        phase: 'owned',
        revision: 0,
        owners: [
          { clientId: '__SERVER__' },
          { clientId: client.instance.portManager.clientId },
        ],
      });
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('rejects reserved IDs and mismatched definitions', async () => {
    const transports = mockPairTransports();
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-validation',
        type: 'Base',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-validation',
        type: 'Base',
        port: 'client',
        transports: { client: transports[1] },
      },
    });

    try {
      await expect(
        server.instance.portManager.registerRole(systemRoles.server),
      ).rejects.toThrow("Role 'server' is reserved.");
      await server.instance.portManager.registerRole(multiRole('test.owner'));
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => undefined);
      await expect(
        client.instance.portManager.registerRole(testOwnerRole),
      ).rejects.toBeInstanceOf(RoleDefinitionMismatchError);
      await expect(
        client.instance.portManager.claimRole('test.owner'),
      ).rejects.toBeInstanceOf(RoleDefinitionMismatchError);
      await expect(
        client.instance.portManager.registerRole(testOwnerRole),
      ).rejects.toThrow("Role 'test.owner' is already registered locally.");
      expect(consoleError).toHaveBeenCalledWith(
        '[PortManager] role definition mismatch',
        expect.objectContaining({
          role: 'test.owner',
          acceptedDefinition: multiRole('test.owner'),
          receivedDefinition: testOwnerRole,
          participantId: client.instance.portManager.clientId,
        }),
      );
      consoleError.mockRestore();
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('moves SharedTab system roles to a promoted server', async () => {
    const transports = mockPairTransports();
    const promotionTransports = mockPairTransports();
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-shared-tab',
        type: 'SharedTab',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-shared-tab',
        type: 'SharedTab',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    await Promise.all([
      server.instance.portManager.systemRolesReady,
      client.instance.portManager.systemRolesReady,
    ]);

    try {
      const initialRevision = server.instance.portManager.getRoleStateStreams(
        systemRoles.electedClient.role,
      ).roleState$.value.revision;
      expect(
        server.instance.portManager.getRoleStateStreams(
          systemRoles.electedClient.role,
        ).roleState$.value,
      ).toMatchObject({
        owners: [{ clientId: '__SERVER__' }],
      });

      const promoted = new Promise<void>((resolve) => {
        const subscription = client.instance.portManager
          .getRoleStateStreams(systemRoles.electedClient.role)
          .roleState$.subscribe((state) => {
            if (
              state.phase !== 'owned' ||
              state.revision <= initialRevision ||
              state.owners[0]?.clientId !== '__SERVER__'
            ) {
              return;
            }
            subscription.unsubscribe();
            resolve();
          });
      });
      client.instance.portManager.portDetector.transform(
        'server',
        promotionTransports[1],
      );
      await promoted;

      await client.instance.roleCounter.invokeElectedClient();
      expect(client.instance.roleCounter.systemCalls).toBe(1);
      expect(
        client.instance.portManager.getRoleStateStreams(systemRoles.server.role)
          .roleState$.value,
      ).toMatchObject({
        phase: 'owned',
        revision: 0,
        owners: [{ clientId: '__SERVER__' }],
      });
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('executes an inherited role-decorated method', async () => {
    await expect(
      executeRoleMethod(new DerivedRoleModule(), 'inheritedMethod', []),
    ).resolves.toBe('inherited');
  });

  it('serializes concurrent singleton claims', async () => {
    const transports = mockPairTransports();
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-concurrent',
        type: 'Base',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-concurrent',
        type: 'Base',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    let releases = 0;

    try {
      await server.instance.portManager.registerRole(testOwnerRole, {
        onRelease: () => {
          releases += 1;
        },
      });
      await server.instance.portManager.claimRole('test.owner');
      await client.instance.portManager.registerRole(testOwnerRole);

      await Promise.all([
        client.instance.portManager.claimRole('test.owner'),
        client.instance.portManager.claimRole('test.owner'),
      ]);

      expect(releases).toBe(1);
      await server.instance.roleCounter.increment(1);
      expect(client.instance.roleCounter.calls).toBe(1);
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('does not route work while a singleton owner drains', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-draining',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-draining',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;
    let allowRelease!: () => void;
    let notifyDraining!: () => void;
    const draining = new Promise<void>((resolve) => {
      notifyDraining = resolve;
    });
    const release = new Promise<void>((resolve) => {
      allowRelease = resolve;
    });

    try {
      await mockLock(client);
      await server.instance.portManager.registerRole(testOwnerRole, {
        onRelease: async () => {
          notifyDraining();
          await release;
        },
      });
      await server.instance.portManager.claimRole('test.owner');
      await client.instance.portManager.registerRole(testOwnerRole);

      const claim = client.instance.portManager.claimRole('test.owner');
      await draining;
      await expect(
        server.instance.roleCounter.increment(1),
      ).rejects.toBeInstanceOf(RoleUnavailableError);

      allowRelease();
      await claim;
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('publishes unavailable after takeover acquisition fails', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-failed-acquire',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-failed-acquire',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;

    try {
      await mockLock(client);
      await server.instance.portManager.registerRole(testOwnerRole);
      await server.instance.portManager.claimRole('test.owner');
      await client.instance.portManager.registerRole(testOwnerRole, {
        onAcquire: () => {
          throw new Error('acquire failed');
        },
      });

      await expect(
        client.instance.portManager.claimRole('test.owner'),
      ).rejects.toThrow('acquire failed');
      await expect(
        server.instance.roleCounter.increment(1),
      ).rejects.toBeInstanceOf(RoleUnavailableError);
      expect(
        server.instance.portManager.getRoleStateStreams('test.owner').roleState$
          .value,
      ).toMatchObject({ phase: 'unavailable', owners: [] });
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('preserves a remote owner when it rejects takeover', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-remote-rejection',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-remote-rejection',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;

    try {
      await mockLock(client);
      await client.instance.portManager.registerRole(testOwnerRole, {
        onRelease: () => {
          throw new RoleReleaseRejectedError('test.owner');
        },
      });
      await client.instance.portManager.claimRole('test.owner');
      await server.instance.portManager.registerRole(testOwnerRole);

      await expect(
        server.instance.portManager.claimRole('test.owner'),
      ).rejects.toBeInstanceOf(RoleReleaseRejectedError);
      await server.instance.roleCounter.increment(1);
      expect(client.instance.roleCounter.calls).toBe(1);
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('rejects an incomplete role invocation at the coordinator deadline', async () => {
    jest.useFakeTimers();
    const transports = mockPairTransports();
    const app = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-timeout',
        type: 'Base',
        port: 'server',
        transports: { server: transports[0] },
      },
    });

    try {
      await app.instance.portManager.registerRole(testOwnerRole);
      await app.instance.portManager.claimRole('test.owner');
      const invocation = app.instance.roleCounter.neverCompletes();
      const failure = invocation.catch((error) => error);
      await jest.advanceTimersByTimeAsync(65_000);
      expect(await failure).toBeInstanceOf(RoleInvocationTimeoutError);
    } finally {
      app.destroy();
      jest.useRealTimers();
    }
  });

  it('keeps Base domain roles behind ownership and aggregation', async () => {
    const transports = mockPairTransports();
    const app = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-base-domain',
        type: 'Base',
        port: 'server',
        transports: { server: transports[0] },
      },
    });

    try {
      await expect(
        app.instance.roleCounter.increment(1),
      ).rejects.toBeInstanceOf(RoleUnavailableError);
      await app.instance.portManager.registerRole(testOwnerRole);
      await app.instance.portManager.claimRole('test.owner');

      const failure = await app.instance.roleCounter
        .failInvocation()
        .catch((error) => error);
      expect(failure).toBeInstanceOf(RoleAggregateError);
      expect(failure).toMatchObject({
        results: [expect.objectContaining({ status: 'rejected' })],
      });
    } finally {
      app.destroy();
    }
  });

  it('re-elects another candidate after an auto-elected takeover fails', async () => {
    const transports = mockPairTransports();
    const mockLock = createMockLock();
    const clientPromise = createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-auto-recovery',
        type: 'SharedWorker',
        port: 'client',
        transports: { client: transports[1] },
      },
    });
    const server = await createSharedApp({
      main: RoleAppView,
      modules: [RoleCounter],
      share: {
        name: 'delegate-role-auto-recovery',
        type: 'SharedWorker',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await clientPromise;

    try {
      await mockLock(client);
      await server.instance.portManager.registerRole(autoRole('test.owner'));
      await client.instance.portManager.registerRole(autoRole('test.owner'), {
        onAcquire: () => {
          throw new Error('client acquire failed');
        },
      });

      await expect(
        client.instance.portManager.claimRole('test.owner'),
      ).rejects.toThrow('client acquire failed');
      await server.instance.roleCounter.increment(1);
      expect(server.instance.roleCounter.calls).toBe(1);
      expect(
        server.instance.portManager.getRoleStateStreams('test.owner').roleState$
          .value,
      ).toMatchObject({
        phase: 'owned',
        owners: [{ clientId: '__SERVER__' }],
      });
    } finally {
      client.destroy();
      server.destroy();
    }
  });
});
