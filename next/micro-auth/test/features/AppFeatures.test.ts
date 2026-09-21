import { AppFeatures } from '../../src/app/services/AppFeatures/AppFeatures';

const createAppFeatures = ({
  available = true,
  smsEnabled = true,
  params = [
    { name: 'callQueueSupported', value: 'true' },
    { name: 'siteSupported', value: 'false' },
  ],
  features = {},
}: {
  available?: boolean;
  smsEnabled?: boolean;
  params?: Array<{ name: string; value: string }>;
  features?: Record<string, { available?: boolean }>;
} = {}) =>
  Object.assign(Object.create(AppFeatures.prototype), {
    _extensionFeatures: {
      features: {
        MessageThreads: {
          available,
          params,
        },
        ...features,
      },
    },
    _featureConfiguration: {
      SMS: smsEnabled,
    },
  }) as AppFeatures;

describe('AppFeatures', () => {
  it('reads MessageThreads permission and support params', () => {
    const appFeatures = createAppFeatures();

    expect(appFeatures.hasMessageThreadsPermission).toBe(true);
    expect(appFeatures.hasMessageThreadCallQueueSupported).toBe(true);
    expect(appFeatures.hasMessageThreadSiteSupported).toBe(false);
  });

  it('disables MessageThreads support when feature or SMS config is disabled', () => {
    expect(
      createAppFeatures({ available: false }).hasMessageThreadsPermission,
    ).toBe(false);
    expect(
      createAppFeatures({ smsEnabled: false }).hasMessageThreadsPermission,
    ).toBe(false);
    expect(
      createAppFeatures({ smsEnabled: false })
        .hasMessageThreadCallQueueSupported,
    ).toBe(false);
  });

  it('requires true string values for MessageThreads support params', () => {
    const appFeatures = createAppFeatures({
      params: [
        { name: 'callQueueSupported', value: 'false' },
        { name: 'siteSupported', value: 'true' },
      ],
    });

    expect(appFeatures.hasMessageThreadCallQueueSupported).toBe(false);
    expect(appFeatures.hasMessageThreadSiteSupported).toBe(true);
  });

  describe('hasCallRecordingPermission', () => {
    it('is true when OnDemandCallRecording is available', () => {
      expect(
        createAppFeatures({
          features: {
            OnDemandCallRecording: { available: true },
            AutoCallRecordingMute: { available: false },
          },
        }).hasCallRecordingPermission,
      ).toBe(true);
    });

    it('is true when only AutoCallRecordingMute is available (ACR allow mute)', () => {
      expect(
        createAppFeatures({
          features: {
            OnDemandCallRecording: { available: false },
            AutoCallRecordingMute: { available: true },
          },
        }).hasCallRecordingPermission,
      ).toBe(true);
    });

    it('is false when neither OnDemand nor AutoCallRecordingMute is available', () => {
      expect(
        createAppFeatures({
          features: {
            OnDemandCallRecording: { available: false },
            AutoCallRecordingMute: { available: false },
          },
        }).hasCallRecordingPermission,
      ).toBe(false);
    });
  });
});
