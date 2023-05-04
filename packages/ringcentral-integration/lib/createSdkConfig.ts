import type { SDKOptions } from '@ringcentral/sdk';

// TODO: Maybe it could not all be optional type, maybe could push sdk auhter to change it
export type SDKConfig = SDKOptions & {
  clientId: SDKOptions['clientId'];
  clientSecret: SDKOptions['clientSecret'];
};

export function createSdkConfig(config: SDKConfig) {
  return config;
}
