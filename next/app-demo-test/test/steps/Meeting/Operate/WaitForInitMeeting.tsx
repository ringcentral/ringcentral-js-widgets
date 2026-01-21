import { GenericMeetingView } from '@ringcentral-integration/micro-meeting/src/app/views';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const WaitForInitMeeting: StepFunction<any> = async (props, { app }) => {
  const genericMeetingView = app.container.got(GenericMeetingView)!;
  const { init } = genericMeetingView.getUIFunctions({});
  await init();
};
