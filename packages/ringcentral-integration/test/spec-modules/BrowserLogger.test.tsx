import { toggleLogger } from '@ringcentral-integration/core/lib/logger/loggerV2';

import { BrowserLogger } from '../../modules/BrowserLogger';

jest.mock('@ringcentral-integration/core', () => ({
  __esModule: true,
  ...jest.requireActual('@ringcentral-integration/core'),
  action: jest.fn(),
  state: jest.fn(),
  globalStorage: jest.fn(),
}));
jest.mock('@ringcentral-integration/core/lib/logger/loggerV2', () => ({
  ...jest.requireActual('@ringcentral-integration/core/lib/logger/loggerV2'),
  toggleLogger: jest.fn(),
}));

describe('BrowserLogger', () => {
  let browserLogger: BrowserLogger;
  const mockStorageTransport = {
    downloadLogs: jest.fn(),
  };
  const browserLoggerOptions = {
    enabled: true,
    logger: {
      enable: jest.fn(),
      disable: jest.fn(),
      log: jest.fn(),
      transports: {
        find: () => mockStorageTransport,
      },
    },
  };
  const mockGlobalStorage = jest.fn();

  beforeEach(() => {
    browserLogger = new BrowserLogger({
      globalStorage: mockGlobalStorage,
      prefix: 'test',
      browserLoggerOptions,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('check logger', async () => {
    expect(browserLogger.logger).toBe(browserLoggerOptions.logger);
    expect(browserLogger.logger.transports.find()).toBe(mockStorageTransport);
  });

  it('should enable logger when enabled is true', async () => {
    browserLogger.enabled = false;
    await browserLogger.enable();
    expect(browserLogger.enabled).toBe(true);
    expect(toggleLogger).toHaveBeenCalledWith(true);
  });

  it('should disable logger when enabled is false', async () => {
    browserLogger.enabled = true;
    await browserLogger.disable();
    expect(browserLogger.enabled).toBe(false);
    expect(toggleLogger).toHaveBeenCalledWith(false);
  });

  it('should downloadLogs when has storageTransport', async () => {
    await browserLogger.saveLog();
    expect(mockStorageTransport.downloadLogs).toHaveBeenCalledWith({
      name: 'test',
    });
  });
});
