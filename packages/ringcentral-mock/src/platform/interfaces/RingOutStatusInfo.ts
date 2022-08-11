// RingOut status information
export interface RingOutStatusInfo {
  /**
   * Status of a call
   */
  callStatus:
    | 'Invalid'
    | 'Success'
    | 'InProgress'
    | 'Busy'
    | 'NoAnswer'
    | 'Rejected'
    | 'GenericError'
    | 'Finished'
    | 'InternationalDisabled'
    | 'DestinationBlocked'
    | 'NotEnoughFunds'
    | 'NoSuchUser';
  /**
   * Status of a calling party
   */
  callerStatus:
    | 'Invalid'
    | 'Success'
    | 'InProgress'
    | 'Busy'
    | 'NoAnswer'
    | 'Rejected'
    | 'GenericError'
    | 'Finished'
    | 'InternationalDisabled'
    | 'DestinationBlocked'
    | 'NotEnoughFunds'
    | 'NoSuchUser';
  /**
   * Status of a called party
   */
  calleeStatus:
    | 'Invalid'
    | 'Success'
    | 'InProgress'
    | 'Busy'
    | 'NoAnswer'
    | 'Rejected'
    | 'GenericError'
    | 'Finished'
    | 'InternationalDisabled'
    | 'DestinationBlocked'
    | 'NotEnoughFunds'
    | 'NoSuchUser';
}
