import type { StepFunction } from '@ringcentral-integration/test-utils';

import { Login as CommonLogin } from './Login';
import { CreateMock, MockExtensionInfo, MockGetPhoneNumber } from './Mock';

interface LoginProps {
  username?: string;
  password?: string;
  shouldWaitForConnected?: boolean;
  reLogin?: boolean;
}

const Login: StepFunction<LoginProps> = async (props, context) => {
  return (
    <>
      <CreateMock />
      <MockExtensionInfo />
      <MockGetPhoneNumber />
      <CommonLogin {...props} />
    </>
  );
};

export { Login };
