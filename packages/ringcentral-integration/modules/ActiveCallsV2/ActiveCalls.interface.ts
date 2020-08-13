import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';
import Subscription from '../Subscription';
import TabManager from '../TabManager';

export interface ActiveCallsOptions extends DataSourceBaseProps {
  fetchDelay?: number;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  rolesAndPermissions: RolesAndPermissions;
  subscription: Subscription;
  tabManager?: TabManager;
  activeCallsOptions?: ActiveCallsOptions;
}
