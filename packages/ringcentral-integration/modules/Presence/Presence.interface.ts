import type GetPresenceInfo from '@rc-ex/core/lib/definitions/GetPresenceInfo';
import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import type { Auth } from '../Auth';
import type { ConnectivityMonitor } from '../ConnectivityMonitor';
import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { TabManager } from '../TabManager';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

import type { dndStatus } from './dndStatus';

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  auth: Auth;
  client: any;
  connectivityMonitor: ConnectivityMonitor;
  extensionFeatures: ExtensionFeatures;
  subscription: Subscription;
  tabManager?: TabManager;
  presenceOptions?: PresenceOptions;
}

export interface PresenceOptions extends DataSourceBaseProps {
  detailed?: boolean;
  fetchDelay?: number;
  maxFetchDelay?: number;
}

export interface UpdatePresenceParams {
  dndStatus?: ObjectMapValue<typeof dndStatus>;
  userStatus?: GetPresenceInfo['userStatus'];
}
