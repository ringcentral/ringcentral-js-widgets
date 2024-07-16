import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

import { ClickDialNumberButton } from './ClickDialNumberButton';

export const MakeOutboundCall: StepFunction<{
  phoneNumber?: string;
  executeByCallFunction?: boolean;
  status?: string;
}> = async (
  {
    phoneNumber = '+18882556247',
    executeByCallFunction = true,
    status = 'connecting',
  },
  context,
) => {
  if (executeByCallFunction) {
    const { phone } = context;
    const { dialerUI } = phone;
    let oldSessionIds: string[] = [];
    if (phone.webphone._webphone) {
      oldSessionIds = Object.keys(phone.webphone._webphone.userAgent.sessions);
    }
    await dialerUI.call({ phoneNumber });
    if (phone.webphone._webphone) {
      const newSessionId = Object.keys(
        phone.webphone._webphone.userAgent.sessions,
      ).find((key) => oldSessionIds.indexOf(key) === -1);
      if (newSessionId) {
        const newSession =
          phone.webphone._webphone.userAgent.sessions[newSessionId];
        newSession.trigger('progress', {});
        if (status === 'connected') {
          newSession.trigger('accepted', {});
        }
      }
    }
  } else {
    for (const char of phoneNumber.split('')) {
      await ClickDialNumberButton(char);
    }
    expect(screen.getByTestId('recipientsInput')).toHaveValue(phoneNumber);

    const promise = new Promise((resolve) => {
      context.phone.callMonitor.onNewCall(() => {
        resolve(true);
      });
    });
    fireEvent.click(document.querySelector('.callBtn circle')!);
    // await make call successful
    await promise;
    await waitForRenderReady();
  }
};
