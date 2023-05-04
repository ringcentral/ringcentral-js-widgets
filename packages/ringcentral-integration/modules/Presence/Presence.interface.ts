import type GetPresenceInfo from '@rc-ex/core/lib/definitions/GetPresenceInfo';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import { Auth } from '../Auth';
import { ConnectivityMonitor } from '../ConnectivityMonitor';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { Subscription } from '../Subscription';
import { TabManager } from '../TabManager';
import { dndStatus } from './dndStatus';

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
