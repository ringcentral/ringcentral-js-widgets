import { Brand } from '@ringcentral-integration/micro-core/src/app/services';
import {
  computed,
  injectable,
  optional,
  RcModule,
} from '@ringcentral-integration/next-core';

import { Auth } from '../Auth';
import { ExtensionFeatures } from '../ExtensionFeatures';

import type {
  AppFeaturesOptions,
  FeatureConfiguration,
} from './AppFeatures.interface';

// Required<FeatureConfiguration> helps to make sure that the default config aligns with the interface
export const defaultConfiguration: Required<FeatureConfiguration> = {
  CallLog: true,
  // Conferencing
  Conferencing: true,

  // Messages
  Fax: true,
  Voicemail: true,
  Pages: true,
  SMS: true,

  // Call
  RingCentralApp: true,
  RingOut: true,
  Softphone: true,
  WebPhone: true,
  CallControl: true,
  ConferenceCall: true,

  // Meetings
  Meetings: true,

  // Glip
  Glip: false,

  // Contacts Tab
  Contacts: true,
  HideContactsWhenNoCallOrMessage: true,

  // CompanyDirectoryControl
  CDC: process.env.THEME_SYSTEM === 'spring-ui',

  // Enterprise dial plan
  EDP: process.env.THEME_SYSTEM === 'spring-ui',

  // does enable smart note
  SmartNote: false,
};

@injectable({
  name: 'AppFeatures',
})
export class AppFeatures<
  T extends FeatureConfiguration = FeatureConfiguration,
> extends RcModule {
  constructor(
    protected _auth: Auth,
    protected _extensionFeatures: ExtensionFeatures,
    protected _brand: Brand,
    @optional('FeatureConfiguration')
    protected _featureConfiguration?: FeatureConfiguration,
    @optional('AppFeaturesOptions')
    protected _appFeaturesOptions?: AppFeaturesOptions,
  ) {
    super();
  }

  @computed((that: AppFeatures) => [that._featureConfiguration])
  get config(): T {
    return {
      ...defaultConfiguration,
      ...this._featureConfiguration!,
    } as T;
  }

  get isSmartNoteEnabled() {
    return !!this.config.SmartNote;
  }

  // TODO: investigate on how or whether to include softphone and ringcentral app settings
  get isCallingEnabled() {
    return this.isRingOutEnabled || this.isWebPhoneEnabled;
  }

  get isCallForwardingEnabled() {
    return !!this._extensionFeatures.features?.CallForwarding?.available;
  }

  get isWebPhoneEnabled() {
    return !!(
      this._extensionFeatures.features?.WebPhone?.available &&
      this.config.WebPhone
    );
  }

  get isCallQueueEnabled() {
    return !!(
      this._extensionFeatures.features?.CallQueuePresence?.available &&
      this._extensionFeatures.features?.EditCallQueuePresence?.available &&
      this._extensionFeatures.features?.ReadPresenceStatus?.available
    );
  }

  get enableAcceptQueueCallsControl() {
    return !!this._extensionFeatures.features?.AcceptQueueCalls?.available;
  }

  get isRingOutEnabled() {
    return !!(
      this._extensionFeatures.features?.RingOut?.available &&
      this.config.RingOut
    );
  }

  get isSoftphoneEnabled() {
    return !!(
      this.config.Softphone && !this._brand.brandConfig?.isDisableSpartan
    );
  }

  get isRingCentralAppEnabled() {
    return !!this.config.RingCentralApp;
  }

  get hasReadSMSPermission() {
    return !!(
      this._extensionFeatures.features?.SMSReceiving?.available &&
      this.config.SMS
    );
  }

  get hasCallRecordingPermission() {
    return !!this._extensionFeatures.features?.OnDemandCallRecording?.available;
  }

  get hasReadPagesPermission() {
    return !!(
      this._extensionFeatures.features?.PagesReceiving?.available &&
      this.config.Pages
    );
  }

  get hasVoicemailPermission() {
    return !!(
      this._extensionFeatures.features?.Voicemail?.available &&
      this.config.Voicemail
    );
  }

  get hasReadFaxPermission() {
    return !!(
      this._extensionFeatures.features?.FaxReceiving?.available &&
      this.config.Fax
    );
  }

  get hasSendFaxPermission() {
    return !!(
      this._extensionFeatures.features?.FaxSending?.available && this.config.Fax
    );
  }

  get hasReadTextPermission() {
    return this.hasReadSMSPermission || this.hasReadPagesPermission;
  }

  get hasReadMessagesPermission() {
    return (
      this.hasReadSMSPermission ||
      this.hasReadPagesPermission ||
      this.hasVoicemailPermission ||
      this.hasReadFaxPermission
    );
  }

  get hasSendSMSPermission() {
    return !!(
      this._extensionFeatures.features?.SMSSending?.available && this.config.SMS
    );
  }

  get hasSendMMSPermission() {
    return !!(
      this._extensionFeatures.features?.MMSSending?.available && this.config.SMS
    );
  }

  get hasOutboundSMSPermission() {
    return this.hasSendSMSPermission;
  }

  get hasSendPagesPermission() {
    return !!(
      this._extensionFeatures.features?.PagesSending?.available &&
      this.config.Pages
    );
  }

  get hasInternalSMSPermission() {
    return this.hasSendPagesPermission;
  }

  get hasComposeTextPermission() {
    return this.hasSendSMSPermission || this.hasSendPagesPermission;
  }

  get hasMeetingsPermission() {
    return !!(
      this._extensionFeatures.features?.Meetings?.available &&
      this.config.Meetings
    );
  }

  get hasRoomConnectorBeta() {
    return !!this._extensionFeatures.features?.RoomConnectorBeta?.available;
  }

  get hasVideoE2EE() {
    return !!this._extensionFeatures.features?.MeetingsEncryption?.available;
  }

  get readExtensionCallLogAvailable() {
    return this._extensionFeatures.features?.ReadExtensionCallLog?.available;
  }

  get hasReadExtensionCallLog() {
    return !!(this.readExtensionCallLogAvailable && this.config.CallLog);
  }

  get hasConferenceCall() {
    return (
      this.isRingOutEnabled &&
      this.isWebPhoneEnabled &&
      this.config.ConferenceCall
    );
  }

  get hasConferencing() {
    return !!(
      this._extensionFeatures.features?.Conferencing?.available &&
      this.config.Conferencing
    );
  }

  get hasGlipPermission() {
    return !!(
      this._extensionFeatures.features?.Glip?.available && this.config.Glip
    );
  }

  get hasCallControl() {
    return !!(
      (this._auth.token?.scope?.indexOf('CallControl')! > -1 ||
        this._auth.token?.scope?.indexOf('TelephonySession')! > -1) &&
      this.config.CallControl
    );
  }

  get hasDndPermission() {
    return this._extensionFeatures.features?.DND?.available;
  }

  get isContactsEnabled() {
    return (
      this.config.Contacts &&
      (!this.config.HideContactsWhenNoCallOrMessage ||
        (this.config.HideContactsWhenNoCallOrMessage &&
          (this.isCallingEnabled || this.hasReadMessagesPermission)))
    );
  }

  get isCDCEnabled() {
    return !!this.config.CDC;
  }

  get isOCPEnabled() {
    return this._extensionFeatures.features?.OutboundCallPrefix?.available;
  }

  get OCPValue() {
    if (this.isOCPEnabled) {
      return this._extensionFeatures.features?.OutboundCallPrefix?.params?.[0]
        ?.value;
    }
    return null;
  }

  get enableSmartDialPlan() {
    return (
      this._extensionFeatures.features?.SmartDialPlanRouting?.available &&
      this.isEDPEnabled
    );
  }

  get isEDPEnabled() {
    return !!this.config.EDP && this._brand.brandConfig.enableEDP;
  }

  get hasReadCallRecordings() {
    return this._extensionFeatures.features?.ReadExtensionCallRecordings
      ?.available;
  }

  getAppDefaultRoutePath() {
    if (process.env.NODE_ENV !== 'production') {
      if (!this.ready) {
        throw new Error(
          'AppFeatures is not ready, must wait until ready before calling getAppDefaultRoutePath',
        );
      }
    }

    const guards = [
      () => [this.isCallingEnabled, '/dialer/keypad'] as const,
      () =>
        [
          this.isCallingEnabled || this.hasReadExtensionCallLog,
          '/dialer/history',
        ] as const,
      () => [this.hasReadTextPermission, '/messages'] as const,
    ];

    for (const guard of guards) {
      const [permission, path] = guard();
      if (permission) {
        return path;
      }
    }

    return '/settings';
  }

  get appScopes() {
    return (this._auth.token && this._auth.token.scope) || '';
  }

  get hasSmartNotePermission() {
    return (
      this.enabledAIInternal &&
      (this._extensionFeatures.features?.RingSenseMVP?.available ?? false) &&
      this.hasAIGeneratedNotes &&
      this.hasVoiceCallsLiveTranscriptions &&
      this.hasVoiceCallsCloseCaptioning
    );
  }

  get enabledAIInternal() {
    return (
      this.config.SmartNote &&
      this.appScopes.indexOf('AIInternal') > -1 &&
      this.appScopes.indexOf('TelephonySessions') > -1
    );
  }

  get hasAIGeneratedNotes() {
    return (
      this.enabledAIInternal &&
      (this._extensionFeatures.features?.AIGeneratedNotes?.available ?? false)
    );
  }

  get hasVoiceCallsLiveTranscriptions() {
    return (
      this.enabledAIInternal &&
      (this._extensionFeatures.features?.VoiceCallsLiveTranscriptions
        ?.available ??
        false)
    );
  }

  get hasVoiceCallsCloseCaptioning() {
    return (
      this.enabledAIInternal &&
      (this._extensionFeatures.features?.VoiceCallsCloseCaptioning?.available ??
        false)
    );
  }

  get hasEditPresenceStatus() {
    return (
      // app scopes must include EditPresence
      this._auth.token.scope?.includes('EditPresence') &&
      // user must have permission to edit presence status
      !!this._extensionFeatures.features?.EditPresenceStatus?.available
    );
  }
}
