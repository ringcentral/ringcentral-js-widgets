import { MutableRefObject } from 'react';

import { DateTimeFormatter } from '@ringcentral-integration/commons/lib/getIntlDateTimeFormatter';
import { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import { RcIconProps } from '@ringcentral/juno';

import { Call, CallLog, CallLogTitle } from './CallLog.interface';

interface CallLogPanelConfig {
  showSpinner: boolean;
  isInTransferPage: boolean;

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
  currentLog: CallLog;
  currentLocale: string;
  goBack: (...args: any[]) => any;
  formatPhone: (...args: any[]) => any;
  onReject: (...args: any[]) => any;
  onHangup: (...args: any[]) => any;
  renderKeypadPanel: (...args: any[]) => any;
  renderSaveLogButton: (...args: any[]) => JSX.Element;
  getRenderLogButton?: () => JSX.Element;
  buttonStatus: { buttonDisabled: boolean; buttonContent: string };

  additionalInfo?: object;
  onUpdateCallLog?: (data: { task }, id: string) => any;
  onSaveCallLog?: (...args: any[]) => any;
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
    > & {
      editSectionScrollBy?: (top: number) => void;
    },
  ) => JSX.Element;

  renderCallLogCallControl?: (
    telephonySessionId: string,
    isWide: boolean,
    isCurrentDeviceCall: boolean,
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
  activeSession?: object;
  pushLogPageStatus?: (...args: any[]) => any;
  shrinkNotification?: (...args: any[]) => any;
  contactSearch?: ({
    searchString,
  }: {
    searchString: string;
  }) => Promise<Array<any>> | Promise<void>;
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
  answer: (telephonySession: string) => any;
  showRecordingIndicator?: boolean;
  clickForwardTrack?: () => any;
  renderCallNotificationAvatar?: (
    contact: IContact,
    entityType: string,
  ) => JSX.Element;
  getAvatarUrl?: (contact: IContact) => Promise<string>;
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
}
