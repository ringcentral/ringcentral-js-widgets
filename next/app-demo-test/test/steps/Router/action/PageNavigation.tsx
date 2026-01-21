import { RouterPlugin } from '@ringcentral-integration/next-core';
import {
  type StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

export const NavigateTo: StepFunction<{ path: string }> = async (
  { path },
  { app },
) => {
  const router = app.container.got(RouterPlugin)!;
  router.push(path);
  await waitForRenderReady();
};
