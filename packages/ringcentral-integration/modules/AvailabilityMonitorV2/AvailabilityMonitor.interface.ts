import { Auth } from '../AuthV2';
import { Environment } from '../EnvironmentV2';

export interface AvailabilityMonitorOptions {
  /**
   * Enable availability monitor, default false.
   */
  enabled: boolean;
}

export interface Deps {
  auth: Auth;
  client: any;
  environment?: Environment;
  availabilityMonitorOptions?: AvailabilityMonitorOptions;
}

export interface ErrorMessages {
  _json: { errorCode: string }[];
}
