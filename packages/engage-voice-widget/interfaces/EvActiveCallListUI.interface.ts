import type { EvCallData } from './EvData.interface';

export type EvActiveCallListUIProps = {
  currentLocale: string;
  callList: EvCallData[];
  isOnMute: boolean;
  showMuteButton: boolean;
  userName: string;
  isInbound: boolean;
};

export type EvActiveCallListUIFunctions = {
  goBack(): void;
  onHangup(call: EvCallData): void;
  onUnHold(call: EvCallData): void;
  onHold(call: EvCallData): void;
  onMute(): void;
  onUnmute(): void;
};
