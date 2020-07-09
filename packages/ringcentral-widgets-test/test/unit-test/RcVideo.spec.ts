import { RcVideo } from 'ringcentral-integration/modules/RcVideo/RcVideo';

const mockSaveSinglePreference = jest.fn();
const mockUpdatePreference = jest.fn();

const mockPreferences = {
  // join_audio_mute: false,
  // join_video_off: false,
  join_before_host: false,
  password_scheduled: true,
  password_instant: true,
};

beforeEach(() => {
  mockSaveSinglePreference.mockClear();
});

describe.each`
  isMeetingSecret | allowJoinBeforeHost | expected
  ${true}         | ${false}            | ${0}
  ${true}         | ${true}             | ${1}
  ${false}        | ${true}             | ${2}
`(
  'RCV Preferences',
  ({
    isMeetingSecret,
    allowJoinBeforeHost,
    // muteVideo,
    // muteAudio,
    expected,
  }) => {
    test(`${expected} preference changes should be detected and saved to backend`, async () => {
      const context = {
        get preferences() {
          return mockPreferences;
        },
        _isInstantMeeting: false,
        _saveSinglePreference: mockSaveSinglePreference,
        updatePreference: mockUpdatePreference,
      };
      const savePreferencesChanges = RcVideo.prototype.savePreferencesChanges.bind(
        context,
      );
      await savePreferencesChanges({
        isMeetingSecret,
        allowJoinBeforeHost,
        // muteVideo,
        // muteAudio,
      });
      expect(mockSaveSinglePreference).toBeCalledTimes(expected);
    });
  },
);
