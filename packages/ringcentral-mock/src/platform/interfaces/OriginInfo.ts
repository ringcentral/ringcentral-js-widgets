// Session origin details
export interface OriginInfo {
  /**
   * Session origin type
   */
  type:
    | 'Call'
    | 'RingOut'
    | 'RingMe'
    | 'Conference'
    | 'GreetingsRecording'
    | 'VerificationCall'
    | 'Zoom'
    | 'CallOut';
}
