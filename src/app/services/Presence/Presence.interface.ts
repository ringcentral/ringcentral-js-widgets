import type GetPresenceInfo from '@rc-ex/core/lib/definitions/GetPresenceInfo';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import type { DataSourceBaseProps } from '../DataFetcher';

import type { dndStatus } from './dndStatus';

export interface PresenceOptions extends DataSourceBaseProps {
  fetchDelay?: number;
  maxFetchDelay?: number;
  /**
   * when use with `usePresence` on page, that interval will share between every subscriber
   *
   * @default 10000 ms
   */
  updateInterval?: number;
}

export interface UpdatePresenceParams {
  dndStatus?: ObjectMapValue<typeof dndStatus>;
  userStatus?: GetPresenceInfo['userStatus'];
}
