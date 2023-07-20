import type { StepFunction } from '../../../lib/step';

export const CheckIsMeetingPage: StepFunction = async (props, { phone }) => {
  expect(phone.routerInteraction.currentPath).toEqual('/meeting');
};
