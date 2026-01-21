import type { ScheduleUserMeetingInfo } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockMeetingUserSettingsProps {
  usePmi?: boolean;
  requirePasswordToggleIsOn?: boolean;
  pmiRequirePasswordToggleOnSW?:
    | 'off'
    | 'All meetings using PMI'
    | 'Only meetings with Join Before Host enabled';
}

export const MockMeetingUserSettings: StepFunction<
  MockMeetingUserSettingsProps
> = async (
  { pmiRequirePasswordToggleOnSW, usePmi, requirePasswordToggleIsOn },
  { rcMock },
) => {
  rcMock.replaceDefaultInitMock(rcMock.getMeetingUserSettings, () => {
    rcMock.getMeetingUserSettings((mockData) => {
      let requirePasswordForPmiMeetings: ScheduleUserMeetingInfo['requirePasswordForPmiMeetings'];
      switch (pmiRequirePasswordToggleOnSW) {
        case 'off':
          requirePasswordForPmiMeetings = 'none';
          break;
        case 'All meetings using PMI':
          requirePasswordForPmiMeetings = 'all';
          break;
        case 'Only meetings with Join Before Host enabled':
          // TODO: fix type
          requirePasswordForPmiMeetings = 'jbh_only';
          break;
        default:
          requirePasswordForPmiMeetings = 'none';
      }
      mockData.scheduleMeeting.requirePasswordForPmiMeetings =
        requirePasswordForPmiMeetings ?? 'none';
      mockData.scheduleMeeting.requirePasswordForSchedulingNewMeetings =
        requirePasswordToggleIsOn ?? false;
      mockData.scheduleMeeting.usePmiForScheduledMeetings = usePmi ?? false;
      return mockData;
    });
  });
};

export const MockMeetingUserSettingsFailed: StepFunction = async (
  _,
  { rcMock },
) => {
  rcMock.replaceDefaultInitMock(rcMock.getMeetingUserSettings, () => {
    rcMock.get(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/meeting/user-settings',
      400,
    );
  });
};
