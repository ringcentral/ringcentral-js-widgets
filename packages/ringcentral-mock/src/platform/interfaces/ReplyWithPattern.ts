export interface ReplyWithPattern {
  /**
   * Predefined reply pattern name.
   * Example: OnMyWay
   */
  pattern:
    | 'WillCallYouBack'
    | 'CallMeBack'
    | 'OnMyWay'
    | 'OnTheOtherLine'
    | 'WillCallYouBackLater'
    | 'CallMeBackLater'
    | 'InAMeeting'
    | 'OnTheOtherLineNoCall';
  /**
   * Number of time units. Applicable only to WillCallYouBack, CallMeBack patterns.
   * Example: 5
   */
  time: number;
  /**
   * Time unit name.
   * Example: Minute
   */
  timeUnit: 'Minute' | 'Hour' | 'Day';
}
