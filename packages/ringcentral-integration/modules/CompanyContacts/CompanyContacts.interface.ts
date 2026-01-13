import type { ObjectMapValue } from '@ringcentral-integration/core/lib/ObjectMap';

import type { extensionTypes } from '../../enums/extensionTypes';
import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { TabManager } from '../TabManager';
import type { WebSocketSubscription as Subscription } from '../WebSocketSubscription';

export interface CompanyContactsOptions extends DataSourceBaseProps {
  allowSettings?: boolean;
  selectedTypes?: ObjectMapValue<typeof extensionTypes>[];
  showDisabled?: boolean;
  showNotActivated?: boolean;
  enableCompanyPublicApi?: boolean;
}
export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  extensionFeatures: ExtensionFeatures;
  subscription: Subscription;
  tabManager?: TabManager;
  companyContactsOptions?: CompanyContactsOptions;
}
