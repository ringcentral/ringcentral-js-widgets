import { GetPresenceInfo } from '@rc-ex/core/definitions';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import { Auth } from '../AuthV2';
import ConnectivityMonitor from '../ConnectivityMonitor';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { dndStatus } from '../Presence/dndStatus';
import { Subscription } from '../SubscriptionV2';
import { TabManager } from '../TabManager';

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
