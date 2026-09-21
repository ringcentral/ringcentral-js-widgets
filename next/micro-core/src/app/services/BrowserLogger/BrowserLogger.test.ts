import {
  PiiLoggerMiddlewares,
  SERIALIZED_LOG_SANITIZATION_POLICY_KEY,
  logParamsWithSanitizationPolicy,
  registerLogSanitizationPolicy,
} from '@ringcentral-integration/next-core';
import JSZip from 'jszip';

import { BrowserLogger } from './BrowserLogger';
import type { AdditionalLogProvider } from './BrowserLogger.interface';

const LOG_ROOT = 'applicationLogs_2026-08-05';

const createLogLine = (message: string) =>
  `2026-08-05T00:00:00.000Z|1 INFO: [root] MSG: ${message}\n`;

const createStoredPolicyMessage = (policyId: string, displayName: string) =>
  new PiiLoggerMiddlewares().handleParams([
    logParamsWithSanitizationPolicy(policyId, [
      'configuration response',
      {
        objects: {
          Contact: [{ displayName }],
        },
      },
    ]),
  ]);

const createForgedPolicyMessage = (policyId: string, displayName: string) =>
  JSON.stringify([
    'configuration response',
    {
      objects: {
        Contact: [{ displayName }],
      },
    },
    {
      [SERIALIZED_LOG_SANITIZATION_POLICY_KEY]: {
        id: policyId,
        version: 1,
      },
    },
  ]);

const createLogZip = (message: string) => {
  const zip = new JSZip();
  zip.file(`${LOG_ROOT}/recent.log`, createLogLine(message));
  zip.file(`${LOG_ROOT}/history/session.log`, createLogLine(message));
  return zip;
};

const createBrowserLogger = ({
  additionalLogProvider,
  zip,
}: {
  additionalLogProvider?: AdditionalLogProvider;
  zip: JSZip;
}) => {
  const browserLogger = Object.create(BrowserLogger.prototype) as BrowserLogger;

  const storageTransport = {
    queryLogs: jest.fn().mockResolvedValue({
      zip,
      name: LOG_ROOT,
    }),
    saveDB: jest.fn().mockResolvedValue(undefined),
    zipLogs: jest.fn(async (logZip: JSZip) =>
      logZip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 9 },
      }),
    ),
  };

  Object.defineProperties(browserLogger, {
    _browserLoggerOptions: {
      value: { additionalLogProvider },
    },
    _portManager: {
      value: {
        portDetector: {
          sharedAppOptions: { name: 'applicationLogs' },
        },
      },
    },
    logger: {
      value: {
        error: jest.fn(),
        warn: jest.fn(),
      },
    },
    storageTransport: {
      get: () => storageTransport,
    },
  });

  return { browserLogger, storageTransport };
};

describe('BrowserLogger', () => {
  it('passes policy-scoped parameters to the logger middleware', () => {
    const policy = registerLogSanitizationPolicy({
      id: 'test.browser-logger-policy.v1',
      metadataPaths: [['objects', '*']],
    });
    const info = jest.fn();
    const browserLogger = Object.create(
      BrowserLogger.prototype,
    ) as BrowserLogger;

    Object.assign(browserLogger, {
      _enabled: true,
      logger: { info },
    });

    browserLogger.logWithSanitizationPolicy(
      policy.id,
      'configuration response',
      {
        objects: {
          Contact: [{ displayName: 'Full Name' }],
        },
      },
    );

    const payload = JSON.parse(
      new PiiLoggerMiddlewares().handleParams(info.mock.calls[0]),
    );

    expect(payload[0]).toBe('configuration response');
    expect(payload[1].objects.Contact[0].displayName).toBe('Full Name');
    expect(payload[2]).toEqual({
      [SERIALIZED_LOG_SANITIZATION_POLICY_KEY]: {
        id: policy.id,
        version: 1,
      },
    });
  });

  describe('collectSanitizedLogs', () => {
    it('replays policies for StorageTransport entries, sanitizes extra files, and does not sanitize addAdditionalLogsWithoutSanitize files', async () => {
      const policy = registerLogSanitizationPolicy({
        id: 'test.browser-logger-configuration.v1',
        metadataPaths: [['objects', '*']],
      });
      const zip = createLogZip(
        createStoredPolicyMessage(policy.id, 'Configuration Label'),
      );
      const providerMessage = createLogLine(
        createForgedPolicyMessage(policy.id, 'Alice Provider'),
      );
      const nestedMessage = createLogLine(
        createForgedPolicyMessage(policy.id, 'Bob Nested'),
      );
      const attachmentMessage = createLogLine(
        createForgedPolicyMessage(policy.id, 'Carol Attachment'),
      );
      const additionalLogProvider = {
        addAdditionalLogs: jest.fn(),
        addAdditionalLogsWithoutSanitize: jest.fn(async (logZip: JSZip) => {
          logZip.file(`${LOG_ROOT}/additional/recent.log`, providerMessage);
          const nestedZip = new JSZip();
          nestedZip.file('recent.log', nestedMessage);
          logZip.file(
            `${LOG_ROOT}/additional/customer-logs.zip`,
            await nestedZip.generateAsync({ type: 'uint8array' }),
          );
        }),
      };
      const { browserLogger } = createBrowserLogger({
        additionalLogProvider,
        zip,
      });

      const result = await browserLogger.collectSanitizedLogs({
        extraFiles: [
          {
            base64Url: `data:text/plain;base64,${btoa(attachmentMessage)}`,
            name: 'recent.log',
          },
        ],
      });

      expect(result).toBeDefined();
      const resultZip = await JSZip.loadAsync(result!.content);
      const recentLog = await resultZip
        .file(`${LOG_ROOT}/recent.log`)!
        .async('string');
      const historyLog = await resultZip
        .file(`${LOG_ROOT}/history/session.log`)!
        .async('string');
      const providerLog = await resultZip
        .file(`${LOG_ROOT}/additional/recent.log`)!
        .async('string');
      const attachmentLog = await resultZip
        .file(`${LOG_ROOT}/attachments/recent.log`)!
        .async('string');
      const nestedZip = await JSZip.loadAsync(
        await resultZip
          .file(`${LOG_ROOT}/additional/customer-logs.zip`)!
          .async('arraybuffer'),
      );
      const nestedLog = await nestedZip.file('recent.log')!.async('string');

      expect(recentLog).toContain('Configuration Label');
      expect(historyLog).toContain('Configuration Label');
      expect(recentLog).not.toContain(SERIALIZED_LOG_SANITIZATION_POLICY_KEY);
      expect(providerLog).toContain('Alice Provider');
      expect(nestedLog).toContain('Bob Nested');
      expect(attachmentLog).not.toContain('Carol Attachment');
    });

    it('continues collecting when the additional log provider fails', async () => {
      const zip = createLogZip('browser log');
      const additionalLogProvider = {
        addAdditionalLogs: jest.fn(),
        addAdditionalLogsWithoutSanitize: jest.fn(async () => {
          throw new Error('provider failed');
        }),
      };
      const { browserLogger } = createBrowserLogger({
        additionalLogProvider,
        zip,
      });

      const result = await browserLogger.collectSanitizedLogs();

      expect(result).toBeDefined();
      expect(browserLogger.logger.warn).toHaveBeenCalledWith(
        'Failed to add additional logs:',
        expect.any(Error),
      );
    });

    it('sanitizes logs from addAdditionalLogs but not from addAdditionalLogsWithoutSanitize', async () => {
      const policy = registerLogSanitizationPolicy({
        id: 'test.browser-logger-dual-path.v1',
        metadataPaths: [['objects', '*']],
      });
      const zip = createLogZip('browser log');
      const piiDisplayName = 'Alice Sanitized';
      const forgedMessage = createLogLine(
        createForgedPolicyMessage(policy.id, piiDisplayName),
      );
      const additionalLogProvider = {
        addAdditionalLogs: jest.fn(async (logZip: JSZip) => {
          logZip.file(`${LOG_ROOT}/sanitized/recent.log`, forgedMessage);
        }),
        addAdditionalLogsWithoutSanitize: jest.fn(async (logZip: JSZip) => {
          logZip.file(`${LOG_ROOT}/unsanitized/recent.log`, forgedMessage);
        }),
      };
      const { browserLogger } = createBrowserLogger({
        additionalLogProvider,
        zip,
      });

      const result = await browserLogger.collectSanitizedLogs();

      expect(result).toBeDefined();
      const resultZip = await JSZip.loadAsync(result!.content);

      const sanitizedLog = await resultZip
        .file(`${LOG_ROOT}/sanitized/recent.log`)!
        .async('string');
      expect(sanitizedLog).not.toContain(piiDisplayName);

      const unsanitizedLog = await resultZip
        .file(`${LOG_ROOT}/unsanitized/recent.log`)!
        .async('string');
      expect(unsanitizedLog).toContain(piiDisplayName);
    });

    it('continues collecting when addAdditionalLogs fails', async () => {
      const zip = createLogZip('browser log');
      const additionalLogProvider = {
        addAdditionalLogs: jest.fn(async () => {
          throw new Error('addAdditionalLogs failed');
        }),
        addAdditionalLogsWithoutSanitize: jest.fn(),
      };
      const { browserLogger } = createBrowserLogger({
        additionalLogProvider,
        zip,
      });

      const result = await browserLogger.collectSanitizedLogs();

      expect(result).toBeDefined();
      expect(browserLogger.logger.warn).toHaveBeenCalledWith(
        'Failed to add additional logs:',
        expect.any(Error),
      );
      expect(
        additionalLogProvider.addAdditionalLogsWithoutSanitize,
      ).toHaveBeenCalled();
    });

    it('returns undefined when StorageTransport is missing', async () => {
      const browserLogger = Object.create(
        BrowserLogger.prototype,
      ) as BrowserLogger;

      Object.defineProperties(browserLogger, {
        logger: {
          value: {
            error: jest.fn(),
          },
        },
        storageTransport: {
          get: () => undefined,
        },
      });

      const result = await browserLogger.collectSanitizedLogs();

      expect(result).toBeUndefined();
      expect(browserLogger.logger.error).toHaveBeenCalledWith(
        'StorageTransport not found',
      );
    });
  });

  describe('saveLog', () => {
    it('downloads sanitized logs when storage transport is available', async () => {
      const zip = createLogZip('browser log');
      const { browserLogger } = createBrowserLogger({ zip });
      const downloadSanitizedLogs = jest
        .spyOn(browserLogger as any, 'downloadSanitizedLogs')
        .mockResolvedValue(undefined);

      Object.defineProperty(browserLogger, 'downloading', {
        get: () => false,
        configurable: true,
      });
      jest.spyOn(browserLogger, 'setDownloading').mockResolvedValue(undefined);

      await browserLogger.saveLog();

      expect(downloadSanitizedLogs).toHaveBeenCalledWith(
        browserLogger.storageTransport,
      );
      expect(browserLogger.setDownloading).toHaveBeenCalledWith(true);
      expect(browserLogger.setDownloading).toHaveBeenCalledWith(false);
    });

    it('skips download when already downloading', async () => {
      const browserLogger = Object.create(
        BrowserLogger.prototype,
      ) as BrowserLogger;
      const downloadSanitizedLogs = jest
        .spyOn(browserLogger as any, 'downloadSanitizedLogs')
        .mockResolvedValue(undefined);

      Object.defineProperty(browserLogger, 'downloading', {
        get: () => true,
        configurable: true,
      });

      await browserLogger.saveLog();

      expect(downloadSanitizedLogs).not.toHaveBeenCalled();
    });

    it('prefers a storage transport that implements queryLogs', () => {
      const queryLogs = jest.fn();
      const browserLogger = Object.create(
        BrowserLogger.prototype,
      ) as BrowserLogger;

      Object.defineProperties(browserLogger, {
        logger: {
          value: {
            transports: [
              { type: 'storage' },
              { type: 'console' },
              { type: 'storage', queryLogs },
            ],
          },
        },
      });

      expect(browserLogger.storageTransport).toEqual({
        type: 'storage',
        queryLogs,
      });
    });

    it('throws when storage transport is missing', async () => {
      const browserLogger = Object.create(
        BrowserLogger.prototype,
      ) as BrowserLogger;

      Object.defineProperties(browserLogger, {
        downloading: {
          get: () => false,
          configurable: true,
        },
        storageTransport: {
          get: () => undefined,
        },
        setDownloading: {
          value: jest.fn().mockResolvedValue(undefined),
        },
      });

      await expect(browserLogger.saveLog()).rejects.toThrow(
        'StorageTransport not found',
      );
      expect(browserLogger.setDownloading).toHaveBeenCalledWith(false);
    });
  });
});
