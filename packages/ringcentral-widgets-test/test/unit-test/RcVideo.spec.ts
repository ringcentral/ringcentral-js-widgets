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
  waiting_room: false,
  waiting_room_guests_only: 'all',
};

const mockSettingLocks = {
  // join_audio_mute: false,
  // join_video_off: false,
  join_before_host: false,
  password_scheduled: false,
  password_instant: false,
  guest_join: false,
  join_authenticated_from_account_only: false,
  screen_sharing_host_only: false,
};

beforeEach(() => {
  mockSaveSinglePreference.mockClear();
});

describe.each`
  isMeetingSecret | allowJoinBeforeHost | isOnlyAuthUserJoin | isOnlyCoworkersJoin | allowScreenSharing | waitingRoomMode | expected
  ${true}         | ${false}            | ${false}           | ${false}            | ${true}            | ${0}            | ${0}
  ${true}         | ${true}             | ${false}           | ${false}            | ${true}            | ${0}            | ${1}
  ${false}        | ${true}             | ${false}           | ${false}            | ${true}            | ${0}            | ${2}
  ${false}        | ${true}             | ${true}            | ${false}            | ${true}            | ${0}            | ${3}
  ${false}        | ${true}             | ${true}            | ${true}             | ${true}            | ${0}            | ${4}
  ${false}        | ${true}             | ${true}            | ${true}             | ${false}           | ${0}            | ${5}
  ${false}        | ${true}             | ${true}            | ${true}             | ${false}           | ${1}            | ${6}
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
    waitingRoomMode,
    expected,
  }) => {
    test(`${expected} preference changes should be detected and saved to backend`, async () => {
      const context = {
        get preferences() {
          return mockPreferences;
        },
        get settingLocks() {
          return mockSettingLocks;
        },
        _isInstantMeeting: false,
        enableWaitingRoom: true,
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
        waitingRoomMode,
      });
      expect(mockSaveSinglePreference).toBeCalledTimes(expected);
    });
  },
);
