// Information on account target service plan
export interface TargetServicePlanInfo {
  /**
   * Internal identifier of a target service plan
   */
  id: string;
  /**
   * Name of a target service plan
   */
  name: string;
  /**
   * Edition of a service plan
   */
  edition: string;
  /**
   */
  freemiumProductType: 'Freyja' | 'Phoenix';
}
