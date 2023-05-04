// Reason for the feature unavailability. Returned only if `available` is set to 'false'
export interface ReasonInfo {
  /**
   * Reason code
   */
  code:
    | 'ServicePlanLimitation'
    | 'AccountLimitation'
    | 'ExtensionTypeLimitation'
    | 'ExtensionLimitation'
    | 'InsufficientPermissions'
    | 'ConfigurationLimitation';
  /**
   * Reason description
   */
  message: string;
  /**
   */
  permission: string;
}
