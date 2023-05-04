export interface GlipEventInfo {
  /**
   * Internal identifier of an event
   */
  id: string;
  /**
   * Internal identifier of a person created an event
   */
  creatorId: string;
  /**
   * Event title
   */
  title: string;
  /**
   * Datetime of starting an event
   */
  startTime: string;
  /**
   * Datetime of ending an event
   */
  endTime: string;
  /**
   * Indicates whether an event has some specific time slot or lasts for the whole day(s)
   */
  allDay: boolean;
  /**
   * Event recurrence settings
   */
  recurrence: 'None' | 'Day' | 'Weekday' | 'Week' | 'Month' | 'Year';
  /**
   * Condition of ending
   */
  endingCondition: string;
  /**
   * Count of iterations. For periodic events only
   */
  endingAfter: number;
  /**
   * Iterations end datetime for periodic events
   * Default: None
   */
  endingOn: 'None' | 'Count' | 'Date';
  /**
   * Color of Event title (including its presentation in Calendar)
   * Default: Black
   */
  color:
    | 'Black'
    | 'Red'
    | 'Orange'
    | 'Yellow'
    | 'Green'
    | 'Blue'
    | 'Purple'
    | 'Magenta';
  /**
   * Event location
   */
  location: string;
  /**
   * Event details
   */
  description: string;
}
