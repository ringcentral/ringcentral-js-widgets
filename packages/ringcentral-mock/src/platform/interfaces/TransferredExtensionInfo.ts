import { CallHandlingExtensionInfo } from './CallHandlingExtensionInfo';

// Transfer settings applied for department (call queue) extension type, returned if CallHandlingAction is set to `TransferToExtension`
export interface TransferredExtensionInfo {
  /**
   */
  extension: CallHandlingExtensionInfo;
}
