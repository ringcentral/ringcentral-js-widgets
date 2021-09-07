import { StepFunction } from '../..';

export const WaitForInitMeeting: StepFunction<any> = async (props, context) => {
  const { phone } = context;
  const { init } = phone.genericMeetingUI.getUIFunctions({ phone });
  await init();
};
