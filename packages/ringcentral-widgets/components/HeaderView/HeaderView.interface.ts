import type { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import type { ReactNode } from 'react';

export interface HeaderViewProps {
  children?: ReactNode;
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
}
