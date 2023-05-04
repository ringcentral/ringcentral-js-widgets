export interface CallerInfoTo {
  /**
   */
  phoneNumber: string;
  /**
   */
  name: string;
  /**
   */
  location: string;
  /**
   */
  messageStatus: 'Sent' | 'SendingFailed' | 'Queued';
  /**
   */
  faxErrorCode:
    | 'AllLinesInUse'
    | 'Undefined'
    | 'NoFaxSendPermission'
    | 'NoInternationalPermission'
    | 'NoFaxMachine'
    | 'NoAnswer'
    | 'LineBusy'
    | 'CallerHungUp'
    | 'NotEnoughCredits'
    | 'SentPartially'
    | 'InternationalCallingDisabled'
    | 'DestinationCountryDisabled'
    | 'UnknownCountryCode'
    | 'NotAccepted'
    | 'InvalidNumber'
    | 'CallDeclined'
    | 'TooManyCallsPerLine'
    | 'CallFailed'
    | 'RenderingFailed'
    | 'TooManyPages'
    | 'ReturnToDBQueue'
    | 'NoCallTime'
    | 'WrongNumber'
    | 'ProhibitedNumber'
    | 'InternalError'
    | 'FaxSendingProhibited'
    | 'ThePhoneIsBlacklisted'
    | 'UserNotFound'
    | 'ConvertError'
    | 'DBGeneralError'
    | 'SkypeBillingFailed'
    | 'AccountSuspended'
    | 'ProhibitedDestination'
    | 'InternationalDisabled';
}
