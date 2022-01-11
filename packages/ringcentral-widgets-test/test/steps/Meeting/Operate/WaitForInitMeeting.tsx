import { StepFunction } from '../../../lib/step';

export const WaitForInitMeeting: StepFunction<any> = async (props, context) => {
  const { phone } = context;
  const { init } = phone.genericMeetingUI.getUIFunctions({ phone });
  await init();
};

export const WaitForInitGenericMeeting: StepFunction = async (_, { phone }) => {
  await phone.genericMeeting.initMeeting();
};
