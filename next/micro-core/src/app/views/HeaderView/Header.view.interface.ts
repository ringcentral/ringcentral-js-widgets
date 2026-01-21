import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import type { IContact } from '@ringcentral-integration/commons/interfaces/Contact.model';
import type { ContactAvatar } from '@ringcentral-integration/micro-contacts/src/app/components/ContactAvatar';
import type { HeaderView } from '@ringcentral-integration/widgets/components/HeaderView';

export interface HeaderViewOptions {
  component?: typeof HeaderView;
}

export interface HeaderViewProps {
  userStatus?: string;
  dndStatus?: string;
  standAlone?: boolean;
  ringingCalls?: Call[];
  currentCalls?: Call[];
  onHoldCalls?: Call[];
  currentPath: string;
  activeSessionId?: string;
  incomingCallPageMinimized?: boolean;
  currentLocale: string;
  presenceReady?: boolean;
  onCurrentCallBtnClick: () => void;
  onViewCallBtnClick: () => void;
  setAvailable: () => void;
  setBusy: () => void;
  setDoNotDisturb: () => void;
  setInvisible: () => void;
  logoUrl?: string;
  shouldDisplayCurrentCallBtn?: boolean;
  shouldDisplayViewCallsBtn?: boolean;
  shouldHideRingingCallStatus?: boolean;
  // spring-ui only
  onActionClick?: (action: 'logout') => void;
  onPresenceChange?: (type: 'available' | 'busy' | 'DND' | 'offline') => void;
  userContact?: IContact;
  ContactAvatar?: typeof ContactAvatar;
  loginNumber?: string;
}

export interface HeaderContainerProps {
  standAlone?: boolean;
  logo?: (...args: any[]) => JSX.Element;
}
