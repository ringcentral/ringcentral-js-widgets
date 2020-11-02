import { Brand } from '../BrandV2';
import ContactMatcher from '../ContactMatcher';

export interface SoftphoneOptions {
  extensionMode?: boolean;
  callHandler?: (...args: any) => any;
}

export interface Deps {
  brand?: Brand;
  contactMatcher?: ContactMatcher;
  softphoneOptions?: SoftphoneOptions;
}
