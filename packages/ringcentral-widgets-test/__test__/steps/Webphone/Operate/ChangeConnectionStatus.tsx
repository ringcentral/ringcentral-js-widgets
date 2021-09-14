import { connectionStatus } from '@ringcentral-integration/commons/modules/WebphoneV2/connectionStatus';
import { StepFunction } from '../..';
import { connectionStatusEnum } from '../../../interfaces';

export const ChangeConnectionStatus: StepFunction<{
  status: connectionStatusEnum;
}> = async ({ status }, context) => {
  const { phone } = context;
  Object.defineProperties(phone.webphone, {
    [status]: { value: true },
    connectionStatus: { value: connectionStatus[status] },
  });
  console.log(
    `Set webphone connect status as ${status}, and connectionStatus is: ${connectionStatus[status]}  `,
  );
};
