import { RuleInfoCreateRuleRequest } from './RuleInfoCreateRuleRequest';

// Forwarding parameters. Returned if 'ForwardCalls' is specified in 'callHandlingAction'. These settings determine the forwarding numbers to which the call will be forwarded
export interface ForwardingInfoCreateRuleRequest {
  /**
   * Specifies if the first ring on desktop/mobile apps is enabled. The default value is 'True'
   */
  notifyMySoftPhones: boolean;
  /**
   * Deprecated parameter. Specifies if the administrator's softphone (desktop application) is notified before forwarding the incoming call to desk phones and forwarding numbers. The default value is 'True'.
   */
  notifyAdminSoftPhones: boolean;
  /**
   * Specifies delay between ring on apps and starting of a call forwarding. To activate this parameter use the value > 0, and turn off the `softPhonesAlwaysRing` setting. If the value is 1 or 0, the `softPhonesAlwaysRing` setting cannot be turned off
   */
  softPhonesRingCount: number;
  /**
   * Specifies that desktop and mobile applications of the user will ring till the end of their forwarding list. If set to 'True' then `softPhonesRingCount` is ignored
   * Default: true
   */
  softPhonesAlwaysRing: boolean;
  /**
   * Specifies the order in which forwarding numbers ring. 'Sequentially' means that forwarding numbers are ringing one at a time, in order of priority. 'Simultaneously' means that forwarding numbers are ringing all at the same time. The default value is 'Sequentially'
   */
  ringingMode: 'Sequentially' | 'Simultaneously';
  /**
   * Information on a call forwarding rule
   */
  rules: RuleInfoCreateRuleRequest[];
  /**
   * Deprecated parameter. Specifies if mobile timeout is activated for the rule
   */
  mobileTimeout: boolean;
}
