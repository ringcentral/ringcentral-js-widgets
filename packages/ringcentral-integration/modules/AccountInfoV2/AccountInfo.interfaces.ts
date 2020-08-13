import Alert from '../Alert';
import Auth from '../Auth';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  auth: Auth;
  client: any;
  rolesAndPermissions: RolesAndPermissions;
  alert: Alert;
  accountInfoOptions?: AccountInfoOptions;
}

export interface AccountInfoOptions extends DataSourceBaseProps {}
