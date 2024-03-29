import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import type { ExtensionFeatures } from '../ExtensionFeatures';

export interface ForwardingNumberOptions extends DataSourceBaseProps {}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  extensionFeatures: ExtensionFeatures;
  forwardingNumberOptions?: ForwardingNumberOptions;
}
