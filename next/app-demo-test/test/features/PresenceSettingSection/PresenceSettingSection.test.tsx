import { RouterPlugin } from '@ringcentral-integration/next-core';
import {
  autorun,
  common,
  examples,
  Given,
  Scenario,
  Step,
  StepFunction,
  Then,
  title,
  waitForRenderReady,
  When,
} from '@ringcentral-integration/test-utils';
import { PresenceSetting } from '@ringcentral-integration/widgets/test/components/PresenceSettingSection/PresenceSettingSection';

import { Entry } from '../../steps/Entry';
import { Login } from '../../steps/Login';

const NavigateTo: StepFunction<{ path: string }> = async (
  { path },
  { app },
) => {
  const router = app.container.got(RouterPlugin)!;
  await router.push(path);
  await waitForRenderReady();
};

const responseMap = {
  Available: {},
  Busy: {
    pickUpCallsOnHold: false,
    presenceStatus: 'Busy',
    ringOnMonitoredCall: false,
    telephonyStatus: 'NoCall',
    userStatus: 'Busy',
  },
  'Do not Disturb': {
    dndStatus: 'DoNotAcceptAnyCalls',
    pickUpCallsOnHold: false,
    presenceStatus: 'Busy',
    ringOnMonitoredCall: false,
    telephonyStatus: 'NoCall',
    userStatus: 'Busy',
  },
  Invisible: {
    dndStatus: 'TakeAllCalls',
    pickUpCallsOnHold: false,
    presenceStatus: 'Offline',
    ringOnMonitoredCall: false,
    telephonyStatus: 'NoCall',
    userStatus: 'Offline',
  },
} as const;

type PresenceDropdownCheckProps = {
  state: keyof typeof responseMap;
};

@autorun(test)
@common
@title('Check presence setting section')
export class CheckInitialData extends Step {
  @examples(`
    | presenceListIndex |
    | 0                 |
    | 1                 |
    | 2                 |
    | 3                 |
  `)
  run() {
    return (
      <Scenario desc="Check presence setting section module" action={Entry}>
        <Given desc="User is logged in" action={Login} />
        <When
          desc="App navigate to calling setting page"
          action={() => <NavigateTo path="/settings" />}
        />
        <Then
          desc="Mock available presence"
          action={
            (({ state }: PresenceDropdownCheckProps, { rcMock }) => {
              rcMock.presenceUpdate(responseMap[state]);
            }) as StepFunction
          }
        />
        <When desc="Check presence setting section" action={PresenceSetting} />
      </Scenario>
    );
  }
}
