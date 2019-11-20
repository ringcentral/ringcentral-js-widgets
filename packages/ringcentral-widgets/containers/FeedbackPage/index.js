import { connectModule } from '../../lib/phoneContext';
import FeedbackPanel from '../../components/FeedbackPanel';

export default connectModule((phone) => phone.feedbackUI)(FeedbackPanel);
