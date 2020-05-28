import { DirectTransferTypes } from '../../../enums/directTransferTypes';
import { DirectTransferStatues } from '../../../enums/directTransferStatues';

export interface EvDirectAgentTransferCallback {
  (data: {
    message: string;
    detail: string;
    status: DirectTransferStatues;
    type: DirectTransferTypes;
  }): void;
}
