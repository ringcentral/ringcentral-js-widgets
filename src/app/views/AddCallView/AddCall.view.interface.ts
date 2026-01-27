import type { DialerViewCallParams } from '../DialerView';

import type { AddCallPanel } from './deprecated';

export interface AddCallViewOptions {
  component?: typeof AddCallPanel;
}

export interface RecipientProps {
  isPrimary: boolean;
  name: string;
  phoneNumber: string;
  id?: string;
  phoneType?: string;
  presenceStatus?: string;
  profileImageUrl?: string;
  type?: string;
  isDirectlyProceed?: boolean;
  freeSolo?: boolean;
}

export interface AddCallViewPanelProps {
  currentLocale: string;
  callVolume: number;
  outputDeviceId: string;
  searchContactList: {
    id: string;
    name: string;
    phoneNumber: string;
  }[];
  controlBusy: boolean;
  onBack: () => void;
  triggerEventTracking: (eventName: string, contactType: string) => void;
  formatPhone: (phoneNumber: string) => string;
  searchContact: (searchString: string) => void;
  onAddCall: (params: DialerViewCallParams) => void;
  hasCalls: boolean;
}

export interface AddCallViewProps {
  children?: React.ReactNode;
  phoneTypeRenderer?: (...args: any[]) => any;
  phoneSourceNameRenderer?: (...args: any[]) => any;
}
