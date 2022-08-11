export interface GreetingResource {
  /**
   */
  type: 'StartRecording' | 'StopRecording' | 'AutomaticRecording';
  /**
   * 'Default' value specifies that all greetings of that type (in all languages) are default, if at least one greeting (in any language) of the specified type is custom, then 'Custom' value is returned.
   */
  mode: 'Default' | 'Custom';
}
