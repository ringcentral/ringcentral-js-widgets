import type { AccountInfo } from '@ringcentral-integration/commons/modules/AccountInfo';
import type {
  ConferenceCall,
  Party,
  PartyState,
} from '@ringcentral-integration/commons/modules/ConferenceCall';
import type { Locale } from '@ringcentral-integration/commons/modules/Locale';
import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import type { Webphone } from '@ringcentral-integration/commons/modules/Webphone';

import type { RouterInteraction } from '../RouterInteraction';

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
