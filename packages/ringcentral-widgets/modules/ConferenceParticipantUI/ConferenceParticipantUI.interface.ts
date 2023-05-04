import {
  ConferenceCall,
  Party,
  PartyState,
} from '@ringcentral-integration/commons/modules/ConferenceCall';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

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
  accountInfo: AccountInfo;
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
