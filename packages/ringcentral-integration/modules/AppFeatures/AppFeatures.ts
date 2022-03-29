import { computed, RcModuleV2 } from '@ringcentral-integration/core';

import { Module } from '../../lib/di';
import { Deps, FeatureConfiguration } from './AppFeatures.interface';

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
  CDC: false,
};

/**
 * AppFeatures:
 * * This module manages and provide access to feature toggle settings. This module also provide ways to dynamically update these settings. However, to avoid putting this module high in the dependency tree, this module only provide methods to update the settings that are cached in storage, but does not have the ability to make queries to external api to update settings on its own.
 * * (TODO): Implement cached settings and update settings features.
 * * (TODO): Brand module should depend on this and set the toggle based on brand if applicable. This module should not have other dependencies so it can be ready to use early in the init process.
 */

@Module({
  name: 'AppFeatures',
  deps: [
    'Auth',
    'ExtensionFeatures',
    {
      dep: 'FeatureConfiguration',
      optional: true,
    },
    {
      dep: 'AppFeaturesOptions',
      optional: true,
    },
  ],
})
export abstract class AppFeaturesBase<
  T extends FeatureConfiguration = FeatureConfiguration,
> extends RcModuleV2<Deps<T>> {
  constructor(deps: Deps<T>) {
    super({
      deps,
    });
  }

  @computed(({ _deps: { featureConfiguration } }: AppFeaturesBase) => [
    featureConfiguration,
  ])
  get config(): T {
    return {
      ...defaultConfiguration,
      ...this._deps.featureConfiguration,
    };
  }

  // TODO: investigate on how or whether to include softphone and ringcentral app settings
  get isCallingEnabled() {
    return this.isRingOutEnabled || this.isWebPhoneEnabled;
  }

  get isWebPhoneEnabled() {
    return !!(
      this._deps.extensionFeatures.features?.WebPhone?.available &&
      this.config.WebPhone
    );
  }

  get isRingOutEnabled() {
    return !!(
      this._deps.extensionFeatures.features?.RingOut?.available &&
      this.config.RingOut
    );
  }

  get isSoftphoneEnabled() {
    return !!this.config.Softphone;
  }

  get isRingCentralAppEnabled() {
    return !!this.config.RingCentralApp;
  }

  get hasReadSMSPermission() {
    return !!(
      this._deps.extensionFeatures.features?.SMSReceiving?.available &&
      this.config.SMS
    );
  }

  get hasReadPagesPermission() {
    return !!(
      this._deps.extensionFeatures.features?.PagesReceiving?.available &&
      this.config.Pages
    );
  }

  get hasVoicemailPermission() {
    return !!(
      this._deps.extensionFeatures.features?.Voicemail?.available &&
      this.config.Voicemail
    );
  }

  get hasReadFaxPermission() {
    return !!(
      this._deps.extensionFeatures.features?.FaxReceiving?.available &&
      this.config.Fax
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
      this._deps.extensionFeatures.features?.SMSSending?.available &&
      this.config.SMS
    );
  }

  get hasOutboundSMSPermission() {
    return this.hasSendSMSPermission;
  }

  get hasSendPagesPermission() {
    return !!(
      this._deps.extensionFeatures.features?.PagesSending?.available &&
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
      this._deps.extensionFeatures.features?.Meetings?.available &&
      this.config.Meetings
    );
  }

  get hasRoomConnectorBeta() {
    return !!this._deps.extensionFeatures.features?.RoomConnectorBeta
      ?.available;
  }

  get hasVideoE2EE() {
    return !!this._deps.extensionFeatures.features?.MeetingsEncryption
      ?.available;
  }

  get hasReadExtensionCallLog() {
    return !!(
      this._deps.extensionFeatures.features?.ReadExtensionCallLog?.available &&
      this.config.CallLog
    );
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
      this._deps.extensionFeatures.features?.Conferencing?.available &&
      this.config.Conferencing
    );
  }

  get hasGlipPermission() {
    return !!(
      this._deps.extensionFeatures.features?.Glip?.available && this.config.Glip
    );
  }

  get hasCallControl() {
    return (
      (this._deps.auth.token?.scope?.indexOf('CallControl') > -1 ||
        this._deps.auth.token?.scope?.indexOf('TelephonySession') > -1) &&
      this.config.CallControl
    );
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
    return this._deps.extensionFeatures.features?.OutboundCallPrefix?.available;
  }
  get OCPValue() {
    if (this.isOCPEnabled) {
      return this._deps.extensionFeatures.features?.OutboundCallPrefix
        ?.params[0]?.value;
    }
    return '';
  }
}

@Module()
export class AppFeatures extends AppFeaturesBase {}
