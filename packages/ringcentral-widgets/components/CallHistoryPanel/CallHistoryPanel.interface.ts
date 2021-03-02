import { CallLog } from 'ringcentral-integration/interfaces/CallLog.interface';
import { SvgSymbol } from '@ringcentral/juno';

export interface CallsTreeNode {
  name: string;
  depth: number;
  children?: string[];
  call?: CallLog;
}

export interface CallsTree {
  [key: string]: CallsTreeNode;
}
