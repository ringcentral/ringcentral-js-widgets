import { DirectTransferTypes } from '../../../enums/directTransferTypes';
import { DirectTransferStatues } from '../../../enums/directTransferStatues';

export type EvDirectAgentTransferCall = {
  message: string;
  detail: string;
  status: DirectTransferStatues;
  type: DirectTransferTypes;
};

export type EvDirectAgentTransferCallback = (
  data: EvDirectAgentTransferCall,
) => void;
