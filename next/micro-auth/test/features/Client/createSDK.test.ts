import { removeSDKNonISO8859Chars } from '@ringcentral-integration/core';
import type { BrandConfig } from '@ringcentral-integration/micro-core/src/app/services';
import { SDK } from '@ringcentral/sdk';

import { createSDK } from '../../../src/app/services/Client/createSDK';

// Mock the SDK constructor
jest.mock('@ringcentral/sdk', () => ({
  __esModule: true,
  SDK: jest.fn(),
}));
// Mock the removeSDKNonISO8859Chars function
jest.mock('@ringcentral-integration/core', () => ({
  removeSDKNonISO8859Chars: jest.fn((config) => config),
}));

describe('createSDK', () => {
  const mockSdkConfig = {
    clientId: 'test-client-id',
    clientSecret: 'test-client-secret',
    server: 'https://test-server.com',
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (removeSDKNonISO8859Chars as jest.Mock).mockClear();
  });

  it('should create SDK instance with sanitized config', () => {
    // Arrange
    const expectedConfig = { ...mockSdkConfig };

    // Act
    createSDK(mockSdkConfig, undefined);

    // Assert
    expect(removeSDKNonISO8859Chars).toHaveBeenCalledWith(mockSdkConfig);
    expect(SDK).toHaveBeenCalledWith(expectedConfig);
  });

  it('should set brandId to undefined when brand code is "rc"', () => {
    // Arrange
    const brandConfig = {
      id: 'test-brand-id',
      code: 'rc',
      name: 'Test Brand',
    } as BrandConfig;
    const expectedConfig = {
      ...mockSdkConfig,
      brandId: undefined,
    };

    // Act
    createSDK(mockSdkConfig, brandConfig);

    // Assert
    expect(removeSDKNonISO8859Chars).toHaveBeenCalledWith(mockSdkConfig);
    expect(SDK).toHaveBeenCalledWith(expectedConfig);
  });

  it('should set brandId when brand code is not "rc"', () => {
    // Arrange
    const brandConfig = {
      id: 'test-brand-id',
      code: 'other',
      name: 'Test Brand',
    } as BrandConfig;
    const expectedConfig = {
      ...mockSdkConfig,
      brandId: 'test-brand-id',
    };

    // Act
    createSDK(mockSdkConfig, brandConfig);

    // Assert
    expect(removeSDKNonISO8859Chars).toHaveBeenCalledWith(mockSdkConfig);
    expect(SDK).toHaveBeenCalledWith(expectedConfig);
  });

  it('should not modify brandId when brandConfig is undefined', () => {
    // Arrange
    const expectedConfig = { ...mockSdkConfig };

    // Act
    createSDK(mockSdkConfig, undefined);

    // Assert
    expect(removeSDKNonISO8859Chars).toHaveBeenCalledWith(mockSdkConfig);
    expect(SDK).toHaveBeenCalledWith(expectedConfig);
  });

  it('should return the created SDK instance', () => {
    // Arrange
    const mockSdkInstance = { foo: 'bar' };
    jest.mocked(SDK).mockReturnValue(mockSdkInstance as any);

    // Act
    const result = createSDK(mockSdkConfig, undefined);

    // Assert
    expect(result).toBe(mockSdkInstance);
  });

  it('should still set brandId for partner brands when brandConfig is passed', () => {
    const brandConfig = {
      id: '3460',
      code: 'bt',
      name: 'BT Cloud Work',
    } as BrandConfig;

    createSDK(mockSdkConfig, brandConfig);

    expect(SDK).toHaveBeenCalledWith({
      ...mockSdkConfig,
      brandId: '3460',
    });
  });
});
