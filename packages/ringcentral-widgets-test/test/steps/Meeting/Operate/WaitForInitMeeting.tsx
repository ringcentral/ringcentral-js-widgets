import { StepFunction } from '../../../lib/step';

export const WaitForInitMeeting: StepFunction<any> = async (props, context) => {
  const { phone } = context;
  const { init } = phone.genericMeetingUI.getUIFunctions({ phone });
  await init();
};

interface WaitForInitGenericMeetingProps {
  mockTimer?: boolean;
}

// For RC Scheduler
export const WaitForInitGenericMeeting: StepFunction<WaitForInitGenericMeetingProps> =
  async ({ mockTimer = false }, context) => {
    const { phone } = context;
    if (mockTimer) {
      jest.useFakeTimers();
      const promise = phone.genericMeeting.initMeeting();
      jest.advanceTimersByTime(10 * 1000);
      await promise;
      jest.useRealTimers();
    } else {
      await phone.genericMeeting.initMeeting();
    }
  };
