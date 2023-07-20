import type { Alert } from '../Alert';
import type { Auth } from '../Auth';
import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { TierChecker } from '../TierChecker';

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  alert: Alert;
  auth: Auth;
  client: any;
  extensionFeatures: ExtensionFeatures;
  tierChecker: TierChecker;
  accountInfoOptions?: AccountInfoOptions;
}

export interface AccountInfoOptions extends DataSourceBaseProps {}
