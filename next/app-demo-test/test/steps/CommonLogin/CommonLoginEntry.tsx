import type { StepFunction } from '@ringcentral-integration/test-utils';

import { CreateInstance } from '../CreateInstance';
import { CreateMock } from '../Mock';

import type { LoginProps } from './CommonLogin';
import { CommonLogin } from './CommonLogin';

export const CommonLoginEntry: StepFunction<LoginProps> = async (props) => {
  return (
    <>
      <CreateMock />
      <CommonLogin {...props} CreateInstance={CreateInstance} />
    </>
  );
};
