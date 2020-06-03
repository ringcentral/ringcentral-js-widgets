import { EvCallData } from './EvData.interface';

export type EvActiveCallListUIProps = {
  currentLocale: string;
  callList: EvCallData[];
};

export type EvActiveCallListUIFunctions = {
  goBack(): void;
  onHangup(call: EvCallData): void;
  onUnHold(call: EvCallData): void;
  onHold(call: EvCallData): void;
};
