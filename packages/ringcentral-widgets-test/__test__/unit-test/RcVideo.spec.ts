import { RcVideo } from '@ringcentral-integration/commons/modules/RcVideo/RcVideo';
import { RCV_E2EE_DEFAULT_SECURITY_OPTIONS } from '@ringcentral-integration/commons/modules/RcVideo/videoHelper';

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

const mockMeetingSettings = {
  e2ee: false,
  allowJoinBeforeHost: false,
  muteAudio: false,
  muteVideo: false,
  isMeetingSecret: true,
  meetingPassword: '',
  isOnlyAuthUserJoin: false,
  isOnlyCoworkersJoin: false,
  waitingRoomMode: 0,
  settingLock: {
    allowJoinBeforeHost: false,
    isMeetingSecret: false,
    isOnlyAuthUserJoin: false,
    isOnlyCoworkersJoin: false,
    allowScreenSharing: false,
    waitingRoomMode: false,
    e2ee: false,
  },
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

describe.each`
  isJbhLock | jbhOldVal | jbhNewVal
  ${true}   | ${false}  | ${false}
  ${true}   | ${true}   | ${true}
  ${false}  | ${true}   | ${false}
  ${false}  | ${false}  | ${false}
`('Check RCV turnOnE2ee Functions', ({ isJbhLock, jbhOldVal, jbhNewVal }) => {
  test(`revoke turnOnE2ee Function should set as RCV_E2EE_DEFAULT_SECURITY_OPTIONS`, async () => {
    const context = {
      meeting: {
        ...mockMeetingSettings,
        allowJoinBeforeHost: jbhOldVal,
        settingLock: {
          allowJoinBeforeHost: isJbhLock,
        },
      },
      updateMeetingSettings: jest.fn(),
    };
    const turnOnE2ee = RcVideo.prototype.turnOnE2ee.bind(context);

    await turnOnE2ee();
    expect(context.updateMeetingSettings).toBeCalledWith({
      ...RCV_E2EE_DEFAULT_SECURITY_OPTIONS,
      e2ee: true,
      allowJoinBeforeHost: jbhNewVal,
    });
  });
});
