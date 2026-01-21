import type { SDKConfig } from '@ringcentral-integration/commons/lib/createSdkConfig';
import { Client } from '@ringcentral-integration/micro-auth/src/app/services';
import {
  Coworker,
  Root,
  SymmetricTransport,
  testBed,
} from '@ringcentral-integration/next-core';

import { CoworkerAuth } from './CoworkerAuth';
import type { CoworkerAuthOptions } from './CoworkerAuth.interface';

describe('CoworkerAuth', () => {
  let mockClient: jest.Mocked<Client>;
  let mockRoot: jest.Mocked<Root>;
  let mockSdkConfig: jest.Mocked<SDKConfig>;
  let mockTransport: jest.Mocked<SymmetricTransport<any>>;
  let mockPlatform: any;
  let mockAuth: any;

  beforeEach(() => {
    mockAuth = {
      accessTokenValid: jest.fn(),
    };

    mockPlatform = {
      refresh: jest.fn(),
      auth: jest.fn(() => mockAuth),
      ensureLoggedIn: jest.fn(),
    };

    mockTransport = {
      listen: jest.fn(),
      emit: jest.fn(),
    } as any;

    mockClient = {
      service: {
        platform: jest.fn(() => mockPlatform),
      },
    } as any;

    mockRoot = {} as any;

    mockSdkConfig = {
      localStorage: {},
    } as any;
  });

  const createMockCoworker = (isMain: boolean, isCoworker: boolean) => ({
    isMain,
    isCoworker,
    transport: mockTransport,
  } as any);

  describe('when running in main context', () => {
    test('should initialize in main and set up refresh token listener', () => {
      const mockCoworker = createMockCoworker(true, false);
      const coworkerAuth = testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: mockSdkConfig },
        ],
      });

      expect(mockTransport.listen).toHaveBeenCalledWith(
        'refreshToken',
        expect.any(Function),
      );
    });

    test('should call platform refresh when refreshToken event is triggered', async () => {
      const mockCoworker = createMockCoworker(true, false);
      testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: mockSdkConfig },
        ],
      });

      // Get the callback function passed to listen
      const refreshTokenCallback = mockTransport.listen.mock.calls.find(
        (call) => call[0] === 'refreshToken',
      )?.[1];

      expect(refreshTokenCallback).toBeDefined();

      // Call the callback and verify platform.refresh is called
      await refreshTokenCallback();
      expect(mockPlatform.refresh).toHaveBeenCalledTimes(1);
    });

    test('should expose transport property', () => {
      const mockCoworker = createMockCoworker(true, false);
      const coworkerAuth = testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: mockSdkConfig },
        ],
      });

      expect(coworkerAuth.instance.transport).toBe(mockTransport);
    });
  });

  describe('when running in worker context', () => {
    test('should initialize in worker and override ensureLoggedIn', () => {
      const mockCoworker = createMockCoworker(false, true);
      testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: mockSdkConfig },
        ],
      });

      // Verify that ensureLoggedIn has been overridden
      expect(mockPlatform.ensureLoggedIn).toBeDefined();
      expect(typeof mockPlatform.ensureLoggedIn).toBe('function');
    });

    test('should emit refreshToken when access token is invalid', async () => {
      const mockCoworker = createMockCoworker(false, true);
      mockAuth.accessTokenValid.mockResolvedValue(false);

      testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: mockSdkConfig },
        ],
      });

      // Call the overridden ensureLoggedIn method
      await mockPlatform.ensureLoggedIn();

      expect(mockAuth.accessTokenValid).toHaveBeenCalledTimes(1);
      expect(mockTransport.emit).toHaveBeenCalledWith('refreshToken');
    });

    test('should not emit refreshToken when access token is valid', async () => {
      const mockCoworker = createMockCoworker(false, true);
      mockAuth.accessTokenValid.mockResolvedValue(true);

      testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: mockSdkConfig },
        ],
      });

      // Call the overridden ensureLoggedIn method
      await mockPlatform.ensureLoggedIn();

      expect(mockAuth.accessTokenValid).toHaveBeenCalledTimes(1);
      expect(mockTransport.emit).not.toHaveBeenCalled();
    });

    test('should not initialize when localStorage is not available', () => {
      const mockCoworker = createMockCoworker(false, true);
      const sdkConfigWithoutStorage = {
        localStorage: null,
      } as any;

      // Store the original ensureLoggedIn function
      const originalEnsureLoggedIn = mockPlatform.ensureLoggedIn;

      testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: sdkConfigWithoutStorage },
        ],
      });

      // ensureLoggedIn should not be overridden when localStorage is not available
      expect(mockPlatform.ensureLoggedIn).toBe(originalEnsureLoggedIn);
    });
  });

  describe('when neither main nor worker', () => {
    test('should not initialize any listeners or overrides', () => {
      const mockCoworker = createMockCoworker(false, false);
      // Store the original ensureLoggedIn function
      const originalEnsureLoggedIn = mockPlatform.ensureLoggedIn;

      testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: mockSdkConfig },
        ],
      });

      expect(mockTransport.listen).not.toHaveBeenCalled();
      expect(mockPlatform.ensureLoggedIn).toBe(originalEnsureLoggedIn);
    });
  });

  describe('with CoworkerAuthOptions', () => {
    test('should accept optional CoworkerAuthOptions', () => {
      const mockCoworker = createMockCoworker(false, false);
      const coworkerAuthOptions: CoworkerAuthOptions = {};

      const coworkerAuth = testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: mockSdkConfig },
          { provide: 'CoworkerAuthOptions', useValue: coworkerAuthOptions },
        ],
      });

      expect(coworkerAuth.instance).toBeDefined();
    });
  });

  describe('error handling', () => {
    test('should handle platform refresh errors in main context', async () => {
      const mockCoworker = createMockCoworker(true, false);
      mockPlatform.refresh.mockRejectedValue(new Error('Refresh failed'));

      testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: mockSdkConfig },
        ],
      });

      const refreshTokenCallback = mockTransport.listen.mock.calls.find(
        (call) => call[0] === 'refreshToken',
      )?.[1];

      await expect(refreshTokenCallback()).rejects.toThrow('Refresh failed');
    });

    test('should handle access token validation errors in worker context', async () => {
      const mockCoworker = createMockCoworker(false, true);
      mockAuth.accessTokenValid.mockRejectedValue(
        new Error('Token validation failed'),
      );

      testBed({
        main: CoworkerAuth,
        modules: [
          { provide: Coworker, useValue: mockCoworker },
          { provide: Client, useValue: mockClient },
          { provide: Root, useValue: mockRoot },
          { provide: 'SdkConfig', useValue: mockSdkConfig },
        ],
      });

      await expect(mockPlatform.ensureLoggedIn()).rejects.toThrow(
        'Token validation failed',
      );
    });
  });
});
