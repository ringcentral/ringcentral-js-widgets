import { StepFunction } from '../../lib/step';
import { CommonLogin, LoginProps } from './CommonLogin';
import { CreateMock } from '../Mock';
import { CreateInstance } from '../CreateInstance';

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
