import { PrimaryCQInfo } from './PrimaryCQInfo';
import { AdditionalCQInfo } from './AdditionalCQInfo';

// Primary/additional CQ information
export interface CallInfoCQ {
  /**
   */
  primary: PrimaryCQInfo;
  /**
   */
  additional: AdditionalCQInfo;
}
