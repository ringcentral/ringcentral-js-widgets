import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import type { DateTimeFormatter } from '@ringcentral-integration/commons/lib/getIntlDateTimeFormatter';
import type { RcIconProps } from '@ringcentral/juno';
import type { MutableRefObject } from 'react';

import type { Call, CallLog, CallLogTitle } from './CallLog.interface';

interface CallLogPanelConfig {
  showSpinner: boolean;
  isInTransferPage: boolean;

  enableReply?: boolean;
  isWide?: boolean;
  header?: boolean;
  headerTitle?: CallLogTitle;
  showSmallCallControl?: boolean;
  disableLinks?: boolean;
  useNewNotification?: boolean;
  showNotiLogButton?: boolean;
}

type CallLogPanelGroup<T> = {
  root?: T;
  callLogCallControl?: T;
  backHeader?: T;
  logBasicInfo?: T;
  editSection?: T;
};

export interface CallLogPanelProps extends CallLogPanelConfig {
  rootLayout?: boolean;
  currentLog: CallLog;
  currentDelaySavingState?: any;
  warmTransferLog?: CallLog;
  warmTransferActiveTelephonySessionId: string;
  currentLocale: string;
  goBack: (...args: any[]) => any;
  formatPhone: (...args: any[]) => any;
  onReject: (...args: any[]) => any;
  onHangup: (...args: any[]) => any;
  onSwitchWarmTransferSession: () => any;
  renderKeypadPanel: (...args: any[]) => any;
  renderSaveLogButton: (...args: any[]) => JSX.Element;
  getRenderLogButton?: () => JSX.Element;
  buttonStatus: { buttonDisabled: boolean; buttonContent: string };

  additionalInfo?: object;
  onUpdateCallLog?: (data: { task: any }, id: string) => any;
  onSaveCallLog?: (...args: any[]) => any;
  openEntityDetailLinkTrack?: (...args: any[]) => any;
  openEntityDetailLink: (entityDetailLinkId: string) => any;
  onSelectViewVisible?: (visible: boolean, fieldName: string) => any;
  dateTimeFormatter?: DateTimeFormatter;
  renderBasicInfo?: ({
    formatPhone,
    dateTimeFormatter,
    currentLog,
  }: Pick<
    CallLogPanelProps,
    'formatPhone' | 'dateTimeFormatter' | 'currentLog'
  >) => JSX.Element;

  renderEditLogSection?: (
    props: Pick<
      CallLogPanelProps,
      | 'currentLocale'
      | 'onSaveCallLog'
      | 'onUpdateCallLog'
      | 'onSelectViewVisible'
      | 'currentLog'
      | 'additionalInfo'
      | 'subjectDropdownsTracker'
      | 'contactSearch'
      | 'showFoundFromServer'
      | 'appName'
      | 'isSearching'
      | 'startAdornmentRender'
      | 'isWide'
      | 'objectTypeIconsMap'
      | 'currentDelaySavingState'
    > & {
      editSectionScrollBy?: (top: number) => void;
    },
  ) => JSX.Element;

  renderCallLogCallControl?: (
    telephonySessionId: string,
    isWide: boolean,
    enableReply: boolean,
    isCurrentDeviceCall: boolean,
    warmTransferActiveTelephonySessionId: string,
  ) => JSX.Element;

  backIcon?: RcIconProps['symbol'];
  currentIdentify?: string;
  subjectDropdownsTracker?: (...args: any[]) => any;
  classes?: CallLogPanelGroup<string>;
  refs?: CallLogPanelGroup<MutableRefObject<any>>;
  logNotification?: LogNotification;
  onCloseNotification?: (...args: any[]) => any;
  onDiscardNotification?: (...args: any[]) => any;
  onSaveNotification?: (...args: any[]) => any;
  onExpandNotification?: (...args: any[]) => any;
  currentNotificationIdentify?: string;
  currentSession?: object;
  activeSession?: boolean | object;
  pushLogPageStatus?: (...args: any[]) => any;
  shrinkNotification?: (...args: any[]) => any;
  contactSearch?: ({
    searchString,
    fromField,
  }: {
    searchString: string;
    fromField?: string;
  }) => Promise<void>;
  showFoundFromServer: boolean;
  appName?: string;
  isSearching?: boolean;
  startAdornmentRender?: (...args: any[]) => any;
  objectTypeIconsMap?: {
    [type: string]: {
      icon: string;
      color: string;
    };
  };
  isWebRTC: boolean;
  onIgnore: (telephonySession: string) => any;
  endAndAnswer: (telephonySession: string) => any;
  holdAndAnswer: (telephonySession: string) => any;
  toVoicemail: (telephonySession: string) => any;
  forwardingNumbers: any[];
  onForward: (phoneNumber: string, telephonySession: string) => any;
  reply: (telephonySessionId: string) => any;
  answer: (telephonySession: string) => any;
  showRecordingIndicator?: boolean;
  clickForwardTrack?: () => any;
  clickParticipantsIconTrack?: () => void;
  clickRemoveParticipantTrack?: () => void;
  renderCallNotificationAvatar?: (
    contact: IContact,
    entityType: string,
  ) => JSX.Element;
  renderConferenceParticipantsAvatar?: (item: {
    displayEntity?: IContact;
    entityType?: string;
    name?: string;
  }) => JSX.Element;
  getAvatarUrl?: (contact: IContact) => Promise<string>;
  getConferenceCallParticipantName: (
    sessionId: string,
    isHost?: boolean,
  ) => {
    logName?: string;
    entityDetailLink?: string;
  };
  onRemoveParticipant: (
    telephonySessionId: string,
    removedPartyId: string,
  ) => Promise<void>;
}

export interface LogNotification {
  showNotification: boolean;
  notificationIsExpand: boolean;
  call: Call;
  logName: string;
  subContactNameDisplay: string;
  displayEntity: any;
  entityType: string;
  entityDetailLink: string;
  showLogOptions?: boolean;
}
