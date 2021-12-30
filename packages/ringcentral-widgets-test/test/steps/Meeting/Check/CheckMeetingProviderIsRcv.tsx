import { StepFunction } from '../../../lib/step';

export const CheckMeetingProviderIsRcv: StepFunction = async (_, context) => {
  const { phone } = context;
  const props = phone.genericMeetingUI.getUIProps({});
  expect(props.isRCV).toBe(true);
};
