// Information on a delegate extension that actually implemented a call action. For Secretary call log the field is returned if the current extension implemented a call. For Boss call log the field contains information on a Secretary extension which actually implemented a call on behalf of the current extension
export interface CallLogDelegateInfo {
  /**
   * Internal identifier of a Secretary extension
   */
  id: string;
  /**
   * Custom name of a Secretary extension
   */
  name: string;
}
