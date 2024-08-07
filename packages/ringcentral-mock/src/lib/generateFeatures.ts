import { clone } from 'ramda';

import featuresBody from '../platform/data/features.json';

type IIds =
  | 'CallScreening'
  | 'EditCallScreening'
  | 'SimultaneousRingingMode'
  | 'EditSimultaneousRingingMode'
  | 'RingGroups'
  | 'EditRingGroups'
  | 'ExternalForwarding'
  | 'EditExternalForwarding'
  | 'CallFlip'
  | 'EditCallFlip'
  | 'CallSwitch'
  | 'InboundCnam'
  | 'AutoInboundCallRecording'
  | 'EditAutoInboundCallRecording'
  | 'AutoOutboundCallRecording'
  | 'AutoOutboundCallRecordingSetup'
  | 'SmartDialPlanRouting'
  | 'OutboundCallPrefix'
  | 'AutoCallRecordingMute'
  | 'OnDemandCallRecording'
  | 'EditOnDemandCallRecording'
  | 'RingOut'
  | 'RingMe'
  | 'EditRingMe'
  | 'CallMonitoring'
  | 'EditCallMonitoringGroups'
  | 'BLF'
  | 'EditBlfSettings'
  | 'BLFPickup'
  | 'EditBlfVisibility'
  | 'EditBlfPickupPermissions'
  | 'CallAssistance'
  | 'CallDelegation'
  | 'FaxSending'
  | 'EditFaxSettings'
  | 'FaxReceiving'
  | 'VoicemailToText'
  | 'EditVoicemailToText'
  | 'HardPhones'
  | 'EditHardPhones'
  | 'SoftPhones'
  | 'EditSoftPhones'
  | 'RCPhoneDesktop'
  | 'RCPhoneMobile'
  | 'RCAppDesktop'
  | 'RCAppMobile'
  | 'Glip'
  | 'RCIntegrationApps'
  | 'ThirdPartyApps'
  | 'CommonPhone'
  | 'HardPhoneRequired'
  | 'Conferencing'
  | 'EditConferencing'
  | 'Meetings'
  | 'EditMeetings'
  | 'UserGroupManagement'
  | 'EditUserGroupManager'
  | 'EditUserGroups'
  | 'DevPortalAccess'
  | 'EditServiceStatusNotifications'
  | 'Archiver'
  | 'BlockedMessageForwarding'
  | 'EncryptionAtRest'
  | 'Calendar'
  | 'CallerIdControl'
  | 'CallForwarding'
  | 'CallPark'
  | 'CallParkLocations'
  | 'DND'
  | 'DynamicConferencing'
  | 'SoftPhoneAutoLocationUpdate'
  | 'HardPhoneAutoLocationUpdate'
  | 'EmergencyCalling'
  | 'ExternalAuth'
  | 'ExternalDirectoryIntegration'
  | 'FreeSoftPhones'
  | 'HDVoice'
  | 'HipaaCompliance'
  | 'Intercom'
  | 'InternationalCalling'
  | 'MMSSending'
  | 'EmergencyVoipCallingOnMobile'
  | 'PagesSending'
  | 'PagesReceiving'
  | 'Paging'
  | 'SalesForce'
  | 'SharedLines'
  | 'SingleExtensionUI'
  | 'SiteCodes'
  | 'SMSSending'
  | 'SMSReceiving'
  | 'UserManagement'
  | 'Voicemail'
  | 'VoipCalling'
  | 'WebPhone'
  | 'SoftPhoneUpdate'
  | 'CallQualitySurvey'
  | 'LinkedSoftphoneLines'
  | 'PromoMessage'
  | 'InternationalSMS'
  | 'VoipCallingOnMobile'
  | 'ConferencingNumber'
  | 'EditSoftPhoneAutoLocationUpdate'
  | 'EditHardPhoneAutoLocationUpdate'
  | 'MaskedNumbers'
  | 'AccountAdministration'
  | 'EditAccountFederation'
  | 'EditServiceWebAppearance'
  | 'EditCompanyInfo'
  | 'ReadCompanyInfo'
  | 'MultipleAccountAccess'
  | 'AccountValidation'
  | 'EditSites'
  | 'DeviceStatusReports'
  | 'DeviceStatusReportAlerts'
  | 'EditLiveReports'
  | 'ReadLiveReports'
  | 'ReadExtensionGrants'
  | 'MeetingsAnalytics'
  | 'EditAssignedRoles'
  | 'MeetingsDashboard'
  | 'PerformanceReports'
  | 'ReadAssignedRoles'
  | 'CompanyNumbersReports'
  | 'EditReportSettings'
  | 'QoSReports'
  | 'QoSReportsAlerts'
  | 'UsageReports'
  | 'ReadBillingInfo'
  | 'CallCenterInterconnectLicenses'
  | 'CloudConnectLicenses'
  | 'CostCenterManagement'
  | 'ReadAccountPhoneNumbers'
  | 'EditDeviceOrders'
  | 'EditInternationalDestinations'
  | 'LiveReportsLicenses'
  | 'MeetingsLicenses'
  | 'EditPaymentMethod'
  | 'ReadPaymentMethod'
  | 'ProductPurchase'
  | 'EditServicePlan'
  | 'EditExtensionGrants'
  | 'ReadServicePlan'
  | 'ReadUsageInfo'
  | 'EditAccountDevices'
  | 'ReadAccountDevices'
  | 'EditExtensionDevices'
  | 'ReadExtensionDevices'
  | 'EditAccountPhoneNumbers'
  | 'AddRemovePhoneNumbers'
  | 'ReadExtensionPhoneNumbers'
  | 'EditDirectoryAssistance'
  | 'EditGroups'
  | 'EditOutboundCallPrefix'
  | 'EditUsers'
  | 'EditRoles'
  | 'ReadRoles'
  | 'EditTemplates'
  | 'ApplyTemplates'
  | 'ReadTemplates'
  | 'ReadExtensions'
  | 'EditExtensionInfo'
  | 'ReadExtensionInfo'
  | 'EditUserHours'
  | 'EditCredentials'
  | 'EditMessageAndNotificationSettings'
  | 'ReadMessageAndNotificationSettings'
  | 'ReadOutboundCallerId'
  | 'EditExtensionPhonesAndNumbers'
  | 'EditPersonalContacts'
  | 'ReadPersonalContacts'
  | 'DomesticCalling'
  | 'InternalCalling'
  | 'EditAutoReceptionist'
  | 'EditAdvancedIVR'
  | 'EditAccountAnsweringRules'
  | 'EditExtensionPhoneNumbers'
  | 'EditOutboundCallerId'
  | 'ReadAccountAnsweringRules'
  | 'EditAccountGreetings'
  | 'ReadAccountGreetings'
  | 'EditCallScreeningAndGreetings'
  | 'ReadCallScreeningAndGreetings'
  | 'EditExtensionAnsweringRules'
  | 'ReadExtensionAnsweringRules'
  | 'EditIncomingCallInfo'
  | 'CallTransfer'
  | 'Hold'
  | 'EditIntercom'
  | 'EditBlockedNumbers'
  | 'ReadBlockedNumbers'
  | 'ReadAccountCallRecordings'
  | 'ReadExtensionCallRecordings'
  | 'ReadAccountCallLog'
  | 'EditAccountCallLogDelivery'
  | 'EditAccountCallLog'
  | 'EditSiteCallLog'
  | 'ReadSiteCallLog'
  | 'ReadExtensionCallLog'
  | 'EditExtensionCallLog'
  | 'ReadBlfSettings'
  | 'EditExtensionCallLogDelivery'
  | 'HUD'
  | 'EditPresenceStatus'
  | 'ReadPresenceStatus'
  | 'EditCallDelegation'
  | 'ReadMessages'
  | 'EditMessages'
  | 'ReadFaxSettings'
  | 'VoicemailBroadcasting'
  | 'GlipAdministration'
  | 'BotInstall'
  | 'BotUninstall'
  | 'Rooms'
  | 'EditRooms'
  | 'MeetingsReports'
  | 'EditWebinars'
  | 'AuditTrail'
  | 'MeetingsPersonalRecordings'
  | 'Sites'
  | 'ExpressUserActivation'
  | 'SecurityQuestion'
  | 'ServiceWebAccess'
  | 'MeetingsCompanyRecordings'
  | 'ReassignPhoneNumbers'
  | 'JoinLeaveCallQueue'
  | 'ReadCallQueueManagers'
  | 'EditCallQueueManagers'
  | 'EditCallQueueMembers'
  | 'AddRemoveDevices'
  | 'EditRoomConnector'
  | 'FederatedAccount'
  | 'OutboundCallPrefix'
  | 'LearningManagementSystem'
  | 'ReadEmergencyLocations'
  | 'EditEmergencyLocations'
  | 'ReadExtensionEmergencyLocations'
  | 'EmergencyLocations'
  | 'CallQueuePresence'
  | 'EditCallQueuePresence'
  | 'EditEnhancedCallQueueSettings'
  | 'EditCallQueueRoutingOptions'
  | 'EditCallQueueExtensionRouting'
  | 'EditEmailNotificationAppearance'
  | 'ReadEmailNotificationAppearance'
  | 'EditMeetingsProvider'
  | 'EmergencyCallNotification'
  | 'RCMeetingApps'
  | 'IMS'
  | 'RingSense'
  | 'VoiceCallsRecordingTranscriptions';

export type IGenerateFeaturesDataProps = Partial<Record<IIds, boolean>>;

export const generateFeaturesData = (
  props: IGenerateFeaturesDataProps = {},
) => {
  const records = clone(featuresBody.records);
  records.forEach((item) => {
    if (Object.prototype.hasOwnProperty.call(props, item.id)) {
      item.available = props[item.id];
      console.log(item.id);
    }
  });

  return { records };
};
