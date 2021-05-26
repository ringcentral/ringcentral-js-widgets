import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';
import { ExtensionFeatures } from '../ExtensionFeatures';

export interface GlipCompanyOptions extends DataSourceBaseProps {}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  extensionFeatures: ExtensionFeatures;
  glipCompanyOptions?: GlipCompanyOptions;
}
