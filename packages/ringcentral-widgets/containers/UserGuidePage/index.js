import { connectModule } from '../../lib/phoneContext';
import UserGuide from '../../components/UserGuide';

export default connectModule((phone) => phone.userGuideUI)(UserGuide);
