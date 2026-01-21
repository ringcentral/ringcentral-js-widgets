import {
  ActiveCallControl,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import type { RcMock } from '@ringcentral-integration/mock';
import {
  waitForRenderReady,
  type StepFunction,
} from '@ringcentral-integration/test-utils';
import userEvent from '@testing-library/user-event';

import { ClickBackButton } from '../actions';

interface CheckIgnoreButtonForInboundQueueCallProps {
  isGoToAllCallsPage?: boolean;
}
export const CheckIgnoreButtonForInboundQueueCall: StepFunction<
  CheckIgnoreButtonForInboundQueueCallProps
> = async ({ isGoToAllCallsPage = false }, { app }) => {
  const activeCallControl = app.container.got(ActiveCallControl)!;
  const ignoreCall = jest.spyOn(activeCallControl, 'ignore');
  const rcMock: RcMock = global.instance.rcMock;

  await rcMock.makeCall({
    queueCall: true,
    direction: 'Inbound',
  });
  await waitForRenderReady();

  const webphone = app.container.got(Webphone)!;
  const sessions = webphone.sessions;
  await webphone.updateSessionsState([
    {
      ...sessions[0],
      callQueueName: 'Dummy Call Queue',
    },
  ]);

  if (isGoToAllCallsPage) {
    return <ClickBackButton />;
  }

  const toVoiceMail = document.querySelector(
    '[data-sign="toVoiceMail"] circle',
  );
  const ignoreBtn = document.querySelector('[data-sign="ignore"] circle');

  expect(toVoiceMail).toBe(null);
  expect(ignoreBtn).not.toBe(null);

  if (ignoreBtn) userEvent.click(ignoreBtn);

  expect(ignoreCall).toHaveBeenCalledTimes(1);
};
