import type { AccountConfigurationResponse } from '@ringcentral-integration/micro-next-commons/src/models';

export interface AALOptions {
  /**
   * the aal endpoint for user to navigate to the integration console
   */
  endpoint: string;
  /**
   * end user guide link
   */
  endUserGuideLink: string;
  /**
   * the auto call logging preference configuration of the account
   */
  autoCallLoggingPreference?: AccountConfigurationResponse | null;
  /**
   * the state of the auto log switch in the local
   */
  localAutoLog?: boolean;
  /**
   * the callback function to change the state of the auto log switch in the local
   */
  onLocalAutoLogChange?: (checked: boolean) => void;
  /**
   * the state of the auto log switch in the remote server
   */
  remoteAutoLog?: boolean;
  /**
   * Whether the user is an admin
   */
  isAdmin?: boolean;
  /**
   * disable the ability to change the auto log switch
   */
  disableAutoLogControl?: boolean;
  /**
   * Whether the feature is enabled
   */
  featureEnabled?: boolean;
}
