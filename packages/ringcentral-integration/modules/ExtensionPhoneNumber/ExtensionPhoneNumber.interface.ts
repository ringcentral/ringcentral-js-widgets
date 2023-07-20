import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { Subscription } from '../Subscription';
import type { TabManager } from '../TabManager';

export interface ExtensionPhoneNumberOptions extends DataSourceBaseProps {}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  extensionFeatures: ExtensionFeatures;
  subscription: Subscription;
  tabManager?: TabManager;
  extensionPhoneNumberOptions?: ExtensionPhoneNumberOptions;
}
