import type { StepFunction } from '@ringcentral-integration/test-utils';

export const ToggleEnv: StepFunction = () => {
  global.toggleEnv();
};
