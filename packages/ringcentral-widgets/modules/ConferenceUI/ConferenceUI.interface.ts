import { Alert } from '@ringcentral-integration/commons/modules/AlertV2';
import { AppFeatures } from '@ringcentral-integration/commons/modules/AppFeatures';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';
import { Call } from '@ringcentral-integration/commons/modules/CallV2';
import { ComposeText } from '@ringcentral-integration/commons/modules/ComposeTextV2';
import { Locale } from '@ringcentral-integration/commons/modules/Locale';
import { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';

import { RouterInteraction } from '../../modules/RouterInteraction';

export interface Deps {
  conference: any;
  regionSettings: RegionSettings;
  locale: Locale;
  composeText: ComposeText;
  appFeatures: AppFeatures;
  brand: Brand;
  alert: Alert;
  call: Call;
  routerInteraction: RouterInteraction;
}

export interface ConferenceContainerProps {
  enableAutoEnterHostKey?: boolean;
}

export interface ConferencePanelProps {
  dialInNumbers: {
    region: string;
    phoneNumber: string;
  }[];
  dialInNumber: string;
  hostCode: string;
  participantCode: string;
  allowJoinBeforeHost: boolean;
  additionalNumbers: any[];
  disableTxtBtn: boolean;
  countryCode: string;
  areaCode: string;
  currentLocale: string;
  brandName: string;
  dialInNumbersLink: string;
  conferenceInviteText: string;
  showSpinner: boolean;
  showSaveAsDefault: boolean;
  alert: (msg: string) => void;
  updateDialInNumber: (dialInNumber: string) => void;
  updateAdditionalNumbers: (additionalDialInNumbers: any) => void;
  inviteWithText: (text: string) => void;
  joinAsHost: (dialInNumber: string) => void;
  onAllowJoinBeforeHostChange: (allowJoinBeforeHost: boolean) => void;
  showHelpCommands: () => void;
}
