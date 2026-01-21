import type { StepFunction } from '@ringcentral-integration/test-utils';

import { Entry, type EntryProps } from './Entry';
import { Login, type LoginProps } from './Login';

interface LoginWithMockProps extends LoginProps, EntryProps {}

const LoginWithMock: StepFunction<LoginWithMockProps> = async (props) => {
  return (
    <>
      <Entry />
      <Login {...props} />
    </>
  );
};

export { LoginWithMock };
