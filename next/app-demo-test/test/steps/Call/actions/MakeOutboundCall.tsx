import {
  CallMonitor,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import { DialerView } from '@ringcentral-integration/micro-phone/src/app/views';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import {
  userEvent,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

import { InputToField } from '../../Dialer';

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
  const { app } = context;
  if (executeByCallFunction) {
    const dialerView = app.container.got(DialerView);
    const webphone = app.container.got(Webphone);
    let oldSessionIds: string[] = [];
    if (webphone?._webphone) {
      oldSessionIds = Object.keys(webphone._webphone.userAgent.sessions);
    }
    await dialerView!.call({ phoneNumber });
    if (webphone?._webphone) {
      const newSessionId = Object.keys(
        webphone._webphone.userAgent.sessions,
      ).find((key) => oldSessionIds.indexOf(key) === -1);
      if (newSessionId) {
        const newSession = webphone._webphone.userAgent.sessions[newSessionId];
        newSession.trigger('progress', {});
        if (status === 'connected') {
          newSession.trigger('accepted', {});
        }
      }
    }
    await waitForRenderReady();
  } else {
    await InputToField({ input: phoneNumber, needEnter: false }, context);
    const { app } = context;
    expect(screen.getByTestId('recipientsInput')).toHaveValue(phoneNumber);
    const callMonitor = app.container.got(CallMonitor)!;
    userEvent.click(screen.getByTestId('callButton'));
    await new Promise((resolve) => {
      callMonitor.onNewCall(() => {
        resolve(true);
      });
    });
    await waitForRenderReady();
  }
};
