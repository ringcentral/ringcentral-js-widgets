import React, { FunctionComponent, ReactNode } from 'react';

import Eula from '../Eula';

import { ClickToDial, ClickToDialProps } from './SettingItems/ClickToDial';
import { FooterProps } from './SettingItems/Footer';
import { HeaderProps } from './SettingItems/Header';
import { LinkLineItem } from './SettingItems/LinkLineItem';
import { Locale, LocaleProps } from './SettingItems/Locale';
import {
  PresenceSetting,
  PresenceSettingProps,
} from './SettingItems/PresenceSetting';
import { SwitchLineItem } from './SettingItems/SwitchLineItem';
import BasePanel, { BasePanelProps } from './BasePanel';

import {
  ReportProps,
  CallingProps,
  AudioProps,
  RegionProps,
  EulaRenderer,
  AutoLogCallProps,
  AutoLogNotesProps,
  LogSMSContentProps,
  AutoLogSMSProps,
  FeedbackProps,
  QuickAccessLinkProps,
  UserGuideProps,
} from './SettingsPanel.interface';

export interface SettingsPanelProps
  extends HeaderProps,
    FooterProps,
    BasePanelProps,
    LocaleProps,
    ReportProps,
    CallingProps,
    AudioProps,
    RegionProps,
    AutoLogCallProps,
    AutoLogNotesProps,
    LogSMSContentProps,
    AutoLogSMSProps,
    ClickToDialProps,
    FeedbackProps,
    QuickAccessLinkProps,
    UserGuideProps,
    PresenceSettingProps,
    EulaRenderer {
  children?: ReactNode;
  currentLocale: string;
  additional?: ReactNode;
}

const SettingsPanel: FunctionComponent<SettingsPanelProps> = ({
  children,
  className,
  onLogoutButtonClick,
  loginNumber,
  version,
  currentLocale,
  brandId,
  EulaRenderer,
  onCallingSettingsLinkClick,
  onRegionSettingsLinkClick,
  onAudioSettingsLinkClick,
  onFeedbackSettingsLinkClick,
  onQuickAccessLinkClick,
  onUserGuideClick,
  showCalling,
  showAutoLog,
  showAutoLogNotes,
  showAudio,
  showReport,
  autoLogEnabled,
  autoLogNotesEnabled,
  logSMSContentEnabled,
  disableAutoLogEnabled,
  disableAutoLogNotesEnabled,
  onAutoLogChange,
  onAutoLogNotesChange,
  showAutoLogSMS,
  showLogSMSContent,
  autoLogSMSEnabled,
  onAutoLogSMSChange,
  onLogSMSContentChange,
  showClickToDial,
  clickToDialEnabled,
  clickToDialPermissions,
  onClickToDialChange,
  onReportLinkClick,
  showRegion,
  showHeader,
  outboundSMS,
  showSpinner,
  dndStatus,
  userStatus,
  setAvailable,
  setBusy,
  setDoNotDisturb,
  setInvisible,
  toggleAcceptCallQueueCalls,
  isCallQueueMember,
  showPresenceSettings,
  openPresenceSettings,
  showFeedback,
  showQuickAccess,
  showUserGuide,
  additional,
  supportedLocales,
  savedLocale,
  saveLocale,
  clickToDialTitle,
  versionContainer,
  autoLogTitle,
  autoLogSMSTitle,
  logSMSContentTitle,
}) => {
  return (
    <BasePanel
      currentLocale={currentLocale}
      className={className}
      showSpinner={showSpinner}
      showHeader={showHeader}
      brandId={brandId}
      loginNumber={loginNumber}
      onLogoutButtonClick={onLogoutButtonClick}
      EulaRenderer={EulaRenderer}
      version={version}
      versionContainer={versionContainer}
    >
      <LinkLineItem
        name="report"
        show={showReport}
        currentLocale={currentLocale}
        onClick={onReportLinkClick}
      />
      <Locale
        supportedLocales={supportedLocales}
        currentLocale={currentLocale}
        savedLocale={savedLocale}
        saveLocale={saveLocale}
      />
      <LinkLineItem
        name="calling"
        show={showCalling}
        currentLocale={currentLocale}
        onClick={onCallingSettingsLinkClick}
      />
      <LinkLineItem
        name="region"
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
      <ClickToDial
        currentLocale={currentLocale}
        showClickToDial={showClickToDial}
        outboundSMS={outboundSMS}
        clickToDialPermissions={clickToDialPermissions}
        clickToDialEnabled={clickToDialEnabled}
        onClickToDialChange={onClickToDialChange}
        clickToDialTitle={clickToDialTitle}
      />
      {additional}
      <LinkLineItem
        name="feedback"
        show={showFeedback}
        currentLocale={currentLocale}
        onClick={onFeedbackSettingsLinkClick}
      />
      <LinkLineItem
        name="quickAccess"
        show={showQuickAccess}
        currentLocale={currentLocale}
        onClick={onQuickAccessLinkClick}
      />
      <LinkLineItem
        name="userGuide"
        show={showUserGuide}
        currentLocale={currentLocale}
        onClick={onUserGuideClick}
      />
    </BasePanel>
  );
};

export const baseDefaultProps = {
  className: null,
  EulaRenderer: Eula,
  children: null,
  showClickToDial: false,
  clickToDialEnabled: false,
  clickToDialPermissions: false,
  showCalling: false,
  showAudio: false,
  showAutoLog: false,
  showAutoLogNotes: false,
  showRegion: false,
  showUserGuide: false,
  showReport: false,
  autoLogEnabled: false,
  autoLogNotesEnabled: false,
  logSMSContentEnabled: true,
  disableAutoLogEnabled: false,
  disableAutoLogNotesEnabled: false,
  showAutoLogSMS: false,
  showLogSMSContent: false,
  autoLogSMSEnabled: false,
  showHeader: false,
  outboundSMS: false,
  showSpinner: false,
  openPresenceSettings: false,
  showPresenceSettings: true,
  showFeedback: true,
  showQuickAccess: false,
  clickToDialTitle: null,
  onReportLinkClick: () => null,
  onQuickAccessLinkClick: () => null,
  onAutoLogChange: () => null,
  onAutoLogNotesChange: () => null,
  onLogSMSContentChange: () => null,
  setAvailable: () => null,
  setBusy: () => null,
  setDoNotDisturb: () => null,
  setInvisible: () => null,
  toggleAcceptCallQueueCalls: () => null,
};

SettingsPanel.defaultProps = baseDefaultProps;

export default SettingsPanel;
