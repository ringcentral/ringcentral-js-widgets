import { Auth } from '../Auth';
import { Environment } from '../Environment';

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
