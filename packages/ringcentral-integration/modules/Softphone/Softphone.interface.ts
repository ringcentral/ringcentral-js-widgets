import { Brand } from '../Brand';
import { ContactMatcher } from '../ContactMatcherV2';

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
}

export interface Deps {
  brand: Brand;
  contactMatcher?: ContactMatcher;
  softphoneOptions?: SoftphoneOptions;
}
