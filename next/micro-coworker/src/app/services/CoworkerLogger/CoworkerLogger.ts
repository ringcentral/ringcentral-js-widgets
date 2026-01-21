import { BrowserLogger } from '@ringcentral-integration/micro-core/src/app/services';
import {
  Coworker,
  CoworkerOptions,
  createTransport,
  type ICoworkerOptions,
  inject,
  injectable,
  optional,
  PortManager,
  RcModule,
  SymmetricTransport,
  Transport,
  watch,
} from '@ringcentral-integration/next-core';
import { type SerializedMessage } from '@ringcentral/mfe-logger';

import type { CoworkerLoggerOptions } from './CoworkerLogger.interface';

@injectable({
  name: 'CoworkerLogger',
})
export class CoworkerLogger extends RcModule {
  constructor(
    protected _coworker: Coworker,
    protected _portManager: PortManager,
    @inject(CoworkerOptions) protected _coworkerOptions: ICoworkerOptions,
    protected _browserLogger: BrowserLogger,
    @optional('CoworkerLoggerOptions')
    protected _coworkerLoggerOptions?: CoworkerLoggerOptions,
  ) {
    super();
    this.init();
  }

  private init() {
    if (
      this._browserLogger &&
      !this._coworker.isCoworker &&
      !this._coworker.isMain
    ) {
      this.initializeOnClient();
    }
    if (this._browserLogger && this._portManager.shared) {
      this._portManager.onServer(() => {
        return watch(
          this,
          () => this._browserLogger.enabled,
          (enabled) => {
            this.coworkerTransport.emit(
              {
                name: 'toggleLogger',
                respond: false,
              },
              enabled,
            );
          },
        );
      });
    }

    if (this._coworker.isCoworker) {
      this.coworkerTransport.listen('toggleLogger', (enabled: boolean) => {
        if (enabled) {
          this._browserLogger.enable();
        } else {
          this._browserLogger.disable();
        }
      });
    }
  }

  get coworkerTransport() {
    return this._coworker.transport as SymmetricTransport<{
      toggleLogger: (enabled: boolean) => void;
    }>;
  }

  protected initializeOnClient() {
    if (this._portManager.shared && this._portManager.isWorkerMode) {
      this._portManager.onMainTab(() => {
        this.transport = createTransport('SharedWorkerClient', {
          worker: this._coworkerOptions.worker as SharedWorker,
          prefix: 'logger',
        });
        this.transport.listen('syncLog', (data: SerializedMessage) => {
          this._browserLogger!.storageTransport!.write(data);
        });
      });
    }
  }

  protected transport?: Transport;
}
