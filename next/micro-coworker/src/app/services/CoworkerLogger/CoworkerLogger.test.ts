import { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import { BrowserLogger } from '@ringcentral-integration/micro-core/src/app/services';
import {
  CoworkerOptions,
  ICoworkerOptions,
  Initiator,
  PortManager,
  SharedAppOptions,
  testBed,
} from '@ringcentral-integration/next-core';
import { SharedWorkerClientTransport } from 'reactant-share';
import { firstValueFrom, Subject } from 'rxjs';

import { CoworkerLogger } from './CoworkerLogger';

describe('CoworkerLogger', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should listen for toggleLogger event and enable/disable browserLogger on coworker', () => {
    const coworkerTransport = {
      listen: jest.fn(),
    };
    jest
      .spyOn(CoworkerLogger.prototype, 'coworkerTransport', 'get')
      .mockReturnValue(coworkerTransport as never);

    const app = testBed({
      modules: [
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'SharedWorker',
            coworker: {
              isCoworker: true,
            },
          },
        },
        {
          provide: CoworkerOptions,
          useValue: {
            isCoworker: true,
            useModules: [],
          } as ICoworkerOptions,
        },
        {
          provide: 'Prefix',
          useValue: 'prefix-',
        },
        {
          provide: 'SdkConfig',
          useFactory: () =>
            ({
              clientId: 'Bj3NT8EzS7xxxxx',
              cachePrefix: 'custom-prefix-',
              clientSecret: 'xxxxxxxx',
            } satisfies SDKConfig),
        },
      ],
      main: CoworkerLogger,
    });
    expect(coworkerTransport.listen).toHaveBeenCalledWith(
      'toggleLogger',
      expect.any(Function),
    );
    const browserLogger = app.container.get(BrowserLogger);
    jest.spyOn(browserLogger, 'enable');
    jest.spyOn(browserLogger, 'disable');
    const toggleLoggerCallback = coworkerTransport.listen.mock.calls[0][1];
    toggleLoggerCallback(true);
    expect(browserLogger.enable).toHaveBeenCalled();

    toggleLoggerCallback(false);
    expect(browserLogger.disable).toHaveBeenCalled();

    app.destroy();
  });

  test('should initialize on client when browserLogger is available and not a coworker or main', async () => {
    const next$ = new Subject<void>();
    jest.spyOn(CoworkerLogger.prototype, 'initializeOnClient' as never);

    const original = CoworkerLogger.prototype['init'];
    jest
      .spyOn(CoworkerLogger.prototype, 'init' as never)
      // @ts-ignore
      .mockImplementation(async function () {
        await firstValueFrom(next$);

        original.bind(this)();
      });

    const app = testBed({
      modules: [
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'SharedWorker',
            port: 'client',
            coworker: {
              isCoworker: false,
            },
          },
        },
        {
          provide: CoworkerOptions,
          useValue: {
            isCoworker: false,
            worker: {
              port: {
                addEventListener: jest.fn(),
                start: jest.fn(),
                postMessage: jest.fn(),
              },
              addEventListener: jest.fn(),
            },
            useModules: [],
          },
        },
        {
          provide: 'Prefix',
          useValue: 'prefix-',
        },
        {
          provide: 'SdkConfig',
          useFactory: () =>
            ({
              clientId: 'Bj3NT8EzS7i4zzzzz',
              cachePrefix: 'custom-prefix-',
              clientSecret: 'edoKIzzzzzz',
            } satisfies SDKConfig),
        },
      ],
      main: CoworkerLogger,
    });

    const portManager = app.container.get(PortManager);
    const coworkerLogger = app.container.get(CoworkerLogger);

    jest.spyOn(portManager, 'onMainTab');
    next$.next();
    await Promise.resolve();
    expect(CoworkerLogger.prototype['initializeOnClient']).toHaveBeenCalled();
    expect(portManager.onMainTab).toHaveBeenCalled();

    const onMainTabSpy = jest.mocked(portManager.onMainTab).mock.calls[0][0];
    expect(onMainTabSpy).toBeInstanceOf(Function);

    expect(coworkerLogger['transport']).toBeUndefined();

    jest.spyOn(SharedWorkerClientTransport.prototype, 'listen');

    onMainTabSpy(null as never);

    expect(coworkerLogger['transport']).toBeDefined();
    expect(SharedWorkerClientTransport.prototype.listen).toHaveBeenCalled();

    const listenSpy = jest.mocked(SharedWorkerClientTransport.prototype.listen);

    expect(listenSpy).toHaveBeenCalledWith(
      'sharedworker-connect',
      expect.any(Function),
    );
    expect(listenSpy).toHaveBeenCalledWith('syncLog', expect.any(Function));

    const syncLogSpy = listenSpy.mock.calls[1][1];
    expect(syncLogSpy).toBeInstanceOf(Function);

    const writeSpy = jest.fn();
    jest
      .spyOn(BrowserLogger.prototype, 'storageTransport', 'get')
      .mockReturnValue({
        write: writeSpy,
      } as any);

    syncLogSpy('example');

    expect(writeSpy).toHaveBeenCalledWith('example');

    expect(coworkerLogger.coworkerTransport).toBeUndefined();

    app.destroy();
  });

  test('should emit toggleLogger event when be shared mode', async () => {
    const coworkerTransport = {
      listen: jest.fn(),
      emit: jest.fn(),
    };
    jest
      .spyOn(CoworkerLogger.prototype, 'coworkerTransport', 'get')
      .mockReturnValue(coworkerTransport as never);

    const next$ = new Subject<void>();
    jest.spyOn(CoworkerLogger.prototype, 'initializeOnClient' as never);

    const original = CoworkerLogger.prototype['init'];
    jest
      .spyOn(CoworkerLogger.prototype, 'init' as never)
      // @ts-ignore
      .mockImplementation(async function () {
        await firstValueFrom(next$);

        original.bind(this)();
      });

    const app = testBed({
      modules: [
        {
          provide: SharedAppOptions,
          useValue: {
            name: 'internal-test',
            type: 'SharedWorker',
            port: 'client',
            coworker: {
              isCoworker: false,
            },
          },
        },
        {
          provide: CoworkerOptions,
          useValue: {
            isCoworker: false,
            worker: {
              port: {
                addEventListener: jest.fn(),
                start: jest.fn(),
              },
              addEventListener: jest.fn(),
            },
            useModules: [],
          },
        },
        Initiator,
        {
          provide: 'Prefix',
          useValue: 'prefix-',
        },
        {
          provide: 'SdkConfig',
          useValue: {
            clientId: 'Bj3NT8xxxx',
            cachePrefix: 'custom-prefix-',
            clientSecret: 'edoKIN8xxxxxx',
          } satisfies SDKConfig,
        },
      ],
      main: CoworkerLogger,
    });

    const portManager = app.container.get(PortManager);
    const browserLogger = app.container.get(BrowserLogger);

    jest.spyOn(portManager, 'onServer');
    next$.next();
    await Promise.resolve();
    expect(portManager.onServer).toHaveBeenCalled();

    const onServerTabSpy = jest.mocked(portManager.onServer).mock.calls[0][0];
    const destroy = onServerTabSpy(null as never);

    browserLogger['_disable']();
    await Promise.resolve();

    expect(coworkerTransport.emit).toHaveBeenCalledWith(
      {
        name: 'toggleLogger',
        respond: false,
      },
      false,
    );

    browserLogger['_enable']();
    await Promise.resolve();

    expect(coworkerTransport.emit).toHaveBeenCalledWith(
      {
        name: 'toggleLogger',
        respond: false,
      },
      true,
    );

    expect(destroy).toBeInstanceOf(Function);

    app.destroy();
  });
});
