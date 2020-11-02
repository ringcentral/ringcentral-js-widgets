import { Auth } from '../AuthV2';
import ContactMatcher from '../ContactMatcher';

export interface MakeCallOptions {
  fromNumber: string;
  toNumber: string;
  prompt: boolean;
}

export interface RingoutOptions {
  monitorInterval?: number;
  timeBetweenCalls?: number;
}

export interface Deps {
  auth: Auth;
  client: any;
  contactMatcher?: ContactMatcher;
  ringoutOptions?: RingoutOptions;
}
