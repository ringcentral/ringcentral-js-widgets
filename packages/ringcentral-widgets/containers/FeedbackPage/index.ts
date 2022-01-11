import FeedbackPanel from '../../components/FeedbackPanel';
import { connectModule } from '../../lib/phoneContext';

export const FeedbackPage = connectModule((phone) => phone.feedbackUI)(
  FeedbackPanel,
);
