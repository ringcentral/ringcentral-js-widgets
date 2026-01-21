import { RouterPlugin } from '@ringcentral-integration/next-core';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckIsMeetingPage: StepFunction = async (props, { app }) => {
  const router = app.container.got(RouterPlugin)!;
  expect(router.currentPath).toEqual('/meeting');
};
