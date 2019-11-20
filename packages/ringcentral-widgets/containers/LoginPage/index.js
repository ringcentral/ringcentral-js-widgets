import { connectModule } from '../../lib/phoneContext';
import LoginPanel from '../../components/LoginPanel';

export default connectModule((phone) => phone.loginUI)(LoginPanel);
