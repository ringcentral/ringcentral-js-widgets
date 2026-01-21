import { useEffect, useState } from 'react';
import { usePromise } from 'react-use';

import { PortType } from '../constant';
import { PortManager } from '../modules';

import { useContainer } from './useContainer';

/**
 * get the sync state from the PortManager,
 * when main tab `syncFullStatePromise` completed that will be `true`.
 */
export const useMainTabSyncState = () => {
  const portManager = useContainer<PortManager>('PortManager');
  const [tabSync, setTabSync] = useState(portManager.mainTabSyncStore);

  const mounted = usePromise();

  useEffect(() => {
    if (!portManager.mainTabSyncStore) {
      (async () => {
        const { syncFullStatePromise } = portManager.portDetector;
        if (syncFullStatePromise) await mounted(syncFullStatePromise);

        portManager.mainTabSyncStore = true;
        setTabSync(true);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return !!tabSync;
};

/**
 * check if the port type is MainClient in shared mode,
 *
 * in non shared mode, it will always return `true`.
 *
 * @returns if the port type is MainClient
 */
export const useIsMainClient = () => {
  const portManager = useContainer<PortManager>('PortManager');

  return portManager.shared
    ? portManager.portType === PortType.MainClient
    : true;
};
