import {
  ConsoleTransport,
  StorageTransport,
  useLogger,
  type ITransport,
  type SerializedMessage,
  ScriptErrorIntegration,
  ConsoleIntegration,
} from '@ringcentral/mfe-logger';
import { type Transport, createTransport } from 'reactant-share';

const isSharedWorker = !!global.SharedWorkerGlobalScope;
interface SharedWorkerTransportOptions {
  /**
   * enable transport
   */
  enabled?: boolean;
}

export class SharedWorkerTransport implements ITransport {
  type = 'storage';

  private transport?: Transport;

  constructor(protected _options: SharedWorkerTransportOptions = {}) {}

  async init() {
    if (isSharedWorker && this._options.enabled) {
      this.transport = createTransport('SharedWorkerInternal', {
        prefix: 'logger',
      });
    }
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

export const loggerEnabled = global.localStorage?.getItem(toggleKey) === 'true';

export const toggleLogger = (enabled: boolean) => {
  global.localStorage?.setItem(toggleKey, String(enabled));
};

/**
 * new logger
 */
// eslint-disable-next-line react-hooks/rules-of-hooks
export const loggerV2 = useLogger({
  name: isSharedWorker ? `worker-${Date.now()}` : 'root',
  transports: isSharedWorker
    ? [
        new ConsoleTransport({
          enabled: true,
          storage: new MemoryStorage({
            ROARR_LOG: true,
          }),
        }),
        new SharedWorkerTransport({
          enabled: true,
        }),
      ]
    : [
        ...(process.env.NODE_ENV === 'test'
          ? []
          : [
              new ConsoleTransport({
                enabled: true,
                storage: new MemoryStorage({
                  ROARR_LOG: true,
                }),
              }),
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
});
