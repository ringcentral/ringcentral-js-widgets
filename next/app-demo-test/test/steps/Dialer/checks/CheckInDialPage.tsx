import { RouterPlugin } from '@ringcentral-integration/next-core';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckInDialPage: StepFunction = async (_, { app }) => {
  const router = app.container.got(RouterPlugin)!;
  expect(router.currentPath).toBe('/dialer');
};
