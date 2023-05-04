import { RuleInfo } from './RuleInfo';

// Forwarding parameters. Returned if 'ForwardCalls' is specified in 'callHandlingAction'. These settings determine the forwarding numbers to which the call will be forwarded
export interface ForwardingInfo {
  /**
   * Specifies if the user's softphone(s) are notified before forwarding the incoming call to desk phones and forwarding numbers
   */
  notifyMySoftPhones: boolean;
  /**
   * Deprecated parameter. Specifies if the administrator's softphone is notified before forwarding the incoming call to desk phones and forwarding numbers. The default value is 'False'
   */
  notifyAdminSoftPhones: boolean;
  /**
   * Number of rings before forwarding starts
   */
  softPhonesRingCount: number;
  /**
   * Specifies that desktop and mobile applications of the user will ring till the end of their forwarding list. If set to 'True' then `softPhonesRingCount` is ignored
   * Default: true
   */
  softPhonesAlwaysRing: boolean;
  /**
   * Specifies the order in which the forwarding numbers ring. 'Sequentially' means that forwarding numbers are ringing one at a time, in order of priority. 'Simultaneously' means that forwarding numbers are ring all at the same time
   */
  ringingMode: 'Sequentially' | 'Simultaneously';
  /**
   * Information on a call forwarding rule
   */
  rules: RuleInfo[];
  /**
   * Specifies if desktop and mobile applications of the user are notified  before (true) or after (false) forwarding the incoming call to desk phones and forwarding numbers. Applicable only if `notifyMySoftPhones` parameter is set to `true`
   */
  softPhonesPositionTop: boolean;
  /**
   * Deprecated parameter. Specifies if mobile timeout is activated for the rule
   */
  mobileTimeout: boolean;
}
