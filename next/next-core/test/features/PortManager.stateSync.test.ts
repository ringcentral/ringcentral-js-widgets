import {
  applyPatches,
  createSharedApp,
  injectable,
  mockPairTransports,
  PortManager,
  RcViewModule,
  RoleDefinitionMismatchError,
  systemRoles,
} from '../..';
import type { RoleDefinition, RoleId, RoleState } from '../..';

@injectable({ name: 'PortManagerStateSyncView' })
class PortManagerStateSyncView extends RcViewModule {
  constructor(public portManager: PortManager) {
    super();
  }

  component() {
    return null;
  }
}

type SharedAction = {
  _patches?: Parameters<typeof applyPatches>[1];
  params?: [RoleState];
};

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const singletonRole = (role: RoleId): RoleDefinition => ({
  role,
  allowMultiple: false,
  autoElect: false,
});

const multiRole = (role: RoleId): RoleDefinition => ({
  role,
  allowMultiple: true,
  autoElect: false,
});

const expectMismatchTopologyPort = async (
  portManager: PortManager,
  expectedPort: 'client' | 'local',
) => {
  await portManager._registerRole(multiRole('test.coverage.port'), 'owner-a');
  const consoleError = jest.spyOn(console, 'error').mockImplementation();
  try {
    await expect(
      portManager._registerRole(singletonRole('test.coverage.port'), 'owner-b'),
    ).rejects.toBeInstanceOf(RoleDefinitionMismatchError);
    expect(consoleError).toHaveBeenCalledWith(
      '[PortManager] role definition mismatch',
      expect.objectContaining({
        topology: expect.objectContaining({ port: expectedPort }),
      }),
    );
  } finally {
    consoleError.mockRestore();
  }
};

describe('PortManager shared state synchronization', () => {
  it('replaces role topology atomically when a stale client receives a membership update', async () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation();
    const transports = mockPairTransports();
    const app = await createSharedApp({
      main: PortManagerStateSyncView,
      modules: [],
      share: {
        name: 'port-manager-atomic-role-snapshot-sync',
        type: 'Base',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const actions: SharedAction[] = [];
    const unsubscribe = app.store!.subscribe(() => {
      const action = app.instance.portManager.portDetector.lastAction.action;
      if (action) actions.push(clone(action));
    });

    try {
      await app.instance.portManager.systemRolesReady;
      await app.instance.portManager._handleRoleControl(
        'registerSystemClient',
        ['existing-client'],
      );
      const staleClientState = clone(app.store!.getState());
      const connectedClients = staleClientState.PortManager.roleSnapshots.find(
        ({ role }: RoleState) => role === systemRoles.connectedClients.role,
      );
      connectedClients.owners = [];

      await app.instance.portManager._handleRoleControl(
        'registerSystemClient',
        ['new-client'],
      );
      const membershipAction = actions.find(
        ({ params }) =>
          params?.[0].role === systemRoles.connectedClients.role &&
          params[0].owners.length === 2,
      );

      expect(membershipAction?._patches).toHaveLength(1);
      expect(membershipAction?._patches?.[0]).toMatchObject({
        op: 'replace',
        path: ['PortManager', 'roleSnapshots'],
      });
      const syncedRoleSnapshots = applyPatches(
        staleClientState,
        membershipAction?._patches ?? [],
      ).PortManager.roleSnapshots;
      expect(
        syncedRoleSnapshots.find(
          ({ role }: RoleState) => role === systemRoles.connectedClients.role,
        ).owners,
      ).toEqual(membershipAction?.params?.[0].owners);
    } finally {
      unsubscribe();
      app.destroy();
      consoleWarn.mockRestore();
    }
  });

  it('logs client topology when a client port rejects a mismatched role definition', async () => {
    const transports = mockPairTransports();
    const server = await createSharedApp({
      main: PortManagerStateSyncView,
      modules: [],
      share: {
        name: 'port-manager-client-role-mismatch',
        type: 'Base',
        port: 'server',
        transports: { server: transports[0] },
      },
    });
    const client = await createSharedApp({
      main: PortManagerStateSyncView,
      modules: [],
      share: {
        name: 'port-manager-client-role-mismatch',
        type: 'Base',
        port: 'client',
        transports: { client: transports[1] },
      },
    });

    try {
      await client.instance.portManager.systemRolesReady;
      expect(client.instance.portManager.isClient).toBe(true);
      await expectMismatchTopologyPort(client.instance.portManager, 'client');
    } finally {
      client.destroy();
      server.destroy();
    }
  });

  it('logs local topology when a non-shared port rejects a mismatched role definition', async () => {
    const app = await createSharedApp({
      main: PortManagerStateSyncView,
      modules: [],
      share: {
        name: 'port-manager-local-role-mismatch',
        type: 'Base',
      },
    });

    try {
      await app.instance.portManager.systemRolesReady;
      expect(app.instance.portManager.isServer).toBe(false);
      expect(app.instance.portManager.isClient).toBe(false);
      await expectMismatchTopologyPort(app.instance.portManager, 'local');
    } finally {
      app.destroy();
    }
  });
});
