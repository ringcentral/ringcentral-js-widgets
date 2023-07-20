import type { StepFunction } from '../../../lib/step';

export const CheckInDialPage: StepFunction = async (props, context) => {
  const { phone } = context;
  expect(phone.routerInteraction.currentPath).toBe('/dialer');
};
