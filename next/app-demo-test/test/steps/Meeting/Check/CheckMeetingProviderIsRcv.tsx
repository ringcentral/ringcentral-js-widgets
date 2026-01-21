import { GenericMeetingView } from '@ringcentral-integration/micro-meeting/src/app/views';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckMeetingProviderIsRcv: StepFunction = async (_, { app }) => {
  const genericMeetingView = app.container.got(GenericMeetingView)!;
  const props = genericMeetingView.getUIProps({});
  expect(props.isRCV).toBe(true);
};
