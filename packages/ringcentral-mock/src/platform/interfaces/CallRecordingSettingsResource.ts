import type { AutomaticRecordingResource } from './AutomaticRecordingResource';
import type { GreetingResource } from './GreetingResource';
import type { OnDemandResource } from './OnDemandResource';

export interface CallRecordingSettingsResource {
  /**
   */
  onDemand: OnDemandResource;
  /**
   */
  automatic: AutomaticRecordingResource;
  /**
   * Collection of Greeting Info
   */
  greetings: GreetingResource[];
}
