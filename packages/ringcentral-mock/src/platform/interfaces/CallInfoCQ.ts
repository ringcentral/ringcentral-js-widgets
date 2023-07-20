import type { PrimaryCQInfo } from './PrimaryCQInfo';
import type { AdditionalCQInfo } from './AdditionalCQInfo';

// Primary/additional CQ information
export interface CallInfoCQ {
  /**
   */
  primary: PrimaryCQInfo;
  /**
   */
  additional: AdditionalCQInfo;
}
