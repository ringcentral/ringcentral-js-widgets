import { Call as OriginCall } from 'ringcentral-integration/interfaces/Call.interface';

export interface Call extends OriginCall {
  callTime?: string;
  callDate?: string;
}

export interface CallsTreeNode {
  name: string;
  depth: number;
  children?: string[];
  call?: Call;
}

export interface CallsTree {
  [key: string]: CallsTreeNode;
}
