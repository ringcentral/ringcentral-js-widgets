export interface CallActionFilter {
  /**
   */
  callAction:
    | 'HoldOff'
    | 'HoldOn'
    | 'ParkOn'
    | 'ParkOff'
    | 'BlindTransfer'
    | 'WarmTransfer'
    | 'DTMFTransfer';
}
