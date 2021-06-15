import { connectModule } from '../../lib/phoneContext';
import ConversationsPanel from '../../components/ConversationsPanel';

const ConversationsPage = connectModule((phone) => phone.conversationsUI)(
  ConversationsPanel,
);

export { ConversationsPage, ConversationsPage as default };
