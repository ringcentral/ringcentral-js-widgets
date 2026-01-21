import { screen, StepFunction } from '@ringcentral-integration/test-utils';

interface CheckFromFieldExistsProps {}

export const CheckFromFieldExists: StepFunction<
  CheckFromFieldExistsProps
> = () => {
  expect(screen.getByTitle('From:')).toBeTruthy();
};
