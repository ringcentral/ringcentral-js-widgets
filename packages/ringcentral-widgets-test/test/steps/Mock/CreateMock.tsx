import { RcMock, PubnubMock } from '@ringcentral-integration/mock';

import { StepFunction } from '../../lib/step';

interface CreateMockProps {
  autoLogout?: boolean;
}

export const CreateMock: StepFunction<CreateMockProps> = async ({
  autoLogout = true,
}) => {
  const rcMock = new RcMock({
    subscription: new PubnubMock(),
    enableValidation: false,
  });
  global.instance = {
    ...global.instance,
    autoLogout,
    rcMock,
  };
};
