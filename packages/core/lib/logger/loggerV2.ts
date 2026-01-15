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
import { type Transport, createTransport, nameKey } from 'reactant-share';

const isSharedWorker = !!globalThis.SharedWorkerGlobalScope;
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

export const DEFAULT_LOGGER_ENABLED = true;

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

const consoleTransport = new ConsoleTransport({
  enabled: true,
  storage: new MemoryStorage({
    ROARR_LOG: true,
  }),
  //@ts-ignore
  ignoreRule: consoleIgnoreRule,
});

const sessionId = Math.random().toString(36).substring(2, 10);

let name = `root-${sessionId}`;

if (isSharedWorker) {
  // @ts-ignore
  const globalName = globalThis.name;
  const prefix =
    typeof globalName === 'string' ? globalName.split('#')[0] : 'worker';
  name = `${prefix || 'worker'}-${sessionId}`;

  // remove indexedDB old database
  // This is a short-term temporary deletion only to keep the deletion logic clean, and this code is expected to be deleted in Q3 2025.
  // There is no impact on the deleted db.
  globalThis.indexedDB?.deleteDatabase?.('rc-mfe-logs');
  globalThis.indexedDB?.deleteDatabase?.('rc-mfe-log');
}

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
 * new logger
 */
// eslint-disable-next-line react-hooks/rules-of-hooks
const loggerV2 = useLogger({
  name,
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

loggerV2.create = (module: object) => {
  const name = Object.getPrototypeOf(module)[nameKey];
  if (!name) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Module name not found');
    }
    return loggerV2;
  }

  if (loggerV2['_logger'].getContext().namespace) {
    return loggerV2.tag(name);
  }
  return loggerV2;
};

export { loggerV2 };
