import LoginPanel from '../../components/LoginPanel';
import { connectModule } from '../../lib/phoneContext';
import { GetLoginUIProps } from '../../modules/LoginUIV2';

export const LoginPage = connectModule<any, GetLoginUIProps>(
  (phone: any) => phone.blockUI,
)(LoginPanel);
