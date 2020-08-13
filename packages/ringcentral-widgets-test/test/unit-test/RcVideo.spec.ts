import { RcVideo } from 'ringcentral-integration/modules/RcVideo/RcVideo';

const mockSaveSinglePreference = jest.fn();
const mockUpdatePreference = jest.fn();

const mockPreferences = {
  // join_audio_mute: false,
  // join_video_off: false,
  join_before_host: false,
  password_scheduled: true,
  password_instant: true,
  guest_join: false,
  join_authenticated_from_account_only: 'anyone_signed_into_rc',
  screen_sharing_host_only: 'all',
};

beforeEach(() => {
  mockSaveSinglePreference.mockClear();
});

describe.each`
  isMeetingSecret | allowJoinBeforeHost | isOnlyAuthUserJoin | isOnlyCoworkersJoin | allowScreenSharing | expected
  ${true}         | ${false}            | ${false}           | ${false}            | ${true}            | ${0}
  ${true}         | ${true}             | ${false}           | ${false}            | ${true}            | ${1}
  ${false}        | ${true}             | ${false}           | ${false}            | ${true}            | ${2}
  ${false}        | ${true}             | ${true}            | ${false}            | ${true}            | ${3}
  ${false}        | ${true}             | ${true}            | ${true}             | ${true}            | ${4}
  ${false}        | ${true}             | ${true}            | ${true}             | ${false}           | ${5}
`(
  'RCV Preferences',
  ({
    isMeetingSecret,
    allowJoinBeforeHost,
    // muteVideo,
    // muteAudio,
    isOnlyAuthUserJoin,
    isOnlyCoworkersJoin,
    allowScreenSharing,
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
        isOnlyAuthUserJoin,
        isOnlyCoworkersJoin,
        allowScreenSharing,
      });
      expect(mockSaveSinglePreference).toBeCalledTimes(expected);
    });
  },
);
