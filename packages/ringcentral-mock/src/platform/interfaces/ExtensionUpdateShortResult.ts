import { ErrorEntity } from './ErrorEntity';

export interface ExtensionUpdateShortResult {
  /**
   * Internal identifier of an extension
   */
  extensionId: string;
  /**
   * Extension update status
   */
  status: 'Fail' | 'Success';
  /**
   */
  errors: ErrorEntity[];
}
