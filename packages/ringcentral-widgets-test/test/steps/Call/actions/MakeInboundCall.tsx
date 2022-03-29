import {
  initACall,
  InitACallProps,
} from '../../../../__test__/support/activeSessionCallHelper';
import { StepFunction } from '../../../lib/step';

export const MakeInboundCall: StepFunction<InitACallProps> = async (
  { phoneNumber = '+18882556247', fromNumberData, startTime, ...props },
  context,
) => {
  await initACall({
    phoneNumber,
    fromNumberData,
    direction: 'Inbound',
    startTime,
    ...props,
  });
};
