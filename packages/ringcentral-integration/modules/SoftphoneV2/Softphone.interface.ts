import { Brand } from '../Brand';
import { ContactMatcher } from '../ContactMatcherV2';
import { AccountInfo } from '../AccountInfoV2';
import { DynamicConfig } from '../DynamicConfig';

export interface CallUriInfo {
  command: string;
  isJupiterUniversalLink: boolean;
  protocol: string;
  uri: string;
}

export type CallHandlerContext = CallUriInfo & {
  callingMode: string;
  phoneNumber: string;
};

export interface SoftphoneOptions {
  /**
   * whether it is in extension mode, default is false
   */
  extensionMode?: boolean;
  /**
   * whether to use universal link in callingMode.jupiter, default is only for partner brands.
   */
  useJupiterUniversalLink?: boolean;
  /**
   *
   */
  callHandler?: (context: CallHandlerContext) => any;
  /**
   * Use brand config for Softphone
   */
  useBrandedJupiter?: boolean;
}

export interface Deps {
  brand?: Brand;
  contactMatcher?: ContactMatcher;
  accountInfo?: AccountInfo;
  dynamicConfig?: DynamicConfig;
  softphoneOptions?: SoftphoneOptions;
}
