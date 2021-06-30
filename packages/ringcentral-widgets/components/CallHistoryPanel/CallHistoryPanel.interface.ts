import { Call } from '@ringcentral-integration/commons/interfaces/Call.interface';
import { SvgSymbol } from '@ringcentral/juno';

export interface CallLog extends Call {
  callTime?: string;
  callDate?: string;
  isDisposed?: boolean;
}

export interface CallLogActionButton {
  icon?: SvgSymbol;
  label: string;
  disabled?: boolean;
  dataSign?: string;
  action?: () => Promise<void> | void;
}

export interface CallLogMenuButton {
  icon?: SvgSymbol;
  label: string;
  disabled?: boolean;
  dataSign?: string;
  subMenu?: (CallLogMenuButton & CallLogActionButton)[];
}

export type CallLogMenuItem = CallLogActionButton & CallLogMenuButton;
export type CallLogMenu = CallLogMenuItem[];

export interface CallsTreeNode {
  name: string;
  depth: number;
  children?: string[];
  call?: CallLog;
}

export interface CallsTree {
  [key: string]: CallsTreeNode;
}
