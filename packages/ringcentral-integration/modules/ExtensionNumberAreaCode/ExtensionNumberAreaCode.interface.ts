import type { AppFeatures } from '../AppFeatures';
import type { DataFetcherV2ConsumerBaseDeps } from '../DataFetcherV2';
import type { ExtensionFeatures } from '../ExtensionFeatures';
import type { ExtensionPhoneNumber } from '../ExtensionPhoneNumber';
import type { Subscription } from '../Subscription';
import type { TabManager } from '../TabManager';

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  appFeatures: AppFeatures;
  client: any;
  extensionFeatures: ExtensionFeatures;
  extensionPhoneNumber: ExtensionPhoneNumber;
  subscription: Subscription;
  tabManager?: TabManager;
}
