import { StepFunction } from '../../../lib/step';

export const ToggleEnv: StepFunction = () => {
  global.toggleEnv();
};
