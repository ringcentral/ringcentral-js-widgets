import {
  ConferenceCall,
  Party,
  PartyState,
} from '@ringcentral-integration/commons/modules/ConferenceCallV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { Webphone } from '@ringcentral-integration/commons/modules/WebphoneV2';

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
