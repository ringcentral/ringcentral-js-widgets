import type { ProxyExecParams } from 'reactant-share';

import { mainTabClientDelegate } from '../constant';
import type { PortManager } from '../modules';

export const handleMainClientOnServer =
  (portManager: PortManager) => async (options: ProxyExecParams) => {
    // Ensure the main tab client is alive.
    await portManager.promiseMainTabClient;
    return portManager.transports.server!.emit(
      {
        // TODO: fix types
        // @ts-ignore
        name: mainTabClientDelegate,
      },
      options,
    );
  };
