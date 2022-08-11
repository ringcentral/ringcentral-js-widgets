import { MissedCallExtensionInfoExternalNumber } from './MissedCallExtensionInfoExternalNumber';

// Specifies an extension (a calling group) which should be used for the missed call transfer. Returned only if the `actionType` is set to 'ConnectToExtension'
export interface MissedCallExtensionInfo {
  /**
   * Internal identifier of an extension which should be used for the missed call transfer
   */
  id: string;
  /**
   */
  externalNumber: MissedCallExtensionInfoExternalNumber;
}
