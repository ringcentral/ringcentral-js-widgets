import { LoginPanel } from '../../components/LoginPanel';
import { connectModule } from '../../lib/connectModule';

export type LoginPageProps = {
  onLoading: Function;
  onLoadingComplete: Function;
};

export const LoginPage = connectModule<LoginPageProps>(
  (phone) => phone.loginUI,
)(LoginPanel);
