import type { AdditionalCQInfo } from './AdditionalCQInfo';
import type { PrimaryCQInfo } from './PrimaryCQInfo';

// Primary/additional CQ information
export interface CallInfoCQ {
  /**
   */
  primary: PrimaryCQInfo;
  /**
   */
  additional: AdditionalCQInfo;
}
