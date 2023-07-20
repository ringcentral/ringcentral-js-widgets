import type { StepFunction } from '../../../lib/step';

export const DismissUserGuide: StepFunction = async (_, { phone }) => {
  if (phone.userGuide) await phone.userGuide.dismiss();
};
