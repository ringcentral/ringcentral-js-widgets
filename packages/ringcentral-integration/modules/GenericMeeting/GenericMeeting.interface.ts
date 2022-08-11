import { RcVMeetingModel } from '../../interfaces/Rcv.model';
import { Brand } from '../Brand';
import { ExtensionInfo } from '../ExtensionInfo';
import { Meeting, MeetingDelegator, RcMMeetingModel } from '../Meeting';
import { RcVideo } from '../RcVideo';
import {
  meetingProviderTypesProps,
  VideoConfiguration,
} from '../VideoConfiguration';

export type ExtensionInfoData = {
  contact: object;
  departments: object[];
  extensionNumber: string;
  id: number;
  name: string;
  status: string;
  type: string;
  profileImage?: object;
  regionalSettings: object;
  permissions: object;
  serviceFeatures: object;
};

type ServiceInfo = {
  dialInNumbers: object[];
  domain: string;
  externalUserInfo: {
    accountId: string;
    hostKey: string;
    personalMeetingId: string;
    userId: string;
    userToken: string;
    userType: number;
  };
  intlDialInNumbersUri: string;
  supportUri: string;
  uri: string;
  mobileDialingNumberTpl: string;
  phoneDialingNumberTpl: string;
};

export type MeetingScheduleModel = {
  durationInMinutes: number;
  timeZone?: { id: string };
  startTime?: string;
};

export type ScheduleModel = Maybe<RcMMeetingModel | RcVMeetingModel>;

export type Maybe<T> = T | undefined;
export type Either<T1, T2> = T1 | T2;

export type RCMeetingResponse = {
  id?: string;
  topic: string;
  meetingType: any;
  allowJoinBeforeHost: any;
  startHostVideo: any;
  startParticipantsVideo: any;
  audioOptions: any;
  password: any;
  schedule?: MeetingScheduleModel;
  links: {
    joinUri: string;
  } & object;
};

export type RCVideoResponse = {
  uri: string;
  id: string;
  participantCode: string;
  hostCode: string;
  shortId: string;
  meetingUri: string;
  joinUri: string;
  notificationUrl: string;
  expiresIn: number;
  expiration: number;
  autoFinish: true;
  type: number;
  accountId: string;
  extensionId: string;
  name: string;
  allowJoinBeforeHost: boolean;
  muteAudio: boolean;
  muteVideo: boolean;
  startTime?: string;
  duration?: number;
  links?: { joinUri: string };
  isMeetingSecret?: boolean;
  e2ee?: boolean;
  meetingPassword?: string;
  meetingPasswordPSTN?: string;
};

export type RCMeeting = {
  meeting: RCMeetingResponse;
  serviceInfo: ServiceInfo;
  extensionInfo: ExtensionInfoData;
};

export type RCVideo = {
  extensionInfo: ExtensionInfoData;
  dialInNumber: string;
  meeting: RCVideoResponse; // TODO: add RCVideoScheduleModel?
};

export type MeetingData = Either<RCMeeting, RCVideo>;

export enum MeetingEvents {
  afterSchedule = 'afterSchedule',
  afterUpdate = 'afterUpdate',
}

export interface IGenericMeeting {
  meetingProviderType: Maybe<meetingProviderTypesProps>;
  isRCV: boolean;
  isRCM: boolean;
  extensionInfo: any;
  meeting: Maybe<MeetingData>;
  defaultSetting: any;
  isScheduling: boolean;
  showSaveAsDefault: boolean;
  isPreferencesChanged: boolean;
  brandName: string;
  status: object;
  delegators: MeetingDelegator[];

  initialize(): void;

  /**
   * Init basic meeting information
   * also load meeting settings from previous one.
   */
  init(): void;

  reload(): void;

  /**
   * Update Meeting Config
   */
  updateMeetingSettings(meeting: ScheduleModel): void;

  /**
   * Validate if password is legal based on our user story
   */
  validatePasswordSettings(password: string, isSecret: boolean): boolean;

  enablePersonalMeeting: boolean;
  personalMeeting: any;
  personalMeetingId: string;
  personalMeetingSettings: any;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;

  /**
   * requests
   */
  schedule: (
    meeting: ScheduleModel,
    config?: {
      isAlertSuccess: boolean;
    },
    opener?: Window,
  ) => Promise<Maybe<MeetingData>>;

  getMeeting: (meetingId: string) => Promise<Maybe<MeetingData>>;

  updateMeeting(
    meetingId: string,
    meeting: ScheduleModel,
    config?: {
      isAlertSuccess: boolean;
    },
    opener?: Window,
  ): Promise<Maybe<MeetingData>>;

  updateScheduleFor: (userExtensionId: string | number) => void;

  getMeetingServiceInfo?: () => Promise<ServiceInfo>;

  /**
   * hook
   */
  addScheduledCallBack(cb: ScheduledCallback): void;
  removeScheduledCallBack(cb: ScheduledCallback): void;
}

export type ScheduledCallback = (result: MeetingData, opener: Window) => any;

export interface GenericMeetingOptions {
  enableCache: boolean;
  //
}

export interface Deps {
  videoConfiguration: VideoConfiguration;
  extensionInfo: ExtensionInfo;
  brand: Brand;
  meeting: Meeting;
  rcVideo: RcVideo;
  genericMeetingOptions?: GenericMeetingOptions;
}
