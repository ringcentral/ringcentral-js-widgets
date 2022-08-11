import { StepFunction } from '../lib/step';
import { CommonLogin } from './CommonLogin';
import { CreateInstance } from './CreateInstance';
import { CreateMock, MockExtensionInfo, MockGetPhoneNumber } from './Mock';

interface LoginProps {
  username?: string;
  password?: string;
  shouldWaitForConnected?: boolean;
}

const Login: StepFunction<LoginProps> = async (props) => {
  return (
    <>
      <CreateMock />
      <MockExtensionInfo />
      <MockGetPhoneNumber />
      <CommonLogin {...props} CreateInstance={CreateInstance} />
    </>
  );
};

export { Login };
