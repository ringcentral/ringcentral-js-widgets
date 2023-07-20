import type { FederatedAccountResource } from './FederatedAccountResource';

export interface FederationResource {
  /**
   */
  accounts: FederatedAccountResource[];
  /**
   */
  creationTime: string;
  /**
   */
  displayName: string;
  /**
   */
  id: string;
  /**
   */
  lastModifiedTime: string;
}
