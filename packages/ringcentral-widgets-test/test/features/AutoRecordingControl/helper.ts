import featuresBody from '@ringcentral-integration/commons/integration-test/mock/data/features.json';
import {
  FeaturesData,
  Record,
} from '@ringcentral-integration/commons/integration-test/mock';

export function generateFeaturesData(
  mockAutoCallRecording: Record,
  mockAutoCallRecordingMute: Record,
): FeaturesData {
  return {
    records: [
      ...featuresBody.records.filter(
        ({ id }) =>
          id !== mockAutoCallRecording.id &&
          id !== mockAutoCallRecordingMute.id,
      ),
      mockAutoCallRecording,
      mockAutoCallRecordingMute,
    ],
  };
}
