import type { RcMock } from '@ringcentral-integration/mock';
import userEvent from '@testing-library/user-event';

import type { StepFunction } from '../../../lib/step';
import { ClickBackButton } from '../actions';

interface CheckToVoiceMailForInboundQueueCallProps {
  isGoToAllCallsPage?: boolean;
}
export const CheckToVoiceMailForInboundQueueCall: StepFunction<
  CheckToVoiceMailForInboundQueueCallProps
> = async ({ isGoToAllCallsPage = false }, context) => {
  const { phone } = context;
  const ignoreCall = jest.spyOn(phone.activeCallControl, 'ignore');
  const rcMock: RcMock = global.instance.rcMock;

  await rcMock.makeCall({
    queueCall: true,
    direction: 'Inbound',
  });

  if (isGoToAllCallsPage) {
    ClickBackButton;
  }

  const toVoiceMail = document.querySelector(
    '[data-sign="toVoiceMail"] circle',
  );
  if (toVoiceMail) userEvent.click(toVoiceMail);

  expect(ignoreCall).toHaveBeenCalledTimes(1);
};
