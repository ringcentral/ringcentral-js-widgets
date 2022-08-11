import { SharedLinesInfo } from './SharedLinesInfo';

export interface UserAnsweringRuleListRecord {
  /**
   * Canonical URI to an answering rule resource
   * Example: https://platform.devtest.ringcentral.com/restapi/v1.0/account/240913004/extension/240972004/answering-rule/business-hours-rule
   */
  uri: string;
  /**
   * Internal identifier of an answering rule
   * Example: business-hours-rule
   */
  id: string;
  /**
   * Type of an answering rule
   */
  type: 'BusinessHours' | 'AfterHours' | 'Custom';
  /**
   * Name of an answering rule specified by user
   */
  name: string;
  /**
   * Specifies if an answering rule is active or inactive
   */
  enabled: boolean;
  /**
   */
  sharedLines: SharedLinesInfo;
}
