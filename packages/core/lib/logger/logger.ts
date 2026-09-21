import {
  type ITransport,
  type SerializedMessage,
  ConsoleIntegration,
  ConsoleTransport,
  Logger,
  ScriptErrorIntegration,
  StorageTransport,
  TransportInitOptions,
  useLogger,
} from '@ringcentral/mfe-logger';
import { createTransport, type Transport } from 'data-transport';
import { nameKey } from 'reactant';

import { PiiLoggerMiddlewares } from './PiiLoggerMiddlewares';
import {
  ensurePiiDeviceKey,
  getPiiDeviceKeyHex,
  setPiiDeviceKeyFromHex,
} from './piiV2';

export * from './PiiLoggerMiddlewares';
export * from './logSanitizationPolicy';
export * from './piiSanitizer';

const isSharedWorker = !!globalThis.SharedWorkerGlobalScope;

// Window/tab owns localStorage. SharedWorker gets the same key via
// pushPiiDeviceKeyToWorker once the logger client connects.
if (!isSharedWorker) {
  ensurePiiDeviceKey();
}

/**
 * Symbol key for storing singleton logger instance in SharedWorker globalThis.
 * Using Symbol.for() ensures the same symbol is used across different MFE bundles,
 * preventing multiple logger instances from being created in the same SharedWorker.
 */
const SHARED_WORKER_LOGGER_KEY = Symbol.for('__RC_MFE_SHARED_WORKER_LOGGER__');

const SET_PII_DEVICE_KEY_EVENT = 'setPiiDeviceKey';

interface SharedWorkerTransportOptions {
  /**
   * enable transport
   */
  enabled?: boolean;
}

export class SharedWorkerTransport implements ITransport {
  type = 'storage';

  private transport?: Transport;

  constructor(protected _options: SharedWorkerTransportOptions = {}) {
    if (isSharedWorker && this._options.enabled) {
      this.transport = createTransport('SharedWorkerInternal', {
        prefix: 'logger',
      });
      // Window pushes the persistent installation key; without this, worker
      // refs stay ephemeral and cannot correlate with tab-side CRM logs.
      this.transport.listen(SET_PII_DEVICE_KEY_EVENT, (hex: string) => {
        if (typeof hex === 'string') {
          setPiiDeviceKeyFromHex(hex);
        }
      });
    }
  }

  async init() {
    //
  }

  async write({ payload }: SerializedMessage) {
    this.transport?.emit(
      {
        name: 'syncLog',
        respond: false,
      },
      { payload },
    );
  }
}

/**
 * Push the window installation key into the SharedWorker logger runtime.
 * Call once the SharedWorkerClient transport is connected. Never log the hex.
 */
export function pushPiiDeviceKeyToWorker(
  transport: Pick<Transport, 'emit'>,
) {
  transport.emit(
    {
      name: SET_PII_DEVICE_KEY_EVENT,
      respond: false,
    },
    getPiiDeviceKeyHex(),
  );
}

export class MemoryStorage {
  constructor(protected _data: Record<string, any> = {}) {}

  getItem(key: string) {
    return this._data[key];
  }

  setItem(key: string, value: unknown) {
    this._data[key] = value;
  }

  removeItem(key: string) {
    delete this._data[key];
  }
}

const toggleKey = 'RC_MFE_LOGGER';

const LOG_CONFIG_KEY = Symbol.for('__RC_MFE_LOGGER_CONFIG__');

export const DEFAULT_LOGGER_ENABLED = true;

export interface LogConfig {
  /**
   * Max total size of logs persisted by StorageTransport, in bytes.
   */
  maxLogsSize?: number;
}

export const logConfig: LogConfig =
  (globalThis as any)[LOG_CONFIG_KEY] ??
  ((globalThis as any)[LOG_CONFIG_KEY] = {});

export const setLogConfig = (config: LogConfig) => {
  Object.assign(logConfig, config);
};

// if the toggleKey is not set, the logger is enabled by default
export const loggerEnabled =
  globalThis.localStorage?.getItem(toggleKey) === 'true' ||
  (DEFAULT_LOGGER_ENABLED &&
    globalThis.SharedWorkerGlobalScope === undefined &&
    globalThis.localStorage?.getItem(toggleKey) === null);

export const toggleLogger = (enabled: boolean) => {
  globalThis.localStorage?.setItem(toggleKey, String(enabled));
};

export const checkLoggerEnabled = (defaultEnabled: boolean) => {
  if (globalThis.localStorage?.getItem(toggleKey) === null) {
    globalThis.localStorage.setItem(toggleKey, String(defaultEnabled));
  }
};

// add ignore rule here
export const consoleIgnoreRule = [
  'ResizeObserver loop completed with undelivered notifications',
  // !!! Don't add rules lightly unless you explicitly want to ignore the log
];

/**
 * for test only storage to store logs in memory
 */
class TestStorageTransport implements ITransport {
  type = 'storage';

  _data = {
    messages: [] as any[],
  };

  logLevelMap = {
    20: 'debug',
    30: 'info',
    40: 'warn',
    50: 'error',
  } as const;

  init = (options: TransportInitOptions) => {};
  /**
   * BrowserLogger.saveLog / collectSanitizedLogs call queryLogs + zipLogs.
   * Keep this test transport compatible with the real StorageTransport API.
   */
  queryLogs = async ({ name }: { name?: string } = {}) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    const JSZip = require('jszip');
    const zip = new JSZip();
    const logName = name || 'applicationLogs';
    zip.file(`${logName}/recent.log`, 'mock browser log\n');
    return { zip, name: logName };
  };
  zipLogs = async (logZip: {
    generateAsync: (options: object) => Promise<Blob>;
  }) =>
    logZip.generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 9 },
    });
  write(message: SerializedMessage): void {
    const namespace = message.payload.context.namespace as string[];
    const level = message.payload.context.logLevel as number;
    const serviceName = namespace[namespace.length - 1];

    const data = JSON.parse(message.payload.message);

    this._data.messages.push({
      time: message.payload.time,
      data,
    });

    // @ts-ignore
    // eslint-disable-next-line no-console
    console[this.logLevelMap[level]](`[${serviceName}]`, ...data);
  }
  saveDB = () => {};
  getLogs = () => {
    return {
      content: 'mock-content',
      name: 'applicationLogs',
    };
  };
  downloadLogs = () => {};
}

/**
 * Creates the logger instance with proper configuration.
 * In SharedWorker mode, this ensures only one logger instance is created
 * across all MFE bundles to prevent duplicate logs.
 */
function createLoggerInstance(): Logger & {
  create: (module: object) => Logger;
} {
  const sessionId = Math.random().toString(36).substring(2, 10);
  let loggerName = `root-${sessionId}`;

  if (isSharedWorker) {
    // @ts-ignore
    const globalName = globalThis.name;
    const prefix =
      typeof globalName === 'string' ? globalName.split('#')[0] : 'worker';
    loggerName = `${prefix || 'worker'}-${sessionId}`;

    // remove indexedDB old database
    // This is a short-term temporary deletion only to keep the deletion logic clean, and this code is expected to be deleted in Q3 2025.
    // There is no impact on the deleted db.
    globalThis.indexedDB?.deleteDatabase?.('rc-mfe-logs');
    globalThis.indexedDB?.deleteDatabase?.('rc-mfe-log');
  }

  const consoleTransport = new ConsoleTransport({
    enabled: true,
    storage: new MemoryStorage({
      ROARR_LOG: true,
    }),
    // @ts-ignore
    ignoreRule: consoleIgnoreRule,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const logger = useLogger({
    name: loggerName,
    middlewares: [new PiiLoggerMiddlewares()],
    transports: isSharedWorker
      ? [
          consoleTransport,
          new SharedWorkerTransport({
            enabled: true,
          }),
        ]
      : [
          ...(process.env.NODE_ENV === 'test'
            ? [new TestStorageTransport()]
            : [
                consoleTransport,
                new StorageTransport({
                  enabled: true,
                  prefix: 'rc-mfe-logger',
                  get maxLogsSize() {
                    return logConfig.maxLogsSize;
                  },
                }),
              ]),
        ],
    integrations:
      process.env.NODE_ENV === 'test'
        ? []
        : [
            new ScriptErrorIntegration({
              enabled: true,
            }),
            ...(process.env.NODE_ENV === 'production'
              ? [
                  new ConsoleIntegration({
                    enabled: true,
                  }),
                ]
              : []),
          ],
    enabled: isSharedWorker ? isSharedWorker : loggerEnabled,
  }) as Logger & { create: (module: object) => Logger };

  logger.create = (module: object) => {
    const name = Object.getPrototypeOf(module)[nameKey];
    if (!name) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Module name not found');
      }
      return logger;
    }

    if (logger['_logger'].getContext().namespace) {
      return logger.tag(name);
    }
    return logger;
  };

  return logger;
}

/**
 * Get or create the logger instance.
 * In SharedWorker mode, uses a singleton pattern to ensure only one logger
 * instance exists across all MFE bundles, preventing duplicate log entries
 * caused by multiple ConsoleIntegration instances intercepting each other's output.
 */
function getLoggerInstance(): Logger & { create: (module: object) => Logger } {
  if (isSharedWorker) {
    // In SharedWorker mode, check if a singleton logger already exists
    const existingLogger = (globalThis as any)[SHARED_WORKER_LOGGER_KEY];
    if (existingLogger) {
      // Reuse the existing logger instance to prevent duplicate logs
      return existingLogger;
    }

    // Create and store the singleton logger instance
    const newLogger = createLoggerInstance();
    (globalThis as any)[SHARED_WORKER_LOGGER_KEY] = newLogger;
    return newLogger;
  }

  // In non-SharedWorker mode (client), create a new logger instance
  // Each client tab can have its own logger instance
  return createLoggerInstance();
}

/**
 * The logger instance.
 * In SharedWorker mode, this is a singleton shared across all MFE bundles.
 * In client mode, each module import gets its own instance.
 */
const logger = getLoggerInstance();

export { logger };
