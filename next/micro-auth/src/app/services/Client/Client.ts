import type { SDKConfig as SdkConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import { multipartHttpRequest } from '@ringcentral-integration/commons/lib/multipartHttpRequest';
import { type BrandConfig } from '@ringcentral-integration/micro-core/src/app/services';
import {
  delegate,
  Initiator,
  inject,
  injectable,
  optional,
  PortManager,
} from '@ringcentral-integration/next-core';
import type { SDK, SDKOptions } from '@ringcentral/sdk';
import localforage from 'localforage';
import { Client as RingCentralClient } from 'ringcentral-client';
import PathSegment from 'ringcentral-client/build/PathSegment';
import Account from 'ringcentral-client/build/paths/Account';
import ClientInfo from 'ringcentral-client/build/paths/ClientInfo';
import Dictionary from 'ringcentral-client/build/paths/Dictionary';
import Glip from 'ringcentral-client/build/paths/Glip';
import NumberParser from 'ringcentral-client/build/paths/NumberParser';
import Subscription from 'ringcentral-client/build/paths/Subscription';

import type { ClientOptions } from './Client.interface';
import { createSDK } from './createSDK';

// TODO: make 'ringcentral-client' support JS SDK v4 or replace it
class RestPrefix extends PathSegment {
  constructor(service: SDK) {
    super('restapi/v1.0', undefined, undefined, service);
  }
}

export const createStorage = (prefix?: string) => {
  // TODO: fix type
  // Support Async Storage interface in ExternalsOptions
  // Issue: https://github.com/ringcentral/ringcentral-js/issues/275
  return (prefix
    ? localforage.createInstance({ name: prefix })
    : localforage) as any as Storage;
};

/**
 * RingCentral Client wrapper class for SDK interactions.
 * Manages SDK service and platform operations.
 *
 * @class
 */
@injectable({
  name: 'Client',
})
export class Client extends RingCentralClient {
  private _throwError?: () => void;

  /**
   * Handles multipart HTTP requests to the RingCentral platform.
   * Simplifies file uploads and multipart data submissions.
   */
  multipart = multipartHttpRequest(this.service.platform());

  protected _discoveryPromise: Promise<void> | null = null;

  constructor(
    protected _portManager: PortManager,
    protected _initiator: Initiator,
    @inject('SdkConfig') protected _sdkConfig: SdkConfig,
    @optional('ClientOptions') protected _clientOptions?: ClientOptions,
    @optional('BrandConfig') protected _brandConfig?: BrandConfig,
    @optional('Prefix') protected prefix?: string,
  ) {
    super(
      _clientOptions?.sdk ??
        createSDK(
          {
            ..._sdkConfig,
            localStorage: _sdkConfig.localStorage ?? createStorage(prefix),
          },
          _brandConfig,
        ),
    );
    if (
      process.env.NODE_ENV !== 'production' &&
      this._portManager.shared &&
      this._portManager.isWorkerMode &&
      this._portManager.isClient
    ) {
      const throwError = () => {
        throw new Error(
          `RingCentralClient is not available on the tab in 'SharedWorker' mode`,
        );
      };
      this._throwError = throwError;
      this.service = new Proxy(
        {},
        {
          get() {
            throwError();
          },
        },
      );
    }

    //#region migration storage
    const migrationStorageKey = 'app:MemoryStorage';
    this._initiator.onInitialize(async () => {
      const platformKey = this.service.cache()._prefixKey('platform');
      const storage = this.service.externals().localStorage;
      const data: any = await storage.getItem(migrationStorageKey);
      if (data && Object.keys(data).length > 0) {
        for (const key in data) {
          if (key === platformKey) {
            await storage.setItem(key, data[key]);
          }
        }
        await storage.removeItem(migrationStorageKey);
      }
    });
    //#endregion

    this._clientOptions?.init?.(this.service);
  }

  restPrefix() {
    if (process.env.NODE_ENV !== 'production') {
      this._throwError?.();
    }
    return new RestPrefix(this.service.platform());
  }

  /**
   * Gets an account API path segment for making account-related API requests.
   *
   * @param {string} [id] - Optional account ID
   * @returns {Account} Account API path segment
   */
  override account(id?: string): Account {
    if (process.env.NODE_ENV !== 'production') {
      this._throwError?.();
    }
    return new Account(this.restPrefix(), id, this.service.platform());
  }

  /**
   * Gets a client info API path segment for accessing client information.
   *
   * @param {string} [id] - Optional client ID
   * @returns {ClientInfo} Client info API path segment
   */
  override clientInfo(id?: string): ClientInfo {
    if (process.env.NODE_ENV !== 'production') {
      this._throwError?.();
    }
    return new ClientInfo(this.restPrefix(), id, this.service.platform());
  }

  /**
   * Gets a dictionary API path segment for accessing localization dictionaries.
   *
   * @param {string} [id] - Optional dictionary ID
   * @returns {Dictionary} Dictionary API path segment
   */
  override dictionary(id?: string): Dictionary {
    if (process.env.NODE_ENV !== 'production') {
      this._throwError?.();
    }
    return new Dictionary(this.restPrefix(), id, this.service.platform());
  }

  /**
   * Gets a number parser API path segment for parsing and formatting phone numbers.
   *
   * @param {string} [id] - Optional number parser ID
   * @returns {NumberParser} Number parser API path segment
   */
  override numberParser(id?: string): NumberParser {
    if (process.env.NODE_ENV !== 'production') {
      this._throwError?.();
    }
    return new NumberParser(this.restPrefix(), id, this.service.platform());
  }

  override subscription(id?: string): Subscription {
    if (process.env.NODE_ENV !== 'production') {
      this._throwError?.();
    }
    return new Subscription(this.restPrefix(), id, this.service.platform());
  }

  override glip(id?: string) {
    if (process.env.NODE_ENV !== 'production') {
      this._throwError?.();
    }
    return new Glip(this.restPrefix(), id, this.service.platform());
  }

  /**
   * Changes the SDK configuration with new settings.
   *
   * @param {SDKOptions} sdkConfig - New SDK configuration options
   */
  @delegate('server')
  async setService(sdkConfig: SDKOptions) {
    this.service = createSDK(
      {
        ...sdkConfig,
        localStorage: sdkConfig.localStorage ?? createStorage(this.prefix),
      },
      this._brandConfig,
    );
  }

  /**
   * Sets the platform redirect URI if not already set.
   * Used for OAuth authentication flows.
   *
   * @param {string} redirectUri - URI to redirect after authentication
   */
  @delegate('server')
  async confirmRedirectUri(redirectUri: string) {
    if (!this.service.platform()._redirectUri) {
      this.service.platform()._redirectUri = redirectUri;
    }
  }

  /**
   * Ensures login URL uses discovery API when applicable.
   * Initializes discovery API for environment detection.
   */
  @delegate('server')
  async checkLoginUrlWithDiscovery() {
    if (this.service.platform().discovery()) {
      await this.service.platform().loginUrlWithDiscovery();
    }
  }
}
