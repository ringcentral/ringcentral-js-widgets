import type { CallRecordingExtensionResource } from './CallRecordingExtensionResource';

export interface BulkAccountCallRecordingsResource {
  /**
   */
  addedExtensions: CallRecordingExtensionResource[];
  /**
   */
  updatedExtensions: CallRecordingExtensionResource[];
  /**
   */
  removedExtensions: CallRecordingExtensionResource[];
}
