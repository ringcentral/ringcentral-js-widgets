import { StepFunction } from '../../../lib/step';
import { MakeInboundCall } from './MakeInboundCall';
import { MakeOutboundCall } from './MakeOutboundCall';

interface MakeCallProps {
  phoneNumber?: string;
  direction?: 'Inbound' | 'Outbound';
}

export const MakeCall: StepFunction<MakeCallProps> = async (
  { phoneNumber = '+18882556247', direction = 'Outbound' },
  context,
) => {
  if (direction === 'Inbound') {
    return <MakeInboundCall phoneNumber={phoneNumber} />;
  }
  return <MakeOutboundCall phoneNumber={phoneNumber} />;
};
