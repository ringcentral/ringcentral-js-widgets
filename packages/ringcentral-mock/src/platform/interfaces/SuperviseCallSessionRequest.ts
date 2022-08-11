export interface SuperviseCallSessionRequest {
  /**
   * Supervising mode
   * Required
   * Example: Listen
   */
  mode: 'Listen';
  /**
   * Internal identifier of a supervisor's device which will be used for call session monitoring
   * Required
   * Example: 191888004
   */
  supervisorDeviceId: string;
  /**
   * Extension identifier of the user that will be monitored
   * Example: 400378008008
   */
  agentExtensionId: string;
  /**
   * Specifies if auto-answer SIP header should be sent. If auto-answer is set to 'True', the call is automatically answered by the supervising party, if set to 'False' - then the supervising party has to accept or decline the monitored call
   * Default: true
   */
  autoAnswer: boolean;
  /**
   * Specifies session description protocol setting
   */
  mediaSDP: 'sendOnly' | 'sendRecv';
}
