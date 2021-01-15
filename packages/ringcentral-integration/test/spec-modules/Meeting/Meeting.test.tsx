import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from '@ringcentral-integration/test-utils';

import { Meeting } from '../../../modules/MeetingV2';
import {
  MOCK_PERSONAL_MEETING,
  SAVED_DEFAULT_MEETING_SETTING,
  LAST_MEETING_SETTING,
  EXPECT_PMI_DEFAULT_SETTING_WITH_SW_SETTING,
  EXPECT_SAVE_AS_DEFAULT_SETTING,
  EXPECT_LAST_MEETING_SETTING,
  EXPECT_GENERAL_DEFAULT_SETTING_WITH_SW_SETTING,
} from './mockData';

const mockDeps = {
  locale: {
    currentLocale: 'en-US',
  },
  brand: {
    code: 'rc',
  },
};

@autorun(test)
@title('Initialize Meeting module')
export class CheckInitialData extends Step {
  run() {
    return (
      <Scenario desc="Check default value when init meeting module">
        <When
          desc="Create an Meeting instance with default value"
          action={(_: any, context: any) => {
            const meeting = new Meeting(mockDeps as any);
            context.instance = meeting;
          }}
        />
        <Then
          desc="Check module state default value"
          action={(_: any, context: any) => {
            expect(context.instance.meeting).toBeNull();
            expect(context.instance.isScheduling).toEqual(false);
            expect(context.instance.updatingStatus).toEqual([]);
            expect(context.instance.personalMeeting).toEqual({});
            expect(context.instance.savedDefaultMeetingSetting).toEqual({});
            expect(context.instance.lastMeetingSetting).toEqual({});
            expect(context.instance.delegators).toEqual([]);
            expect(context.instance.userSettings).toEqual({});
            expect(context.instance.lockedSettings).toEqual({});
            expect(context.instance.preferences).toEqual({});
            expect(context.instance.isPreferencesChanged).toEqual(false);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check pmiDefaultSettings when enableServiceWebSettings is off')
export class PmiDefaultSettingsWhenEnableSWOff extends Step {
  run() {
    return (
      <Scenario desc="Test pmiDefaultSettings function logic">
        <When
          desc="Create an Meeting instance with default value"
          action={(_: any, context: any) => {
            class MockStore {
              _state = {
                personalMeeting: MOCK_PERSONAL_MEETING,
              };

              getState() {
                return this._state;
              }
            }
            class MeetingWithStore extends Meeting {
              _mockStore = new MockStore() as any;

              get _store() {
                return this._mockStore;
              }

              _getState() {
                return this._store.getState();
              }
            }
            const meeting = new MeetingWithStore({
              ...mockDeps,
              meetingOptions: {
                enableServiceWebSettings: false,
                enablePersonalMeeting: true,
              },
              extensionInfo: {
                info: { id: 'extensionId', name: 'extensionName' },
              },
            } as any);
            context.instance = meeting;
          }}
        />
        <Then
          desc="Check generalDefaultSettings"
          action={(_: any, context: any) => {
            expect(context.instance.enableServiceWebSettings).toEqual(false);
            expect(context.instance.pmiDefaultSettings).toEqual(
              MOCK_PERSONAL_MEETING,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check generalDefaultSettings when enableServiceWebSettings is off')
export class GeneralDefaultSettingsWhenEnableSWOff extends Step {
  @examples(`
    | showSaveAsDefault |
    | true              |
    | false             |
  `)
  run() {
    return (
      <Scenario desc="Test generalDefaultSettings function logic">
        <When
          desc="Create an Meeting instance with default value"
          action={(_: any, context: any) => {
            class MockStore {
              _state = {
                savedDefaultMeetingSetting: SAVED_DEFAULT_MEETING_SETTING,
                lastMeetingSetting: LAST_MEETING_SETTING,
              };

              getState() {
                return this._state;
              }
            }
            class MeetingWithStore extends Meeting {
              _mockStore = new MockStore() as any;

              get _store() {
                return this._mockStore;
              }

              _getState() {
                return this._store.getState();
              }
            }
            const meeting = new MeetingWithStore({
              ...mockDeps,
              meetingOptions: {
                showSaveAsDefault: context.example.showSaveAsDefault,
                enableServiceWebSettings: false,
                enablePersonalMeeting: false,
              },
              extensionInfo: {
                info: { id: 'extensionId', name: 'extensionName' },
              },
            } as any);
            context.instance = meeting;
          }}
        />
        <Then
          desc="Check generalDefaultSettings"
          action={(_: any, context: any) => {
            expect(context.instance.enablePersonalMeeting).toEqual(false);
            expect(context.instance.enableServiceWebSettings).toEqual(false);
            expect(context.instance.showSaveAsDefault).toEqual(
              context.example.showSaveAsDefault,
            );
            const generalDefaultSettings = context.instance.getGeneralDefaultSettings();
            expect(generalDefaultSettings).toEqual(
              context.instance.showSaveAsDefault
                ? EXPECT_SAVE_AS_DEFAULT_SETTING
                : EXPECT_LAST_MEETING_SETTING,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check pmiDefaultSettings when enableServiceWebSettings is on')
export class PmiDefaultSettingsWhenEnableSWOn extends Step {
  @examples(`
    | requirePasswordForPmiMeetings | allowJoinBeforeHost | password |
    | 'none'                        | true                | ''       |
    | 'none'                        | true                | '123456' |
    | 'all'                         | true                | ''       |
    | 'all'                         | true                | '123456' |
    | 'jbh_only'                    | true                | ''       |
    | 'jbh_only'                    | true                | '123456' |
    | 'none'                        | false               | ''       |
    | 'none'                        | false               | '123456' |
    | 'all'                         | false               | ''       |
    | 'all'                         | false               | '123456' |
    | 'jbh_only'                    | false               | ''       |
    | 'jbh_only'                    | false               | '123456' |
  `)
  run() {
    return (
      <Scenario desc="Test pmiDefaultSettings function logic">
        <When
          desc="Create an Meeting instance with default value"
          action={(_: any, context: any) => {
            const mockPMI = {
              ...MOCK_PERSONAL_MEETING,
              password: context.example.password,
              allowJoinBeforeHost: context.example.allowJoinBeforeHost,
            };
            class MockStore {
              _state = {
                personalMeeting: mockPMI,
                userSettings: {
                  scheduleMeeting: {
                    requirePasswordForPmiMeetings:
                      context.example.requirePasswordForPmiMeetings,
                  },
                },
              };

              getState() {
                return this._state;
              }
            }
            class MeetingWithStore extends Meeting {
              _mockStore = new MockStore() as any;

              get _store() {
                return this._mockStore;
              }

              _getState() {
                return this._store.getState();
              }
            }
            const meeting = new MeetingWithStore({
              ...mockDeps,
              meetingOptions: {
                enablePersonalMeeting: true,
                enableServiceWebSettings: true,
              },
              extensionInfo: {
                info: { id: 'extensionId', name: 'extensionName' },
              },
            } as any);
            context.instance = meeting;
          }}
        />
        <Then
          desc="Check generalDefaultSettings"
          action={(_: any, context: any) => {
            expect(context.instance.enableServiceWebSettings).toEqual(true);
            expect(context.instance.enablePersonalMeeting).toEqual(true);
            const {
              password,
              _pmiPassword,
              _requireMeetingPassword,
              _lockRequireMeetingPassword,
              ...rest
            } = context.instance.pmiDefaultSettings;
            const {
              password: password2,
              _pmiPassword: pmiPassword2,
              _requireMeetingPassword: requireMeetingPassword2,
              _lockRequireMeetingPassword: lockRequireMeetingPassword2,
              ...restMockData
            } = {
              ...EXPECT_PMI_DEFAULT_SETTING_WITH_SW_SETTING,
              allowJoinBeforeHost: context.example.allowJoinBeforeHost,
            };
            expect(rest).toEqual(restMockData);
            expect(_pmiPassword).toEqual(context.example.password);
            switch (context.example.requirePasswordForPmiMeetings) {
              case 'none':
                expect(_requireMeetingPassword).toBe(password !== '');
                break;
              case 'all':
                expect(_requireMeetingPassword).toBe(true);
                break;
              case 'jbh_only':
                expect(_requireMeetingPassword).toBe(
                  context.example.allowJoinBeforeHost ||
                    context.example.password !== '',
                );
                break;
              default:
                expect(_requireMeetingPassword).toBe(
                  MOCK_PERSONAL_MEETING._requireMeetingPassword,
                );
            }
            if (_requireMeetingPassword && !context.example.password) {
              expect(password).not.toBe('');
            } else {
              expect(password).toBe(context.example.password);
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check generalDefaultSettings when enableServiceWebSettings is on')
export class GeneralDefaultSettingsWhenEnableSWOn extends Step {
  @examples(`
    | requirePasswordForSchedulingNewMeetings |
    | true                                    |
    | false                                   |
  `)
  run() {
    return (
      <Scenario desc="Test generalDefaultSettings">
        <When
          desc="Create an Meeting instance with default value"
          action={(_: any, context: any) => {
            class MockStore {
              _state = {
                userSettings: {
                  scheduleMeeting: {
                    requirePasswordForSchedulingNewMeetings:
                      context.example.requirePasswordForSchedulingNewMeetings,
                  },
                },
              };

              getState() {
                return this._state;
              }
            }
            class MeetingWithStore extends Meeting {
              _mockStore = new MockStore() as any;

              get _store() {
                return this._mockStore;
              }

              _getState() {
                return this._store.getState();
              }
            }
            const meeting = new MeetingWithStore({
              ...mockDeps,
              meetingOptions: {
                enablePersonalMeeting: false,
                enableServiceWebSettings: true,
              },
              extensionInfo: {
                info: { id: 'extensionId', name: 'extensionName' },
              },
            } as any);
            context.instance = meeting;
          }}
        />
        <Then
          desc="Check generalDefaultSettings"
          action={(_: any, context: any) => {
            expect(context.instance.enablePersonalMeeting).toEqual(false);
            expect(context.instance.enableServiceWebSettings).toEqual(true);

            const generalDefaultSettings = context.instance.getGeneralDefaultSettings();
            const {
              password,
              _requireMeetingPassword,
              ...rest
            } = generalDefaultSettings;
            const {
              password: password2,
              _requireMeetingPassword: _requireMeetingPassword2,
              ...restExpect
            } = EXPECT_GENERAL_DEFAULT_SETTING_WITH_SW_SETTING;

            expect(rest).toEqual(restExpect);
            expect(_requireMeetingPassword).toEqual(
              context.example.requirePasswordForSchedulingNewMeetings,
            );
            if (_requireMeetingPassword) {
              expect(password).not.toBe('');
            } else {
              expect(password).toBe('');
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('Check pmiDefaultSettings lock data when enableServiceWebSettings is on')
export class PmiDefaultSettingsLockDataWhenEnableSWOn extends Step {
  @examples(`
    | lockedRequirePasswordForPmiMeetings | requirePasswordForPmiMeetings | allowJoinBeforeHost |
    | true                                | 'jbh_only'                    | true                |
    | false                               | 'jbh_only'                    | true                |
    | true                                | 'all'                         | true                |
    | false                               | 'all'                         | true                |
    | true                                | 'none'                        | true                |
    | false                               | 'none'                        | true                |
    | true                                | 'jbh_only'                    | false               |
    | false                               | 'jbh_only'                    | false               |
    | true                                | 'all'                         | false               |
    | false                               | 'all'                         | false               |
    | true                                | 'none'                        | false               |
    | false                               | 'none'                        | false               |
  `)
  run() {
    return (
      <Scenario desc="Test pmiDefaultSettings lock data logic">
        <When
          desc="Create an Meeting instance with default value"
          action={(_: any, context: any) => {
            const mockPMI = {
              ...MOCK_PERSONAL_MEETING,
              allowJoinBeforeHost: context.example.allowJoinBeforeHost,
            };
            class MockStore {
              _state = {
                personalMeeting: mockPMI,
                lockedSettings: {
                  scheduleMeeting: {
                    requirePasswordForPmiMeetings:
                      context.example.lockedRequirePasswordForPmiMeetings,
                  },
                },
                userSettings: {
                  scheduleMeeting: {
                    requirePasswordForPmiMeetings:
                      context.example.requirePasswordForPmiMeetings,
                  },
                },
              };

              getState() {
                return this._state;
              }
            }
            class MeetingWithStore extends Meeting {
              _mockStore = new MockStore() as any;

              get _store() {
                return this._mockStore;
              }

              _getState() {
                return this._store.getState();
              }
            }
            const meeting = new MeetingWithStore({
              ...mockDeps,
              meetingOptions: {
                enablePersonalMeeting: true,
                enableServiceWebSettings: true,
              },
              extensionInfo: {
                info: { id: 'extensionId', name: 'extensionName' },
              },
            } as any);
            context.instance = meeting;
          }}
        />
        <Then
          desc="Check pmiDefaultSettings lock data"
          action={(_: any, context: any) => {
            expect(context.instance.enableServiceWebSettings).toEqual(true);
            expect(context.instance.enablePersonalMeeting).toEqual(true);

            if (context.example.requirePasswordForPmiMeetings === 'jbh_only') {
              expect(
                context.instance.pmiDefaultSettings._lockRequireMeetingPassword,
              ).toEqual(
                context.example.lockedRequirePasswordForPmiMeetings &&
                  context.example.allowJoinBeforeHost,
              );
            } else {
              expect(
                context.instance.pmiDefaultSettings._lockRequireMeetingPassword,
              ).toEqual(context.example.lockedRequirePasswordForPmiMeetings);
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title(
  'Check generalDefaultSettings lock data when enableServiceWebSettings is on',
)
export class GeneralDefaultSettingsLockDataWhenEnableSWOn extends Step {
  @examples(`
    | lockedRequirePasswordForSchedulingNewMeetings |
    | true                                    |
    | false                                   |
  `)
  run() {
    return (
      <Scenario desc="Test generalDefaultSettings">
        <When
          desc="Create an Meeting instance with default value"
          action={(_: any, context: any) => {
            class MockStore {
              _state = {
                // userSettings: {
                //   scheduleMeeting: {
                //     requirePasswordForSchedulingNewMeetings:
                //       context.example.requirePasswordForSchedulingNewMeetings,
                //   },
                // },
                lockedSettings: {
                  scheduleMeeting: {
                    requirePasswordForSchedulingNewMeetings:
                      context.example
                        .lockedRequirePasswordForSchedulingNewMeetings,
                  },
                },
              };

              getState() {
                return this._state;
              }
            }
            class MeetingWithStore extends Meeting {
              _mockStore = new MockStore() as any;

              get _store() {
                return this._mockStore;
              }

              _getState() {
                return this._store.getState();
              }
            }
            const meeting = new MeetingWithStore({
              ...mockDeps,
              meetingOptions: {
                enablePersonalMeeting: false,
                enableServiceWebSettings: true,
              },
              extensionInfo: {
                info: { id: 'extensionId', name: 'extensionName' },
              },
            } as any);
            context.instance = meeting;
          }}
        />
        <Then
          desc="Check generalDefaultSettings"
          action={(_: any, context: any) => {
            expect(context.instance.enablePersonalMeeting).toEqual(false);
            expect(context.instance.enableServiceWebSettings).toEqual(true);
            const generalDefaultSettings = context.instance.getGeneralDefaultSettings();
            expect(generalDefaultSettings._lockRequireMeetingPassword).toEqual(
              context.example.lockedRequirePasswordForSchedulingNewMeetings,
            );
          }}
        />
      </Scenario>
    );
  }
}
