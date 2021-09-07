import { BasicCall } from '@ringcentral-integration/commons/interfaces/Call.interface';

export interface HeaderViewProps {
  userStatus?: string;
  dndStatus?: string;
  standAlone?: boolean;
  ringingCalls?: BasicCall[];
  currentCalls?: BasicCall[];
  onHoldCalls?: BasicCall[];
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
}

export interface Props extends HeaderViewProps {
  logo: any;
  children?: any;
}
