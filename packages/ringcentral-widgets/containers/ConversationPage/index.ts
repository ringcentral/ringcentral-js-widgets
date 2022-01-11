import ConversationPanel from '../../components/ConversationPanel';
import { connectModule } from '../../lib/phoneContext';

const ConversationPage = connectModule((phone) => phone.conversationUI)(
  ConversationPanel,
);

export { ConversationPage as default, ConversationPage };
