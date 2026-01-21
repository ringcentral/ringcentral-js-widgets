import { UserGuide } from '@ringcentral-integration/micro-setting/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const DismissUserGuide: StepFunction = async (_, { app }) => {
  const userGuide = app.container.got(UserGuide);
  await userGuide?.dismiss();
};
