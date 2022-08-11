import { Direction } from 'ringcentral-call-control/lib/Session';
import { Session } from 'ringcentral-call/lib/Session';
import { WebPhoneSession } from 'ringcentral-web-phone/lib/session';

import { RouterInteraction } from '../../../ringcentral-widgets/modules/RouterInteraction';
import { TelephonyStatus } from '../../enums/telephonyStatus';
import { NormalizedSession } from '../../interfaces/Webphone.interface';
import {
  IWarmTransferInfo,
  ActiveCallControlSessionData,
} from '../../interfaces/ActiveSession.interface';
import { RingCentralClient } from '../../lib/RingCentralClient';
import { AccountInfo } from '../AccountInfo';
import { Alert } from '../Alert';
import { AppFeatures } from '../AppFeatures';
import { AudioSettings } from '../AudioSettings';
import { Auth } from '../Auth';
import { AvailabilityMonitor } from '../AvailabilityMonitor';
import { Brand } from '../Brand';
import { ConnectivityMonitor } from '../ConnectivityMonitor';
import { ExtensionInfo } from '../ExtensionInfo';
import { NumberValidate } from '../NumberValidate';
import { Presence } from '../Presence';
import { RegionSettings } from '../RegionSettings';
import { Storage } from '../Storage';
import { Subscription } from '../Subscription';
import { TabManager } from '../TabManager';
import { Webphone } from '../Webphone';

export interface ActiveCallControlOptions {
  polling?: boolean;
  enableCache?: boolean;
  ttl?: number;
  timeToRetry?: number;
  permissionCheck?: boolean;
  enableAutoSwitchFeature?: boolean;
}

export interface Deps {
  prefix: string;
  accountInfo: AccountInfo;
  alert: Alert;
  appFeatures: AppFeatures;
  audioSettings: AudioSettings;
  auth: Auth;
  availabilityMonitor?: AvailabilityMonitor;
  brand: Brand;
  client: RingCentralClient;
  connectivityMonitor: ConnectivityMonitor;
  extensionInfo: ExtensionInfo;
  numberValidate: NumberValidate;
  presence: Presence;
  regionSettings: RegionSettings;
  routerInteraction: RouterInteraction;
  storage?: Storage;
  subscription: Subscription;
  tabManager?: TabManager;
  webphone?: Webphone;
  activeCallControlOptions?: ActiveCallControlOptions;
}

export interface ModuleMakeCallParams {
  fromNumber?: string;
  toNumber: string;
  homeCountryId?: string;
  extendedControls?: object;
  transferSessionId?: string;
}

export interface ActiveSession {
  telephonySessionId: string;
  partyId: string;
  direction: Direction;
  from: string;
  fromNumber: string;
  fromUserName: string;
  to: string;
  toNumber: string;
  toUserName: string;
  id: string;
  sessionId: string;
  callStatus: TelephonyStatus;
  startTime: number;
  creationTime: string;
  isOnMute: boolean;
  isForwarded: boolean;
  isOnFlip: boolean;
  isOnHold: boolean;
  isOnTransfer: boolean;
  isReplied: boolean;
  isToVoicemail: boolean;
  lastHoldingTime: number;
  minimized: boolean;
  recordStatus: string;
  removed: boolean;
  isReject: boolean;
}

export interface ICurrentDeviceCallsMap {
  [telephonySessionId: string]: NormalizedSession;
}

export interface ITransferCallSessionMapping {
  [telephonySessionId: string]: IWarmTransferInfo;
}

export { Session, WebPhoneSession };
export type { ActiveCallControlSessionData };
