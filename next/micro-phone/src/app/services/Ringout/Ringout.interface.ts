export interface MakeCallOptions {
  fromNumber: string;
  toNumber: string;
  prompt: boolean;
}

export interface RingoutOptions {
  monitorInterval?: number;
  timeBetweenCalls?: number;
}
