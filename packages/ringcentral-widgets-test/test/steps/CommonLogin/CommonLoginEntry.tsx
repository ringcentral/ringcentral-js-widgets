import type { StepFunction } from '../../lib/step';
import { CreateInstance } from '../CreateInstance';
import { CreateMock } from '../Mock';

import type { LoginProps } from './CommonLogin';
import { CommonLogin } from './CommonLogin';

export const CommonLoginEntry: StepFunction<LoginProps> = async (
  props,
  context,
) => {
  return (
    <>
      <CreateMock />
      <CommonLogin {...props} CreateInstance={CreateInstance} />
    </>
  );
};
