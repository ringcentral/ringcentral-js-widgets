import type { ActiveCallControlSessionData } from '@ringcentral-integration/commons/interfaces/ActiveSession.interface';
import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';

export interface ConferenceCallParticipantsProps {
  currentTelephonySessionId: string;
  isOpen: boolean;
  participants?: ActiveCallControlSessionData['conferenceParticipants'];
  currentLocale: string;
  toggleConference: (open: boolean) => void;
  openEntityDetailLink?: (id: string) => void;
  getContactNameInfo: (
    sessionId: string,
    isHost?: boolean,
  ) => {
    logName?: string;
    subContactNameDisplay?: string;
    entityDetailLink?: string;
    entityDetailLinkId?: string;
    displayEntity?: any;
    entityType?: string;
  };
  onRemoveParticipant: (
    telephonySessionId: string,
    removedPartyId: string,
  ) => Promise<void>;
  renderAvatar?: (item: {
    displayEntity?: IContact;
    entityType?: string;
    name?: string;
  }) => JSX.Element;
  clickRemoveParticipantTrack?: () => void;
}
