import { ObjectMapKey } from '@ringcentral-integration/core/lib/ObjectMap';
import {
  connectionStatus,
  Webphone,
} from '@ringcentral-integration/micro-phone/src/app/services';
import { StepFunction } from '@ringcentral-integration/test-utils';

export const ChangeConnectionStatus: StepFunction<{
  status: ObjectMapKey<typeof connectionStatus>;
}> = async ({ status }, { app }) => {
  const webphone = app.container.got(Webphone)!;
  // TODO: refactor
  if (webphone) {
    webphone._setConnectionStatus(connectionStatus[status]);
  } else {
    Object.defineProperties(webphone, {
      [status]: { value: true },
      connectionStatus: { value: connectionStatus[status] },
    });
    if (status === 'connecting') {
      Object.defineProperties(webphone, {
        connected: { value: false },
      });
    }
    if (status === 'connected') {
      Object.defineProperties(webphone, {
        connecting: { value: false },
      });
    }
  }

  console.log(
    `Set webphone connect status as ${status}, and connectionStatus is: ${connectionStatus[status]}  `,
  );
};
