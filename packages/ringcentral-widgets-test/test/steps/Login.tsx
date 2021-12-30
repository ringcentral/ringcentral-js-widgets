import * as mock from '@ringcentral-integration/commons/integration-test/mock';
import { StepFunction } from '../lib/step';
import { getInstance } from '../lib/getInstance';
import { CommonLogin } from './CommonLogin';

interface LoginProps {
  username?: string;
  password?: string;
  shouldWaitForConnected?: boolean;
}

const Login: StepFunction<LoginProps> = async (props) => {
  return <CommonLogin {...props} getInstance={getInstance} />;
};

export { Login };
