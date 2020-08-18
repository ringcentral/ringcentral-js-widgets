import { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import { extensionTypes } from '../../enums/extensionTypes';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { RolesAndPermissions } from '../RolesAndPermissionsV2';
import Subscription from '../Subscription';
import TabManager from '../TabManager';

export interface CompanyContactsOptions extends DataSourceBaseProps {
  allowSettings?: boolean;
  selectedTypes?: ObjectMapValue<typeof extensionTypes>[];
  showDisabled?: boolean;
  showNotActivated?: boolean;
}
export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  rolesAndPermissions: RolesAndPermissions;
  subscription: Subscription;
  tabManager?: TabManager;
  companyContactsOptions?: CompanyContactsOptions;
}
