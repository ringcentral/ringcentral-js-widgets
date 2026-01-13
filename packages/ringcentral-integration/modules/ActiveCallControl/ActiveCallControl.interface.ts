import type { IPickUpCallParams as OriginalPickUpCallParams } from 'ringcentral-call';
import type { Direction } from 'ringcentral-call-control/lib/Session';
import { Session } from 'ringcentral-call/lib/Session';
import { WebPhoneSession } from 'ringcentral-web-phone/lib/session';

import type { RouterInteraction } from '../../../ringcentral-widgets/modules/RouterInteraction';
import type { TelephonyStatus } from '../../enums/telephonyStatus';
import type {
  IWarmTransferInfo,
  ActiveCallControlSessionData,
} from '../../interfaces/ActiveSession.interface';
import type { NormalizedSession } from '../../interfaces/Webphone.interface';
import type { RingCentralClient } from '../../lib/RingCentralClient';
import type { AccountInfo } from '../AccountInfo';
import type { Alert } from '../Alert';
import type { AppFeatures } from '../AppFeatures';
import type { AudioSettings } from '../AudioSettings';
import type { Auth } from '../Auth';
import type { AvailabilityMonitor } from '../AvailabilityMonitor';
import type { Brand } from '../Brand';
import type { ConnectivityMonitor } from '../ConnectivityMonitor';
import type { ExtensionInfo } from '../ExtensionInfo';
import type { NumberValidate } from '../NumberValidate';
import type { Presence } from '../Presence';
import type { RegionSettings } from '../RegionSettings';
import type { Storage } from '../Storage';
import type { TabManager } from '../TabManager';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';
import type { Webphone } from '../Webphone';

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

export type IPickUpCallParams = Omit<
  OriginalPickUpCallParams,
  'sessionDescriptionHandlerOptions'
>;

export type IPickUpCallDataMap = Record<string, IPickUpCallParams>;
