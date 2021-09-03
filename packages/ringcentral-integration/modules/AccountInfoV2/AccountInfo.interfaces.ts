import { Alert } from '../AlertV2';
import { Auth } from '../AuthV2';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { TierChecker } from '../TierChecker';

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  alert: Alert;
  auth: Auth;
  client: any;
  extensionFeatures: ExtensionFeatures;
  tierChecker: TierChecker;
  accountInfoOptions?: AccountInfoOptions;
}

export interface AccountInfoOptions extends DataSourceBaseProps {}
