import { SvgSymbol } from '@ringcentral/juno';

import { Call } from './Call.interface';

export interface CallLog extends Call {
  callTime?: string;
  callDate?: string;
  isDisposed?: boolean;
}

export interface CallLogActionButton {
  icon?: SvgSymbol;
  label: string;
  disabled?: boolean;
  action?: () => Promise<void> | void;
}

export interface CallLogMenuButton {
  icon?: SvgSymbol;
  label: string;
  disabled?: boolean;
  subMenu?: (CallLogMenuButton & CallLogActionButton)[];
}

export type CallLogMenuItem = CallLogActionButton & CallLogMenuButton;
export type CallLogMenu = CallLogMenuItem[];
