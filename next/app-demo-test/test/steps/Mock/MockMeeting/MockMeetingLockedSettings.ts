import type { AccountLockedSettingResponse } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockMeetingLockedSettingsProps {
  settingOnSW?:
    | 'Audio Type'
    | 'Host video'
    | 'Participants video'
    | 'Join before host'
    | 'Require Password';
  settingIsLocked?: boolean;
  requirePasswordIsLockedPmi?: boolean;
  requirePasswordIsLocked?: boolean;
}

export const MockMeetingLockedSettings: StepFunction<
  MockMeetingLockedSettingsProps
> = async (
  {
    settingIsLocked,
    requirePasswordIsLockedPmi,
    settingOnSW,
    requirePasswordIsLocked,
  },
  { rcMock },
) => {
  rcMock.replaceDefaultInitMock(rcMock.getMeetingLockedSettings, () => {
    rcMock.getMeetingLockedSettings((mockData) => {
      let settingOnSWField: keyof AccountLockedSettingResponse['scheduleMeeting'];
      switch (settingOnSW) {
        case 'Audio Type':
          settingOnSWField = 'audioOptions';
          break;
        case 'Host video':
          settingOnSWField = 'startHostVideo';
          break;
        case 'Participants video':
          settingOnSWField = 'startParticipantsVideo';
          break;
        case 'Join before host':
          settingOnSWField = 'allowJoinBeforeHost';
          break;
        case 'Require Password':
          settingOnSWField = 'requirePasswordForSchedulingNewMeetings';
          break;
        default:
      }
      // TODO: fix type
      mockData.scheduleMeeting.requirePasswordForPmiMeetings =
        requirePasswordIsLockedPmi ?? false;
      mockData.scheduleMeeting.requirePasswordForSchedulingNewMeetings =
        requirePasswordIsLocked ?? false;
      if (settingOnSW) {
        // TODO: fix type
        mockData.scheduleMeeting[settingOnSWField] = settingIsLocked;
      }
      return mockData;
    });
  });
};

export const MockMeetingLockedSettingsAll: StepFunction<{
  settingIsLocked: boolean;
}> = async ({ settingIsLocked }, { rcMock }) => {
  rcMock.replaceDefaultInitMock(rcMock.getMeetingLockedSettings, () => {
    rcMock.getMeetingLockedSettings((mockData) => {
      // eslint-disable-next-line
      for (const key in mockData.scheduleMeeting) {
        mockData.scheduleMeeting[key] = settingIsLocked;
      }
      return mockData;
    });
  });
};
