import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import Subscription from '../Subscription';
import TabManager from '../TabManager';

export interface ExtensionFeaturesOptions extends DataSourceBaseProps {}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  subscription: Subscription;
  tabManager?: TabManager;
  extensionFeaturesOptions?: ExtensionFeaturesOptions;
}
