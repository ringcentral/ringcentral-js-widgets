import { CallerIdByDeviceRequest } from './CallerIdByDeviceRequest';
import { CallerIdByFeatureRequest } from './CallerIdByFeatureRequest';

export interface ExtensionCallerIdInfoRequest {
  /**
   * Canonical URL of a caller ID resource
   */
  uri: string;
  /**
   */
  byDevice: CallerIdByDeviceRequest[];
  /**
   */
  byFeature: CallerIdByFeatureRequest[];
  /**
   * If 'True', then user first name and last name will be used as caller ID when making outbound calls from extension
   */
  extensionNameForOutboundCalls: boolean;
  /**
   * If 'True', then extension number will be used as caller ID when making internal calls
   */
  extensionNumberForInternalCalls: boolean;
}
