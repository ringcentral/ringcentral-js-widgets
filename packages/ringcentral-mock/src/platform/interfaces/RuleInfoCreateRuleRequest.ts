import type { ForwardingNumberInfoRulesCreateRuleRequest } from './ForwardingNumberInfoRulesCreateRuleRequest';

export interface RuleInfoCreateRuleRequest {
  /**
   * Forwarding number (or group) ordinal. Not returned for inactive numbers
   */
  index: number;
  /**
   * Number of rings for a forwarding number (or group). For inactive numbers the default value ('4') is returned
   */
  ringCount: number;
  /**
   * Phone number status
   */
  enabled: boolean;
  /**
   * Forwarding number (or group) data
   */
  forwardingNumbers: ForwardingNumberInfoRulesCreateRuleRequest[];
}
