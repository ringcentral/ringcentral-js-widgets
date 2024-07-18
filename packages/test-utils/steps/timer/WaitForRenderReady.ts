import type { StepFunction } from '@ringcentral-integration/crius';

import { waitForRenderReady } from '../../lib/waitForRenderReady';

interface WaitForRenderReadyProps {}

export const WaitForRenderReady: StepFunction<
  WaitForRenderReadyProps
> = async () => {
  await waitForRenderReady();
};
