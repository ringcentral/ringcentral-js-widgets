import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import { Client } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Coworker,
  inject,
  injectable,
  optional,
  RcModule,
  Root,
  SymmetricTransport,
} from '@ringcentral-integration/next-core';

import type { CoworkerAuthOptions } from './CoworkerAuth.interface';

type ProxyAuthInteraction = {
  refreshToken: () => Promise<void>;
};
@injectable({
  name: 'CoworkerAuth',
})
export class CoworkerAuth extends RcModule {
  constructor(
    protected _coworker: Coworker,
    protected _client: Client,
    protected _root: Root,
    @inject('SdkConfig') private _sdkConfig: SDKConfig,
    @optional('CoworkerAuthOptions')
    protected _coworkerAuthOptions?: CoworkerAuthOptions,
  ) {
    super();
    if (this._coworker.isCoworker) {
      this.initializeInWorker();
    }
    if (this._coworker.isMain) {
      this.initializeInMain();
    }
  }

  private initializeInMain() {
    this.transport.listen('refreshToken', async () => {
      await this._client.service.platform().refresh();
    });
  }

  private initializeInWorker() {
    const storage = this._sdkConfig.localStorage;
    if (!storage) return;
    const platform = this._client.service.platform();
    // source: https://github.com/tylerlong/rc-js-sdk-no-auto-refresh-token-demo/blob/main/src/index.ts
    platform.ensureLoggedIn = async () => {
      const accessTokenValid = await platform.auth().accessTokenValid();
      if (!accessTokenValid) {
        // trigger refresh token in main shared worker
        await this.transport.emit('refreshToken');
      }
    };
  }

  get transport() {
    return this._coworker.transport as SymmetricTransport<ProxyAuthInteraction>;
  }
}
