const PERSON_NAME_MARKER_REGEX =
  /^fromName=\[PII:v2;person-name;A\. S\.;[A-Z2-7]{13}\]$/;

describe('logger', () => {
  const LOG_CONFIG_KEY = Symbol.for('__RC_MFE_LOGGER_CONFIG__');

  let MockUseLogger: jest.Mock;
  let MockConsoleTransport: jest.Mock;
  let MockStorageTransport: jest.Mock;
  let MockScriptErrorIntegration: jest.Mock;
  let MockConsoleIntegration: jest.Mock;

  beforeEach(() => {
    delete (globalThis as any)[LOG_CONFIG_KEY];

    MockUseLogger = jest.fn().mockImplementation(() => ({
      tag: jest.fn(),
    }));
    MockConsoleTransport = jest.fn();
    MockStorageTransport = jest.fn();
    MockScriptErrorIntegration = jest.fn();
    MockConsoleIntegration = jest.fn();

    jest.mock('@ringcentral/mfe-logger', () => ({
      ConsoleTransport: MockConsoleTransport,
      StorageTransport: MockStorageTransport,
      useLogger: MockUseLogger,
      ScriptErrorIntegration: MockScriptErrorIntegration,
      ConsoleIntegration: MockConsoleIntegration,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    delete (globalThis as any)[LOG_CONFIG_KEY];
  });

  it('should create a logger with the correct configuration when on sharedWorker mode', async () => {
    process.env.NODE_ENV = 'development';
    global.SharedWorkerGlobalScope = true as any;

    await import('../../lib/logger/logger');
    const { MemoryStorage } = await import('../../lib/logger/logger');
    const { SharedWorkerTransport } = await import('../../lib/logger/logger');

    // Assertions
    const { name, transports, integrations, enabled, middlewares } =
      MockUseLogger.mock.calls[0][0];

    expect(name).toEqual(expect.stringContaining('worker-'));
    expect(enabled).toBe(true);
    expect(
      JSON.parse(middlewares[0].handleParams(['fromName=Alice Smith']))[0],
    ).toMatch(PERSON_NAME_MARKER_REGEX);
    const mockTransport = [
      new MockConsoleTransport({
        enabled: true,
        storage: new MemoryStorage({
          ROARR_LOG: true,
        }),
      }),
      new SharedWorkerTransport({
        enabled: true,
      }),
    ];
    transports[1].transport.id = mockTransport[1].transport.id;
    expect(JSON.stringify(transports)).toEqual(JSON.stringify(mockTransport));
    expect(integrations).toEqual([
      new MockScriptErrorIntegration({
        enabled: true,
      }),
    ]);
    expect(MockScriptErrorIntegration).toHaveBeenCalledWith({
      enabled: true,
    });
  });

  it('should create a logger with the correct configuration when not on sharedWorker mode', async () => {
    process.env.NODE_ENV = 'production';
    global.SharedWorkerGlobalScope = false as any;

    await import('../../lib/logger/logger');
    const { MemoryStorage } = await import('../../lib/logger/logger');

    const { name, transports, integrations, enabled, middlewares } =
      MockUseLogger.mock.calls[0][0];

    expect(/^root-/.test(name)).toBe(true);
    expect(enabled).toBe(false);
    expect(
      JSON.parse(middlewares[0].handleParams(['fromName=Alice Smith']))[0],
    ).toMatch(PERSON_NAME_MARKER_REGEX);
    expect(transports).toEqual([
      new MockConsoleTransport({
        enabled: true,
        storage: new MemoryStorage({
          ROARR_LOG: true,
        }),
      }),
      new MockStorageTransport({
        enabled: true,
      }),
    ]);
    expect(integrations).toEqual([
      new MockScriptErrorIntegration({
        enabled: true,
      }),
      new MockConsoleIntegration({
        enabled: true,
      }),
    ]);
    // Assertions
    expect(MockConsoleTransport).toHaveBeenCalledWith({
      enabled: true,
      storage: expect.any(MemoryStorage),
    });
    expect(MockScriptErrorIntegration).toHaveBeenCalledWith({
      enabled: true,
    });
    expect(MockConsoleIntegration).toHaveBeenCalledWith({
      enabled: true,
    });
  });

  it('should apply log config maxLogsSize to storage transport', async () => {
    process.env.NODE_ENV = 'production';
    global.SharedWorkerGlobalScope = false as any;

    const { setLogConfig } = await import('../../lib/logger/logger');
    const storageTransportOptions = MockStorageTransport.mock.calls[0][0];
    const maxLogsSize = 9.5 * 1024 * 1024;

    expect(storageTransportOptions.maxLogsSize).toBeUndefined();

    setLogConfig({ maxLogsSize });

    expect(storageTransportOptions.maxLogsSize).toBe(maxLogsSize);
  });
});

describe('MemoryStorage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('check MemoryStorage module get/set/remove functionality', async () => {
    const { MemoryStorage } = await import('../../lib/logger/logger');
    const storage = new MemoryStorage({
      name: 'test-name',
    });
    expect(storage.getItem('name')).toBe('test-name');
    expect(storage.getItem('nothing')).toBeUndefined();
    storage.setItem('name', 'new-name');
    expect(storage.getItem('name')).toBe('new-name');
    storage.removeItem('name');
    expect(storage.getItem('name')).toBeUndefined();
  });
});

describe('SharedWorkerTransport', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('check SharedWorkerTransport module functionality', async () => {
    const mockTransport = {
      emit: jest.fn(),
      listen: jest.fn(),
    };
    const payload = { version: '1.0.0' };
    const mockCreateTransport = jest.fn().mockReturnValue(mockTransport);

    global.SharedWorkerGlobalScope = true as any;

    jest.mock('data-transport', () => ({
      __esModule: true,
      ...jest.requireActual('data-transport'),
      createTransport: mockCreateTransport,
    }));

    const { SharedWorkerTransport } = await import('../../lib/logger/logger');
    const transport = new SharedWorkerTransport({ enabled: true });

    expect(mockCreateTransport).toHaveBeenCalledWith('SharedWorkerInternal', {
      prefix: 'logger',
    });
    await transport.init();
    transport.write({ payload, message: 'test' });
    expect(mockTransport.emit).toHaveBeenCalledWith(
      {
        name: 'syncLog',
        respond: false,
      },
      { payload },
    );
  });
});

describe('SharedWorker singleton behavior', () => {
  const SHARED_WORKER_LOGGER_KEY = Symbol.for(
    '__RC_MFE_SHARED_WORKER_LOGGER__',
  );

  beforeEach(() => {
    // Clean up the singleton before each test
    delete (globalThis as any)[SHARED_WORKER_LOGGER_KEY];
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    // Clean up the singleton after each test
    delete (globalThis as any)[SHARED_WORKER_LOGGER_KEY];
    delete (global as any).SharedWorkerGlobalScope;
  });

  it('should reuse existing logger instance in SharedWorker mode', async () => {
    const MockUseLogger = jest.fn().mockImplementation(() => ({
      tag: jest.fn(),
    }));

    jest.mock('@ringcentral/mfe-logger', () => ({
      ConsoleTransport: jest.fn(),
      StorageTransport: jest.fn(),
      useLogger: MockUseLogger,
      ScriptErrorIntegration: jest.fn(),
      ConsoleIntegration: jest.fn(),
    }));

    global.SharedWorkerGlobalScope = true as any;

    // First import - should create a new logger
    const { logger: logger1 } = await import('../../lib/logger/logger');
    expect(MockUseLogger).toHaveBeenCalledTimes(1);

    // Reset modules but keep the global singleton
    jest.resetModules();

    // Re-mock after reset
    jest.mock('@ringcentral/mfe-logger', () => ({
      ConsoleTransport: jest.fn(),
      StorageTransport: jest.fn(),
      useLogger: MockUseLogger,
      ScriptErrorIntegration: jest.fn(),
      ConsoleIntegration: jest.fn(),
    }));

    // Second import - should reuse the existing logger (singleton)
    const { logger: logger2 } = await import('../../lib/logger/logger');

    // useLogger should still only have been called once (from the first import)
    // because the second import reuses the singleton
    expect(MockUseLogger).toHaveBeenCalledTimes(1);

    // Both imports should return the same logger instance
    expect(logger1).toBe(logger2);
  });

  it('should create new logger instances in non-SharedWorker mode', async () => {
    const MockUseLogger = jest.fn().mockImplementation(() => ({
      tag: jest.fn(),
    }));

    jest.mock('@ringcentral/mfe-logger', () => ({
      ConsoleTransport: jest.fn(),
      StorageTransport: jest.fn(),
      useLogger: MockUseLogger,
      ScriptErrorIntegration: jest.fn(),
      ConsoleIntegration: jest.fn(),
    }));

    // Not in SharedWorker mode
    global.SharedWorkerGlobalScope = undefined as any;

    // First import
    const { logger: logger1 } = await import('../../lib/logger/logger');
    expect(MockUseLogger).toHaveBeenCalledTimes(1);

    // Reset modules
    jest.resetModules();

    // Re-mock after reset
    jest.mock('@ringcentral/mfe-logger', () => ({
      ConsoleTransport: jest.fn(),
      StorageTransport: jest.fn(),
      useLogger: MockUseLogger,
      ScriptErrorIntegration: jest.fn(),
      ConsoleIntegration: jest.fn(),
    }));

    // Second import - should create a new logger in non-SharedWorker mode
    const { logger: logger2 } = await import('../../lib/logger/logger');

    // useLogger should have been called twice (once for each import)
    expect(MockUseLogger).toHaveBeenCalledTimes(2);

    // In non-SharedWorker mode, each import creates a new instance
    expect(logger1).not.toBe(logger2);
  });
});
