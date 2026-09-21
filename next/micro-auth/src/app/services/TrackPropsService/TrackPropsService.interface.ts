/**
 * CLW - Normal user manually sign in through login page
 * App Syncing - Non sign in by user self, that login through app syncing like GA EA
 */
export type SignInSource = 'CLW' | 'App Syncing';
export type SignInResult = 'Successfully signed in' | 'Failed';
export type SignOutSource =
  | 'Manually sign out'
  | 'App syncing'
  | 'Token expired'
  | 'Request error'
  | 'Invalid tier'
  | 'Insufficient privilege'
  | 'Invalid account for this brand'
  | 'Service unavailable'
  | 'Generate code failed'
  | 'Unknown';
export type CallingOptionSetup = 'RingOut' | 'Spartan' | 'Jupiter' | 'Browser';
export type CallMadeLocation =
  | 'C2D/S2D'
  | 'Dialer'
  | 'Add call'
  | 'Call history list'
  | 'Call history detail page'
  | 'Text list'
  | 'Text conversation page'
  | 'Fax list'
  | 'Voicemail list'
  | 'Voicemail detail page'
  // still not have below pages
  | 'Fax detail page'
  | 'Contact list'
  | 'Contact detail page';
export type CallDirection = 'Inbound' | 'Outbound';
export type CallNumberType =
  // normal call
  | 'PSTN'
  // emergency call
  | 'E11'
  | 'Extension'
  | 'Anonymous';
export type CallContactMatch =
  | 'RC contact matched'
  | '3rd party contact matched';
export type CallActions =
  | 'Answer'
  | 'Answer and hold'
  | 'Answer and end'
  | 'Reject to voicemail'
  | 'Forward'
  | 'Reply with message'
  | 'Ignore'
  | 'Mute'
  | 'Unmute'
  | 'Keypad input'
  | 'Hold'
  | 'Unhold'
  | 'Added new calls'
  | 'Merged'
  | 'Recorded'
  | 'Stop Record'
  | 'Flipped'
  | 'Warm transferred'
  | 'Cold transferred'
  | 'Transfer to voicemail'
  | 'Ignore queue'
  | 'End call'
  | 'Switch to current device'
  | 'Park'
  | 'Start ai notes'
  | 'Select audio device';

/**
 * unit in seconds
 */
export type CallDuration = number;
export type CrmLogType = 'Create' | 'Update';
export type CrmLogTrigger =
  | 'FE - Automatically'
  | 'AAL - Automatically'
  | 'FE - Manually';
export type TextSentType = 'Create' | 'Reply';
export type TextType = 'SMS' | 'MMS';
export type IsGroupText = boolean;
export type FaxPageCount = number;
export type CrmName = string;
export type AalSwitchOption = 'Enabling' | 'Disabling';
export type QuickActionType =
  | 'Call'
  | 'Text'
  | 'Fax'
  | 'Add contact'
  | 'Block'
  | 'Copy'
  | 'Settings';
export type QuickActionTrigger = 'Hover' | 'Select';
export type QuickAccessActionType =
  | 'Answer call'
  | 'Reject call'
  | 'Mute/Unmute'
  | 'End call'
  | 'Open call list'
  | 'Bring up main app';
export type WidgetName = 'HUBSPOT' | 'SALESFORCE';
export type WidgetAction = 'Connect' | 'Disconnect';
export type SmsConsentCoverageType = 'Number' | 'Company' | 'Campaign';
export type SmsConsentCampaignType =
  | 'Campaign-Conversational'
  | 'Campaign-Informational'
  | 'Campaign-Promotional';
export type SmsConsentEntry =
  | 'Text conversation'
  | 'Text list'
  | 'Text input box'
  | 'Settings';
export type SmsConsentStatus = 'Opt-in' | 'Opt-out';

export type SmsConsentRecordTrackProperties = {
  coverageType: SmsConsentCoverageType;
  campaignType?: SmsConsentCampaignType;
  consentEntry: SmsConsentEntry;
  consentStatus: SmsConsentStatus;
};

type TransferContactType = string | null;

interface TrackEventProperty {
  signInSource: SignInSource;
  signInResult: SignInResult;
  signOutSource: SignOutSource;
  callingOptionSetup: CallingOptionSetup;
  callMadeLocation: CallMadeLocation;
  callDirection: CallDirection;
  callNumberType: CallNumberType;
  callContactMatch: CallContactMatch[];
  callActions: CallActions[];
  callQueueCall: boolean;
  callDuration?: CallDuration;
  crmLogType: CrmLogType;
  crmLogTrigger: CrmLogTrigger;
  textSentType: TextSentType;
  textType: TextType;
  isGroupText: IsGroupText;
  isPager: boolean;
  faxAttachmentCount: FaxPageCount;
  crmName: CrmName;
  aalSwitchOption: AalSwitchOption;
  quickActionType: QuickActionType;
  quickActionTrigger: QuickActionTrigger;
  quickAccessActionType: QuickAccessActionType;
  widgetName: WidgetName;
  widgetAction: WidgetAction;
  extensionPermission: Record<string, boolean> | 'Unknown';
  /**
   * The payload of the event.
   * This is a generic object that can contain any additional dynamic data
   */
  payload?: Record<string, unknown>;
  /**
   * The user actions in Template list and Template card, only trigger when user complete Save actions, not include "Cancel" actions.
   */
  templateActions: 'Add' | 'Apply' | 'Edit' | 'Copy' | 'Delete';
  contactType: TransferContactType;
  isDialPadInput: boolean;
}

/**
 * Utility type to pick a subset of EventProperty by keys.
 */
type TrackEventPropertyData<K extends keyof TrackEventProperty> = Pick<
  TrackEventProperty,
  K
>;

type AiNotesPreferencePayload = {
  newValue: boolean;
  previousValue: boolean;
  errorCode?: string;
};

type AiNotesSavePayload = {
  aiNotesStatus: string;
  success: boolean;
  errorCode?: string;
};

/**
 * Type-safe mapping of event names to their properties.
 * This ensures that the properties passed to trackEvent are type-checked
 * against the event name.
 */
export type TrackEventPropertyMap = {
  Int_signIn: TrackEventPropertyData<'signInResult' | 'signInSource'>;
  Int_signOut: TrackEventPropertyData<'signOutSource' | 'payload'>;
  Int_autoHeartBeat: TrackEventPropertyData<'extensionPermission'>;
  Int_Phone_callMade: TrackEventPropertyData<
    'callingOptionSetup' | 'callMadeLocation'
  >;
  Int_Phone_callEventResult: TrackEventPropertyData<
    | 'callDirection'
    | 'callNumberType'
    | 'callContactMatch'
    | 'callActions'
    | 'callDuration'
    | 'callQueueCall'
  >;
  Int_CRM_logCall: TrackEventPropertyData<'crmLogType' | 'crmLogTrigger'> & {
    payload?: {
      aiNotesLogged: boolean;
      aiNotesPreviouslySaved: boolean;
      aiNotesStatus: string;
    };
  };
  // 'Log Call' is the analytics event string for SFTrackEvents.createCallLog
  'Log Call': {
    aiNotesLogged: boolean;
  };
  Int_CRM_logText: TrackEventPropertyData<'crmLogType' | 'crmLogTrigger'>;
  include_ai_notes_when_logging_the_call: {
    payload: AiNotesPreferencePayload;
  };
  save_to_crm_confirmation_checkbox_toggled: {
    payload: AiNotesPreferencePayload;
  };
  call_log_ai_notes_tab_viewed: {};
  ai_notes_tab_save_to_crm_clicked: {
    payload: AiNotesSavePayload;
  };
  ai_notes_auto_log_attempted: {
    payload: AiNotesSavePayload;
  };
  Int_Con_ConnectionDetails_ActivitySyncToggle: TrackEventPropertyData<
    'crmName' | 'aalSwitchOption'
  >;
  Int_Text_textSent: TrackEventPropertyData<
    'textSentType' | 'textType' | 'isGroupText' | 'isPager'
  >;
  Int_Fax_faxSent: TrackEventPropertyData<'faxAttachmentCount'>;
  Int_Browser_quickActionsTriggered: TrackEventPropertyData<
    'quickActionType' | 'quickActionTrigger'
  >;
  Int_Browser_quickAccessTriggered: TrackEventPropertyData<'quickAccessActionType'>;
  Int_Widget_viewWidget: TrackEventPropertyData<'widgetName'>;
  Int_Widget_widgetAction: TrackEventPropertyData<
    'widgetName' | 'widgetAction'
  >;
  Int_Text_useTemplate: TrackEventPropertyData<'templateActions'>;
  Int_SMS_addConsent: SmsConsentRecordTrackProperties;
  Int_SMS_viewConsent:
    | SmsConsentRecordTrackProperties
    | Pick<SmsConsentRecordTrackProperties, 'consentEntry'>;
  Int_SMS_consentManagement: {};
  'Transfer: Click Ask First/Transfer page': TrackEventPropertyData<
    'contactType' | 'isDialPadInput'
  >;
  'Transfer: Click Transfer/Transfer page': TrackEventPropertyData<
    'contactType' | 'isDialPadInput'
  >;
  'Transfer: Click To Voicemail/Transfer page': TrackEventPropertyData<
    'contactType' | 'isDialPadInput'
  >;
  'Transfer to external voicemail failed': Record<string, never>;
  CPR_Logs_Downloaded: {};
  CPR_Submitted: {};
  Support_Case_Created: {};
};
