import { LocationDeletionInfo } from './LocationDeletionInfo';

export interface GetLocationDeletionMultiResponse {
  /**
   */
  deletion: 'Forbidden' | 'Restricted' | 'Allowed';
  /**
   */
  reassignment: 'Forbidden' | 'Allowed';
  /**
   */
  emergencyLocations: LocationDeletionInfo[];
}
