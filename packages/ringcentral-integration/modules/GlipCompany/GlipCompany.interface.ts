import type { AppFeatures } from '../AppFeatures';
import type {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';

export interface GlipCompanyOptions extends DataSourceBaseProps {}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  client: any;
  appFeatures: AppFeatures;
  glipCompanyOptions?: GlipCompanyOptions;
}
