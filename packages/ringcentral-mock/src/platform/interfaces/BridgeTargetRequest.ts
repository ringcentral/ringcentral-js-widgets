export interface BridgeTargetRequest {
  /**
   * Internal identifier of a call session to be connected to (bridged)
   * Required
   */
  telephonySessionId: string;
  /**
   * Internal identifier of a call party to be connected to (bridged)
   * Required
   */
  partyId: string;
}
