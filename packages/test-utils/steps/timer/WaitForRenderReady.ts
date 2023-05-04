import { StepFunction } from '@ringcentral-integration/crius';
import { waitForRenderReady } from '../../lib/test-utils/waitForRenderReady';

interface WaitForRenderReadyProps {}

export const WaitForRenderReady: StepFunction<WaitForRenderReadyProps> =
  async () => {
    await waitForRenderReady();
  };
