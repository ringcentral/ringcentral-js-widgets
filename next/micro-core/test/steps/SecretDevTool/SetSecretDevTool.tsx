import { StepFunction } from '@ringcentral-integration/test-utils';

import { SecretDevToolView } from '../../../src/app/views';

interface SetSecretDevToolProps {
  show: boolean;
}

export const SetSecretDevTool: StepFunction<SetSecretDevToolProps> = (
  { show },
  { app },
) => {
  const secretDevToolView = app.container.got(SecretDevToolView)!;
  secretDevToolView.setShow(show);
};
