import { GetCountryInfoState } from './GetCountryInfoState';

export interface GetStateInfoResponse {
  /**
   * Internal identifier of a state
   */
  id: string;
  /**
   * Canonical URI of a state
   */
  uri: string;
  /**
   */
  country: GetCountryInfoState;
  /**
   * Short code for a state (2-letter usually)
   */
  isoCode: string;
  /**
   * Official name of a state
   */
  name: string;
}
