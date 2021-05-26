import { Locale } from 'ringcentral-integration/modules/LocaleV2';
import {
  ConferenceCall,
  Party,
  PartyState,
} from 'ringcentral-integration/modules/ConferenceCallV2';
import { Webphone } from 'ringcentral-integration/modules/WebphoneV2';
import { RegionSettings } from 'ringcentral-integration/modules/RegionSettingsV2';
import { RouterInteraction } from '../RouterInteraction';

export interface ConferenceParticipantUIOptions {
  //
}

export interface Deps {
  locale: Locale;
  conferenceCall: ConferenceCall;
  webphone: Webphone;
  regionSettings: RegionSettings;
  routerInteraction: RouterInteraction;
  conferenceParticipantUIOptions?: ConferenceParticipantUIOptions;
}

// TODO: move to ConferenceParticipantPanel
export interface ConferenceParticipantPanelProps {
  currentLocale: string;
  participants: (Party & PartyState)[];
  sessionCount: number;
  onBackButtonClick: () => void;
  removeFunc: (id: string) => Promise<boolean>;
  formatPhone: (phoneNumber: string) => string;
  // user action track functions
  afterOnRemoveBtnClick: () => void;
  afterOnCancel: () => void;
}
