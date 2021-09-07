import { Auth } from '../AuthV2';
import {
  DataFetcherV2ConsumerBaseDeps,
  DataSourceBaseProps,
} from '../DataFetcherV2';

export interface DynamicConfigOptions extends DataSourceBaseProps {
  /**
   * Call `fetchConfig` whether to update
   */
  frequentUpdate?: boolean;
  /**
   * Remote config JSONP URL
   */
  configUrl?: string;
}

export interface Deps extends DataFetcherV2ConsumerBaseDeps {
  auth: Auth;
  client: any;
  dynamicConfigOptions?: DynamicConfigOptions;
}
