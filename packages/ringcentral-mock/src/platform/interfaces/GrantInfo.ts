import { ExtensionInfoGrants } from './ExtensionInfoGrants';

export interface GrantInfo {
  /**
   * Canonical URI of a grant
   */
  uri: string;
  /**
   */
  extension: ExtensionInfoGrants;
  /**
   * Specifies if picking up of other extensions' calls is allowed for the extension. If 'Presence' feature is disabled for the given extension, the flag is not returned
   */
  callPickup: boolean;
  /**
   * Specifies if monitoring of other extensions' calls is allowed for the extension. If 'CallMonitoring' feature is disabled for the given extension, the flag is not returned
   */
  callMonitoring: boolean;
  /**
   * Specifies whether the current extension is able to make or receive calls on behalf of the user referenced in extension object
   */
  callOnBehalfOf: boolean;
  /**
   * Specifies whether the current extension can delegate a call to the user referenced in extension object
   */
  callDelegation: boolean;
  /**
   * Specifies whether the current extension is allowed to call Paging Only group referenced to in extension object
   */
  groupPaging: boolean;
  /**
   * Specifies whether the current extension is assigned as a Full-Access manager in the call queue referenced in extension object
   */
  callQueueSetup: boolean;
  /**
   * Specifies whether the current extension is assigned as a Members-Only manager in the call queue referenced in extension object
   */
  callQueueMembersSetup: boolean;
  /**
   * Specifies whether the current extension is assigned as a Messages Manager in the queue referenced in extension object
   */
  callQueueMessages: boolean;
}
