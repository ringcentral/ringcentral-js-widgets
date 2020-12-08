import Alert from '../Alert';
import { Auth } from '../AuthV2';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionInfo } from '../ExtensionInfoV2';

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  auth: Auth;
  alert: Alert;
  client: any;
  extensionInfo: ExtensionInfo;
  rolesAndPermissionsOptions?: RolesAndPermissionsOptions;
}

export interface RolesAndPermissionsOptions extends DataSourceBaseProps {
  isCRM?: boolean;
  flag?: string;
}
