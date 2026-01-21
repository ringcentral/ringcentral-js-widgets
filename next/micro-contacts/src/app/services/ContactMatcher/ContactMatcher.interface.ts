import type { DataMatcherOptions } from '@ringcentral-integration/commons/lib/DataMatcherV2';

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
