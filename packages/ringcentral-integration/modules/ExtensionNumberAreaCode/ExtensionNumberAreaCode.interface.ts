import { AppFeatures } from '../AppFeatures';
import { DataFetcherV2ConsumerBaseDeps } from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';
import { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';
import { Subscription } from '../Subscription';
import { TabManager } from '../TabManager';

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  appFeatures: AppFeatures;
  client: any;
  extensionFeatures: ExtensionFeatures;
  extensionPhoneNumber: ExtensionPhoneNumber;
  subscription: Subscription;
  tabManager?: TabManager;
}
