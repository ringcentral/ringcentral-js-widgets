import { InboundQueuesPanel } from '../../components/InboundQueuesPanel';
import { connectModule } from '../../lib/connectModule';

export const InboundQueuesPage = connectModule(
  (phone) => phone.evInboundQueuesUI,
)(InboundQueuesPanel);
