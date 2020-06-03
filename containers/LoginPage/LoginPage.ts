import { LoginPanel } from '../../components/LoginPanel';
import { connectModule } from '../../lib/connectModule';

export const LoginPage = connectModule((phone) => phone.loginUI)(LoginPanel);
