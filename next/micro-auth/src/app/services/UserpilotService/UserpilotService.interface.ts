export interface UserpilotServiceOptions {
  /**
   * Userpilot app token.
   */
  appToken: string;

  /**
   * additional properties to send to userpilot during user identification
   */
  additionalUserProps?: Record<string, any>;
  /**
   * data to send to userpilot during user identification
   */
  guideData?: Record<string, any>;
}
