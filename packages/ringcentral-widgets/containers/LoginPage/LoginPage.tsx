import { LoginPanel } from '../../components/LoginPanel';
import { connectModule } from '../../lib/phoneContext';
import type { LoginContainerProps } from '../../modules/LoginUI';

export const LoginPage = connectModule<any, LoginContainerProps>(
  (phone: any) => phone.loginUI,
)(LoginPanel);
