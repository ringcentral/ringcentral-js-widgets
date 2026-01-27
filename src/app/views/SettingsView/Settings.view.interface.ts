import type { BrandConfig } from '@ringcentral-integration/commons/modules/Brand';
import type { DNDStatusValueType } from '@ringcentral-integration/commons/modules/Presence';
import type { EulaProps } from '@ringcentral-integration/next-widgets/components/Eula';
import type { ReactNode } from 'react';

import type { SettingsPanel } from './SettingsPanel';

export interface PresenceSettingProps {
  dndStatus?: DNDStatusValueType;
  userStatus?: string;
  isCallQueueMember?: boolean;
  openPresenceSettings?: boolean;
  setAvailable?: (...args: any[]) => any;
  setBusy?: (...args: any[]) => any;
  setDoNotDisturb?: (...args: any[]) => any;
  setInvisible?: (...args: any[]) => any;
  toggleAcceptCallQueueCalls?: (...args: any[]) => any;
  enableAcceptQueueCallsControl?: boolean;
  showCallQueueManagement?: boolean;
  onCallQueueManagementClick?: () => void;
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
  onAutoCallLogSettingLinkClick?(): any;
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

export type OpenEntityFromType = 'newTab' | 'popup';
export interface OpenEntityFromProps {
  openEntityFrom?: OpenEntityFromType;
  showOpenEntityFrom?: boolean;
  openEntityFromOptions?: { value: OpenEntityFromType; label: string }[];
  onOpenEntityFromChange?: (value: OpenEntityFromType) => void;
}

export interface ReportIssueProps {
  showReportIssue?: boolean;
  onReportIssueClick?(): any;
}

export interface TrackingIssueProps {
  showTrackingIssue?: boolean;
  onTrackingClick?(): any;
}

export interface ThemeSwitchProps {
  showThemeSwitch?: boolean;
  onThemeSwitchClick?(): any;
}

export interface SelectToDialProps {
  showSelectToDial?: boolean;
  smsPermission?: boolean;
  callPermission?: boolean;
  selectToDialEnabled?: boolean;
  selectToDialTitle?: string;
  onSelectToDialChange?(enableClickToDial: boolean): any;
}

export interface ClickToDialProps {
  showClickToDial?: boolean;
  outboundSMS?: boolean;
  clickToCallPermission?: boolean;
  clickToDialEnabled?: boolean;
  clickToDialTitle?: string;
  onClickToDialChange?(enableClickToDial: boolean): any;
}

export interface VersionProps {
  version: string;
  versionContainer?: React.ReactNode;
  autoLogTextUpdating?: boolean;
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
  onLogoutButtonClick?(): any;
  eulaLink?: EulaProps['link'];
  eulaLabel?: EulaProps['label'];
  onEulaLinkClick?: EulaProps['onClick'];
  privacyNoticeLabel?: EulaProps['link'];
  privacyNoticeLink?: EulaProps['label'];
}

export interface BasePanelProps extends FooterProps {
  className?: string;
  showSpinner?: boolean;
  children?: ReactNode;
}

export interface onLinkLineItemClick {
  onClick?(): any;
}

export interface SettingsViewPanelProps
  extends BasePanelProps,
    ReportProps,
    CallingProps,
    AudioProps,
    RegionProps,
    AutoLogCallProps,
    AutoLogNotesProps,
    LogSMSContentProps,
    LogExtensionCallProps,
    AutoLogSMSProps,
    SelectToDialProps,
    ClickToDialProps,
    FeedbackProps,
    QuickAccessLinkProps,
    UserGuideProps,
    OpenEntityFromProps,
    ReportIssueProps,
    TrackingIssueProps,
    ThemeSwitchProps,
    PresenceSettingProps,
    ShareIdeaProps,
    VersionProps,
    Pick<
      SettingsViewOptions,
      'customRenderInfo' | 'onRefreshLog' | 'isLogRefreshing'
    > {
  additional?: ReactNode;
  additionalLogItems?: ReactNode;
  additionalAnalytics?: ReactNode;
  brandConfig: BrandConfig;
  crmService?: string;
  showRemoveMeetingWarning: boolean;
  showPresenceSettings?: boolean;
  showMatchesToggle?: boolean;
  showMatches?: boolean;
  onToggleShowMatches?: () => void;
  showPopUpForInboundCall?: boolean;
  popUpAppForInboundCall?: boolean;
  onTogglePopUpAppForInboundCall?: (checked?: boolean) => void;
  isEnablePendo?: boolean;
  /**
   * @deprecated
   */
  currentLocale: string;
}

export interface SettingsViewOptions {
  component?: typeof SettingsPanel;
  additional?: ReactNode;
  additionalLogItems?: ReactNode;
  additionalAnalytics?: ReactNode;
  showRemoveMeetingWarning?: boolean;
  showMatches?: boolean;
  autoLogSMSEnabled?: boolean;
  onToggleShowMatches?: () => void;
  onAutoLogSMSChange?: (checked?: boolean) => any;
  /**
   * does show feedback link
   */
  showFeedback?: boolean;
  onFeedBackSettingsLink?: (reason?: 'click' | 'auto') => void;
  showMatchesToggle?: boolean;
  showPopUpForInboundCall?: boolean;
  /**
   * if you want to custom the pop up for inbound call render information, you can use this props to render the subject and tooltip
   */
  customRenderInfo?: {
    popUpForInboundCall?: { subject?: string; tooltip?: string };
  };
  showAutoLogSMS?: true;
  autoLogSMSTitle?: string;
  onTogglePopUpAppForInboundCall?: (checked?: boolean) => void;
  popUpAppForInboundCall?: boolean;
  versionContainer?: ReactNode;
  /**
   * trigger when click the refresh log button
   */
  onRefreshLog?: () => void;
  /**
   * is the log refreshing should show the loading spinner
   */
  isLogRefreshing?: boolean;
}

export interface SettingsViewProps extends AutoLogCallProps, AutoLogSMSProps {
  showRegion?: boolean;
  showCalling?: boolean;
  showAudio?: boolean;
  showFeedback?: boolean;
  showUserGuide?: boolean;
  showPresenceSettings?: boolean;
  showQuickAccess?: boolean;
  params?: {
    showPresenceSettings?: boolean;
  };
  regionSettingsUrl?: string;
  callingSettingsUrl?: string;
  autoCallLogSettingsUrl?: string;
  audioSettingsUrl?: string;
  feedbackSettingsUrl?: string;
  showMatchesToggle?: boolean;
  showPopUpForInboundCall?: boolean;
  showMatches?: boolean;
  onToggleShowMatches?: () => void;
}
