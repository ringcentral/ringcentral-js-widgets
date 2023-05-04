import { ReplyWithMessagePanel } from '../../components/ReplyWithMessagePanel';
import { connectModule } from '../../lib/phoneContext';

export const ReplyWithMessagePage = connectModule(
  (phone) => phone.replyWithMessageUI,
)(ReplyWithMessagePanel);
