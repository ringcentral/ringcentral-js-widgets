import { RouterPlugin } from '@ringcentral-integration/next-core';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckRoutePathContain: StepFunction<{ path: string }> = async (
  { path },
  { app },
) => {
  const router = app.container.got(RouterPlugin)!;
  await whenStateChange(() => expect(router.currentPath).toContain(path));
};
