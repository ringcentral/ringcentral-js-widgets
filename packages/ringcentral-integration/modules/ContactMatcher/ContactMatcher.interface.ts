import { DataMatcherOptions, Deps as BaseDeps } from '../../lib/DataMatcherV2';

export interface Deps extends BaseDeps {
  contactMatcherOptions?: ContactMatcherOptions;
}

export interface ContactMatcherOptions extends DataMatcherOptions {
  //
}
export interface HasMatchNumberOptions {
  phoneNumber: string;
  ignoreCache?: boolean;
}

export interface ForceMatchBatchNumbersOptions {
  phoneNumbers: string[];
}

export interface ForceMatchNumberOptions {
  phoneNumber: string;
}
