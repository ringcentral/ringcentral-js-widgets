import type { BrandConfig } from '@ringcentral-integration/commons/modules/Brand';
import type { DNDStatusValueType } from '@ringcentral-integration/commons/modules/Presence';
import type { ReactNode } from 'react';

import type { EulaProps } from '../Eula/Eula.interface';

export interface PresenceSettingProps {
  showPresenceSettings?: boolean;
  dndStatus?: DNDStatusValueType;
  userStatus?: string;
  currentLocale: string;
  isCallQueueMember?: boolean;
  openPresenceSettings?: boolean;
  setAvailable?: (...args: any[]) => any;
  setBusy?: (...args: any[]) => any;
  setDoNotDisturb?: (...args: any[]) => any;
  setInvisible?: (...args: any[]) => any;
  toggleAcceptCallQueueCalls?: (...args: any[]) => any;
}
export interface LinkLineItemProps extends onLinkLineItemClick {
  name?: string;
  customTitle?: string;
  currentLocale: string;
  show?: boolean;
  dataSign?: string;
  pendoSignName?: string;
}
export interface LocaleProps {
  supportedLocales?: string[];
  savedLocale: string;
  saveLocale(locale: string): void;
}

export interface ReportProps {
  showReport?: boolean;
  onReportLinkClick?(): any;
}

export interface CallingProps {
  showCalling?: boolean;
  onCallingSettingsLinkClick?(): any;
}

export interface AudioProps {
  showAudio?: boolean;
  onAudioSettingsLinkClick?(): any;
}

export interface RegionProps {
  showRegion?: boolean;
  onRegionSettingsLinkClick?(): any;
}

export interface AutoLogCallProps {
  showAutoLog?: boolean;
  autoLogTitle?: string;
  disableAutoLogEnabled?: boolean;
  autoLogEnabled?: boolean;
  onAutoLogChange?(checked: boolean): any;
}

export interface LogExtensionCallProps {
  showLogExtCall?: boolean;
  logExtCallTitle?: string;
  logExtCallEnabled?: boolean;
  onLogExtCallChange?(checked: boolean): any;
}

export interface AutoLogNotesProps {
  showAutoLogNotes?: boolean;
  disableAutoLogNotesEnabled?: boolean;
  autoLogNotesEnabled?: boolean;
  onAutoLogNotesChange?(checked: boolean): any;
}

export interface LogSMSContentProps {
  logSMSContentTitle?: string;
  showLogSMSContent?: boolean;
  logSMSContentEnabled?: boolean;
  onLogSMSContentChange?(checked: boolean): any;
}

export interface AutoLogSMSProps {
  autoLogSMSTitle?: string;
  showAutoLogSMS?: boolean;
  autoLogSMSEnabled?: boolean;
  disableAutoLogSMSEnabled?: boolean;
  onAutoLogSMSChange?(checked: boolean): any;
}

export interface FeedbackProps {
  showFeedback?: boolean;
  onFeedbackSettingsLinkClick?(): any;
}

export interface ShareIdeaProps {
  showShareIdea?: boolean;
  onShareIdeaClick?(): any;
}

export interface QuickAccessLinkProps {
  showQuickAccess?: boolean;
  onQuickAccessLinkClick?(): any;
}

export interface UserGuideProps {
  showUserGuide?: boolean;
  onUserGuideClick?(): any;
}

export interface ReportIssueProps {
  showReportIssue?: boolean;
  onReportIssueClick?(): any;
}

export interface TrackingIssueProps {
  showTrackingIssue?: boolean;
  onTrackingClick?(): any;
}

export interface ClickToDialProps {
  currentLocale: string;
  showClickToDial?: boolean;
  outboundSMS?: boolean;
  clickToCallPermission?: boolean;
  clickToDialEnabled?: boolean;
  clickToDialTitle?: string;
  onClickToDialChange?(enableClickToDial: boolean): any;
}

export interface PresenceStatusSetter {
  setAvailable?: (...args: any[]) => any;
  setBusy?: (...args: any[]) => any;
  setDoNotDisturb?: (...args: any[]) => any;
  setInvisible?: (...args: any[]) => any;
  toggleAcceptCallQueueCalls?: (...args: any[]) => any;
}

export interface FooterProps {
  loginNumber: string;
  currentLocale: string;
  version: string;
  versionContainer?: React.ReactNode;
  onLogoutButtonClick?(): any;
  eulaLink?: EulaProps['link'];
  eulaLabel?: EulaProps['label'];
  onEulaLinkClick?: EulaProps['onClick'];
  privacyNoticeLabel?: EulaProps['link'];
  privacyNoticeLink?: EulaProps['label'];
}

export interface BasePanelProps extends FooterProps {
  currentLocale: string;
  className?: string;
  showHeader?: boolean;
  showSpinner?: boolean;
  children?: ReactNode;
}

export interface onLinkLineItemClick {
  onClick?(): any;
}

export interface onSwitchLineItemChange {
  onChange?(checked: boolean): any;
}
export interface SwitchLineItemProps extends onSwitchLineItemChange {
  name?: string;
  currentLocale?: string;
  tooltip?: string;
  customTitle?: string;
  switchTitle?: string;
  show?: boolean;
  dataSign?: string;
  disabled?: boolean;
  checked?: boolean;
}

export interface SettingsPanelProps
  extends BasePanelProps,
    LocaleProps,
    ReportProps,
    CallingProps,
    AudioProps,
    RegionProps,
    AutoLogCallProps,
    AutoLogNotesProps,
    LogSMSContentProps,
    LogExtensionCallProps,
    AutoLogSMSProps,
    ClickToDialProps,
    FeedbackProps,
    QuickAccessLinkProps,
    UserGuideProps,
    ReportIssueProps,
    TrackingIssueProps,
    PresenceSettingProps,
    ShareIdeaProps {
  children?: ReactNode;
  currentLocale: string;
  additional?: ReactNode;
  brandConfig: BrandConfig;
  showRemoveMeetingWarning: boolean;
}
