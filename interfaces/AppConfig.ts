import type { BrandConfig } from '@ringcentral-integration/commons/modules/Brand';
import type { Dependency } from '@ringcentral/mfe-shared';

type Dependencies = Record<string, Dependency>;

export interface MfeConfig {
  name?: string;
  registryBasePath?: string;
  registry?: string | Record<string, string>;
  dependencies?: Dependencies;
}

export type AppVersion = {
  /**
   * version without build hash, e.g. 22.4.30
   */
  releaseVersion: string;
  /**
   * version info with build hash, e.g. 22.4.30 (1039)
   */
  appVersion: string;
  buildHash: string;
  buildDate?: number;

  channel?: string;

  commitId?: string;
};

type BaseAppConfigSDKConfig = {
  /**
   * rc client id
   */
  clientId: string;
  /**
   * rc client secret
   */
  clientSecret: string;
  /**
   * rc server url
   */
  server: string;
  /**
   * discovery server url
   */
  discoveryServer?: string;
  /**
   * enable discovery
   */
  enableDiscovery?: boolean;
};

/**
 * base app config, our apps always should have SDK,
 *
 * if you not use SDK, you can set generic `SDKExist` to false
 */
export interface BaseAppConfig<SDKExist = true> {
  /**
   * brand config
   */
  brandConfig: BrandConfig;
  /**
   * rc sdk config
   */
  sdkConfig: SDKExist extends true
    ? BaseAppConfigSDKConfig
    : BaseAppConfigSDKConfig | undefined;
  /**
   * segment key
   */
  analyticsKey?: string;
  /**
   * enable IDB
   */
  enableIDB?: boolean;
  /**
   * IDB URL
   */
  loaderBaseUrl?: string;

  /**
   * App version info
   */
  version: AppVersion;

  /**
   * app prefix
   */
  prefix?: string;
  /**
   * app build environment
   */
  environment?: string;
  /**
   * css prefix
   */
  hashPrefix?: string;
  /**
   * MFE config
   */
  mfeConfig?: MfeConfig;
}
