import { GetPresenceInfo } from '@rc-ex/core/definitions';
import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import { presenceStatus } from '../../enums/presenceStatus.enum';
import { Auth } from '../AuthV2';
import ConnectivityMonitor from '../ConnectivityMonitor';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { dndStatus } from '../Presence/dndStatus';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';
import Subscription from '../Subscription';
import TabManager from '../TabManager';

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  auth: Auth;
  client: any;
  connectivityMonitor: ConnectivityMonitor;
  rolesAndPermissions: RolesAndPermissions;
  subscription: Subscription;
  tabManager?: TabManager;
  presenceOptions?: PresenceOptions;
}

export interface PresenceOptions extends DataSourceBaseProps {
  detailed?: boolean;
  fetchDelay?: number;
  maxFetchDelay?: number;
}

export interface PresenceInfoModel {
  activeCalls?: GetPresenceInfo['activeCalls'];
  dndStatus?: ObjectMapValue<typeof dndStatus>;
  meetingStatus?: GetPresenceInfo['meetingStatus'];
  presenceStatus?: ObjectMapValue<typeof presenceStatus>;
  telephonyStatus?: GetPresenceInfo['telephonyStatus'];
  userStatus?: GetPresenceInfo['userStatus'];
  lastDndStatus?: ObjectMapValue<typeof dndStatus>;
  sequence?: number;
}

export interface UpdatePresenceParams {
  dndStatus?: ObjectMapValue<typeof dndStatus>;
  userStatus?: GetPresenceInfo['userStatus'];
}
