import type {
  DataMatcherOptions,
  Deps as BaseDeps,
} from '../../lib/DataMatcherV2';

export interface Deps extends BaseDeps {
  activityMatcherOptions?: ActivityMatcherOptions;
}

export interface ActivityMatcherOptions extends DataMatcherOptions {
  //
}
