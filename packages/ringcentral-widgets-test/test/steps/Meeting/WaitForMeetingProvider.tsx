import { waitUntilEqual } from '@ringcentral-integration/commons/integration-test/utils/WaitUtil';
import { StepFunction } from '../../lib/step';

export const WaitForMeetingProvider: StepFunction = async (_, context) => {
  const { phone } = context;
  await waitUntilEqual(
    () => phone.videoConfiguration.ready,
    'videoConfiguration ready',
    true,
    10,
  );
};
