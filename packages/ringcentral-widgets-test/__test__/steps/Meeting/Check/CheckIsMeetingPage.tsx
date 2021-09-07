import { StepFunction } from '../..';

export const CheckIsMeetingPage: StepFunction = async (props, { phone }) => {
  expect(phone.routerInteraction.currentPath).toEqual('/meeting');
};
