import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';

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
  logo?: (...args: any[]) => JSX.Element;
}

export interface HeaderContainerProps {
  standAlone?: boolean;
  logo?: (...args: any[]) => JSX.Element;
}
