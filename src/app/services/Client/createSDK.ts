import { removeSDKNonISO8859Chars } from '@ringcentral-integration/core';
import type { BrandConfig } from '@ringcentral-integration/micro-core/src/app/services';
import { SDK, type SDKOptions } from '@ringcentral/sdk';

/**
 * Creates an instance of the RingCentral SDK with the provided configuration and brand information.
 *
 * This function ensures that the SDK configuration is sanitized for non-ISO8859 characters and applies
 * the correct brandId based on the provided brand configuration.
 *
 * https://wiki_domain/display/Arch/Entry+Point+Discovery
 *  If a client is designed to work with multiple brands it MUST NOT send any brandId when calling Discovery API if the user account it is going to work with is still unknown.
 *  The only case when brandId MAY BE sent is when the app is designed for some particular (partner) brand only and cannot work with accounts from other brands.
 *
 * @param {SDKOptions} sdkConfig - The configuration options for the RingCentral SDK.
 * @param {BrandConfig | undefined} brandConfig - The brand configuration, used to set the brandId. If the brand code is 'rc', brandId will be undefined.
 * @returns {SDK} An instance of the RingCentral SDK initialized with the given configuration.
 */
export const createSDK = (
  sdkConfig: SDKOptions,
  brandConfig: BrandConfig | undefined,
): SDK => {
  const config = removeSDKNonISO8859Chars(sdkConfig);

  if (brandConfig) {
    config.brandId =
      // when code be rc, always not set brandId, because rc is a partner brand login
      brandConfig.code === 'rc' ? undefined : brandConfig.id;
  }

  return new SDK(config);
};
