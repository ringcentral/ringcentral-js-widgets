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
