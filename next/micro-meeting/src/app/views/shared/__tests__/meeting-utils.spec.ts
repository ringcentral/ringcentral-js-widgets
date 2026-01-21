import {
  WAITING_ROOM_MODE,
  WHO_CAN_JOIN_OPTIONS,
  WAITING_ROOM_PARTICIPANTS_OPTIONS,
} from '../../GenericMeetingViewSpring/constants';
import {
  // Value calculation utilities
  getWhoCanJoinValue,
  getWaitingRoomValue,
  getWhoCanJoinOptions,
  getWaitingRoomOptions,
  calculateDisabledStates,
  createRequirePasswordChangeHandler,
  createPasswordChangeHandler,
  createWhoCanJoinChangeHandler,
  createUseWaitingRoomChangeHandler,
  createWaitingRoomParticipantsChangeHandler,
  createStartMeetingAfterJoinChangeHandler,
} from '../meeting-utils';

describe('Meeting Utilities', () => {
  // Common mocks
  let mockGenericMeeting: any;
  let mockBrand: any;

  beforeEach(() => {
    mockGenericMeeting = {
      ready: true,
      isUpdating: false,
      enableWaitingRoom: true,
      enableE2EE: true,
      personalMeetingSettings: {
        meetingPassword: 'personal-password',
      },
      updateMeetingSettings: jest.fn(),
      updatePersonalMeetingSettings: jest.fn(),
      updateHasSettingsChanged: jest.fn(),
      generateRcvMeetingPassword: jest
        .fn()
        .mockReturnValue('generated-password'),
    };

    mockBrand = {
      brandConfig: {
        shortName: 'RingCentral',
      },
    };
  });

  describe('Meeting Access Controls', () => {
    describe('Who Can Join settings', () => {
      it('should determine "who can join" value based on meeting settings', () => {
        // Given different meeting settings
        const meetingA = { isOnlyCoworkersJoin: true };
        const meetingB = { isOnlyAuthUserJoin: true };
        const meetingC = {};

        // When getting the who can join value
        const valueA = getWhoCanJoinValue(meetingA);
        const valueB = getWhoCanJoinValue(meetingB);
        const valueC = getWhoCanJoinValue(meetingC);

        // Then the correct values are returned
        expect(valueA).toBe(WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS);
        expect(valueB).toBe(WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS);
        expect(valueC).toBe(WHO_CAN_JOIN_OPTIONS.ANYONE_WITH_LINK);
      });

      it('should provide standard set of "who can join" options', () => {
        // When getting the options
        const options = getWhoCanJoinOptions(mockBrand);

        // Then all necessary options are included
        expect(options).toEqual([
          {
            label: 'Anyone with link',
            value: WHO_CAN_JOIN_OPTIONS.ANYONE_WITH_LINK,
          },
          {
            label: 'Only RingCentral accounts',
            value: WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS,
          },
          {
            label: 'Only my coworkers',
            value: WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS,
          },
        ]);
      });

      it('should update meeting with correct flags when changing who can join', () => {
        // Given a meeting with anyone access
        const initialSettings = {
          name: 'Test Meeting',
          isOnlyCoworkersJoin: false,
          isOnlyAuthUserJoin: false,
          waitingRoomMode: WAITING_ROOM_MODE.NOT_COWORKER,
        };
        const getSettings = () => initialSettings;

        // When changing to coworkers only
        const handler = createWhoCanJoinChangeHandler(
          mockGenericMeeting,
          getSettings,
        );
        handler(WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS);

        // Then the meeting is updated with correct settings
        expect(mockGenericMeeting.updateMeetingSettings).toHaveBeenCalledWith({
          name: 'Test Meeting',
          isOnlyCoworkersJoin: true,
          isOnlyAuthUserJoin: true,
          waitingRoomMode: WAITING_ROOM_MODE.ALL, // Automatically adjusted
          allowJoinBeforeHost: false, // Automatically disabled
        });
        expect(
          mockGenericMeeting.updateHasSettingsChanged,
        ).toHaveBeenCalledWith(true);
      });

      it('should update "anyone not signed in" waiting room setting when changing to accounts only', () => {
        // Given a meeting with guests waiting room
        const initialSettings = {
          waitingRoomMode: WAITING_ROOM_MODE.GUESTS,
          isOnlyCoworkersJoin: false,
          isOnlyAuthUserJoin: false,
        };
        const getSettings = () => initialSettings;

        // When changing to RingCentral accounts only
        const handler = createWhoCanJoinChangeHandler(
          mockGenericMeeting,
          getSettings,
        );
        handler(WHO_CAN_JOIN_OPTIONS.ONLY_RINGCENTRAL_ACCOUNTS);

        // Then the waiting room mode is adjusted to outside company
        expect(mockGenericMeeting.updateMeetingSettings).toHaveBeenCalledWith({
          waitingRoomMode: WAITING_ROOM_MODE.NOT_COWORKER,
          isOnlyCoworkersJoin: false,
          isOnlyAuthUserJoin: true,
        });
      });
    });

    describe('Waiting Room Value', () => {
      it('should return correct waiting room value for OFF mode', () => {
        // Given a meeting with waiting room OFF
        const meeting = { waitingRoomMode: WAITING_ROOM_MODE.OFF };

        // When getting the waiting room value
        const value = getWaitingRoomValue(meeting);

        // Then it should return "for anyone outside my company"
        expect(value).toBe(
          WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY,
        );
      });

      it('should return correct waiting room value for ALL mode', () => {
        // Given a meeting with waiting room for ALL participants
        const meeting = { waitingRoomMode: WAITING_ROOM_MODE.ALL };

        // When getting the waiting room value
        const value = getWaitingRoomValue(meeting);

        // Then it should return "all participants"
        expect(value).toBe(WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS);
      });

      it('should return correct waiting room value for GUESTS mode', () => {
        // Given a meeting with waiting room for guests only
        const meeting = { waitingRoomMode: WAITING_ROOM_MODE.GUESTS };

        // When getting the waiting room value
        const value = getWaitingRoomValue(meeting);

        // Then it should return "for anyone not signed in"
        expect(value).toBe(
          WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_NOT_SIGNED_IN,
        );
      });

      it('should return correct waiting room value for NOT_COWORKER mode', () => {
        // Given a meeting with waiting room for non-coworkers
        const meeting = { waitingRoomMode: WAITING_ROOM_MODE.NOT_COWORKER };

        // When getting the waiting room value
        const value = getWaitingRoomValue(meeting);

        // Then it should return "for anyone outside my company"
        expect(value).toBe(
          WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY,
        );
      });

      it('should handle GUESTS mode with coworkers-only meeting', () => {
        // Given a meeting with guests waiting room but only coworkers can join
        const meeting = {
          waitingRoomMode: WAITING_ROOM_MODE.GUESTS,
          isOnlyCoworkersJoin: true,
        };

        // When getting the waiting room value
        const value = getWaitingRoomValue(meeting);

        // Then it should return "all participants" since guests option is not available for coworkers-only meetings
        expect(value).toBe(WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS);
      });

      it('should handle undefined waiting room mode', () => {
        // Given a meeting with undefined waiting room mode
        const meeting = { waitingRoomMode: undefined };

        // When getting the waiting room value
        const value = getWaitingRoomValue(meeting);

        // Then it should return default "for anyone outside my company"
        expect(value).toBe(
          WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY,
        );
      });

      it('should handle null waiting room mode', () => {
        // Given a meeting with null waiting room mode
        const meeting = { waitingRoomMode: null };

        // When getting the waiting room value
        const value = getWaitingRoomValue(meeting);

        // Then it should return default "for anyone outside my company"
        expect(value).toBe(
          WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY,
        );
      });

      it('should handle undefined waiting room mode with coworkers-only meeting', () => {
        // Given a meeting with undefined waiting room mode but only coworkers can join
        const meeting = {
          waitingRoomMode: undefined,
          isOnlyCoworkersJoin: true,
        };

        // When getting the waiting room value
        const value = getWaitingRoomValue(meeting);

        // Then it should return "all participants" for coworkers-only meetings
        expect(value).toBe(WAITING_ROOM_PARTICIPANTS_OPTIONS.ALL_PARTICIPANTS);
      });

      it('should handle invalid waiting room mode', () => {
        // Given a meeting with invalid waiting room mode
        const meeting = { waitingRoomMode: 999 };

        // When getting the waiting room value
        const value = getWaitingRoomValue(meeting);

        // Then it should return default "for anyone outside my company"
        expect(value).toBe(
          WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY,
        );
      });

      it('should handle empty meeting object', () => {
        // Given an empty meeting object
        const meeting = {};

        // When getting the waiting room value
        const value = getWaitingRoomValue(meeting);

        // Then it should return default "for anyone outside my company"
        expect(value).toBe(
          WAITING_ROOM_PARTICIPANTS_OPTIONS.FOR_ANYONE_OUTSIDE_MY_COMPANY,
        );
      });
    });

    describe('Password Protection', () => {
      it('should update password requirement when toggled', () => {
        // Given meeting settings
        const initialSettings = {
          name: 'Test Meeting',
          isMeetingSecret: false,
        };
        const getSettings = () => initialSettings;

        // When enabling password requirement
        const handler = createRequirePasswordChangeHandler(
          mockGenericMeeting,
          getSettings,
        );
        handler(true);

        // Then the meeting is updated with password required
        expect(mockGenericMeeting.updateMeetingSettings).toHaveBeenCalledWith({
          name: 'Test Meeting',
          isMeetingSecret: true,
        });
      });

      it('should update password value when changed', () => {
        // Given meeting settings
        const initialSettings = {
          name: 'Test Meeting',
          meetingPassword: 'oldpass',
        };
        const getSettings = () => initialSettings;

        // When changing password
        const handler = createPasswordChangeHandler(
          mockGenericMeeting,
          getSettings,
        );
        handler('newpass');

        // Then the meeting is updated with new password
        expect(mockGenericMeeting.updateMeetingSettings).toHaveBeenCalledWith({
          name: 'Test Meeting',
          meetingPassword: 'newpass',
        });
      });
    });

    describe('Join Before Host settings', () => {
      it('should toggle allowJoinBeforeHost when start meeting after join changes', () => {
        // Given a meeting with waiting room not set to ALL
        const initialSettings = {
          name: 'Test Meeting',
          waitingRoomMode: WAITING_ROOM_MODE.NOT_COWORKER,
          allowJoinBeforeHost: false,
        };
        const getSettings = () => initialSettings;

        // When disabling "start meeting after join" (enabling join before host)
        const handler = createStartMeetingAfterJoinChangeHandler(
          mockGenericMeeting,
          getSettings,
        );
        handler(false);

        // Then allowJoinBeforeHost is set to true
        expect(mockGenericMeeting.updateMeetingSettings).toHaveBeenCalledWith({
          name: 'Test Meeting',
          waitingRoomMode: WAITING_ROOM_MODE.NOT_COWORKER,
          allowJoinBeforeHost: true,
        });
      });

      it('should prevent enabling join before host when waiting room is set to ALL', () => {
        // Given a meeting with waiting room for ALL
        const initialSettings = {
          name: 'Test Meeting',
          waitingRoomMode: WAITING_ROOM_MODE.ALL,
          allowJoinBeforeHost: false,
        };
        const getSettings = () => initialSettings;

        // When trying to enable join before host
        const handler = createStartMeetingAfterJoinChangeHandler(
          mockGenericMeeting,
          getSettings,
        );
        handler(false);

        // Then no update is made
        expect(mockGenericMeeting.updateMeetingSettings).not.toHaveBeenCalled();
      });
    });
  });

  describe('UI States', () => {
    it('should calculate correct disabled states for waiting room settings', () => {
      // Given different meeting scenarios
      const normalMeeting = {};
      const meetingWithE2EE = { e2ee: true };
      const meetingWithAllWaitingRoom = {
        waitingRoomMode: WAITING_ROOM_MODE.ALL,
      };

      // When calculating disabled states
      const normalStates = calculateDisabledStates(
        mockGenericMeeting,
        normalMeeting,
      );
      const e2eeStates = calculateDisabledStates(
        mockGenericMeeting,
        meetingWithE2EE,
      );
      const allWaitingRoomStates = calculateDisabledStates(
        mockGenericMeeting,
        meetingWithAllWaitingRoom,
      );

      // Then states correctly reflect the constraints
      // For normal meeting
      expect(normalStates.isWaitingRoomDisabled).toBe(false);
      expect(normalStates.isJoinBeforeHostDisabled).toBe(false);

      // For E2EE meeting - waiting room options should be disabled
      expect(e2eeStates.isWaitingRoomDisabled).toBe(true);
      expect(e2eeStates.isWaitingRoomTypeDisabled).toBe(true);
      expect(e2eeStates.isAuthenticatedCanJoinDisabled).toBe(true);

      // For ALL waiting room - join before host should be disabled
      expect(allWaitingRoomStates.isJoinBeforeHostDisabled).toBe(true);
    });

    it('should disable all UI controls when service is updating', () => {
      // Given a service that is updating
      const updatingService = {
        ...mockGenericMeeting,
        isUpdating: true,
      };

      // When calculating disabled states
      const states = calculateDisabledStates(updatingService, {});

      // Then all controls are disabled
      expect(states.isJoinBeforeHostDisabled).toBe(true);
      expect(states.isWaitingRoomDisabled).toBe(true);
      expect(states.isWaitingRoomTypeDisabled).toBe(true);
      expect(states.isAuthenticatedCanJoinDisabled).toBe(true);
      expect(states.isAuthUserTypeDisabled).toBe(true);
      expect(states.isRequirePasswordDisabled).toBe(true);
    });
  });

  describe('Complex integration scenarios', () => {
    it('should handle a sequence of interdependent setting changes correctly', () => {
      // Given initial meeting settings
      let currentSettings = {
        name: 'Test Meeting',
        waitingRoomMode: WAITING_ROOM_MODE.OFF,
        allowJoinBeforeHost: true,
        isOnlyCoworkersJoin: false,
        isOnlyAuthUserJoin: false,
        isMeetingSecret: false,
      };

      // Mock update to track changes to the settings
      mockGenericMeeting.updateMeetingSettings.mockImplementation(
        (newSettings: any) => {
          currentSettings = { ...newSettings };
        },
      );

      // Create a getter that always returns the current settings
      const getSettings = () => currentSettings;

      // When performing a sequence of interdependent changes

      // 1. First enable waiting room
      const waitingRoomHandler = createUseWaitingRoomChangeHandler(
        mockGenericMeeting,
        getSettings,
      );
      waitingRoomHandler(true);

      // 2. Then change who can join to coworkers only
      const whoCanJoinHandler = createWhoCanJoinChangeHandler(
        mockGenericMeeting,
        getSettings,
      );
      whoCanJoinHandler(WHO_CAN_JOIN_OPTIONS.ONLY_MY_COWORKERS);

      // 3. Try to enable join before host (should be blocked)
      const joinHandler = createStartMeetingAfterJoinChangeHandler(
        mockGenericMeeting,
        getSettings,
      );
      joinHandler(false);

      // 4. Enable password requirement
      const passwordReqHandler = createRequirePasswordChangeHandler(
        mockGenericMeeting,
        getSettings,
      );
      passwordReqHandler(true);

      // Then the final state should have the correct settings that honor all constraints
      // - Waiting room should be ALL (from coworkers only)
      // - Join before host should be false (blocked by ALL waiting room)
      // - Only coworkers join should be true
      // - Password requirement should be true
      expect(currentSettings).toEqual({
        name: 'Test Meeting',
        waitingRoomMode: WAITING_ROOM_MODE.ALL,
        allowJoinBeforeHost: false,
        isOnlyCoworkersJoin: true,
        isOnlyAuthUserJoin: true,
        isMeetingSecret: true,
      });
    });
  });
});
