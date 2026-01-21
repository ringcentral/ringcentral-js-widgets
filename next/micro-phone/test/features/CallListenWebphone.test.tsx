import { RcModule } from '@ringcentral-integration/next-core';
import { of } from 'rxjs';

import { Call } from '../../src/app/services';

// Mock dependencies
class MockToast {
  warning = jest.fn();
  danger = jest.fn();
}

class MockStoragePlugin {
  enable = jest.fn();
}

class MockBrand {
  name = 'Test Brand';
  brandConfig = { allowRegionSettings: true };
}

class MockSoftphone {
  makeCall = jest.fn();
}

class MockRingout {
  makeCall = jest.fn();
}

class MockRegionSettings {
  areaCode = '650';
  countryCode = 'US';
  homeCountryId = '1';
}

class MockCallingSettings {
  isWebphoneMode = true;
  callingMode = 'webphone';
  fromNumber = '+1234567890';
  myLocation = '+1234567890';
  ringoutPrompt = false;
}

class MockExtensionFeatures {
  // Mock implementation
}

class MockNumberValidate {
  validate = jest.fn();
  parseNumbers = jest.fn();
  openNoAreaCodeToast = jest.fn();
  handleValidateToasts = jest.fn();
}

class MockAppFeatures {
  isEDPEnabled = false;
}

class MockPortManager {
  shared = false;
  onServer = jest.fn();
  onMainTabChange$ = of({});
}

class MockActiveCallControl {
  makeCall = jest.fn();
}

class MockWebphone {
  connect = jest.fn().mockResolvedValue(undefined);
  disconnect = jest.fn().mockResolvedValue(undefined);
}

class MockAvailabilityMonitor {
  checkIfHAError = jest.fn().mockReturnValue(false);
}

class MockCallOptions {
  // Mock implementation
}

describe('Call.listenWebphone', () => {
  test('should connect webphone when isWebphoneMode is true', async () => {
    const mockWebphone = new MockWebphone();
    const mockCallingSettings = new MockCallingSettings();
    mockCallingSettings.isWebphoneMode = true;

    const call = new Call(
      new MockToast() as any,
      new MockStoragePlugin() as any,
      new MockBrand() as any,
      new MockSoftphone() as any,
      new MockRingout() as any,
      new MockRegionSettings() as any,
      mockCallingSettings as any,
      new MockExtensionFeatures() as any,
      new MockNumberValidate() as any,
      new MockAppFeatures() as any,
      new MockPortManager() as any,
      new MockActiveCallControl() as any,
      mockWebphone as any,
      new MockAvailabilityMonitor() as any,
      new MockCallOptions() as any,
    );

    // Call the private listenWebphone method
    await (call as any).listenWebphone();

    expect(mockWebphone.connect).toHaveBeenCalled();
    expect(mockWebphone.disconnect).not.toHaveBeenCalled();
  });

  test('should disconnect webphone when isWebphoneMode is false', async () => {
    const mockWebphone = new MockWebphone();
    const mockCallingSettings = new MockCallingSettings();
    mockCallingSettings.isWebphoneMode = false;

    const call = new Call(
      new MockToast() as any,
      new MockStoragePlugin() as any,
      new MockBrand() as any,
      new MockSoftphone() as any,
      new MockRingout() as any,
      new MockRegionSettings() as any,
      mockCallingSettings as any,
      new MockExtensionFeatures() as any,
      new MockNumberValidate() as any,
      new MockAppFeatures() as any,
      new MockPortManager() as any,
      new MockActiveCallControl() as any,
      mockWebphone as any,
      new MockAvailabilityMonitor() as any,
      new MockCallOptions() as any,
    );

    // Call the private listenWebphone method
    await (call as any).listenWebphone();

    expect(mockWebphone.disconnect).toHaveBeenCalled();
    expect(mockWebphone.connect).not.toHaveBeenCalled();
  });

  test('should handle webphone connection errors gracefully', async () => {
    const mockWebphone = new MockWebphone();
    const mockCallingSettings = new MockCallingSettings();
    mockCallingSettings.isWebphoneMode = true;

    const connectionError = new Error('Connection failed');
    mockWebphone.connect = jest.fn().mockRejectedValue(connectionError);

    const call = new Call(
      new MockToast() as any,
      new MockStoragePlugin() as any,
      new MockBrand() as any,
      new MockSoftphone() as any,
      new MockRingout() as any,
      new MockRegionSettings() as any,
      mockCallingSettings as any,
      new MockExtensionFeatures() as any,
      new MockNumberValidate() as any,
      new MockAppFeatures() as any,
      new MockPortManager() as any,
      new MockActiveCallControl() as any,
      mockWebphone as any,
      new MockAvailabilityMonitor() as any,
      new MockCallOptions() as any,
    );

    jest.spyOn(call['logger'], 'error');

    // Call the private listenWebphone method
    await (call as any).listenWebphone();

    expect(call['logger'].error).toHaveBeenCalledWith(
      'webphone process error',
      connectionError,
    );
  });

  test('should handle webphone disconnection errors gracefully', async () => {
    const mockWebphone = new MockWebphone();
    const mockCallingSettings = new MockCallingSettings();
    mockCallingSettings.isWebphoneMode = false;

    const disconnectionError = new Error('Disconnection failed');
    mockWebphone.disconnect = jest.fn().mockRejectedValue(disconnectionError);

    const call = new Call(
      new MockToast() as any,
      new MockStoragePlugin() as any,
      new MockBrand() as any,
      new MockSoftphone() as any,
      new MockRingout() as any,
      new MockRegionSettings() as any,
      mockCallingSettings as any,
      new MockExtensionFeatures() as any,
      new MockNumberValidate() as any,
      new MockAppFeatures() as any,
      new MockPortManager() as any,
      new MockActiveCallControl() as any,
      mockWebphone as any,
      new MockAvailabilityMonitor() as any,
      new MockCallOptions() as any,
    );

    jest.spyOn(call['logger'], 'error');

    // Call the private listenWebphone method
    await (call as any).listenWebphone();

    expect(call['logger'].error).toHaveBeenCalledWith(
      'webphone process error',
      disconnectionError,
    );
  });

  test('should return early when webphone is not available', async () => {
    const mockCallingSettings = new MockCallingSettings();
    mockCallingSettings.isWebphoneMode = true;

    const call = new Call(
      new MockToast() as any,
      new MockStoragePlugin() as any,
      new MockBrand() as any,
      new MockSoftphone() as any,
      new MockRingout() as any,
      new MockRegionSettings() as any,
      mockCallingSettings as any,
      new MockExtensionFeatures() as any,
      new MockNumberValidate() as any,
      new MockAppFeatures() as any,
      new MockPortManager() as any,
      new MockActiveCallControl() as any,
      undefined as any, // webphone is undefined
      new MockAvailabilityMonitor() as any,
      new MockCallOptions() as any,
    );

    // Call the private listenWebphone method
    const result = await (call as any).listenWebphone();

    // Should return early without calling webphone methods
    expect(result).toBeUndefined();
  });

  test('should handle port manager shared mode correctly', async () => {
    const mockWebphone = new MockWebphone();
    const mockCallingSettings = new MockCallingSettings();
    const mockPortManager = new MockPortManager();
    mockPortManager.shared = true;
    mockPortManager.onServer = jest.fn().mockImplementation((callback) => {
      // Simulate server callback being called
      callback();
      return { unsubscribe: jest.fn() };
    });

    const call = new Call(
      new MockToast() as any,
      new MockStoragePlugin() as any,
      new MockBrand() as any,
      new MockSoftphone() as any,
      new MockRingout() as any,
      new MockRegionSettings() as any,
      mockCallingSettings as any,
      new MockExtensionFeatures() as any,
      new MockNumberValidate() as any,
      new MockAppFeatures() as any,
      mockPortManager as any,
      new MockActiveCallControl() as any,
      mockWebphone as any,
      new MockAvailabilityMonitor() as any,
      new MockCallOptions() as any,
    );

    expect(mockPortManager.onServer).toHaveBeenCalled();
    expect(mockWebphone.connect).toHaveBeenCalled();
  });

  test('should handle port manager non-shared mode correctly', async () => {
    const mockWebphone = new MockWebphone();
    const mockCallingSettings = new MockCallingSettings();
    const mockPortManager = new MockPortManager();
    mockPortManager.shared = false;
    mockPortManager.onServer = jest.fn();

    const call = new Call(
      new MockToast() as any,
      new MockStoragePlugin() as any,
      new MockBrand() as any,
      new MockSoftphone() as any,
      new MockRingout() as any,
      new MockRegionSettings() as any,
      mockCallingSettings as any,
      new MockExtensionFeatures() as any,
      new MockNumberValidate() as any,
      new MockAppFeatures() as any,
      mockPortManager as any,
      new MockActiveCallControl() as any,
      mockWebphone as any,
      new MockAvailabilityMonitor() as any,
      new MockCallOptions() as any,
    );

    // In non-shared mode, onServer should not be called
    expect(mockPortManager.onServer).not.toHaveBeenCalled();
    expect(mockWebphone.connect).toHaveBeenCalled();
  });
});
