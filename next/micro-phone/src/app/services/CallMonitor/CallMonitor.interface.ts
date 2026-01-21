import type { Call as ICall } from '@ringcentral-integration/commons/interfaces/Call.interface';

export type CallEventCallback = (call: ICall) => void | Promise<void>;

export interface CallMonitorOptions {
  /**
   * Use telephony session, default `false`
   */
  useTelephonySession?: boolean;
  enableContactMatchWhenNewCall?: boolean;
}

export type DeviceCallsMap = {
  all: ICall[];
  active: ICall[];
  ringing: ICall[];
  holding: ICall[];
};

export type DeviceCallsMapInfo = {
  allDevices: DeviceCallsMap;
  currentDevice: DeviceCallsMap;
  otherDevice: DeviceCallsMap;
};
