import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';

export interface DialingPlanOptions extends DataSourceBaseProps {}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  rolesAndPermissions: RolesAndPermissions;
  dialingPlanOptions?: DialingPlanOptions;
}
