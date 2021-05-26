import { Brand } from '../BrandV2';
import { ContactMatcher } from '../ContactMatcherV2';

export interface CallHandlerContext {
  callingMode: string;
  protocol: string;
  command: string;
  uri: string;
  phoneNumber: string;
}

export interface SoftphoneOptions {
  extensionMode?: boolean;
  callHandler?: (context: CallHandlerContext) => any;
}

export interface Deps {
  brand?: Brand;
  contactMatcher?: ContactMatcher;
  softphoneOptions?: SoftphoneOptions;
}
