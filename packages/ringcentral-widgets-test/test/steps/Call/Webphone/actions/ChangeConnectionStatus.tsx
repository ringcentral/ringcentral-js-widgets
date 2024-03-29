import { connectionStatus } from '@ringcentral-integration/commons/modules/Webphone';

import type { connectionStatusEnum } from '../../../../interfaces';
import type { StepFunction } from '../../../../lib/step';

export const ChangeConnectionStatus: StepFunction<{
  status: connectionStatusEnum;
}> = async ({ status }, context) => {
  const { phone } = context;
  // TODO: refactor
  if (phone.webphone._deps) {
    phone.webphone._setConnectionStatus(connectionStatus[status]);
  } else {
    Object.defineProperties(phone.webphone, {
      [status]: { value: true },
      connectionStatus: { value: connectionStatus[status] },
    });
    if (status === 'connecting') {
      Object.defineProperties(phone.webphone, {
        connected: { value: false },
      });
    }
    if (status === 'connected') {
      Object.defineProperties(phone.webphone, {
        connecting: { value: false },
      });
    }
  }

  console.log(
    `Set webphone connect status as ${status}, and connectionStatus is: ${connectionStatus[status]}  `,
  );
};
