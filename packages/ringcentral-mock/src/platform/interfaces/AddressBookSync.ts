import type { PersonalContactResource } from './PersonalContactResource';
import type { SyncInfo } from './SyncInfo';

export interface AddressBookSync {
  /**
   * Format: uri
   */
  uri: string;
  /**
   */
  records: PersonalContactResource[];
  /**
   */
  syncInfo: SyncInfo;
  /**
   * Format: int64
   */
  nextPageId: number;
  /**
   * Format: uri
   */
  nextPageUri: string;
}
