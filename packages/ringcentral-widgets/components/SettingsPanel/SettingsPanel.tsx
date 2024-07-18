import type { FunctionComponent } from 'react';
import React from 'react';

import { RemoveMeetingWarn } from '../MeetingAlert';

import { BasePanel } from './BasePanel';
import { ClickToDial } from './ClickToDial';
import { LinkLineItem } from './LinkLineItem';
import { Locale } from './Locale';
import { PresenceSetting } from './PresenceSetting';
import type { SettingsPanelProps } from './SettingsPanel.interface';
import { SwitchLineItem } from './SwitchLineItem';

const Empty = (): null => null;

export const SettingsPanel: FunctionComponent<SettingsPanelProps> = ({
  additional,
  autoLogEnabled = false,
  autoLogNotesEnabled = false,
  autoLogSMSEnabled = false,
  autoLogSMSTitle,
  autoLogTitle,
  children,
  className,
  clickToDialEnabled = false,
  clickToCallPermission = false,
  clickToDialTitle,
  currentLocale,
  disableAutoLogEnabled = false,
  disableAutoLogNotesEnabled = false,
  disableAutoLogSMSEnabled = false,
  dndStatus,
  eulaLabel,
  eulaLink,
  onEulaLinkClick,
  privacyNoticeLabel,
  privacyNoticeLink,
  isCallQueueMember,
  loginNumber,
  logSMSContentEnabled = true,
  logExtCallEnabled = false,
  logSMSContentTitle,
  logExtCallTitle,
  onAudioSettingsLinkClick,
  onAutoLogChange = Empty,
  onAutoLogNotesChange = Empty,
  onAutoLogSMSChange,
  onLogExtCallChange = Empty,
  onCallingSettingsLinkClick,
  onClickToDialChange,
  onFeedbackSettingsLinkClick,
  onTrackingClick,
  onLogoutButtonClick,
  onLogSMSContentChange = Empty,
  onQuickAccessLinkClick = Empty,
  onRegionSettingsLinkClick,
  onReportLinkClick = Empty,
  onShareIdeaClick,
  onUserGuideClick,
  onReportIssueClick,
  openPresenceSettings = false,
  outboundSMS = false,
  savedLocale,
  saveLocale,
  setAvailable = Empty,
  setBusy = Empty,
  setDoNotDisturb = Empty,
  setInvisible = Empty,
  showAudio = false,
  showAutoLog = false,
  showLogExtCall = false,
  showAutoLogNotes = false,
  showAutoLogSMS = false,
  showCalling = false,
  showClickToDial = false,
  showFeedback = true,
  showTrackingIssue = false,
  showHeader = false,
  showLogSMSContent = false,
  showPresenceSettings = true,
  showQuickAccess = false,
  showRegion = false,
  showReport = false,
  showShareIdea = false,
  showSpinner = false,
  showUserGuide = false,
  // @ts-expect-error TS(2339): Property 'isEnablePendo' does not exist on type 'P... Remove this comment to see the full error message
  isEnablePendo = false,
  showReportIssue = false,
  supportedLocales,
  toggleAcceptCallQueueCalls = Empty,
  userStatus,
  version,
  versionContainer,
  showRemoveMeetingWarning,
  brandConfig,
}) => {
  return (
    <BasePanel
      {...{
        currentLocale,
        className,
        showSpinner,
        showHeader,
        eulaLabel,
        eulaLink,
        onEulaLinkClick,
        privacyNoticeLabel,
        privacyNoticeLink,
        loginNumber,
        onLogoutButtonClick,
        version,
        versionContainer,
      }}
    >
      {showRemoveMeetingWarning && (
        <RemoveMeetingWarn
          brandConfig={brandConfig}
          currentLocale={currentLocale}
          hasRemoved
        />
      )}
      <LinkLineItem
        name="report"
        show={showReport}
        currentLocale={currentLocale}
        onClick={onReportLinkClick}
      />
      <Locale
        supportedLocales={supportedLocales}
        savedLocale={savedLocale}
        saveLocale={saveLocale}
      />
      <LinkLineItem
        name="calling"
        dataSign="calling"
        show={showCalling}
        currentLocale={currentLocale}
        onClick={onCallingSettingsLinkClick}
      />
      <LinkLineItem
        name="region"
        dataSign="region"
        show={showRegion}
        currentLocale={currentLocale}
        onClick={onRegionSettingsLinkClick}
      />
      <LinkLineItem
        name="audio"
        show={showAudio}
        currentLocale={currentLocale}
        onClick={onAudioSettingsLinkClick}
      />
      <PresenceSetting
        showPresenceSettings={showPresenceSettings}
        dndStatus={dndStatus}
        userStatus={userStatus}
        currentLocale={currentLocale}
        isCallQueueMember={isCallQueueMember}
        setAvailable={setAvailable}
        setBusy={setBusy}
        setDoNotDisturb={setDoNotDisturb}
        setInvisible={setInvisible}
        toggleAcceptCallQueueCalls={toggleAcceptCallQueueCalls}
        openPresenceSettings={openPresenceSettings}
      />
      {children}
      <SwitchLineItem
        name="autoLogCalls"
        dataSign="AutoLogCall"
        show={showAutoLog}
        customTitle={autoLogTitle}
        currentLocale={currentLocale}
        disabled={disableAutoLogEnabled}
        checked={autoLogEnabled}
        onChange={onAutoLogChange}
      />
      <SwitchLineItem
        name="autoLogNotes"
        dataSign="AutoLogNotes"
        show={showAutoLogNotes}
        currentLocale={currentLocale}
        disabled={disableAutoLogNotesEnabled}
        checked={autoLogNotesEnabled}
        onChange={onAutoLogNotesChange}
      />
      <SwitchLineItem
        name="autoLogSMS"
        dataSign="AutoLogSMS"
        customTitle={autoLogSMSTitle}
        show={showAutoLogSMS}
        currentLocale={currentLocale}
        disabled={disableAutoLogSMSEnabled}
        checked={autoLogSMSEnabled}
        onChange={onAutoLogSMSChange}
      />
      <SwitchLineItem
        name="logSMSContent"
        dataSign="LogSMSContent"
        customTitle={logSMSContentTitle}
        show={showLogSMSContent}
        currentLocale={currentLocale}
        checked={logSMSContentEnabled}
        onChange={onLogSMSContentChange}
      />
      <SwitchLineItem
        name="logExtensionCall"
        dataSign="logExtensionCall"
        customTitle={logExtCallTitle}
        show={showLogExtCall}
        currentLocale={currentLocale}
        checked={logExtCallEnabled}
        onChange={onLogExtCallChange}
      />
      <ClickToDial
        currentLocale={currentLocale}
        showClickToDial={showClickToDial}
        outboundSMS={outboundSMS}
        clickToCallPermission={clickToCallPermission}
        clickToDialEnabled={clickToDialEnabled}
        onClickToDialChange={onClickToDialChange}
        clickToDialTitle={clickToDialTitle}
      />
      {additional}
      <LinkLineItem
        name="havingIssues"
        dataSign="HavingIssues"
        show={showTrackingIssue}
        currentLocale={currentLocale}
        onClick={onTrackingClick}
      />
      <LinkLineItem
        name="feedback"
        dataSign="Feedback"
        pendoSignName={isEnablePendo ? 'Feedback' : ''}
        show={showFeedback}
        currentLocale={currentLocale}
        onClick={onFeedbackSettingsLinkClick}
      />
      <LinkLineItem
        name="shareIdea"
        dataSign="shareIdea"
        show={showShareIdea}
        currentLocale={currentLocale}
        onClick={onShareIdeaClick}
      />
      <LinkLineItem
        name="quickAccess"
        dataSign="quickAccess"
        show={showQuickAccess}
        currentLocale={currentLocale}
        onClick={onQuickAccessLinkClick}
      />
      <LinkLineItem
        name="userGuide"
        dataSign="userGuide"
        show={showUserGuide}
        currentLocale={currentLocale}
        onClick={onUserGuideClick}
      />
      <LinkLineItem
        name="reportIssue"
        dataSign="reportIssue"
        show={showReportIssue}
        currentLocale={currentLocale}
        onClick={onReportIssueClick}
      />
    </BasePanel>
  );
};
