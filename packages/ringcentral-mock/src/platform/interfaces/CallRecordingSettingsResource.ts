import type { OnDemandResource } from './OnDemandResource';
import type { AutomaticRecordingResource } from './AutomaticRecordingResource';
import type { GreetingResource } from './GreetingResource';

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
