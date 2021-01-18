import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  And,
  Step,
  examples,
  StepFunction as BaseStepFunction,
} from '@ringcentral-integration/test-utils';
import videoPersonalSettingsBody from '../../integration-test/mock/data/videoPersonalSettings.json';
import videoPreferenceBody from '../../integration-test/mock/data/videoPreference.json';
import delegatorsBody from '../../integration-test/mock/data/delegatorsBody.json';
import { RcVideo } from '../../modules/RcVideoV2';
import { videoStatus } from '../../modules/RcVideoV2/videoStatus';
import { RcvDelegator } from '../../modules/RcVideoV2/RcVideo.interface';
import { RcVideoAPI } from '../../interfaces/Rcv.model';

interface Context {
  phone: any;
}

interface StepFunction<P = {}, C = {}>
  extends BaseStepFunction<P, C & Context> {}

class MockModule {
  _ready = true;
  get ready() {
    return this._ready;
  }
}

class MockAlert extends MockModule {
  args: any = null;
  success(...args: any[]) {
    this.args = args;
  }

  danger(...args: any[]) {
    this.args = args;
  }

  warning(...args: any[]) {
    this.args = args;
  }
}

class MockStorage extends MockModule {
  registerReducer() {}

  getItem() {
    return null;
  }
}

class MockStore {
  _state = {
    RcVideo: {},
  };

  getState() {
    return this._state;
  }

  parentModule: {};
}

class RcVideoMockStore extends RcVideo {
  _mockStore = new MockStore() as any;
  get _store() {
    return this._mockStore;
  }

  _getState() {
    return this._store.getState().RcVideo;
  }
}

const getMockModule = () => ({
  personalVideo: null as RcVideoAPI,
  savedDefaultSetting: {},
  meeting: {},
  videoStatus: videoStatus.idle,
  preferences: {},
  isPreferencesChanged: false,
  settingLocks: {},
  delegator: null as RcvDelegator,
  delegators: [] as RcvDelegator[],
  state: {},
  _dispatch: () => {},
  parentModule: {},
});

const CreateRcVideoModule: StepFunction<{
  rcVideoOptions: any;
}> = ({ rcVideoOptions = {} }: any, context: any) => {
  context.instance = new RcVideo({
    alert: new MockAlert() as any,
    client: {} as any,
    brand: {} as any,
    storage: new MockStorage() as any,
    accountInfo: {} as any,
    extensionInfo: {} as any,
    meetingProvider: {} as any,
    rcVideoOptions,
  });
};

@autorun(test)
@title('RcVideo Module initial state')
class RcVideoInitialState extends Step {
  run() {
    return (
      <Scenario desc="RcVideo Module initial state should be expected">
        <Given
          desc="Create an RcVideo instance"
          action={(_: any, context: any) => {
            context.instance = new RcVideo({} as any);
          }}
        />
        <Then
          desc="initial state value should be expected"
          action={(_: any, context: any) => {
            expect(context.instance.personalVideo).toBeNull();
            expect(context.instance.savedDefaultSetting).toEqual({});
            expect(context.instance.meeting).toEqual({});
            expect(context.instance.videoStatus).toBe(videoStatus.idle);
            expect(context.instance.preferences).toEqual({});
            expect(context.instance.isPreferencesChanged).toBeFalsy();
            expect(context.instance.settingLocks).toEqual({});
            expect(context.instance.delegator).toBeNull();
            expect(context.instance.delegators).toEqual([]);
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcVideoOptions is consistent with optionValue')
class RcVideoOptions extends Step {
  @examples(`
    | optionKey                   | optionValue |
    | 'showAdminLock'             | true        |
    | 'showAdminLock'             | false       |
    | 'showSaveAsDefault'         | true        |
    | 'showSaveAsDefault'         | false       |
    | 'isInstantMeeting'          | true        |
    | 'isInstantMeeting'          | false       |
    | 'enableWaitingRoom'         | true        |
    | 'enableWaitingRoom'         | false       |
    | 'enablePersonalMeeting'     | true        |
    | 'enablePersonalMeeting'     | false       |
    | 'enableScheduleOnBehalf'    | true        |
    | 'enableScheduleOnBehalf'    | false       |
    | 'enableReloadAfterSchedule' | true        |
    | 'enableReloadAfterSchedule' | false       |
  `)
  run() {
    return (
      <Scenario desc="RcVideoOptions is consistent with optionValue">
        <Given
          desc="Create an RcVideo instance and initial state should be expected"
          action={(_: any, context: any) => {
            const rcVideoOptions: {
              [key: string]: any;
            } = {};
            rcVideoOptions[context.example.key] = context.example.value;
            context.instance = new RcVideo({
              alert: new MockAlert() as any,
              client: {} as any,
              brand: {} as any,
              storage: new MockStorage() as any,
              accountInfo: {} as any,
              extensionInfo: {} as any,
              meetingProvider: {} as any,
              rcVideoOptions,
            } as any);
          }}
        />
        <Then
          desc="check option value should be expected"
          action={(_: any, context: any) => {
            expect(context.instance[context.example.key]).toBe(
              context.example.value,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcVideo Module state personalVideo')
class CheckPersonalMeeting extends Step {
  run() {
    return (
      <Scenario desc="RcVideo Module state personalVideo">
        <Given
          desc="Create an RcVideo instance and initial state 'personalVideo' should be expected"
          action={(_: any, context: any) => {
            context.instance = new RcVideo({} as any);
            expect(context.instance.personalVideo).toBeNull();
          }}
        />
        <When
          desc="Call '_savePersonalMeeting' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance._savePersonalMeeting.call(
              context.mockModule,
              videoPersonalSettingsBody,
            );
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.personalVideo).toStrictEqual(
              videoPersonalSettingsBody,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcVideo Module state savedDefaultSetting')
class CheckSavedDefaultSetting extends Step {
  run() {
    return (
      <Scenario desc="RcVideo Module state savedDefaultSetting">
        <Given
          desc="Create an RcVideo instance and initial state 'savedDefaultSetting' should be expected"
          action={(_: any, context: any) => {
            context.instance = new RcVideo({} as any);
            expect(context.instance.savedDefaultSetting).toEqual({});
          }}
        />
        <When
          desc="Call '_saveDefaultVideoSetting' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance._saveDefaultVideoSetting.call(
              context.mockModule,
              videoPersonalSettingsBody,
            );
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.savedDefaultSetting).toStrictEqual(
              videoPersonalSettingsBody,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcVideo Module state meeting')
class CheckMeeting extends Step {
  run() {
    return (
      <Scenario desc="RcVideo Module state meeting">
        <Given
          desc="Create an RcVideo instance and initial state 'meeting' should be expected"
          action={(_: any, context: any) => {
            context.instance = new RcVideo({} as any);
            expect(context.instance.meeting).toEqual({});
          }}
        />
        <When
          desc="Call '_updateMeetingSettings' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance._updateMeetingSettings.call(
              context.mockModule,
              videoPersonalSettingsBody,
            );
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.meeting).toStrictEqual(
              videoPersonalSettingsBody,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcVideo Module state videoStatus')
class CheckVideoStatus extends Step {
  run() {
    return (
      <Scenario desc="RcVideo Module state videoStatus">
        <Given
          desc="Create an RcVideo instance and initial state 'videoStatus' should be expected"
          action={(_: any, context: any) => {
            context.instance = new RcVideo({} as any);
            expect(context.instance.videoStatus).toEqual(videoStatus.idle);
          }}
        />
        <Then
          desc="Call '_updateVideoStatus' action, the mockModule 'videoStatus' should be the expected values"
          action={(_: any, context: any) => {
            const actions = [
              {
                action: 'initSettingsStart',
                value: videoStatus.initializing,
              },
              {
                action: 'initSettingsEnd',
                value: videoStatus.initialized,
              },
              {
                action: 'initCreating',
                value: videoStatus.creating,
              },
              {
                action: 'created',
                value: videoStatus.created,
              },
              {
                action: 'initUpdating',
                value: videoStatus.updating,
              },
              {
                action: 'updated',
                value: videoStatus.updated,
              },
              {
                action: 'resetCreating',
                value: videoStatus.idle,
              },
              {
                action: 'resetUpdating',
                value: videoStatus.idle,
              },
            ];
            actions.forEach(({ action, value }) => {
              const mockModule = getMockModule();
              context.instance._updateVideoStatus.call(mockModule, value);
              expect(mockModule.videoStatus).toBe(value);
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcVideo Module state preferences and settingLocks')
class CheckPreferencesAndSettingLocks extends Step {
  run() {
    return (
      <Scenario desc="RcVideo Module state preferences and settingLocks">
        <Given
          desc="Create an RcVideo instance and initial state 'preferences', 'settingLocks' should be expected"
          action={(_: any, context: any) => {
            context.instance = new RcVideo({} as any);
            expect(context.instance.preferences).toEqual({});
            expect(context.instance.settingLocks).toEqual({});
          }}
        />
        <When
          desc="Call '_updateMeetingPreferences', '_updateMeetingSettingLocks' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.preferences = {};
            context.settingLocks = {};

            videoPreferenceBody.forEach(({ id, value, readOnly }) => {
              context.preferences[id] = value;
              context.settingLocks[id] = readOnly;
            });

            context.instance._updateMeetingPreferences.call(
              context.mockModule,
              context.preferences,
            );
            context.instance._updateMeetingSettingLocks.call(
              context.mockModule,
              context.settingLocks,
            );
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.preferences).toStrictEqual(
              context.preferences,
            );
            expect(context.mockModule.settingLocks).toStrictEqual(
              context.settingLocks,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcVideo Module state isPreferencesChanged')
class CheckIsPreferencesChanged extends Step {
  run() {
    return (
      <Scenario desc="RcVideo Module state isPreferencesChanged">
        <Given
          desc="Create an RcVideo instance and initial state 'isPreferencesChanged' should be expected"
          action={(_: any, context: any) => {
            context.instance = new RcVideo({} as any);
            expect(context.instance.isPreferencesChanged).toBeFalsy();
          }}
        />
        <Then
          desc="Call '_updateVideoStatus' action, the mockModule 'isPreferencesChanged' should be the expected values"
          action={(_: any, context: any) => {
            const actions = [
              {
                action: 'saveMeetingPreferencesState',
                value: true,
              },
              {
                action: 'saveMeetingPreferencesState',
                value: false,
              },
            ];
            actions.forEach(({ action, value }) => {
              const mockModule = getMockModule();
              context.instance._updateIsPreferencesChanged.call(
                mockModule,
                value,
              );
              expect(mockModule.isPreferencesChanged).toBe(value);
            });
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcVideo Module state delegator')
class CheckDelegator extends Step {
  run() {
    return (
      <Scenario desc="RcVideo Module state delegator">
        <Given
          desc="Create an RcVideo instance and initial state 'delegator' should be expected"
          action={(_: any, context: any) => {
            context.instance = new RcVideo({} as any);
            expect(context.instance.delegator).toBeNull();
          }}
        />
        <When
          desc="Call '_updateDelegator' action"
          action={(_: any, context: any) => {
            context.delegator = {
              name: 'ASSISTED_USERS_MYSELF',
              id: `123456`,
              extensionId: `123456`,
              accountId: `123456`,
              isLoginUser: true,
            };
            context.mockModule = getMockModule();
            context.instance._updateDelegator.call(
              context.mockModule,
              context.delegator,
            );
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.delegator).toStrictEqual(
              context.delegator,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('RcVideo Module state delegators')
class CheckDelegators extends Step {
  run() {
    return (
      <Scenario desc="RcVideo Module state delegators">
        <Given
          desc="Create an RcVideo instance and initial state 'delegators' should be expected"
          action={(_: any, context: any) => {
            context.instance = new RcVideo({} as any);
            expect(context.instance.delegators).toEqual([]);
          }}
        />
        <When
          desc="Call '_updateDelegatorList' action"
          action={(_: any, context: any) => {
            context.mockModule = getMockModule();
            context.instance._updateDelegatorList.call(
              context.mockModule,
              delegatorsBody,
            );
          }}
        />
        <Then
          desc="check value should be expected"
          action={(_: any, context: any) => {
            expect(context.mockModule.delegators).toStrictEqual(delegatorsBody);
          }}
        />
      </Scenario>
    );
  }
}
