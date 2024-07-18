describe('loggerV2', () => {
  let MockUseLogger: jest.Mock;
  let MockConsoleTransport: jest.Mock;
  let MockStorageTransport: jest.Mock;
  let MockScriptErrorIntegration: jest.Mock;
  let MockConsoleIntegration: jest.Mock;

  beforeEach(() => {
    MockUseLogger = jest.fn();
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
  });

  it('should create a logger with the correct configuration when on sharedWorker mode', async () => {
    process.env.NODE_ENV = 'development';
    global.SharedWorkerGlobalScope = true as any;

    await import('../../lib/logger/loggerV2');
    const { MemoryStorage } = await import('../../lib/logger/loggerV2');
    const { SharedWorkerTransport } = await import('../../lib/logger/loggerV2');

    // Assertions
    const { name, transports, integrations, enabled } =
      MockUseLogger.mock.calls[0][0];

    expect(name).toEqual(expect.stringContaining('worker-'));
    expect(enabled).toBe(true);
    expect(transports).toEqual([
      new MockConsoleTransport({
        enabled: true,
        storage: new MemoryStorage({
          ROARR_LOG: true,
        }),
      }),
      new SharedWorkerTransport({
        enabled: true,
      }),
    ]);
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

    await import('../../lib/logger/loggerV2');
    const { MemoryStorage } = await import('../../lib/logger/loggerV2');

    const { name, transports, integrations, enabled } =
      MockUseLogger.mock.calls[0][0];

    expect(name).toBe('root');
    expect(enabled).toBe(false);
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
});

describe('MemoryStorage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('check MemoryStorage module get/set/remove functionality', async () => {
    const { MemoryStorage } = await import('../../lib/logger/loggerV2');
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
    };
    const payload = { version: '1.0.0' };
    const mockCreateTransport = jest.fn().mockReturnValue(mockTransport);

    global.SharedWorkerGlobalScope = true as any;

    jest.mock('reactant-share', () => ({
      __esModule: true,
      ...jest.requireActual('reactant-share'),
      createTransport: mockCreateTransport,
    }));

    const { SharedWorkerTransport } = await import('../../lib/logger/loggerV2');
    const transport = new SharedWorkerTransport({ enabled: true });

    transport.init();
    expect(mockCreateTransport).toHaveBeenCalledWith('SharedWorkerInternal', {
      prefix: 'logger',
    });
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
