export interface PendoAnalyticsOptions {
  /**
   * Pendo app key.
   */
  pendoApiKey: string;
  /**
   * Self-hosting the Pendo Agent for applications with strict CSP
   */
  useLocalPendoJS?: boolean;
  /**
   * events filter to send to pendo
   *
   * whitelist of events to track
   */
  trackEvents?: Set<string>;

  /**
   * additional properties to send to pendo during pendo agent init
   */
  additionalVisitorProps?: Record<string, any>;
}
