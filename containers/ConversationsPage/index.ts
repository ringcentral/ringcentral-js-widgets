import { ConversationsPanel } from '../../components/ConversationsPanel';
import { connectModule } from '../../lib/phoneContext';

const ConversationsPage = connectModule((phone) => phone.conversationsUI)(
  ConversationsPanel,
);

export { ConversationsPage as default, ConversationsPage };
