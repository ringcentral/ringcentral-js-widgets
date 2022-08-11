export interface ExtensionServiceFeatureInfo {
  /**
   * Feature status; shows feature availability for an extension
   */
  enabled: boolean;
  /**
   * Feature name
   */
  featureName:
    | 'AccountFederation'
    | 'Archiver'
    | 'AutomaticCallRecordingMute'
    | 'AutomaticInboundCallRecording'
    | 'AutomaticOutboundCallRecording'
    | 'BlockedMessageForwarding'
    | 'Calendar'
    | 'CallerIdControl'
    | 'CallForwarding'
    | 'CallPark'
    | 'CallParkLocations'
    | 'CallSupervision'
    | 'CallSwitch'
    | 'CallQualitySurvey'
    | 'Conferencing'
    | 'ConferencingNumber'
    | 'ConfigureDelegates'
    | 'DeveloperPortal'
    | 'DND'
    | 'DynamicConference'
    | 'EmergencyAddressAutoUpdate'
    | 'EmergencyCalling'
    | 'EncryptionAtRest'
    | 'ExternalDirectoryIntegration'
    | 'Fax'
    | 'FaxReceiving'
    | 'FreeSoftPhoneLines'
    | 'HDVoice'
    | 'HipaaCompliance'
    | 'Intercom'
    | 'InternationalCalling'
    | 'InternationalSMS'
    | 'LinkedSoftphoneLines'
    | 'MMS'
    | 'MobileVoipEmergencyCalling'
    | 'OnDemandCallRecording'
    | 'Pager'
    | 'PagerReceiving'
    | 'Paging'
    | 'PasswordAuth'
    | 'PromoMessage'
    | 'Reports'
    | 'Presence'
    | 'RCTeams'
    | 'RingOut'
    | 'SalesForce'
    | 'SharedLines'
    | 'SingleExtensionUI'
    | 'SiteCodes'
    | 'SMS'
    | 'SMSReceiving'
    | 'SoftPhoneUpdate'
    | 'TelephonySessions'
    | 'UserManagement'
    | 'VideoConferencing'
    | 'VoipCalling'
    | 'VoipCallingOnMobile'
    | 'Voicemail'
    | 'VoicemailToText'
    | 'WebPhone';
  /**
   * Reason for limitation of a particular service feature. Returned only if the enabled parameter value is 'False', see Service Feature Limitations and Reasons. When retrieving service features for an extension, the reasons for the limitations, if any, are returned in response
   */
  reason: string;
}
