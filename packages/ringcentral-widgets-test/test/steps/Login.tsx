import type { StepFunction } from '../lib/step';
import { CommonLogin } from './CommonLogin';
import { CreateInstance } from './CreateInstance';
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
      <CommonLogin
        {...props}
        CreateInstance={
          props.reLogin
            ? () => {
                context.rcMock.init();
                // don't createPhone when re-login
              }
            : CreateInstance
        }
      />
    </>
  );
};

export { Login };
